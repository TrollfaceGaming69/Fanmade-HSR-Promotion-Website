import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { gsap } from 'gsap'
import type { PathGroup } from './characterRoster'
import { centerOffsetFor, clampScroll, scrollLeftTo } from './scrollTrack'
import { useStrings } from '../../i18n/strings'

type PathSelectorProps = {
  groups: PathGroup[]
  activeIndex: number
  onSelect: (index: number) => void
  panelId: string
  tabIdPrefix: string
}

const EDGE_TOLERANCE = 2

const PathSelector = ({
  groups,
  activeIndex,
  onSelect,
  panelId,
  tabIdPrefix,
}: PathSelectorProps) => {
  const t = useStrings()
  const trackRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const emblemRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [edges, setEdges] = useState({ overflowing: false, atStart: true, atEnd: false })

  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const max = track.scrollWidth - track.clientWidth

    setEdges({
      overflowing: max > EDGE_TOLERANCE,
      atStart: track.scrollLeft <= EDGE_TOLERANCE,
      atEnd: track.scrollLeft >= max - EDGE_TOLERANCE,
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncEdges()
    track.addEventListener('scroll', syncEdges, { passive: true })

    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(syncEdges)
    observer?.observe(track)

    return () => {
      track.removeEventListener('scroll', syncEdges)
      observer?.disconnect()
    }
  }, [syncEdges])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(tabRefs.current.filter(Boolean), {
        autoAlpha: 0,
        y: -18,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      })
    })

    return () => mm.revert()
  }, [])

  useLayoutEffect(() => {
    const track = trackRef.current
    const tab = tabRefs.current[activeIndex]
    if (!track || !tab) return

    scrollLeftTo(track, centerOffsetFor(track, tab))

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const emblem = emblemRefs.current[activeIndex]
      if (!emblem) return

      gsap.fromTo(
        emblem,
        { scale: 0.82, y: 6 },
        { scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.2)' },
      )
    })

    return () => mm.revert()
  }, [activeIndex])

  const page = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    scrollLeftTo(track, clampScroll(track, track.scrollLeft + direction * track.clientWidth * 0.75))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = groups.length - 1
    let next: number | null = null

    if (event.key === 'ArrowRight') next = activeIndex === lastIndex ? 0 : activeIndex + 1
    else if (event.key === 'ArrowLeft') next = activeIndex === 0 ? lastIndex : activeIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = lastIndex

    if (next === null) return

    event.preventDefault()
    onSelect(next)
    tabRefs.current[next]?.focus({ preventScroll: true })
  }

  const arrowClass = `mt-5 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary sm:mt-8 sm:size-12
    transition-[opacity,transform,background-color] duration-300 ease-out
    hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
    disabled:pointer-events-none disabled:opacity-25 motion-reduce:transition-none`

  return (
    <div className="flex w-full items-start justify-center gap-0.5 sm:gap-4">
      <button
        type="button"
        onClick={() => page(-1)}
        disabled={!edges.overflowing || edges.atStart}
        aria-hidden={!edges.overflowing}
        tabIndex={edges.overflowing ? undefined : -1}
        className={`${arrowClass} hover:-translate-x-0.5 ${edges.overflowing ? '' : 'invisible'}`}
      >
        <span className="sr-only">{t.characterPage.previousPaths}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
          <path d="M16 3.5 5.5 12 16 20.5z" />
        </svg>
      </button>

      <div
        ref={trackRef}
        role="tablist"
        aria-label={t.characterPage.pathsLabel}
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className="no-scrollbar relative flex max-w-full overflow-x-auto overscroll-x-contain"
      >
        {groups.map((group, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={group.name}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`${tabIdPrefix}-${group.name.toLowerCase()}`}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              title={group.fullName}
              onClick={() => onSelect(index)}
              className="group flex w-24 shrink-0 cursor-pointer flex-col items-center gap-2 px-2 pt-2 pb-1
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                sm:w-32 sm:gap-3 sm:px-3 lg:w-40"
            >
              <span
                ref={(node) => {
                  emblemRefs.current[index] = node
                }}
                className="flex h-14 items-end justify-center sm:h-20 lg:h-24"
              >
                {group.icon ? (
                  <img
                    src={group.icon}
                    alt=""
                    draggable={false}
                    className={`max-h-full w-auto select-none object-contain transition-opacity duration-400 ease-out
                      group-hover:opacity-100 motion-reduce:transition-none
                      ${isActive ? 'opacity-100' : 'opacity-55'}`}
                  />
                ) : (
                  <span aria-hidden="true" className="text-5xl text-label/60">
                    ✦
                  </span>
                )}
              </span>

              <span
                className={`text-[0.6875rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase
                  transition-colors duration-300 ease-out motion-reduce:transition-none sm:text-sm sm:tracking-[0.16em] lg:text-base
                  ${isActive ? 'text-primary' : 'text-text/65 group-hover:text-label'}`}
              >
                {group.name}
              </span>

              <span
                aria-hidden="true"
                className={`h-0.5 w-full origin-center rounded-full bg-primary
                  transition-transform duration-400 ease-out motion-reduce:transition-none
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}
              />
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => page(1)}
        disabled={!edges.overflowing || edges.atEnd}
        aria-hidden={!edges.overflowing}
        tabIndex={edges.overflowing ? undefined : -1}
        className={`${arrowClass} hover:translate-x-0.5 ${edges.overflowing ? '' : 'invisible'}`}
      >
        <span className="sr-only">{t.characterPage.morePaths}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
          <path d="M8 3.5 18.5 12 8 20.5z" />
        </svg>
      </button>
    </div>
  )
}

export default PathSelector
