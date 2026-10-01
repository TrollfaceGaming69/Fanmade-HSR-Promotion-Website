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

export const FOOTER_NAV_ITEMS: FooterNavItem[] = [
  { key: 'gameplay', to: ROUTES.gameplay },
  { key: 'characters', to: ROUTES.characters },
  { key: 'news', to: ROUTES.news },
  { key: 'faq', to: ROUTES.faq },
]
