import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { media, shortvideo } from "../assets/assets";
import { createSectionReveal, revealOnScroll } from "../animations/sectionReveal";

const TABS = [
  { id: "screenshots", label: "Screenshots" },
  { id: "shortvideos", label: "shortvideos" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const clips = Object.values(shortvideo);

const Media = () => {
  const [activeTab, setActiveTab] = useState<TabId>("screenshots");
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    return createSectionReveal(root, ({ scroller }) => {
      const heading = root.querySelector<HTMLElement>("[data-media-heading]");
      const tabs = Array.from(root.querySelectorAll<HTMLElement>("[data-media-tabs] button"));

      revealOnScroll(heading, scroller, { from: { y: -24 }, to: { duration: 0.6 } });

      revealOnScroll(tabs, scroller, {
        to: { duration: 0.5, stagger: 0.1 },
        trigger: root.querySelector("[data-media-tabs]") ?? undefined,
      });
    });
  }, []);

  // Rebuilt per tab so a freshly switched rail reveals the same way.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    return createSectionReveal(root, ({ scroller }) => {
      const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-media-slide]"));

      // The rail scrolls sideways, so the media slides in from the right.
      revealOnScroll(slides, scroller, {
        from: { x: 64, y: 0, scale: 0.97 },
        to: { x: 0, scale: 1, duration: 0.7, stagger: 0.12 },
        trigger: trackRef.current ?? undefined,
      });
    });
  }, [activeTab]);

  // These clips are large, so only the ones scrolled into the rail keep playing.
  useEffect(() => {
    const track = trackRef.current;
    if (activeTab !== "shortvideos" || !track) return;
    if (typeof IntersectionObserver === "undefined") return;

    const videos = videoRefs.current.filter((node): node is HTMLVideoElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: track, threshold: 0.25 },
    );

    videos.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [activeTab]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;

    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;

    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;

    drag.current.active = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const selectTab = (id: TabId) => {
    if (id === activeTab) return;

    setActiveTab(id);
    trackRef.current?.scrollTo({ left: 0 });
  };

  const isVideos = activeTab === "shortvideos";

  return (
    <div
      ref={rootRef}
      id="media"
      className="flex flex-col items-center gap-6 py-14 sm:py-20 px-4 sm:px-12 lg:px-24 xl:px-40
         w-full overflow-hidden mt-12 sm:mt-20"
    >
      <div data-media-heading className="px-6 sm:px-10 pb-4 sm:pb-5 border-b-2 sm:border-b-4 border-label">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-label">
          Media
        </h1>
      </div>

      <div className="flex w-full justify-center mt-5">
        <div
          data-media-tabs
          role="tablist"
          aria-label="Media type"
          className="flex flex-wrap justify-center gap-6 sm:gap-10 text-text text-xl"
        >
          {TABS.map(({ id, label }) => {
            const isActive = id === activeTab;

            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`media-tab-${id}`}
                aria-selected={isActive}
                aria-controls="media-panel"
                onClick={() => selectTab(id)}
                className={`group relative cursor-pointer uppercase text-lg sm:text-xl lg:text-2xl transition-colors duration-300 ease-out
                  hover:text-label focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary
                  motion-reduce:transition-none ${isActive ? "text-primary" : "text-text"}`}
              >
                {label}

                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-center rounded-full bg-primary
                    transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none
                    ${isActive ? "scale-x-100" : "scale-x-0"}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        tabIndex={0}
        role="tabpanel"
        id="media-panel"
        aria-labelledby={`media-tab-${activeTab}`}
        aria-label={
          isVideos
            ? "Gameplay clip gallery, drag or use arrow keys to scroll"
            : "Screenshot gallery, drag or use arrow keys to scroll"
        }
        className="self-stretch -mr-4 sm:-mr-12 lg:-mr-24 xl:-mr-40
          pr-4 sm:pr-12 lg:pr-24 xl:pr-40
          mt-3.5 sm:mt-12 flex gap-5 sm:gap-8 lg:gap-10 overflow-x-auto overscroll-x-contain no-scrollbar
          cursor-grab active:cursor-grabbing touch-pan-x
          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-label"
      >
        {isVideos
          ? clips.map((clip, index) => (
              <div
                key={clip}
                data-media-slide
                className="relative shrink-0 w-[85vw] sm:w-[70vw] lg:w-[62vw] xl:w-200 aspect-video
                  overflow-hidden rounded-lg bg-container-fill"
              >
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  src={clip}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  draggable={false}
                  aria-label={`Gameplay clip ${index + 1}`}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                />
              </div>
            ))
          : media.map((img, index) => (
              <div
                key={index}
                data-media-slide
                className="relative shrink-0 w-[85vw] sm:w-[70vw] lg:w-[62vw] xl:w-200 aspect-video
                  overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt={`Game screenshot ${index + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Media;
