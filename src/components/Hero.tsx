import { useRef, useCallback, useState } from "react";
import ScrollExpand from "../animatedcomponents/ScrollExpand";
import { assets } from "../assets/assets";
import DownloadOvl from "./overlays/DownloadOvl";

const Hero = () => {
  const hasScrolledRef = useRef(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const handleAnimationComplete = useCallback(() => {
    if (hasScrolledRef.current) return;
    hasScrolledRef.current = true;

    setAnimationEnabled(false);

    const introElement = document.getElementById('intro');
    if (introElement) {
      introElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="h-svh">
      <ScrollExpand
        src={assets.hero_bg}
        alt="hero"
        title="Start your trailblazing journey"
        onComplete={handleAnimationComplete}
        enabled={animationEnabled}
      >
        <h2 className="text-3xl sm:text-5xl lg:text-7xl xl:text-[100px] uppercase font-bold text-white text-balance
          [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">Honkai star rail</h2>

        <div
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-label="Download now"
          className="group relative w-60 h-14 sm:w-80 sm:h-18 lg:w-102 lg:h-22 rounded-[10px] inline-flex justify-start items-center
            mt-4 cursor-pointer
            focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary focus-visible:outline-none"
        >
          <DownloadOvl placement="top" size="md" />

          <div className="flex-1 h-full bg-label rounded-tl-[10px] rounded-bl-[10px] overflow-hidden inline-flex justify-center items-center">
            <img src={assets.download_icon} className="size-12 sm:size-18 lg:size-24" alt="" />
          </div>

          <div className="w-44 sm:w-60 lg:w-80 h-full bg-button-fill rounded-tr-[10px] rounded-br-[10px] inline-flex justify-center items-center gap-2.5">
            <h3 className="text-black uppercase text-sm sm:text-lg lg:text-2xl font-medium">Download now</h3>
          </div>
        </div>
      </ScrollExpand>
    </div>
  );
};

export default Hero;
