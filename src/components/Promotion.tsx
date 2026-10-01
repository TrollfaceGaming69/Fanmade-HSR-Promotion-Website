import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ROUTES } from "../routes";
import DownloadOvl from "./overlays/DownloadOvl";
import { createSectionReveal, REVEAL_START } from "../animations/sectionReveal";
import { useStrings } from "../i18n/strings";

const Promotion = () => {
  const t = useStrings();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    return createSectionReveal(root, ({ scroller }) => {
      const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-promo-step]"));

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, scroller, start: REVEAL_START, once: true },
      });

      timeline.fromTo(
        root,
        { autoAlpha: 0, y: 56, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
      );

      if (steps.length) {
        timeline.fromTo(
          steps,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.14 },
          0.3,
        );
      }
    });
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col items-center justify-center bg-container-fill max-w-375 rounded-2xl
      mt-12 sm:mt-20 mx-4 sm:mx-8 lg:mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-40">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 sm:gap-10">
        <div data-promo-step className="inline-flex flex-col text-center">
          <p className="uppercase text-base sm:text-lg lg:text-xl font-semibold text-primary">
            {t.promotion.freeToPlay}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label">{t.promotion.playNow}</h1>
        </div>

          <div data-promo-step className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <div
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-label={t.common.downloadNow}
              className="group relative w-60 h-14 sm:w-80 sm:h-18 lg:w-102 lg:h-22 rounded-[10px] inline-flex justify-start items-center cursor-pointer
                focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary focus-visible:outline-none"
            >
              <DownloadOvl placement="top" size="md" />

              <div className="w-14 sm:w-18 lg:w-22 shrink-0 h-full bg-label rounded-tl-[10px] rounded-bl-[10px] overflow-hidden inline-flex justify-center items-center">
                  <img src={assets.download_icon} className="size-full" alt="" />
              </div> 

              <div className="flex-1 min-w-0 h-full bg-button-fill rounded-tr-[10px] rounded-br-[10px] inline-flex justify-center items-center gap-2.5">
                <h3 className="text-black uppercase text-base sm:text-xl lg:text-2xl font-medium">
                  {t.common.downloadNow}
                </h3>
              </div>
            </div>

            <Link
              to={ROUTES.gameplay}
              className="border-2 border-button-fill rounded-md text-white text-lg sm:text-xl lg:text-2xl uppercase font-semibold
                w-60 h-14 sm:w-80 sm:h-18 lg:w-102 lg:h-22
                inline-flex items-center justify-center transition-colors duration-200 ease-out
                hover:bg-button-fill hover:text-black
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
            >
              {t.promotion.seeMore}
            </Link>
          </div>
          <p data-promo-step className="text-sm lg:text-lg text-primary text-center">
            {t.promotion.note}
          </p>
      </div>
    </div>
  );
};

export default Promotion;
