#!/usr/bin/env node
/**
 * One-off media compressor for src/assets.
 *
 * Images go through sharp, videos through ffmpeg. Untouched originals are kept
 * in assets-original/ and are always used as the encode source, so running this
 * repeatedly never stacks lossy generations on top of each other.
 *
 * Usage:
 *   node scripts/compress-media.mjs --dry-run      report sizes, write nothing
 *   node scripts/compress-media.mjs                compress in place
 *   node scripts/compress-media.mjs --only=img     images only (skip ffmpeg)
 *   node scripts/compress-media.mjs --filter=news  only paths containing "news"
 *   node scripts/compress-media.mjs --restore      put the originals back
 *   node scripts/compress-media.mjs --help
 *
 * Formats that change extension (png -> webp) are renamed, and the matching
 * import paths under src/ are updated unless --no-update-imports is passed.
 */

import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { copyFile, mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS_DIR = path.join(ROOT, 'src', 'assets')
const MEDIA_DIRS = ['img', 'vid']
const BACKUP_DIR = path.join(ROOT, 'assets-original')
const SOURCE_DIR = path.join(ROOT, 'src')
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html'])
const IMAGE_CONCURRENCY = 4

/**
 * First match wins. `width` is a ceiling: nothing is ever upscaled.
 * Widths are roughly 2x the largest size each asset is rendered at.
 */
const RULES = [
  // Icons are already tiny and get inlined by Vite. Leave them alone.
  { match: /^img\/(path_|ele_)/i, kind: 'skip' },

  // Gameplay screenshots in the media rail (rendered at 800px, aspect-video).
  { match: /^img\/game[_-]?img/i, kind: 'image', format: 'webp', width: 1600, quality: 80 },

  // World panels in the accordion gallery (500px tall, ~700px when expanded).
  {
    match: /^img\/(hss1|jarilo|luofu|penacony|ampho|palacardia)\.png$/i,
    kind: 'image',
    format: 'webp',
    width: 1400,
    quality: 80,
  },

  // Character splash art: 2048px squares rendered at ~450px in a card and
  // ~900px in the overlay.
  { match: /^img\/.+_full\.webp$/i, kind: 'image', format: 'webp', width: 900, quality: 82 },

  { match: /^img\/hero_bg\.jpg$/i, kind: 'image', format: 'jpeg', width: 1920, quality: 80 },
  { match: /^img\/tumbal\.jpg$/i, kind: 'image', format: 'jpeg', width: 1400, quality: 80 },
  { match: /^img\/(news|newsmain)/i, kind: 'image', format: 'jpeg', width: 1600, quality: 78 },
  { match: /^img\/foooter-bg-img\.webp$/i, kind: 'image', format: 'webp', width: 1200, quality: 80 },
  { match: /^img\/logo\.png$/i, kind: 'image', format: 'webp', width: 400, quality: 90 },

  // Muted, looping, never larger than ~800px on screen.
  { match: /^vid\/.+\.(mp4|mov|webm)$/i, kind: 'video', width: 1280, crf: 26, preset: 'slow' },

  // Anything else that is still an image.
  { match: /^img\/.+\.(png|jpe?g|webp)$/i, kind: 'image', format: 'webp', width: 1600, quality: 80 },
]

const EXTENSION_BY_FORMAT = { webp: '.webp', jpeg: '.jpg' }

const parseArgs = (argv) => {
  const options = {
    dryRun: false,
    restore: false,
    help: false,
    updateImports: true,
    force: false,
    only: null,
    filter: null,
  }

  for (const arg of argv) {
    if (arg === '--dry-run' || arg === '-n') options.dryRun = true
    else if (arg === '--restore') options.restore = true
    else if (arg === '--help' || arg === '-h') options.help = true
    else if (arg === '--no-update-imports') options.updateImports = false
    else if (arg === '--force') options.force = true
    else if (arg.startsWith('--only=')) options.only = arg.slice('--only='.length)
    else if (arg.startsWith('--filter=')) options.filter = arg.slice('--filter='.length)
    else throw new Error(`Unknown argument: ${arg}`)
  }

  if (options.only && !MEDIA_DIRS.includes(options.only)) {
    throw new Error(`--only must be one of: ${MEDIA_DIRS.join(', ')}`)
  }

  return options
}

const HELP = `Compress the media under src/assets.

  --dry-run, -n         Measure the savings without writing anything.
  --only=img|vid        Restrict to one media folder.
  --filter=<substring>  Restrict to paths containing this substring.
  --no-update-imports   Skip rewriting import paths for renamed files.
  --force               Write even when the result would be larger.
  --restore             Copy assets-original/ back over src/assets.
  --help, -h            Show this.

Originals are copied to assets-original/ on the first run and are reused as the
encode source afterwards, so re-running is safe.`

const formatSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} kB`

const formatDelta = (before, after) => {
  if (before === 0) return '0%'

  const change = Math.round((1 - after / before) * 100)
  return change >= 0 ? `-${change}%` : `+${Math.abs(change)}%`
}

const padEnd = (value, width) => String(value).padEnd(width, ' ')
const padStart = (value, width) => String(value).padStart(width, ' ')

const mapPool = async (items, limit, worker) => {
  const results = []
  let cursor = 0

  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await worker(items[index])
    }
  })

  await Promise.all(runners)
  return results
}

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      return entry.isDirectory() ? walk(full) : [full]
    }),
  )

  return nested.flat()
}

const toPosix = (value) => value.split(path.sep).join('/')

const ruleFor = (relativePath) => RULES.find((rule) => rule.match.test(relativePath)) ?? null

const hasBinary = async (binary) => {
  try {
    await execFileAsync(binary, ['-version'])
    return true
  } catch {
    return false
  }
}

const loadSharp = async () => {
  try {
    const module = await import('sharp')
    return module.default
  } catch {
    throw new Error('sharp is not installed. Run: npm install')
  }
}

const encodeImage = async (sharp, sourcePath, rule) => {
  const image = sharp(sourcePath, { failOn: 'error' }).rotate()
  const metadata = await image.metadata()

  const resized =
    metadata.width && metadata.width > rule.width
      ? image.resize({ width: rule.width, withoutEnlargement: true, fit: 'inside' })
      : image

  if (rule.format === 'webp') {
    return resized.webp({ quality: rule.quality, effort: 5 }).toBuffer()
  }

  return resized.jpeg({ quality: rule.quality, mozjpeg: true, progressive: true }).toBuffer()
}

const probeVideoWidth = async (sourcePath) => {
  try {
    const { stdout } = await execFileAsync('ffprobe', [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width',
      '-of',
      'csv=p=0',
      sourcePath,
    ])

    const width = Number.parseInt(stdout.trim().split(/\r?\n/)[0] ?? '', 10)
    return Number.isFinite(width) ? width : null
  } catch {
    return null
  }
}

const encodeVideo = async (sourcePath, targetPath, rule) => {
  const sourceWidth = await probeVideoWidth(sourcePath)
  const needsScaling = sourceWidth === null || sourceWidth > rule.width

  const args = [
    '-y',
    '-i',
    sourcePath,
    ...(needsScaling ? ['-vf', `scale=${rule.width}:-2:flags=lanczos`] : []),
    '-c:v',
    'libx264',
    '-crf',
    String(rule.crf),
    '-preset',
    rule.preset,
    '-pix_fmt',
    'yuv420p',
    // The players are muted, so the audio track is pure overhead.
    '-an',
    // Lets playback start before the whole file has arrived.
    '-movflags',
    '+faststart',
    targetPath,
  ]

  await execFileAsync('ffmpeg', args, { maxBuffer: 64 * 1024 * 1024 })
}

/** Returns the path to read from, copying the pristine file aside on first run. */
const resolveSource = async (absolutePath, relativePath, dryRun) => {
  const backupPath = path.join(BACKUP_DIR, relativePath)

  if (existsSync(backupPath)) return backupPath
  if (dryRun) return absolutePath

  await mkdir(path.dirname(backupPath), { recursive: true })
  await copyFile(absolutePath, backupPath)

  return backupPath
}

const processFile = async ({ sharp, absolutePath, relativePath, rule, dryRun, force }) => {
  const before = (await stat(absolutePath)).size
  const sourcePath = await resolveSource(absolutePath, relativePath, dryRun)

  const targetExtension =
    rule.kind === 'image' ? EXTENSION_BY_FORMAT[rule.format] : path.extname(absolutePath)
  const currentExtension = path.extname(absolutePath)
  const renamed = targetExtension.toLowerCase() !== currentExtension.toLowerCase()
  const targetPath = renamed
    ? path.join(
        path.dirname(absolutePath),
        `${path.basename(absolutePath, currentExtension)}${targetExtension}`,
      )
    : absolutePath

  if (rule.kind === 'image') {
    const buffer = await encodeImage(sharp, sourcePath, rule)
    // Assets already at or below the target width re-encode larger. Leave them.
    const keep = buffer.byteLength >= before && !force

    if (keep) {
      return { relativePath, before, after: before, renamed: null, kept: true }
    }

    if (dryRun) {
      return {
        relativePath,
        before,
        after: buffer.byteLength,
        renamed: renamed ? targetPath : null,
        kept: false,
      }
    }

    const temporaryPath = `${targetPath}.tmp`
    await writeFile(temporaryPath, buffer)
    await rename(temporaryPath, targetPath)

    if (renamed) await rm(absolutePath, { force: true })

    return {
      relativePath,
      before,
      after: buffer.byteLength,
      renamed: renamed ? targetPath : null,
      kept: false,
    }
  }

  // Video: ffmpeg needs a real file to write to, so measure through a temp file.
  const temporaryPath = dryRun
    ? path.join(os.tmpdir(), `hsr-compress-${Date.now()}-${path.basename(targetPath)}`)
    : `${targetPath}.tmp${path.extname(targetPath)}`

  await encodeVideo(sourcePath, temporaryPath, rule)
  const after = (await stat(temporaryPath)).size
  const keep = after >= before && !force

  if (dryRun || keep) {
    await rm(temporaryPath, { force: true })
    return { relativePath, before, after: keep ? before : after, renamed: null, kept: keep }
  }

  await rename(temporaryPath, targetPath)
  if (renamed) await rm(absolutePath, { force: true })

  return { relativePath, before, after, renamed: renamed ? targetPath : null, kept: false }
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const updateImports = async (renames) => {
  if (renames.length === 0) return []

  const files = (await walk(SOURCE_DIR)).filter((file) =>
    SOURCE_EXTENSIONS.has(path.extname(file).toLowerCase()),
  )

  const touched = []

  for (const file of files) {
    const original = await readFile(file, 'utf8')
    let updated = original

    for (const { from, to } of renames) {
      updated = updated.replace(new RegExp(escapeRegExp(from), 'g'), to)
    }

    if (updated !== original) {
      await writeFile(file, updated)
      touched.push(path.relative(ROOT, file))
    }
  }

  return touched
}

const restore = async () => {
  if (!existsSync(BACKUP_DIR)) {
    console.error(`Nothing to restore: ${path.relative(ROOT, BACKUP_DIR)} does not exist.`)
    process.exitCode = 1
    return
  }

  const files = await walk(BACKUP_DIR)

  for (const file of files) {
    const relativePath = toPosix(path.relative(BACKUP_DIR, file))
    const target = path.join(ASSETS_DIR, relativePath)

    await mkdir(path.dirname(target), { recursive: true })
    await copyFile(file, target)

    console.log(`restored  ${relativePath}`)
  }

  console.log(
    `\nRestored ${files.length} file(s). Converted copies (the .webp sitting next to a recovered .png) are still on disk, and import paths were not reverted. Use "git checkout src" if you want those back too.`,
  )
}

const run = async () => {
  let options

  try {
    options = parseArgs(process.argv.slice(2))
  } catch (error) {
    console.error(error.message)
    console.error(`\n${HELP}`)
    process.exitCode = 1
    return
  }

  if (options.help) {
    console.log(HELP)
    return
  }

  if (options.restore) {
    await restore()
    return
  }

  const directories = MEDIA_DIRS.filter((dir) => !options.only || dir === options.only)
    .map((dir) => path.join(ASSETS_DIR, dir))
    .filter((dir) => existsSync(dir))

  const candidates = []

  for (const directory of directories) {
    for (const absolutePath of await walk(directory)) {
      const relativePath = toPosix(path.relative(ASSETS_DIR, absolutePath))
      if (options.filter && !relativePath.includes(options.filter)) continue

      const rule = ruleFor(relativePath)
      if (!rule || rule.kind === 'skip') continue

      candidates.push({ absolutePath, relativePath, rule })
    }
  }

  if (candidates.length === 0) {
    console.log('Nothing matched. Check --only / --filter, or the RULES table.')
    return
  }

  const images = candidates.filter((item) => item.rule.kind === 'image')
  const videos = candidates.filter((item) => item.rule.kind === 'video')

  const sharp = images.length > 0 ? await loadSharp() : null

  if (videos.length > 0 && !(await hasBinary('ffmpeg'))) {
    throw new Error('ffmpeg was not found on PATH. Install it, or pass --only=img.')
  }

  console.log(
    `${options.dryRun ? 'Measuring' : 'Compressing'} ${images.length} image(s) and ${videos.length} video(s)` +
      `${options.dryRun ? ' (nothing will be written)' : ''}.`,
  )

  if (options.dryRun && videos.length > 0) {
    console.log('Videos are encoded to a temp file to get real numbers, so this takes a while.\n')
  }

  const results = []
  const failures = []

  const handle = async (item) => {
    try {
      const result = await processFile({
        sharp,
        absolutePath: item.absolutePath,
        relativePath: item.relativePath,
        rule: item.rule,
        dryRun: options.dryRun,
        force: options.force,
      })

      results.push(result)
      console.log(
        `${padEnd(result.relativePath, 44)} ${padStart(formatSize(result.before), 10)} -> ` +
          `${padStart(formatSize(result.after), 10)}  ${padStart(formatDelta(result.before, result.after), 6)}` +
          `${result.kept ? '  kept (no gain)' : ''}` +
          `${result.renamed ? `  (now ${path.basename(result.renamed)})` : ''}`,
      )
    } catch (error) {
      failures.push({ relativePath: item.relativePath, message: error.message })
      console.error(`${padEnd(item.relativePath, 44)} FAILED: ${error.message}`)
    }
  }

  await mapPool(images, IMAGE_CONCURRENCY, handle)

  // One at a time: x264 already saturates the CPU.
  for (const video of videos) await handle(video)

  const before = results.reduce((total, result) => total + result.before, 0)
  const after = results.reduce((total, result) => total + result.after, 0)

  console.log(
    `\n${results.length} file(s): ${formatSize(before)} -> ${formatSize(after)} ` +
      `(${formatDelta(before, after)}, saved ${formatSize(before - after)})`,
  )

  const kept = results.filter((result) => result.kept).length

  if (kept > 0) {
    console.log(`${kept} file(s) left untouched: re-encoding would not shrink them. Use --force to override.`)
  }

  const renames = results
    .filter((result) => result.renamed)
    .map((result) => ({
      from: result.relativePath,
      to: toPosix(path.relative(ASSETS_DIR, result.renamed)),
    }))

  if (options.dryRun) {
    if (renames.length > 0) {
      console.log(
        `\n${renames.length} file(s) would be renamed, e.g. ${renames[0].from} -> ${renames[0].to}`,
      )
    }
    console.log('\nDry run: no files changed. Drop --dry-run to apply.')
  } else {
    console.log(`\nOriginals kept in ${path.relative(ROOT, BACKUP_DIR)}/ (gitignored).`)

    if (renames.length > 0 && options.updateImports) {
      const touched = await updateImports(renames)
      console.log(
        touched.length > 0
          ? `Updated import paths in: ${touched.join(', ')}`
          : 'No import paths needed updating.',
      )
    } else if (renames.length > 0) {
      console.log('Renamed files (imports NOT updated):')
      renames.forEach(({ from, to }) => console.log(`  ${from} -> ${to}`))
    }

    console.log('\nNext: npm run build')
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} file(s) failed.`)
    process.exitCode = 1
  }
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
