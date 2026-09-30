import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const filled = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
  focusable: 'false' as const,
  ...props,
})

const outlined = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
  ...props,
})

export const WindowsIcon = (props: IconProps) => (
  <svg {...filled(props)}>
    <path d="M3 4.7 10.7 3.6v7.6H3zM12.1 3.4 21 2.1v9.1h-8.9zM3 12.8h7.7v7.6L3 19.3zM12.1 12.8H21v9.1l-8.9-1.3z" />
  </svg>
)

export const PlayStoreIcon = (props: IconProps) => (
  <svg {...filled(props)}>
    <path d="M5.1 3.2c0-1 1.1-1.6 1.9-1L19.4 11c.7.5.7 1.5 0 2L7 21.8c-.8.6-1.9 0-1.9-1z" />
  </svg>
)

export const AppleIcon = (props: IconProps) => (
  <svg {...filled(props)}>
    <path d="M16.6 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.4.8-3 .8s-1.6-.7-2.6-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.2 1 8.2.7 1 1.5 2.1 2.6 2.1s1.4-.7 2.7-.7 1.6.7 2.7.7 1.8-1 2.5-2c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-1-2.4-3.3z" />
    <path d="M14.5 6.2c.6-.7.9-1.7.8-2.7-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.8 2.6 1 .1 2-.5 2.5-1.2z" />
  </svg>
)

export const XboxIcon = (props: IconProps) => (
  <svg {...outlined(props)}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M6.9 5.2c3.4 2.9 6.7 9.2 8.4 13.7M17.1 5.2c-3.4 2.9-6.7 9.2-8.4 13.7" />
  </svg>
)

export const PlayStationIcon = (props: IconProps) => (
  <svg {...outlined(props)} strokeWidth={2.2}>
    <path d="M6.3 3.6 8.8 7.9H3.8z" />
    <circle cx="17.6" cy="5.8" r="2.3" />
    <path d="m4.3 15.6 4.1 4.1M8.4 15.6l-4.1 4.1" />
    <rect x="14.9" y="15.2" width="4.8" height="4.8" rx=".8" />
  </svg>
)

export const EpicGamesIcon = (props: IconProps) => (
  <svg {...outlined(props)}>
    <path d="M4.8 4.3c0-.8.6-1.5 1.5-1.5h11.4c.9 0 1.5.7 1.5 1.5v9.8c0 .7-.3 1.3-.8 1.7l-4.9 4.2c-.9.7-2.1.7-3 0l-4.9-4.2c-.5-.4-.8-1-.8-1.7z" />
    <path d="M14.5 7.7H9.6v8.1h4.9M9.6 11.8h3.5" />
  </svg>
)

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...outlined(props)} strokeWidth={3}>
    <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />
  </svg>
)
