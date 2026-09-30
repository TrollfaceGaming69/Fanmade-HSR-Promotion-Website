import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { elementIcons } from '../../assets/assets'
import type { PathGroup, RosterEntry } from './characterRoster'

const CharacterStory = ({ story }: { story: string }) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [clampable, setClampable] = useState(false)

  useEffect(() => {
    const paragraph = paragraphRef.current
    if (!paragraph || expanded) return

    const measure = () => setClampable(paragraph.scrollHeight - paragraph.clientHeight > 2)
    measure()

    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(paragraph)

    return () => observer?.disconnect()
  }, [expanded])

  return (
    <>
      <p
        ref={paragraphRef}
        className={`mt-5 shrink-0 text-base leading-relaxed text-text sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
          ${expanded ? '' : 'line-clamp-5'}`}
      >
        {story}
      </p>

      {clampable && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-3 w-fit cursor-pointer text-xs font-semibold tracking-[0.18em] text-primary uppercase
            underline-offset-4 transition-colors duration-300 ease-out
            hover:text-label hover:underline
            focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary
            motion-reduce:transition-none sm:text-sm"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </>
  )
}

type CharacterShowcaseProps = {
  character: RosterEntry
  group: PathGroup
  panelId: string
  labelledBy: string
}

const CharacterShowcase = ({
  character,
  group,
  panelId,
  labelledBy,
}: CharacterShowcaseProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { id, image, name, title, element, story, quote } = character

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

        timeline
          .fromTo(
            '[data-showcase-art]',
            { autoAlpha: 0, scale: 1.08, yPercent: 3, filter: 'blur(14px)' },
            { autoAlpha: 1, scale: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.8 },
          )
          .fromTo(
            '[data-showcase-glow]',
            { autoAlpha: 0, scale: 0.75 },
            { autoAlpha: 1, scale: 1, duration: 1 },
            0,
          )
          .fromTo(
            '[data-showcase-copy] > *',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
            0.12,
          )
          .fromTo(
            '[data-showcase-rule]',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
            0.2,
          )
      }, rootRef)

      return () => context.revert()
    })

    return () => mm.revert()
  }, [id])

  return (
    <div
      ref={rootRef}
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
      className="relative flex w-full flex-col justify-center
        focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary/60
        lg:min-h-0 lg:flex-1"
    >
      <div className="grid gap-8 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:gap-8 xl:gap-12">
        <div
          data-showcase-copy
          className="order-2 flex min-h-0 flex-col justify-center-safe
            lg:order-1 lg:overflow-y-auto lg:pr-2"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            {group.fullName}
          </p>

          <h2 className="mt-3 text-center text-3xl font-bold tracking-[0.12em] text-label uppercase sm:text-4xl lg:text-left lg:text-5xl">
            {name}
          </h2>

          {title && (
            <p className="mt-2 text-center text-sm tracking-[0.2em] text-text/60 uppercase lg:text-left">
              {title}
            </p>
          )}

          <span
            data-showcase-rule
            aria-hidden="true"
            className="mt-4 h-px w-full origin-left bg-linear-to-r from-label/70 via-label/35 to-transparent"
          />

          <CharacterStory key={id} story={story} />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-container-fill/70 py-1.5 pr-4 pl-1.5">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10">
                <img
                  src={elementIcons[element]}
                  alt=""
                  draggable={false}
                  className="size-5 select-none object-contain"
                />
              </span>
              <span className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {element}
              </span>
            </span>

            <span className="inline-flex items-center gap-2.5 rounded-full border border-label/25 bg-container-fill/70 py-1.5 pr-4 pl-1.5">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-label/10">
                {group.icon ? (
                  <img
                    src={group.icon}
                    alt=""
                    draggable={false}
                    className="size-5 select-none object-contain"
                  />
                ) : (
                  <span aria-hidden="true" className="text-label">
                    ✦
                  </span>
                )}
              </span>
              <span className="text-xs font-semibold tracking-[0.14em] text-label uppercase">
                {group.name}
              </span>
            </span>
          </div>

          <blockquote className="mt-6 border-l-2 border-primary/50 pl-4 text-base leading-relaxed text-label/90 italic sm:pl-5 sm:text-lg lg:text-xl xl:text-2xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>

        <div className="relative order-1 flex min-h-0 items-center justify-center lg:order-2">
          <div
            data-showcase-glow
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square h-[85%] max-w-none
              -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl
              bg-[radial-gradient(circle,rgba(223,142,35,0.2),rgba(219,191,145,0.07)_45%,transparent_70%)]"
          />

          <img
            key={id}
            data-showcase-art
            src={image}
            alt={title ? `${name} — ${title}` : name}
            draggable={false}
            className="relative max-h-[38vh] w-auto max-w-full select-none object-contain sm:max-h-[46vh]
              drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]
              [@media(min-height:1200px)]:lg:h-full [@media(min-height:1200px)]:lg:max-h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default CharacterShowcase
