import { useEffect, useRef } from 'react'
import { findScroller } from '../../animations/sectionReveal'

type GameplayFeatureProps = {
  video: string
  label: string
  description: string
  index: number
}

const GameplayFeature = ({ video, label, description, index }: GameplayFeatureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const node = videoRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      void node.play().catch(() => {})
      return
    }

    const scroller = findScroller(node)

    const observer = new IntersectionObserver(
      ([visible]) => {
        if (visible.isIntersecting) {
          void node.play().catch(() => {})
        } else {
          node.pause()
        }
      },
      { root: scroller instanceof HTMLElement ? scroller : null, threshold: 0.25 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const order = String(index + 1).padStart(2, '0')

  return (
    <article
      data-gameplay-row
      className="group grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20"
    >
      <div
        data-gameplay-media
        className="relative aspect-video w-full overflow-hidden rounded-2xl border border-label/15 bg-container-fill
          transition-colors duration-500 ease-out hover:border-primary/60 motion-reduce:transition-none"
      >
        <video
          ref={videoRef}
          src={video}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          draggable={false}
          aria-label={label}
          className="pointer-events-none absolute inset-0 size-full select-none object-cover
            transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out
            bg-[radial-gradient(circle_at_50%_100%,rgba(223,142,35,0.22),transparent_62%)]
            group-hover:opacity-100 motion-reduce:transition-none"
        />
      </div>

      <div data-gameplay-copy className="flex flex-col">
        <p className="text-[0.6875rem] font-semibold tracking-[0.3em] text-primary uppercase sm:text-xs">
          {order}
        </p>

        <h2 className="mt-3 text-2xl font-bold tracking-wide text-label uppercase sm:text-3xl lg:text-4xl">
          {label}
        </h2>

        <span
          data-gameplay-rule
          aria-hidden="true"
          className="mt-5 h-px w-full origin-left bg-linear-to-r from-label/70 via-label/35 to-transparent"
        />

        <p className="mt-5 text-base leading-relaxed text-text sm:mt-6 sm:text-lg lg:text-xl xl:text-2xl">{description}</p>
      </div>
    </article>
  )
}

export default GameplayFeature
