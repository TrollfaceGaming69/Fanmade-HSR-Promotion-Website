import { useLayoutEffect, useRef } from 'react'
import { gameplay } from '../assets/assets'
import GameplayFeature from '../components/gameplayPage/GameplayFeature'
import { createSectionReveal, revealOnScroll } from '../animations/sectionReveal'
import { useStrings } from '../i18n/strings'

const Gameplaypage = () => {
  const t = useStrings()
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    return createSectionReveal(root, ({ scroller }) => {
      const heading = root.querySelector<HTMLElement>('[data-gameplay-heading]')
      const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-gameplay-row]'))

      revealOnScroll(heading, scroller, { from: { y: -28 }, to: { duration: 0.6 } })

      rows.forEach((row) => {
        const media = row.querySelector<HTMLElement>('[data-gameplay-media]')
        const rule = row.querySelector<HTMLElement>('[data-gameplay-rule]')
        const copy = Array.from(
          row.querySelectorAll<HTMLElement>('[data-gameplay-copy] > *:not([data-gameplay-rule])'),
        )

        revealOnScroll(media, scroller, {
          from: { x: -64, y: 0, scale: 0.96 },
          to: { x: 0, scale: 1, duration: 0.8 },
          trigger: row,
        })

        revealOnScroll(copy, scroller, {
          from: { x: 48, y: 0 },
          to: { x: 0, duration: 0.6, stagger: 0.1 },
          trigger: row,
        })

        revealOnScroll(rule, scroller, {
          from: { scaleX: 0, y: 0 },
          to: { scaleX: 1, duration: 0.7, ease: 'power2.inOut', delay: 0.15 },
          trigger: row,
        })
      })
    })
  }, [])

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col items-center gap-6 overflow-hidden px-4 py-14 sm:px-12 sm:py-20 lg:px-24 xl:px-40"
    >
      <div data-gameplay-heading className="mb-5 border-b-2 border-label px-6 pb-4 sm:border-b-4 sm:px-10 sm:pb-5">
        <h1 className="text-3xl font-bold text-label uppercase sm:text-4xl lg:text-5xl">
          {t.gameplay.heading}
        </h1>
      </div>

      <ul className="mt-5 flex w-full flex-col gap-14 sm:gap-20 lg:gap-28">
        {gameplay.map((entry, index) => (
          <li key={entry.video}>
            <GameplayFeature
              video={entry.video}
              label={t.gameplay.features[index].label}
              description={t.gameplay.features[index].description}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Gameplaypage
