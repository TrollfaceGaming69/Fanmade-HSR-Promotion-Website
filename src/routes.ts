/**
 * Single source of truth for the site's routes.
 * Nav, Footer and the router all read from here so links can never drift
 * out of sync with the actual route definitions.
 */
export const ROUTES = {
  home: '/',
  gameplay: '/gameplay',
  characters: '/characters',
  news: '/news',
  faq: '/faq',
} as const

export type NavItem = {
  label: string
  to: string
}

/** Primary navigation shown in the header. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', to: ROUTES.home },
  { label: 'GAMEPLAY', to: ROUTES.gameplay },
  { label: 'CHARACTERS', to: ROUTES.characters },
  { label: 'NEWS', to: ROUTES.news },
  { label: 'FAQ', to: ROUTES.faq },
]

/** Navigation column in the footer. */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: 'Gameplay', to: ROUTES.gameplay },
  { label: 'Characters', to: ROUTES.characters },
  { label: 'News', to: ROUTES.news },
  { label: 'FAQ', to: ROUTES.faq },
]
