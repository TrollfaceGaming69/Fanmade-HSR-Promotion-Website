import { useLayoutEffect, useRef } from 'react'
import AccordionGallery from '../animatedcomponents/AccordionGallery'
import { worlds } from '../assets/assets'
import { createSectionReveal, revealOnScroll } from '../animations/sectionReveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useStrings } from '../i18n/strings'


const Worlds = () => {
  const t = useStrings()
  const rootRef = useRef<HTMLDivElement>(null)

  const isPhone = useMediaQuery('(max-width: 639px)')
  const isBelowDesktop = useMediaQuery('(max-width: 1023px)')

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    return createSectionReveal(root, ({ scroller }) => {
      const heading = root.querySelector<HTMLElement>('[data-worlds-heading]')
      const gallery = root.querySelector<HTMLElement>('[data-worlds-gallery]')

      revealOnScroll(heading, scroller, { from: { y: -24 }, to: { duration: 0.6 } })

      revealOnScroll(gallery, scroller, { from: { y: 56 }, to: { duration: 0.85 } })
    })
  }, [isPhone])

  return (
    <div ref={rootRef} id="worlds" className='flex flex-col items-center gap-6 py-14 sm:py-20 px-4 sm:px-12 lg:px-24 xl:px-40
         w-full overflow-hidden mt-12 sm:mt-20'>
                <div data-worlds-heading className='px-6 sm:px-10 pb-4 sm:pb-5 border-b-2 sm:border-b-4 border-label mb-5'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label'>{t.worlds.heading}</h1>
                </div>

                <div data-worlds-gallery className='w-full'>
                  {isPhone ? (
                    <ul aria-label={t.worlds.galleryLabel} className='grid grid-cols-1 gap-4'>
                      {worlds.map(({ image, label }) => (
                        <li
                          key={label}
                          className='relative aspect-video overflow-hidden rounded-xl border border-label/15 bg-container-fill'
                        >
                          <img
                            src={image}
                            alt={label}
                            loading='lazy'
                            draggable={false}
                            className='absolute inset-0 size-full select-none object-cover'
                          />

                          <div
                            aria-hidden='true'
                            className='absolute inset-0 bg-linear-to-t from-[#060010]/85 via-[#060010]/20 to-transparent'
                          />

                          <span className='absolute bottom-4 left-4 right-4 flex items-center gap-3'>
                            <span className='h-6 w-0.75 shrink-0 rounded-[3px] bg-primary' />
                            <span className='truncate text-base font-semibold text-primary [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]'>
                              {label}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <AccordionGallery
                    items={worlds}
                    ariaLabel={t.worlds.galleryLabel}
                    defaultIndex={0}
                    trigger='hover'
                    expandRatio={0.34}
                    accentColor="#DF8E23"
                    overlayColor="#060010"
                    textColor="#DF8E23"
                    grayscale
                    showLabels
                    duration={0.6}
                    ease="power3.out"
                    parallax={0.5}
                    tilt={8}
                    stagger={0.06}
                    height={isBelowDesktop ? 360 : 500}
                    gap={5}
                    radius={20}
                    orientation="horizontal"
                    >
                    </AccordionGallery>
                  )}
                </div>

            </div>
  )
}

export default Worlds
