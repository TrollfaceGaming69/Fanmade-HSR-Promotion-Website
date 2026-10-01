import { useEffect, useId, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { useLanguage } from '../i18n/languageContext'
import { useStrings } from '../i18n/strings'
import { LANGUAGE_NAMES, LANGUAGES } from '../i18n/types'
import type { Language } from '../i18n/types'

type LanguageSwitcherProps = {
  /** `top` opens upwards, for triggers near the bottom of a panel. */
  placement?: 'bottom' | 'top'
  className?: string
}

const LanguageSwitcher = ({ placement = 'bottom', className = '' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage()
  const t = useStrings()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  // Two instances live in the Nav (desktop bar + mobile menu), so the ids cannot
  // be hardcoded.
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const choose = (next: Language) => {
    setLanguage(next)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup='true'
        aria-controls={panelId}
        aria-label={t.language.trigger}
        className='inline-flex cursor-pointer items-center gap-2 rounded-md
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
      >
        <img src={assets.globe_icon} className='size-5' alt='' />

        <span className='text-base xl:text-lg font-normal uppercase leading-none tracking-wider text-label'>
          {LANGUAGE_NAMES[language]}
        </span>

        <img
          src={assets.arrow_down}
          alt=''
          className={`size-5 transition-transform duration-300 ease-out motion-reduce:transition-none
            ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={`absolute right-0 z-50 w-44 rounded-[10px] bg-button-fill text-background
          ring-1 ring-black/10 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.65)]
          ${placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
      >
        <p className='px-4 pt-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-background/50'>
          {t.language.heading}
        </p>

        <ul className='space-y-0.5 p-2'>
          {LANGUAGES.map((code) => {
            const isActive = code === language

            return (
              <li key={code}>
                <button
                  type='button'
                  onClick={() => choose(code)}
                  aria-pressed={isActive}
                  className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2
                    text-sm font-bold uppercase tracking-wide
                    transition-[background-color,color] duration-200 ease-out
                    hover:bg-background hover:text-primary
                    focus-visible:bg-background focus-visible:text-primary focus-visible:outline-none
                    motion-reduce:transition-none
                    ${isActive ? 'text-primary' : 'text-background/75'}`}
                >
                  <span>{LANGUAGE_NAMES[code]}</span>

                  {isActive && (
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={2.5}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='size-4 shrink-0'
                      aria-hidden='true'
                    >
                      <path d='m5 13 4 4L19 7' />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default LanguageSwitcher
