# Fanmade Honkai: Star Rail Promotion Website

A fan-made recreation of the *Honkai: Star Rail* promotional site, built as a project for web development competition using
with React 19, TypeScript, Tailwind CSS v4 and GSAP.

It is a single-page application with five routes: a landing page that walks through the game, plus
dedicated Gameplay, Characters, News and FAQ pages. Everything is static — no backend, no API calls,
no database. All copy, images and clips are bundled with the app.

> **Disclaimer.** This is an unofficial fan project with no affiliation to HoYoverse or COGNOSPHERE.
> *Honkai: Star Rail*, its characters, artwork, video and audio are the property of their respective
> owners and are used here for non-commercial, educational purposes only. The code in this repository
> is original work; the game assets are not.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [npm scripts](#npm-scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
  - [Routing and layout](#routing-and-layout)
  - [The scroll container](#the-scroll-container)
  - [Scroll-reveal animations](#scroll-reveal-animations)
  - [Hero expand animation](#hero-expand-animation)
  - [Video playback](#video-playback)
  - [Character explorer](#character-explorer)
  - [Assets](#assets)
  - [Theme and styling](#theme-and-styling)
  - [Responsive strategy](#responsive-strategy)
- [Media compression pipeline](#media-compression-pipeline)
- [Common tasks](#common-tasks)
- [Deployment](#deployment)
- [Conventions and gotchas](#conventions-and-gotchas)
- [Known issues](#known-issues)
- [Credits](#credits)

---

## Features

| Page | Route | What's on it |
| --- | --- | --- |
| Home | `/` | Scroll-expanding hero, game intro, media rail (screenshots + clips), worlds accordion, character cards with a detail modal, download CTA |
| Gameplay | `/gameplay` | Five feature rows, each with a looping clip and copy |
| Characters | `/characters` | Roster explorer: pick a Path, browse its members, read their story and quote |
| News | `/news` | Two featured articles plus a grid of recent posts |
| FAQ | `/faq` | Q&A list and PC / mobile system requirement tables |
| Not found | `*` | 404 fallback with a link home |

Cross-cutting behaviour:

- Sticky header that shrinks once you scroll past the top, with a hamburger menu below `lg`
- Download menus that list every platform (PC, Play Store, App Store, Xbox, PlayStation, Epic)
- GSAP scroll reveals on every section, all gated behind `prefers-reduced-motion`
- Keyboard-accessible tabs, rails and modals (focus trap, Escape to close, visible focus rings)
- Off-screen videos are paused so five clips on one page don't fight for bandwidth

## Tech stack

| Concern | Choice |
| --- | --- |
| UI | React 19 + TypeScript |
| Build tool | Vite 8 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — the theme lives in CSS) |
| Routing | React Router 7 (`BrowserRouter`) |
| Animation | GSAP 3 + ScrollTrigger |
| Icons / fonts | Inline SVG, `lucide-react`, Poppins + Manrope (Google Fonts), Geist Variable (`@fontsource-variable/geist`) |
| Linting | ESLint 10 flat config, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Media tooling | `sharp` (images) and `ffmpeg` (video), used by a local script only |

## Getting started

### Prerequisites

- **Node.js `^20.19.0` or `>=22.12.0`** — required by Vite 8. Check with `node -v`.
- **npm** (ships with Node). Any other package manager works, but only `package-lock.json` is committed.
- **Git**
- **ffmpeg** — optional, only needed if you re-run the video half of the media compressor.

### Fork or clone

To contribute back, fork the repo on GitHub first, then clone your fork:

```bash
git clone https://github.com/<your-username>/Fanmade-HSR-Promotion-Website.git
cd Fanmade-HSR-Promotion-Website
```

To just run it locally, clone the original:

```bash
git clone https://github.com/TrollfaceGaming69/Fanmade-HSR-Promotion-Website.git
cd Fanmade-HSR-Promotion-Website
```

### Install and run

```bash
npm install     # installs dependencies (sharp downloads a prebuilt binary here)
npm run dev     # starts Vite on http://localhost:5173
```

The dev server prints the local URL and supports hot module replacement. Stop it with `Ctrl+C`.

### Production build

```bash
npm run build     # type-checks with tsc -b, then bundles into dist/
npm run preview   # serves dist/ locally so you can check the real build
```

`dist/` is gitignored. The bundle is media-heavy (the five gameplay clips alone are ~50 MB), so
expect a large output directory.

## npm scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b` (type-check, no emit) followed by `vite build` |
| `npm run preview` | Serve the built `dist/` folder |
| `npm run lint` | ESLint across the repo |
| `npm run compress:media:dry` | Report how much the media under `src/assets` could shrink, writing nothing |
| `npm run compress:media` | Actually compress it (see [Media compression pipeline](#media-compression-pipeline)) |

## Project structure

```
.
├── index.html                  # Vite entry document (viewport meta, #root)
├── vite.config.ts              # react + tailwind plugins, nothing else
├── tsconfig.json               # project references → app + node configs
├── tsconfig.app.json           # src/ + lib/, strict-ish, noUnusedLocals
├── eslint.config.js            # flat config
├── components.json             # shadcn CLI settings (see gotchas)
├── scripts/
│   └── compress-media.mjs      # one-off image/video compressor
├── assets-original/            # pristine media, gitignored, created by the script
├── public/                     # copied verbatim to the site root (favicon)
├── lib/
│   └── utils.ts                # re-exports `cn` from the `cn` package (unused so far)
└── src/
    ├── main.tsx                # createRoot + BrowserRouter
    ├── App.tsx                 # <Routes> tree
    ├── routes.ts               # ROUTES / NAV_ITEMS / FOOTER_NAV_ITEMS
    ├── index.css               # Tailwind import, @theme tokens, base styles
    ├── layouts/
    │   └── RootLayout.tsx      # scroll container + Nav + <Outlet /> + Footer
    ├── pages/
    │   ├── Home.tsx            # composes the landing sections
    │   ├── Gameplaypage.tsx
    │   ├── CharacterPage.tsx
    │   ├── NewsPage.tsx
    │   ├── Faq.tsx
    │   └── NotFound.tsx
    ├── components/
    │   ├── Nav.tsx             # sticky header + mobile menu
    │   ├── Hero.tsx            # wraps ScrollExpand
    │   ├── Intro.tsx
    │   ├── Media.tsx           # screenshots / clips tabbed rail
    │   ├── Worlds.tsx          # accordion on tablet+, card list on phones
    │   ├── Characters.tsx      # home-page character grid
    │   ├── Promotion.tsx       # download CTA panel
    │   ├── SystemRequirements.tsx
    │   ├── Footer.tsx
    │   ├── characterPage/      # roster explorer (see below)
    │   │   ├── CharacterExplorer.tsx
    │   │   ├── PathSelector.tsx
    │   │   ├── CharacterShowcase.tsx
    │   │   ├── CharacterRail.tsx
    │   │   ├── characterRoster.ts   # groups the roster by Path
    │   │   └── scrollTrack.ts       # GSAP-tweened horizontal scrolling
    │   ├── gameplayPage/
    │   │   └── GameplayFeature.tsx
    │   └── overlays/
    │       ├── CharacterOvl.tsx     # character modal (focus trap)
    │       ├── DownloadOvl.tsx      # hover/focus download panel
    │       ├── platforms.ts         # shared platform list
    │       └── platformIcons.tsx    # inline SVG icons
    ├── animatedcomponents/
    │   ├── ScrollExpand.tsx    # hero clip-path expansion
    │   └── AccordionGallery.tsx# the worlds accordion
    ├── animations/
    │   └── sectionReveal.ts    # shared GSAP reveal helpers
    ├── hooks/
    │   └── useMediaQuery.ts    # breakpoint as a value, not a class
    └── assets/
        ├── assets.ts           # every image/video import + all page data
        ├── icons/              # standalone SVGs
        ├── img/                # shipped images
        └── vid/                # shipped clips
```

## How it works

### Routing and layout

`main.tsx` mounts `<App />` inside a `BrowserRouter`. `App.tsx` declares one parent route rendering
`RootLayout`, with every page nested inside it:

```tsx
<Routes>
  <Route element={<RootLayout />}>
    <Route path={ROUTES.home} element={<Home />} />
    <Route path={ROUTES.gameplay} element={<Gameplaypage />} />
    ...
    <Route path='*' element={<NotFound />} />
  </Route>
</Routes>
```

`RootLayout` owns the chrome — the scroll container, `<Nav />`, `<main><Outlet /></main>` and
`<Footer />` — so pages only contain their own content. Never render `Nav` or `Footer` inside a page;
you would get two of each.

`src/routes.ts` is the single source of truth for paths. `ROUTES` holds the URLs, `NAV_ITEMS` drives
the header, `FOOTER_NAV_ITEMS` drives the footer column. Add a route there and both menus pick it up.
Header links use `NavLink`, so the active page keeps its highlight automatically.

### The scroll container

The page does **not** scroll on `<body>`. `RootLayout` renders a `h-svh overflow-y-auto` div and
everything scrolls inside that element. This is worth knowing because it changes three things:

1. React Router's scroll restoration does not apply, so `RootLayout` resets `scrollTop` on every
   `pathname` change.
2. ScrollTrigger needs that element passed as its `scroller`. `findScroller()` in
   `animations/sectionReveal.ts` walks up the DOM to locate it.
3. Anything measuring scroll position (the sticky-nav sentinel, `IntersectionObserver` roots) has to
   use that element rather than the viewport.

`h-svh` (small viewport height) is used instead of `h-screen` so mobile browsers don't resize the
container when their URL bar hides.

### Scroll-reveal animations

`animations/sectionReveal.ts` wraps the repetitive GSAP setup:

- `createSectionReveal(root, build)` — registers the animations inside a `gsap.matchMedia()` block
  scoped to `(prefers-reduced-motion: no-preference)` and a `gsap.context()` scoped to `root`.
  Returning it straight out of `useLayoutEffect` cleans everything up on unmount. It also refreshes
  ScrollTrigger once late-loading images settle, so trigger positions stay correct.
- `revealOnScroll(targets, scroller, options)` — a `fromTo` with sensible defaults
  (`autoAlpha: 0, y: 40` → visible) and `start: 'clamp(top 80%)'`, firing once.
- `startsInView(element, scroller)` — anything already above the reveal line at mount plays
  immediately instead of waiting for a scroll that may never come. This matters because routes always
  mount at scroll 0.

Components mark their animated parts with `data-*` attributes (`data-intro-heading`,
`data-character-card`, `data-gameplay-row`, …) and query them inside the effect, which keeps the JSX
free of refs. **If you rename or remove one of those attributes, the matching animation silently
stops running.**

### Hero expand animation

`animatedcomponents/ScrollExpand.tsx` is self-contained: it creates its own tall internal scroll
track and maps scroll progress onto a `clip-path: inset(...)` so the hero image grows from a framed
card to full bleed, while the title fades out and the overlay content fades in. Once progress hits
1 it calls `onComplete`; `Hero.tsx` uses that to disable the effect and smooth-scroll down to
`#intro`, so the animation only plays once per visit.

### Video playback

Both `Media.tsx` (clips tab) and `GameplayFeature.tsx` attach an `IntersectionObserver` — rooted at
the scroll container, or the horizontal rail in Media's case — and call `play()` / `pause()` as clips
enter and leave view. Every `<video>` is `muted`, `loop`, `playsInline` and `preload="metadata"`.

### Character explorer

`/characters` is composed of four pieces:

- `characterRoster.ts` merges `trailblazers` and `characters` from `assets.ts`, groups them by Path
  (stripping the leading "The "), sorts the groups in canonical Path order and attaches each Path's
  emblem.
- `PathSelector.tsx` — a horizontal, arrow-key-navigable tablist of Paths. It tracks its own overflow
  state to enable/disable the paging arrows.
- `CharacterShowcase.tsx` — the active character's art, story (clamped to five lines with a
  Read more toggle) and quote, re-animated whenever the selection changes.
- `CharacterRail.tsx` — thumbnails for the current Path; the active card auto-centres itself.

`scrollTrack.ts` performs the horizontal scrolling by tweening a proxy object with GSAP, falling back
to an instant jump under reduced motion.

### Assets

Every image and video is imported through `src/assets/assets.ts`, which re-exports them as grouped
objects (`assets`, `media`, `worlds`, `newsMedia`, `elementIcons`, `pathIcons`, `shortvideo`). Page
copy lives there too — `trailblazers`, `characters` and `gameplay` are typed data arrays. Importing
media through Vite (rather than referencing `/public`) means content hashing and build-time
optimisation; only the favicon lives in `public/`.

### Theme and styling

Tailwind v4 is configured entirely in `src/index.css`. The palette is declared with `@theme`, which
turns each entry into a utility:

| Token | Value | Usage |
| --- | --- | --- |
| `--color-background` | `#121212` | `bg-background` |
| `--color-primary` | `#DF8E23` | `text-primary`, `border-primary` |
| `--color-text` | `#FFFFFF` | `text-text` |
| `--color-label` | `#DBBF91` | `text-label` |
| `--color-container-fill` | `#242424` | `bg-container-fill` |
| `--color-button-fill` | `#FFF8EB` | `bg-button-fill` |

There is also a `no-scrollbar` utility (`@utility`) for the horizontal rails, and the shadcn CSS
variable block is present for future component installs.

### Responsive strategy

Default Tailwind breakpoints, used as a mobile-first ladder:

| Prefix | Min width | Typical target |
| --- | --- | --- |
| *(none)* | 0 | phones |
| `sm:` | 640px | large phones / small tablets |
| `md:` | 768px | tablets |
| `lg:` | 1024px | laptops — the layout switches from stacked to side-by-side here |
| `xl:` | 1280px | desktops |
| `2xl:` | 1536px | wide desktops |

Rules of thumb used throughout:

- Headings step `text-3xl sm:text-4xl lg:text-5xl`; body copy starts at `text-base`.
- Horizontal rails use viewport-relative widths (`w-[85vw] sm:w-[70vw] … xl:w-200`) so a slide always
  fits the screen it is on.
- Multi-column grids always declare `grid-cols-1` first.
- Fixed pixel widths need a `max-w-*` guard or a responsive prefix, otherwise they overflow small
  screens.
- One exception to class-based breakpoints: `Worlds.tsx` needs the breakpoint as a *value* (the
  accordion takes a numeric `height` prop and cannot fit six panels on a phone), so it uses the
  `useMediaQuery` hook and swaps to a stacked card list under 640px.

## Media compression pipeline

`scripts/compress-media.mjs` shrinks everything under `src/assets/img` and `src/assets/vid`. Images
go through `sharp`, videos through `ffmpeg`. A `RULES` table near the top of the file maps path
patterns to target format, max width and quality, sized at roughly 2× the largest on-screen size of
each asset. Path and element icons are skipped.

```bash
npm run compress:media:dry              # measure only, write nothing
npm run compress:media                  # compress in place
node scripts/compress-media.mjs --only=img        # skip ffmpeg
node scripts/compress-media.mjs --filter=news     # only paths containing "news"
node scripts/compress-media.mjs --restore         # copy assets-original/ back
node scripts/compress-media.mjs --help
```

Two things to know:

- On its first run the script copies each untouched file to `assets-original/` and always encodes
  from there, so repeated runs never stack lossy generations. That folder is **gitignored**, which
  means a fresh clone has no pristine copies — the first run on a new machine will treat the
  already-compressed files as the originals. Use `git` history if you need the real source files.
- When a file changes extension (`.png` → `.webp`) the script renames it and rewrites the matching
  import paths under `src/`. Pass `--no-update-imports` to opt out.

## Common tasks

**Add a page**

1. Create `src/pages/MyPage.tsx`.
2. Add the path to `ROUTES` in `src/routes.ts`, plus an entry in `NAV_ITEMS` / `FOOTER_NAV_ITEMS` if
   it belongs in the menus.
3. Register a `<Route>` in `App.tsx` inside the `RootLayout` route.

Nav, footer and the 404 fallback then work with no further changes.

**Add a character**

Append an entry to `characters` in `src/assets/assets.ts` (import the art at the top of the file).
Its `element` must be one of the `ElementName` values and `path` must match a Path name, so the
roster grouping and element icon resolve. The home-page grid reads from `trailblazers`; the
`/characters` explorer reads from both arrays.

**Add a gameplay feature or news post**

Gameplay rows come from the `gameplay` array in `assets.ts`. News cards are still literal markup in
`src/pages/NewsPage.tsx` — copy an existing block and keep the `data-news-card` attribute so the
reveal animation picks it up.

**Change a colour**

Edit the `@theme` block in `src/index.css`. Every `*-primary`, `*-label` etc. utility follows.

## Deployment

`npm run build` produces a fully static `dist/`. Any static host works (GitHub Pages, Netlify,
Vercel, Cloudflare Pages, S3, nginx).

Because the app uses `BrowserRouter`, the host must serve `index.html` for unknown paths, otherwise a
hard refresh on `/characters` returns 404:

- **Netlify** — add `public/_redirects` containing `/* /index.html 200`
- **Vercel** — add a rewrite of `/(.*)` to `/index.html`
- **nginx** — `try_files $uri $uri/ /index.html;`
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html`, or switch to `HashRouter`

If you deploy to a subpath (for example a project Pages site), set `base` in `vite.config.ts` and
pass a matching `basename` to `BrowserRouter`.

## Conventions and gotchas

- **Imports are relative.** `components.json` lists `@/…` aliases for the shadcn CLI, but no matching
  alias exists in `vite.config.ts` or `tsconfig.app.json`. Anything generated by that CLI needs its
  imports rewritten to relative paths, or the alias needs wiring up in both files first.
- **`tsc` is strict about unused code.** `noUnusedLocals` and `noUnusedParameters` are on, so a
  forgotten import fails `npm run build` even though `npm run dev` is happy.
- **Animations are opt-in per element** via `data-*` attributes; see
  [Scroll-reveal animations](#scroll-reveal-animations).
- **Respect reduced motion.** Every animation path already checks it — GSAP work goes inside
  `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, CSS transitions carry
  `motion-reduce:transition-none`. Keep that up in new code.
- **Accessibility basics are in place.** Tabs use `role="tab"` / `aria-selected`, the character modal
  traps focus and closes on Escape, decorative images use `alt=""`, and interactive elements have
  visible `focus-visible` rings. Please don't regress these.
- `lib/utils.ts` (a `cn` class-merging re-export) and `public/icons.svg` are not referenced anywhere
  yet. They are wired for shadcn components that haven't been added.

## Known issues

- `npm run lint` reports one pre-existing error: `ScrollExpand.tsx` assigns to a ref during render
  (`react-hooks/refs`). It works, but it is not idiomatic — the config mirror should move into an
  effect or a reducer.
- Shipped media is large and unresponsive: there are no `srcset` variants, so phones download the
  same images as desktops. The compressor helps, but per-breakpoint sizes would help more.
- "Read more" links on the news page and the social/legal links in the footer are placeholders
  (`href="#"` / `href=""`).
- The language switcher in the header is decorative; there is no i18n layer.

## Credits

- Game, artwork, video and audio: **HoYoverse / COGNOSPHERE**. Used here non-commercially for a
  learning project.
- `components.json` registers the [React Bits](https://reactbits.dev) registry alongside shadcn, which
  is where animated component scaffolding can be pulled from.
- Code: [@TrollfaceGaming69](https://github.com/TrollfaceGaming69).

No licence is attached to this repository. Because it bundles third-party game assets, please don't
redistribute it as your own or use it commercially.
