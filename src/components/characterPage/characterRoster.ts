import { characters, pathIcons, trailblazers } from '../../assets/assets'
import type { Character } from '../../assets/assets'

export type RosterEntry = Character & { id: string }

export type PathGroup = {
  name: string
  fullName: string
  icon?: string
  members: RosterEntry[]
}

const PATH_ORDER = [
  'Destruction',
  'Hunt',
  'Erudition',
  'Harmony',
  'Nihility',
  'Preservation',
  'Abundance',
  'Elation',
  'Remembrance',
] as const

const DEFAULT_PATH = 'Destruction'

const PATH_EMBLEMS: Record<string, string | undefined> = pathIcons

const bareName = (path: string) => path.replace(/^the\s+/i, '').trim()

const orderOf = (path: string) => {
  const index = PATH_ORDER.indexOf(path as (typeof PATH_ORDER)[number])
  return index === -1 ? PATH_ORDER.length : index
}

const roster: RosterEntry[] = [...trailblazers, ...characters].map((entry, index) => ({
  ...entry,
  id: `${index}-${entry.name.toLowerCase().replace(/\s+/g, '-')}`,
}))

export const pathGroups: PathGroup[] = (() => {
  const grouped = new Map<string, RosterEntry[]>()

  roster.forEach((entry) => {
    const name = bareName(entry.path)
    const members = grouped.get(name)

    if (members) members.push(entry)
    else grouped.set(name, [entry])
  })

  return Array.from(grouped, ([name, members]) => ({
    name,
    fullName: `The ${name}`,
    icon: PATH_EMBLEMS[`The ${name}`],
    members,
  })).sort(
    (a, b) => orderOf(a.name) - orderOf(b.name) || a.name.localeCompare(b.name),
  )
})()

export const DEFAULT_PATH_INDEX = Math.max(
  pathGroups.findIndex((group) => group.name === DEFAULT_PATH),
  0,
)
