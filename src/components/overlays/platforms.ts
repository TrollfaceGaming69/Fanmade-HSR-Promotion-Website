import type { ComponentType, SVGProps } from 'react'
import {
  AppleIcon,
  EpicGamesIcon,
  PlayStationIcon,
  PlayStoreIcon,
  WindowsIcon,
  XboxIcon,
} from './platformIcons'

export type Platform = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Shared by the hover panel (DownloadOvl) and the mobile nav menu. */
export const PLATFORMS: Platform[] = [
  { label: 'PC', href: 'https://hsr.hoyoverse.com/en-us/download', Icon: WindowsIcon },
  {
    label: 'Play Store',
    href: 'https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea',
    Icon: PlayStoreIcon,
  },
  {
    label: 'App Store',
    href: 'https://apps.apple.com/us/app/honkai-star-rail/id1599719154',
    Icon: AppleIcon,
  },
  { label: 'Xbox', href: 'https://hsr.hoyoverse.com/en-us/download', Icon: XboxIcon },
  { label: 'PlayStation', href: 'https://hsr.hoyoverse.com/en-us/download', Icon: PlayStationIcon },
  {
    label: 'Epic Games',
    href: 'https://store.epicgames.com/en-US/p/honkai-star-rail',
    Icon: EpicGamesIcon,
  },
]
