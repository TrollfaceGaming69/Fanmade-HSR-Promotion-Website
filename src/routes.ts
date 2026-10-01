/**
 * Single source of truth for the site's routes.
 * Nav, Footer and the router all read from here so links can never drift
 * out of sync with the actual route definitions.
 *
 * Labels are not stored here: they live in src/i18n/strings.ts and are looked up
 * by `key`, so every menu follows the selected language.
 */
export const ROUTES = {
  home: '/',
  gameplay: '/gameplay',
  characters: '/characters',
  news: '/news',
  faq: '/faq',
} as const

export type NavKey = 'home' | 'gameplay' | 'characters' | 'news' | 'faq'

export type FooterNavKey = Exclude<NavKey, 'home'>

export type NavItem = {
  key: NavKey
  to: string
}

/** Primary navigation shown in the header. */
export const NAV_ITEMS: NavItem[] = [
  { key: 'home', to: ROUTES.home },
  { key: 'gameplay', to: ROUTES.gameplay },
  { key: 'characters', to: ROUTES.characters },
  { key: 'news', to: ROUTES.news },
  { key: 'faq', to: ROUTES.faq },
]

export type FooterNavItem = {
  key: FooterNavKey
  to: string
}

/** Navigation column in the footer. */
export const FOOTER_NAV_ITEMS: FooterNavItem[] = [
  { key: 'gameplay', to: ROUTES.gameplay },
  { key: 'characters', to: ROUTES.characters },
  { key: 'news', to: ROUTES.news },
  { key: 'faq', to: ROUTES.faq },
]
