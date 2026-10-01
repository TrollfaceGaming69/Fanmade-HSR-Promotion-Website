import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { elementIcons, trailblazers } from "../assets/assets"
import type { Trailblazer } from "../assets/assets"
import { ROUTES } from "../routes"
import CharacterOvl from "./overlays/CharacterOvl"
import { createSectionReveal, revealOnScroll } from "../animations/sectionReveal"
import { localizeCharacter } from "../i18n/characterLore"
import { useLanguage } from "../i18n/languageContext"
import { useStrings } from "../i18n/strings"

const Characters = () => {
  const t = useStrings()
  const { language } = useLanguage()
  const [selected, setSelected] = useState<Trailblazer | null>(null)
  const closeOverlay = useCallback(() => setSelected(null), [])
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    return createSectionReveal(root, ({ scroller }) => {
      const heading = root.querySelector<HTMLElement>('[data-characters-heading]')
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-character-card]'))
      const more = root.querySelector<HTMLElement>('[data-characters-more]')

      revealOnScroll(heading, scroller, { from: { y: -24 }, to: { duration: 0.6 } })

      cards.forEach((card, index) => {
        revealOnScroll(card, scroller, {
          from: { y: 48, scale: 0.96 },
          to: { scale: 1, duration: 0.65, ease: 'power2.out', delay: (index % 3) * 0.09 },
        })
      })

      revealOnScroll(more, scroller, {
        from: { y: 24 },
        to: { duration: 0.5 },
      })
    })
  }, [])

  return (
    <div ref={rootRef} id="characters" className="flex flex-col items-center gap-6 py-14 sm:py-20 px-4 sm:px-12 lg:px-24 xl:px-40
         w-full overflow-hidden mt-12 sm:mt-20">
            <div data-characters-heading className='px-6 sm:px-10 pb-4 sm:pb-5 border-b-2 sm:border-b-4 border-label mb-5'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label'>{t.characters.heading}</h1>
            </div>

            <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {trailblazers.map((trailblazer) => {
                const { image, name, title, element, path } = trailblazer

                return (
                <li key={name} data-character-card>
                  <article
                    className="group relative h-full overflow-hidden rounded-2xl border border-label/15 bg-container-fill
                      transition-colors duration-500 ease-out
                      hover:border-primary/70 has-focus-visible:border-primary/70
                      motion-reduce:transition-none"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-out
                        bg-[radial-gradient(circle_at_50%_18%,rgba(223,142,35,0.22),transparent_62%)]
                        group-hover:opacity-100 group-has-focus-visible:opacity-100 motion-reduce:transition-none"
                    />

                    <div className="relative aspect-3/4 overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(219,191,145,0.14),transparent_60%)]"
                      />

                      <img
                        src={image}
                        alt={title ? `${name} — ${title}` : name}
                        loading="lazy"
                        draggable={false}
                        className="absolute inset-0 size-full scale-105 select-none object-cover object-top
                          transition-transform duration-700 ease-out
                          group-hover:scale-115 group-has-focus-visible:scale-115
                          motion-reduce:transition-none motion-reduce:scale-105"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-container-fill via-container-fill/80 to-transparent"
                      />
                    </div>

                    <div className="relative z-20 -mt-20 flex flex-col px-5 pb-5 sm:px-6 sm:pb-6">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
                        {path}
                      </p>

                      <h2 className="mt-2 text-xl font-bold uppercase tracking-wide text-label sm:text-2xl">
                        {name}
                      </h2>

                      {title && (
                        <p className="mt-1 text-sm uppercase tracking-[0.14em] text-text/60">
                          {title}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span
                          title={t.characters.elementLabel(element)}
                          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/50 sm:size-11
                            bg-background/50 transition-colors duration-300 ease-out
                            group-hover:border-primary group-hover:bg-primary/10 motion-reduce:transition-none"
                        >
                          <img
                            src={elementIcons[element]}
                            alt={t.characters.elementLabel(element)}
                            loading="lazy"
                            draggable={false}
                            className="size-6 select-none object-contain transition-transform duration-300 ease-out
                              group-hover:scale-110 motion-reduce:transition-none motion-reduce:scale-100"
                          />
                        </span>

                        <span
                          aria-hidden="true"
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-label/70
                            transition-colors duration-300 ease-out
                            group-hover:text-primary group-has-focus-visible:text-primary motion-reduce:transition-none"
                        >
                          <span>{t.common.view}</span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4 transition-transform duration-300 ease-out
                              group-hover:translate-x-1 group-has-focus-visible:translate-x-1 motion-reduce:transition-none"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-5 h-0.5 w-10 origin-left bg-label/40 transition-[width,background-color] duration-500 ease-out
                          group-hover:w-full group-hover:bg-primary
                          group-has-focus-visible:w-full group-has-focus-visible:bg-primary
                          motion-reduce:transition-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelected(localizeCharacter(trailblazer, language))}
                      aria-haspopup="dialog"
                      className="absolute inset-0 z-30 cursor-pointer rounded-2xl
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    >
                      <span className="sr-only">{t.characters.viewDetails(name)}</span>
                    </button>
                  </article>
                </li>
                )
              })}
            </ul>

            <Link
              to={ROUTES.characters}
              data-characters-more
              className="uppercase rounded-lg bg-button-fill text-black text-sm lg:text-lg mt-5 font-semibold px-8 py-4 sm:px-10 sm:py-5
              transition-opacity duration-200 ease-out hover:opacity-90
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
            >
              {t.common.seeMore}
            </Link>

            <CharacterOvl character={selected} onClose={closeOverlay} />
    </div>
  )
}

export default Characters
