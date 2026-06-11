"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export type PackageSlide = {
  slug: string;
  sport: string;
  image: string;
  includes: string[];
  description: string;
  minOrder: string;
};

export default function PackagesSlider({
  slides,
}: {
  slides: PackageSlide[];
}) {
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
    const timer = setInterval(next, 7000);
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
    <section
      id="packages"
      className="relative bg-white overflow-hidden scroll-mt-20"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative flex flex-col md:block">
        {/* ── IMAGE AREA (right on desktop, top on mobile) ── */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:absolute md:inset-y-0 md:right-0 md:w-[52%]"
          style={{ background: "#ffffff" }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.slug}
              className="absolute inset-0 md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
              style={{
                opacity: index === current ? 1 : 0,
                zIndex: index === current ? 1 : 0,
                transition: "opacity 0.9s ease-in-out",
                pointerEvents: index === current ? "auto" : "none",
              }}
            >
              <Image
                src={slide.image}
                alt={`${slide.sport} Package`}
                fill
                className="object-contain object-center md:pl-[10%]"
                sizes="(max-width: 768px) 100vw, 52vw"
              />
            </div>
          ))}
        </div>

        {/* ── TEXT PANEL (left on desktop, below image on mobile) ── */}
        <div
          className="relative z-10 md:w-[56%] md:min-h-[560px] md:[clip-path:polygon(0_0,100%_0,89%_100%,0_100%)]"
          style={{ background: "#efefef" }}
        >
          <div className="px-5 sm:px-10 md:pl-[max(2.5rem,calc((100vw-80rem)/2+1rem))] md:pr-12 py-12 md:py-20 flex flex-col h-full justify-center">
            <div className="w-full max-w-xl">
            {/* Section heading */}
            <h2
              className="font-[family-name:var(--font-oswald)] font-bold uppercase leading-none text-gray-900 tracking-tight mb-8 md:mb-10"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Our <span className="text-orange-500">Packages</span>
            </h2>

            {/* Slide content, fades between packages */}
            <div className="relative">
              {slides.map((slide, index) => (
                <div
                  key={slide.slug}
                  className={
                    index === current
                      ? "relative opacity-100"
                      : "absolute inset-0 opacity-0 pointer-events-none"
                  }
                  style={{ transition: "opacity 0.5s ease-in-out" }}
                >
                  <h3 className="font-[family-name:var(--font-oswald)] font-bold uppercase text-gray-900 text-xl sm:text-2xl mb-5 tracking-wide">
                    {slide.sport} Package
                  </h3>

                  <ul className="list-disc pl-8 space-y-0.5 text-gray-700 text-sm sm:text-base mb-5">
                    {slide.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className="text-gray-700 text-sm sm:text-base mb-8 leading-relaxed line-clamp-3">
                    {slide.description} {slide.minOrder}
                  </p>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link
                      href={`/packages/${slide.slug}`}
                      className="inline-flex items-center gap-3 font-bold uppercase tracking-[0.12em] text-xs sm:text-sm bg-[#1e3056] hover:bg-[#162440] text-white rounded-lg px-7 sm:px-9 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      View Package
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="/packages"
                      className="inline-flex items-center gap-3 font-bold uppercase tracking-[0.12em] text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-7 sm:px-9 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      View All
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ── DASH INDICATORS ── */}
            {count > 1 && (
              <div className="flex items-center mt-10" style={{ gap: "8px" }}>
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Package ${i + 1}`}
                    className="relative flex items-center justify-center cursor-pointer border-none bg-transparent"
                    style={{ width: "34px", height: "24px", padding: 0 }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "4px",
                        borderRadius: "2px",
                        background: i === current ? "#f97316" : "#d1d5db",
                        transition: "background 0.3s ease",
                        display: "block",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
