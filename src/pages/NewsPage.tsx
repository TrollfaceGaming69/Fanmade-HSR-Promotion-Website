import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { newsMedia } from "../assets/assets"
import { createSectionReveal, REVEAL_START } from "../animations/sectionReveal"

const NewsPage = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    return createSectionReveal(root, ({ scroller }) => {
        const heading = root.querySelector<HTMLElement>('[data-news-heading]')
        const features = Array.from(root.querySelectorAll<HTMLElement>('[data-news-feature]'))
        const title = root.querySelector<HTMLElement>('[data-news-title]')
        const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-news-card]'))
        const more = root.querySelector<HTMLElement>('[data-news-more]')

        // Above the fold, so it plays straight away.
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

        if (heading) {
          intro.fromTo(
            heading,
            { autoAlpha: 0, y: -28 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
          )
        }

        if (features.length) {
          intro.fromTo(
            features,
            { autoAlpha: 0, y: 48, scale: 0.97 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.14 },
            0.15,
          )
        }

        // Everything below reveals as it scrolls into view.
        if (title) {
          gsap.fromTo(
            title,
            { autoAlpha: 0, x: -32 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: { trigger: title, scroller, start: REVEAL_START, once: true },
            },
          )
        }

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: (index % 3) * 0.09,
              scrollTrigger: { trigger: card, scroller, start: REVEAL_START, once: true },
            },
          )
        })

        if (more) {
          gsap.fromTo(
            more,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: { trigger: more, scroller, start: REVEAL_START, once: true },
            },
          )
        }
    })
  }, [])

  return (
    <div ref={rootRef} className="w-full px-4 sm:px-12 lg:px-24 xl:px-40 mt-5">
        <div className="flex justify-center text-center">
           <div data-news-heading className="px-6 sm:px-10 pb-4 sm:pb-5 border-b-2 sm:border-b-4 border-label">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label">
                news
              </h1>
           </div>
        </div>


        <div className="grid grid-cols-1 gap-10 mt-12 sm:mt-20 lg:grid-cols-2">
              <div data-news-feature className="">
                  <div className="group w-full overflow-hidden rounded-lg">
                    <img src={newsMedia.newsmain1} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-5 gap-4 flex flex-col">
                    <p className="text-white text-base sm:text-lg lg:text-xl">September 27, 2026</p>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-white">Pearl Character Trailer: "The Way to Paint a Form of Hope" | Honkai: Star Rail</h3>
                    <a href="" className="text-label hover:text-primary text-base sm:text-lg lg:text-xl">Read more</a>
                  </div>
              </div>

               <div data-news-feature className="">
                  <div className="group w-full overflow-hidden rounded-lg">
                    <img src={newsMedia.newsmain2} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-5 gap-4 flex flex-col">
                    <p className="text-white text-base sm:text-lg lg:text-xl">September 22, 2026</p>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-white">Keeping Up With Star Rail — Pearl: Deep Learning in Progress | Honkai: Star Rail</h3>
                    <a href="" className="text-label hover:text-primary text-base sm:text-lg lg:text-xl">Read more</a>
                  </div>
              </div>
        </div>
        

        <div className="mt-10 flex flex-col border-t-2 border-label py-14 sm:py-20">
          <h1 data-news-title className="text-white font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Latest News</h1>
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 sm:gap-8 sm:mt-10 xl:grid-cols-3 xl:gap-10">
            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">September 20, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Version 4.6 Trailer: "Dance With the Beast Before Moonrise" | Honkai: Star Rail</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news3} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">September 10, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Aventurine • Waveflair Character Trailer: "Exclusive Scoop" | Honkai: Star Rail</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news5} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">September 4, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Keeping Up With Star Rail — Aventurine • Waveflair: How Much Did SoulGlad Pay? | Honkai: Star Rail</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news6} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">August 26, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Version 4.5 "To Roll the Stars in Astropolis" Update Details</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news1} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">August 25, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Robin • Summeretto Character Trailer: "Chasing the Wind" | Honkai: Star Rail</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news4} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">August 21, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Myriad Celestia Trailer: "Beyond the Chorus" | Honkai: Star Rail</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

            <div data-news-card className="flex flex-row gap-4 sm:gap-5">
                  <div className="group w-2/5 shrink-0 self-start overflow-hidden">
                    <img src={newsMedia.news2} alt="" className="block w-full transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"/>
                  </div>
                  <div className="mt-1 gap-2 flex flex-col flex-1 min-w-0 sm:mt-4 sm:gap-4 xl:mt-8">
                    <p className="text-white text-sm">August 14, 2026</p>
                    <h3 className="text-base font-medium text-white sm:text-lg lg:text-xl">Version 4.5 Trailer: "To Roll the Stars in Astropolis" | Honkai: Star Rail</h3>
                    <a href="" className="text-label text-sm">Read more</a>
                  </div>
            </div>

          </div>
          <div data-news-more className="flex justify-center mt-10">
             <button className="uppercase rounded-lg bg-button-fill text-black text-sm lg:text-lg mt-5 font-semibold px-8 py-4 sm:px-10 sm:py-5
              transition-opacity duration-200 ease-out hover:opacity-90
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none">see more</button>
          </div>
         
        </div>
    </div>
  )
}

export default NewsPage
