"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CatalogViewer from "@/components/CatalogViewer";

type SplitSlide = {
  fullWidth?: false;
  leftImage: string;
  rightImage: string;
  topText: string;
  mainText: string;
  description: string;
  link: string;
};

type FullWidthSlide = {
  fullWidth: true;
  pcImage: string;
  mbImage: string;
  topText: string;
  mainText: string;
  description: string;
  link: string;
};

type Slide = SplitSlide | FullWidthSlide;

/* ── Shared desktop text block (used by both slide types) ── */
function DesktopText({ slide }: { slide: Slide }) {
  return (
    <div
      className="hidden md:flex md:flex-col md:items-end md:text-right absolute"
      style={{
        right: "5.5%",
        top: "50%",
        transform: "translateY(-50%)",
        maxWidth: "40%",
        zIndex: 3,
      }}
    >
      <p
        className="font-oswald text-yellow-400 uppercase leading-none"
        style={{
          fontSize: "clamp(1.8rem, 3.8vw, 3rem)",
          letterSpacing: "0.07em",
          textShadow: "0 2px 8px rgba(0,0,0,0.55)",
        }}
      >
        {slide.topText}
      </p>
      <h2
        className="font-oswald text-white uppercase leading-none"
        style={{
          fontSize: "clamp(3.2rem, 8vw, 5.75rem)",
          letterSpacing: "0.04em",
          textShadow: "0 3px 14px rgba(0,0,0,0.65)",
        }}
      >
        {slide.mainText}
      </h2>
      <p
        className="text-white mt-4 leading-relaxed opacity-95"
        style={{
          fontSize: "clamp(0.72rem, 1vw, 0.875rem)",
          textShadow: "0 1px 5px rgba(0,0,0,0.6)",
          maxWidth: "290px",
        }}
      >
        {slide.description}
      </p>
      <div className="flex items-end justify-end gap-3 mt-6 flex-wrap">
        <Link
          href={slide.link}
          className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.18em] text-[11px] bg-accent-blue text-white rounded-sm px-7 py-3 hover:bg-blue-500 transition-all duration-200"
        >
          VIEW RANGE
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
        <CatalogViewer label="VIEW CATALOG" variant="hero-desktop" />
      </div>
    </div>
  );
}

/* ── Shared mobile text block ── */
function MobileText({ slide }: { slide: Slide }) {
  return (
    <div className="block md:hidden absolute inset-x-0 bottom-0 z-10 px-5 pb-6">
      <p
        className="font-oswald text-yellow-400 uppercase leading-none"
        style={{
          fontSize: "clamp(0.8rem, 3.8vw, 1.15rem)",
          letterSpacing: "0.12em",
        }}
      >
        {slide.topText}
      </p>
      <h2
        className="font-oswald text-white uppercase leading-none mt-1"
        style={{
          fontSize: "clamp(1.9rem, 8.5vw, 2.75rem)",
          letterSpacing: "0.03em",
        }}
      >
        {slide.mainText}
      </h2>
      <p
        className="text-white/80 mt-2 leading-snug"
        style={{ fontSize: "clamp(0.68rem, 2.8vw, 0.8rem)" }}
      >
        {slide.description}
      </p>
      <div className="flex items-center gap-2.5 mt-4 flex-wrap">
        <Link
          href={slide.link}
          className="inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.16em] text-[9.5px] bg-accent-blue text-white rounded-sm px-5 py-2.5 hover:bg-blue-500 transition-all duration-200"
        >
          VIEW RANGE
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
        <CatalogViewer label="VIEW CATALOG" variant="hero-mobile" />
      </div>
    </div>
  );
}

/* ── Shared desktop gradient overlay ── */
const desktopGradient =
  "linear-gradient(to left, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 42%, transparent 68%)";

