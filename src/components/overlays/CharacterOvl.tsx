import { useEffect, useRef } from 'react'
import { elementIcons } from '../../assets/assets'
import type { Trailblazer } from '../../assets/assets'
import { useStrings } from '../../i18n/strings'

type CharacterOvlProps = {
  character: Trailblazer | null
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const CharacterOvl = ({ character, onClose }: CharacterOvlProps) => {
  const t = useStrings()
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const isOpen = character !== null

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      )

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    const frozen: { element: HTMLElement; overflow: string }[] = []

    for (let node = rootRef.current?.parentElement; node; node = node.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(node).overflowY)) {
        frozen.push({ element: node, overflow: node.style.overflow })
        node.style.overflow = 'hidden'
      }
    }

    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      frozen.forEach(({ element, overflow }) => {
        element.style.overflow = overflow
      })
      document.body.style.overflow = bodyOverflow
    }
  }, [isOpen])

  if (!character) return null

  const { image, name, title, element, path, story, quote } = character
  const headingId = 'character-overlay-heading'

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label={t.characterPage.closeDetails}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-background/85 backdrop-blur-sm
          animate-in fade-in duration-300 motion-reduce:animate-none"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="relative z-10 flex max-h-[90svh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl
          border border-label/20 bg-container-fill shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]
          focus:outline-none animate-in fade-in zoom-in-95 duration-300 ease-out motion-reduce:animate-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 inline-flex size-11 items-center justify-center rounded-full
            border border-label/25 bg-background/70 text-label
            transition-colors duration-300 ease-out hover:border-primary hover:text-primary
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
            motion-reduce:transition-none"
        >
          <span className="sr-only">{t.characterPage.closeDetails}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain no-scrollbar
          lg:grid lg:grid-cols-[1.05fr_1fr] lg:overflow-hidden">
          <div className="order-2 flex shrink-0 flex-col px-5 pt-7 pb-9 sm:px-10 sm:pt-8 sm:pb-10 lg:order-1 lg:max-h-[90svh]
            lg:overflow-y-auto lg:no-scrollbar lg:px-12 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm">
              {path}
            </p>

            <h2
              id={headingId}
              className="mt-3 text-3xl font-bold uppercase tracking-wide text-label sm:text-4xl lg:text-5xl"
            >
              {name}
            </h2>

            {title && (
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-text/60 sm:text-base">
                {title}
              </p>
            )}

            <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-primary/50
              bg-background/50 py-1.5 pr-5 pl-1.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10">
                <img
                  src={elementIcons[element]}
                  alt=""
                  draggable={false}
                  className="size-6 select-none object-contain"
                />
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary sm:text-sm">
                {element}
              </span>
            </div>

            <span aria-hidden="true" className="mt-8 h-0.5 w-16 bg-primary" />

            <blockquote className="mt-8 border-l-2 border-primary/60 pl-5 text-lg text-label italic sm:text-xl">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-label">
                {t.characterPage.storyHeading}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-text/75 sm:text-lg">
                {story}
              </p>
            </div>
          </div>

          <div className="relative order-1 h-72 max-h-[38svh] shrink-0 overflow-hidden bg-background/40
            sm:h-auto sm:max-h-none sm:aspect-16/10
            lg:order-2 lg:aspect-auto lg:h-full lg:min-h-136">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(223,142,35,0.24),transparent_62%)]"
            />

            <img
              src={image}
              alt={title ? `${name} — ${title}` : name}
              draggable={false}
              className="absolute inset-0 size-full scale-105 select-none object-cover object-top"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-container-fill to-transparent
                lg:hidden"
            />

            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-1/4 bg-linear-to-r from-container-fill to-transparent
                lg:block"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterOvl
