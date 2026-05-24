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

const slides: Slide[] = [
  {
    fullWidth: true,
    pcImage: "/slider/SLIDER.PC.1.png",
    mbImage: "/slider/SLIDER.MB.1.png",
    topText: "CUSTOM SPORTSWEAR",
    mainText: "BUILT FOR CHAMPIONS",
    description:
      "Premium fully-sublimated uniforms for every sport — designed by you, crafted by us.",
    link: "/range/soccer",
  },
  {
    leftImage: "/images/R1-1200x1603.webp",
    rightImage: "/images/r4-1200x1603.webp",
    topText: "CUSTOM RUGBY",
    mainText: "KITS",
    description:
      "Premium quality rugby kits, 100% customized for your team. Free design service included with every order.",
    link: "/range/rugby",
  },
  {
    leftImage: "/images/gujb5mnmp1joc4vt2adt-1200x1603.webp",
    rightImage: "/images/tnslniaumiysvj3fjzvx-1200x1603.webp",
    topText: "CUSTOM SOCCER",
    mainText: "UNIFORMS",
    description:
      "Fully sublimated soccer uniforms — unlimited colors and logos. Fast turnaround, worldwide shipping.",
    link: "/range/soccer",
  },
  {
    leftImage: "/images/jmszybpmqfajrxmfre1h-1200x1603.webp",
    rightImage: "/images/qfqpanyf0uriwazouxfe-1200x1603.webp",
    topText: "7v7 FOOTBALL",
    mainText: "UNIFORMS",
    description:
      "Custom 7v7 football uniforms built for champions — designed by you, manufactured by us.",
    link: "/range/7v7",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  /* ── Touch / swipe support ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
  };

  return (
    /*
     * flex-col fills exactly (100vh − header).
     * Header: 64px mobile / 102px sm+
     */
    <div
      className="relative w-full flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100vh-102px)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── IMAGE AREA — flex-1 ─────────────────────────────── */}
      <div className="relative w-full overflow-hidden flex-1">

        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === current ? 1 : 0,
              zIndex: index === current ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
              pointerEvents: index === current ? "auto" : "none",
            }}
          >
            {slide.fullWidth ? (

              /* ════════════════════════════════════════════════════
                 FULL-WIDTH SLIDE  (slider folder images)
                 Mobile → mbImage  |  Desktop → pcImage
              ════════════════════════════════════════════════════ */
              <>
                {/* ── Mobile image + gradient ── */}
                <div className="block md:hidden absolute inset-0">
                  <Image
                    src={slide.mbImage}
                    alt={slide.mainText}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                  {/* bottom-to-top scrim for text legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 38%, transparent 68%)",
                    }}
                  />
                </div>

                {/* ── Desktop image + gradient ── */}
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
                    style={{
                      background:
                        "linear-gradient(to left, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 42%, transparent 68%)",
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* ── Mobile text (bottom-anchored) ── */}
                <div className="block md:hidden absolute inset-x-0 bottom-0 z-10 px-5 pb-6">
                  <p
                    className="font-oswald text-yellow-400 uppercase leading-none"
                    style={{ fontSize: "clamp(0.8rem, 3.8vw, 1.15rem)", letterSpacing: "0.12em" }}
                  >
                    {slide.topText}
                  </p>
                  <h2
                    className="font-oswald text-white uppercase leading-none mt-1"
                    style={{ fontSize: "clamp(1.9rem, 8.5vw, 2.75rem)", letterSpacing: "0.03em" }}
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
                      className="inline-flex items-center gap-1.5 font-bold uppercase hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200"
                      style={{
                        border: "2px solid #3b82f6",
                        color: "#3b82f6",
                        padding: "7px 18px",
                        fontSize: "9.5px",
                        letterSpacing: "0.16em",
                      }}
                    >
                      VIEW RANGE
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <CatalogViewer label="VIEW CATALOG" variant="hero-mobile" />
                  </div>
                </div>

                {/* ── Desktop text (vertically centred, right-aligned) ── */}
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
                      className="inline-flex items-center gap-2 font-bold uppercase hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200"
                      style={{
                        border: "2px solid #3b82f6",
                        color: "#3b82f6",
                        padding: "11px 30px",
                        fontSize: "11px",
                        letterSpacing: "0.18em",
                      }}
                    >
                      VIEW RANGE
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <CatalogViewer label="VIEW CATALOG" variant="hero-desktop" />
                  </div>
                </div>
              </>

            ) : (

              /* ════════════════════════════════════════════════════
                 SPLIT-PANEL SLIDE  (product images)
                 Mobile → diagonal split (both images, same angle)
                 Desktop → same diagonal split
              ════════════════════════════════════════════════════ */
              <>
                {/* ── Mobile: diagonal split — both images shown ── */}
                <div className="block md:hidden absolute inset-0">
                  {/* Left panel */}
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
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  {/* Right panel */}
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
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  {/* Bottom gradient for text legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 36%, transparent 60%)",
                      zIndex: 2,
                    }}
                  />
                </div>

                {/* ── Desktop: diagonal split ── */}
                <div
                  className="hidden md:block absolute inset-0 overflow-hidden"
                  style={{ clipPath: "polygon(0 0, 54% 0, 44% 100%, 0 100%)", zIndex: 0 }}
                >
                  <Image
                    src={slide.leftImage}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="60vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div
                  className="hidden md:block absolute inset-0 overflow-hidden"
                  style={{ clipPath: "polygon(49% 0, 100% 0, 100% 100%, 39% 100%)", zIndex: 1 }}
                >
                  <Image
                    src={slide.rightImage}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="60vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>

                {/* ── Mobile text (bottom-anchored) ── */}
                <div className="block md:hidden absolute inset-x-0 bottom-0 z-10 px-5 pb-6">
                  <p
                    className="font-oswald text-yellow-400 uppercase leading-none"
                    style={{ fontSize: "clamp(0.8rem, 3.8vw, 1.15rem)", letterSpacing: "0.12em" }}
                  >
                    {slide.topText}
                  </p>
                  <h2
                    className="font-oswald text-white uppercase leading-none mt-1"
                    style={{ fontSize: "clamp(1.9rem, 8.5vw, 2.75rem)", letterSpacing: "0.03em" }}
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
                      className="inline-flex items-center gap-1.5 font-bold uppercase hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200"
                      style={{
                        border: "2px solid #3b82f6",
                        color: "#3b82f6",
                        padding: "7px 18px",
                        fontSize: "9.5px",
                        letterSpacing: "0.16em",
                      }}
                    >
                      VIEW RANGE
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <CatalogViewer label="VIEW CATALOG" variant="hero-mobile" />
                  </div>
                </div>

                {/* ── Desktop text (right-aligned, centred vertically) ── */}
                <div
                  className="hidden md:flex md:flex-col md:items-end md:text-right absolute z-10"
                  style={{
                    right: "5.5%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    maxWidth: "40%",
                  }}
                >
                  <p
                    className="font-oswald text-yellow-400 uppercase leading-none"
                    style={{
                      fontSize: "clamp(1.8rem, 3.8vw, 3rem)",
                      letterSpacing: "0.07em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                    }}
                  >
                    {slide.topText}
                  </p>
                  <h2
                    className="font-oswald text-white uppercase leading-none"
                    style={{
                      fontSize: "clamp(3.2rem, 8vw, 5.75rem)",
                      letterSpacing: "0.04em",
                      textShadow: "0 3px 14px rgba(0,0,0,0.55)",
                    }}
                  >
                    {slide.mainText}
                  </h2>
                  <p
                    className="text-white mt-4 leading-relaxed opacity-95"
                    style={{
                      fontSize: "clamp(0.72rem, 1vw, 0.875rem)",
                      textShadow: "0 1px 5px rgba(0,0,0,0.5)",
                      maxWidth: "290px",
                    }}
                  >
                    {slide.description}
                  </p>
                  <div className="flex items-end justify-end gap-3 mt-6 flex-wrap">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 font-bold uppercase hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200"
                      style={{
                        border: "2px solid #3b82f6",
                        color: "#3b82f6",
                        padding: "11px 30px",
                        fontSize: "11px",
                        letterSpacing: "0.18em",
                      }}
                    >
                      VIEW RANGE
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <CatalogViewer label="VIEW CATALOG" variant="hero-desktop" />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {/* ── NEON STRIPS — desktop only ─────────────────────── */}
        <div
          className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none hidden md:block"
          style={{ width: "64px", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", right: "44px", top: "-10px", bottom: "-10px", width: "13px", background: "#6dff4e", opacity: 0.88, transform: "skewX(-5deg)", transformOrigin: "top center" }} />
          <div style={{ position: "absolute", right: "24px", top: "-10px", bottom: "-10px", width: "11px", background: "#ffd700", transform: "skewX(-5deg)", transformOrigin: "top center" }} />
          <div style={{ position: "absolute", right: "6px",  top: "-10px", bottom: "-10px", width: "9px",  background: "#00e5ff", transform: "skewX(-5deg)", transformOrigin: "top center" }} />
        </div>

        {/* ── ARROWS
            • hidden on phones (<sm) — swipe handles navigation
            • visible from sm (640px) upward, sized up at md        ── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors hidden sm:flex items-center justify-center"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors hidden sm:flex items-center justify-center right-4 md:right-[72px]"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── BOTTOM DASH STRIP ─────────────────────────────────── */}
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
              style={{
                width: "26px",
                height: "2px",
                borderRadius: "1px",
                background: i === current ? "#ffffff" : "rgba(255,255,255,0.32)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.3s ease",
                display: "block",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