export default function Hero({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const count = slides.length;

  const next = useCallback(
    () => setCurrent((c) => (count ? (c + 1) % count : 0)),
    [count],
  );
  const prev = useCallback(
    () => setCurrent((c) => (count ? (c - 1 + count) % count : 0)),
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
  };

  if (count === 0) return null;

  return (
    <div
      className="relative w-full flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100vh-102px)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative w-full overflow-hidden flex-1">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === current ? 1 : 0,
              zIndex: index === current ? 1 : 0,
              transition: "opacity 1.3s ease-in-out",
              pointerEvents: index === current ? "auto" : "none",
            }}
          >
            {slide.fullWidth ? (
              /* ═══ FULL-WIDTH SLIDE ═══ */
              <>
                {/* Mobile */}
                <div className="block md:hidden absolute inset-0">
                  <Image
                    src={slide.mbImage}
                    alt={slide.mainText}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 38%, transparent 68%)",
                    }}
                  />
                </div>

                {/* Desktop */}
                <div className="hidden md:block absolute inset-0">
                  <Image
                    src={slide.pcImage}
                    alt={slide.mainText}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: desktopGradient, zIndex: 2 }}
                  />
                </div>

                <MobileText slide={slide} />
                <DesktopText slide={slide} />
              </>
            ) : (
              /* ═══ SPLIT-PANEL SLIDE ═══ */
              <>
                {/* Mobile: diagonal split */}
                <div className="block md:hidden absolute inset-0">
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: "polygon(0 0, 58% 0, 48% 100%, 0 100%)",
                      zIndex: 0,
                    }}
                  >
                    <Image
                      src={slide.leftImage}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="60vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: "polygon(53% 0, 100% 0, 100% 100%, 43% 100%)",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src={slide.rightImage}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="60vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 36%, transparent 60%)",
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* Desktop: blended two-image composition */}
                <div className="hidden md:block absolute inset-0">
                  {/* Left product, fades out on right edge */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: "55%", zIndex: 0 }}
                  >
                    <div
                      className="relative w-full h-full"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, black 50%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, black 50%, transparent 100%)",
                      }}
                    >
                      <Image
                        src={slide.leftImage}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="55vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  </div>
                  {/* Right product, fades out on left edge */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ left: "25%", width: "45%", zIndex: 1 }}
                  >
                    <div
                      className="relative w-full h-full"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)",
                      }}
                    >
                      <Image
                        src={slide.rightImage}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="45vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </div>
                  </div>
                  {/* Same gradient overlay as fullWidth slide */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: desktopGradient, zIndex: 2 }}
                  />
                </div>

                <MobileText slide={slide} />
                <DesktopText slide={slide} />
              </>
            )}
          </div>
        ))}

        {/* ── NEON STRIPS, desktop only ── */}
        <div
          className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none hidden md:block"
          style={{ width: "64px", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              right: "44px",
              top: "-10px",
              bottom: "-10px",
              width: "13px",
              background: "#6dff4e",
              opacity: 0.88,
              transform: "skewX(-5deg)",
              transformOrigin: "top center",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "24px",
              top: "-10px",
              bottom: "-10px",
              width: "11px",
              background: "#ffd700",
              transform: "skewX(-5deg)",
              transformOrigin: "top center",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "6px",
              top: "-10px",
              bottom: "-10px",
              width: "9px",
              background: "#00e5ff",
              transform: "skewX(-5deg)",
              transformOrigin: "top center",
            }}
          />
        </div>

        {/* ── ARROWS ── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors hidden sm:flex items-center justify-center"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors hidden sm:flex items-center justify-center right-4 md:right-[72px]"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

      </div>

      {/* ── BOTTOM DASH STRIP ── */}
      <div
        className="w-full flex items-center justify-center shrink-0"
        style={{ height: "40px", background: "#1a1a1a" }}
      >
        <div className="flex items-center" style={{ gap: "6px" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative flex items-center justify-center cursor-pointer border-none bg-transparent"
              style={{ width: "36px", height: "32px", padding: 0 }}
            >
              <span
                style={{
                  width: "28px",
                  height: "3px",
                  borderRadius: "2px",
                  background:
                    i === current ? "#ffffff" : "rgba(255,255,255,0.32)",
                  transition: "background 0.3s ease",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
