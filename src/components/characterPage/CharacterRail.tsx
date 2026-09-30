import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { RosterEntry } from './characterRoster'
import { centerOffsetFor, scrollLeftTo } from './scrollTrack'

type CharacterRailProps = {
  members: RosterEntry[]
  activeIndex: number
  onSelect: (index: number) => void
  panelId: string
  pathName: string
}

const CharacterRail = ({
  members,
  activeIndex,
  onSelect,
  panelId,
  pathName,
}: CharacterRailProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-rail-card]', {
          autoAlpha: 0,
          y: 34,
          scale: 0.94,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
        })
      }, scrollerRef)

      return () => context.revert()
    })

    return () => mm.revert()
  }, [pathName])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    const card = cardRefs.current[activeIndex]
    if (!scroller || !card) return
    if (scroller.scrollWidth - scroller.clientWidth <= 2) return

    scrollLeftTo(scroller, centerOffsetFor(scroller, card))
  }, [activeIndex, pathName])

  return (
    <div
      ref={scrollerRef}
      className="no-scrollbar relative w-full overflow-x-auto overscroll-x-contain"
    >
      <ul
        aria-label={`The ${pathName} characters`}
        className="flex min-w-max items-start justify-center gap-3 px-4 py-4 sm:gap-6"
      >
        {members.map((member, index) => {
          const isActive = index === activeIndex

          return (
            <li
              key={member.id}
              data-rail-card
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              className="flex w-28 shrink-0 flex-col items-center sm:w-40 lg:w-[clamp(8rem,15vh,13rem)]"
            >
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive}
                aria-controls={panelId}
                title={member.name}
                className={`group relative block w-full cursor-pointer overflow-hidden rounded-lg
                  transition-shadow duration-400 ease-out
                  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary
                  motion-reduce:transition-none
                  ${isActive
                    ? 'shadow-[0_0_0_2px_#DF8E23]'
                    : 'shadow-[0_0_0_1px_rgba(219,191,145,0.18)] hover:shadow-[0_0_0_1px_rgba(223,142,35,0.6)]'}`}
              >
                <span className="sr-only">{member.name}</span>

                <span className="relative block aspect-3/4 overflow-hidden bg-container-fill">
                  <img
                    src={member.image}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className={`absolute inset-0 size-full select-none object-cover object-top
                      transition-[transform,filter,opacity] duration-500 ease-out
                      group-hover:scale-108 motion-reduce:transition-none
                      ${isActive
                        ? 'scale-105 opacity-100'
                        : 'opacity-70 saturate-65 group-hover:opacity-100 group-hover:saturate-100'}`}
                  />

                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent
                      transition-opacity duration-400 ease-out motion-reduce:transition-none
                      ${isActive ? 'opacity-40' : 'opacity-80 group-hover:opacity-50'}`}
                  />
                </span>
              </button>

              <div
                aria-hidden="true"
                className={`flex flex-col items-center transition-[opacity,transform] duration-400 ease-out
                  motion-reduce:transition-none
                  ${isActive ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}
              >
                <p className="mt-2 text-center text-xs font-semibold tracking-[0.12em] text-primary uppercase sm:text-sm sm:tracking-[0.16em] lg:text-base">
                  {member.name}
                </p>

                <svg viewBox="0 0 24 24" className="mt-1 size-4 fill-primary">
                  <path d="M12 6.5 21 18.5H3z" />
                </svg>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CharacterRail
