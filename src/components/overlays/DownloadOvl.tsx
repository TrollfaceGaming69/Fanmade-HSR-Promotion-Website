import { ChevronRightIcon } from './platformIcons'
import { PLATFORMS } from './platforms'

type DownloadOvlProps = {
  placement?: 'top' | 'bottom'
  size?: 'sm' | 'md'
  className?: string
}

const PANEL_BASE =
  'pointer-events-none absolute left-0 z-40 w-full bg-button-fill text-background ' +
  'ring-1 ring-black/10 invisible opacity-0 ' +
  'transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none ' +
  'group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 ' +
  'group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0'

const PANEL_BY_PLACEMENT = {
  top: 'bottom-full translate-y-2 rounded-t-[10px] shadow-[0_-14px_34px_-12px_rgba(0,0,0,0.65)]',
  bottom: 'top-full -translate-y-2 rounded-b-[10px] shadow-[0_14px_34px_-12px_rgba(0,0,0,0.65)]',
} as const

const LIST_BY_SIZE = {
  sm: 'p-2 space-y-0.5',
  md: 'p-3 space-y-1',
} as const

const ITEM_BY_SIZE = {
  sm: 'gap-2 px-2 py-1.5 text-xs',
  md: 'gap-3 px-3 py-2 text-base',
} as const

const ICON_BY_SIZE = {
  sm: 'size-8',
  md: 'size-10',
} as const

const CHEVRON_BY_SIZE = {
  sm: 'size-5',
  md: 'size-6',
} as const

const DownloadOvl = ({ placement = 'top', size = 'md', className = '' }: DownloadOvlProps) => {
  return (
    <div className={`${PANEL_BASE} ${PANEL_BY_PLACEMENT[placement]} ${className}`.trim()}>
      <ul className={LIST_BY_SIZE[size]}>
        {PLATFORMS.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className={`group/item relative flex items-center rounded-md font-bold uppercase tracking-wide
                text-background/75 transition-[background-color,color] duration-200 ease-out
                hover:bg-background hover:text-primary
                focus-visible:bg-background focus-visible:text-primary focus-visible:outline-none
                motion-reduce:transition-none ${ITEM_BY_SIZE[size]}`}
            >
              <Icon
                className={`${ICON_BY_SIZE[size]} shrink-0 opacity-70 transition-[opacity,transform] duration-200 ease-out
                  group-hover/item:opacity-100 group-hover/item:scale-110
                  group-focus-visible/item:opacity-100 motion-reduce:transition-none`}
              />
              <span>{label}</span>
              <ChevronRightIcon
                className={`${CHEVRON_BY_SIZE[size]} ml-auto shrink-0 -translate-x-1 opacity-0
                  transition-[opacity,transform] duration-200 ease-out
                  group-hover/item:translate-x-0 group-hover/item:opacity-100
                  group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100
                  motion-reduce:transition-none`}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DownloadOvl
