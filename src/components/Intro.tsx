import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { assets } from '../assets/assets'
import { createSectionReveal, revealOnScroll, REVEAL_START } from '../animations/sectionReveal'

const Intro = () => {
    const rootRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) return

        return createSectionReveal(root, ({ scroller }) => {
            const heading = root.querySelector<HTMLElement>('[data-intro-heading]')
            const lead = root.querySelector<HTMLElement>('[data-intro-lead]')
            const bullets = Array.from(root.querySelectorAll<HTMLElement>('[data-intro-copy] li'))
            const art = root.querySelector<HTMLElement>('[data-intro-art]')

            revealOnScroll(heading, scroller, { from: { y: -24 }, to: { duration: 0.6 } })

            revealOnScroll(lead, scroller, {
                from: { x: -32, y: 0 },
                to: { x: 0, duration: 0.7 },
            })

            revealOnScroll(bullets, scroller, {
                from: { x: -24, y: 0 },
                to: { x: 0, duration: 0.55, stagger: 0.12 },
                trigger: bullets[0],
            })

            if (art) {
                gsap.fromTo(
                    art,
                    { autoAlpha: 0, x: 48, scale: 0.96 },
                    {
                        autoAlpha: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: art, scroller, start: REVEAL_START, once: true },
                    },
                )
            }
        })
    }, [])

    return (
        <div ref={rootRef} id="intro" className='flex flex-col items-center gap-6 py-14 sm:py-20 px-4 sm:px-12 lg:px-24 xl:px-40
        w-full overflow-hidden mt-12 sm:mt-20'>
            <div data-intro-heading className='px-6 sm:px-10 pb-4 sm:pb-5 border-b-2 sm:border-b-4 border-label'>
                <h1 className='text-center text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label'>Honkai: star rail</h1>
            </div>


            <div className='flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 justify-center items-center mt-6 sm:mt-10'>
                <div data-intro-copy className='flex w-full flex-col max-w-[41.813rem] lg:min-w-[50%] lg:w-1/2 xl:w-auto'>
                    <p data-intro-lead className='text-base sm:text-lg lg:text-2xl xl:text-3xl text-text'>
                        Honkai: Star Rail is a free-to-play space fantasy tactical role-playing game Set in a vast universe, you step into the shoes of the Trailblazer,
                        an amnesiac carrying a world-ending seed known as a Stellaron. Together with the crew of the Astral Express, you travel across distinct planets to seal these cosmic threats and uncover the galaxy's
                        deep secrets.
                    </p>

                    <ul className='text-base sm:text-lg lg:text-2xl xl:text-3xl text-primary list-disc pl-5 sm:pl-8 list-outside mt-8 sm:mt-10 space-y-4'>
                        <li className=''>
                            <p>Experience one-of-a-kind gameplay, featuring tactical combat where elements, weaknesses, and flashy ultimate abilities dictate the flow of battle. </p>
                        </li>
                        <li className=''>
                            Explore unique locations ranging from high-tech Herta Space Station, to the frozen, nineteenth-century-inspired Belobog, to the immense silkpunk flagship fleet of the Xianzhou Luofu,
                            and the jazz-age dreamscape of Penacony.
                        </li>
                        <li>
                            Collect a vast roster of unique 4-star and 5-star characters, balancing team compositions to tackle challenging endgame content.
                        </li>
                    </ul>
                </div>

                <div data-intro-art className='relative flex w-full max-w-2xl lg:w-1/2 xl:w-auto'>
                    <img src={assets.tumbal} alt="" className='h-auto w-full rounded-xl sm:rounded-2xl' />
                </div>
            </div>

        </div>
    )
}

export default Intro
