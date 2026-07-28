"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CatalogViewer from "@/components/CatalogViewer";

type PricingFields = {
  startingPrice?: number;
  sampleKitPrice?: number;
  startingPriceLabel?: string;
  startingPriceUnit?: string;
  priceCurrency?: string;
};

type SplitSlide = PricingFields & {
  fullWidth?: false;
  leftImage: string;
  rightImage: string;
  topText: string;
  mainText: string;
  description: string;
  link: string;
};

type FullWidthSlide = PricingFields & {
  fullWidth: true;
  pcImage: string;
  mbImage: string;
  topText: string;
  mainText: string;
  description: string;
  link: string;
};

type Slide = SplitSlide | FullWidthSlide;

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function ArrowIcon() {
  return (
    <svg
      className="shrink-0"
      style={{ width: "1em", height: "1em" }}
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
  );
}

function PricingBlock({
  slide,
  variant,
}: {
  slide: Slide;
  variant: "desktop" | "mobile";
}) {
  const hasStarting =
    typeof slide.startingPrice === "number" &&
    Number.isFinite(slide.startingPrice);
  if (!hasStarting) return null;

  const currency = slide.priceCurrency || "USD";
  const startingLabel = slide.startingPriceLabel || "UNIFORMS STARTING FROM";
  const startingUnit = slide.startingPriceUnit || "PER UNIFORM";
  const startingFormatted = formatPrice(slide.startingPrice as number, currency);

  const hasSample =
    typeof slide.sampleKitPrice === "number" &&
    Number.isFinite(slide.sampleKitPrice);
  const sampleFormatted = hasSample
    ? formatPrice(slide.sampleKitPrice as number, currency)
    : "";

  const isDesktop = variant === "desktop";

  const btnBase = isDesktop
    ? "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.16em] rounded-sm transition-all duration-200 w-full"
    : "inline-flex items-center justify-center gap-1.5 font-bold uppercase tracking-[0.14em] rounded-sm transition-all duration-200 w-full";

  const btnStyle: React.CSSProperties = isDesktop
    ? {
        fontSize: "clamp(0.62rem, 0.72vw, 0.75rem)",
        padding:
          "clamp(0.65rem, 0.9vw, 0.85rem) clamp(1rem, 1.6vw, 1.6rem)",
      }
    : {
        fontSize: "clamp(0.55rem, 2.5vw, 0.72rem)",
        padding:
          "clamp(0.6rem, 2.6vw, 0.8rem) clamp(0.8rem, 3.2vw, 1.15rem)",
      };

  const startingPriceContent = (
    <div className="text-left">
      <p
        className="font-oswald text-white uppercase font-semibold leading-none"
        style={{
          fontSize: isDesktop
            ? "clamp(0.64rem, 0.72vw, 0.76rem)"
            : "clamp(0.54rem, 2.55vw, 0.7rem)",
          letterSpacing: "0.14em",
          textShadow: "0 1px 5px rgba(0,0,0,0.7)",
        }}
      >
        {startingLabel}
      </p>
      <p
        className="font-oswald text-orange-400 leading-none font-bold"
        style={{
          fontSize: isDesktop
            ? "clamp(1.9rem, 2.85vw, 2.85rem)"
            : "clamp(1.35rem, 6.2vw, 1.85rem)",
          marginTop: isDesktop ? "0.45rem" : "0.3rem",
          textShadow: "0 2px 10px rgba(0,0,0,0.65)",
        }}
      >
        {startingFormatted}
      </p>
      {startingUnit && (
        <p
          className="font-oswald text-white/85 uppercase font-medium leading-none"
          style={{
            fontSize: isDesktop
              ? "clamp(0.58rem, 0.66vw, 0.7rem)"
              : "clamp(0.48rem, 2.25vw, 0.62rem)",
            marginTop: isDesktop ? "0.55rem" : "0.38rem",
            letterSpacing: "0.16em",
            textShadow: "0 1px 5px rgba(0,0,0,0.7)",
          }}
        >
          {startingUnit}
        </p>
      )}
    </div>
  );

  const sampleKitContent = hasSample ? (
    <div
      className="rounded-md flex flex-col items-center justify-center"
      style={{
        border: "2px dashed rgba(251,146,60,0.9)",
        padding: isDesktop
          ? "clamp(0.7rem, 1vw, 0.95rem) clamp(0.95rem, 1.35vw, 1.2rem)"
          : "clamp(0.45rem, 2vw, 0.65rem) clamp(0.6rem, 2.6vw, 0.85rem)",
      }}
    >
      <p
        className="font-oswald text-white uppercase font-semibold leading-none text-center"
        style={{
          fontSize: isDesktop
            ? "clamp(0.64rem, 0.72vw, 0.76rem)"
            : "clamp(0.54rem, 2.55vw, 0.7rem)",
          letterSpacing: "0.16em",
          textShadow: "0 1px 5px rgba(0,0,0,0.7)",
        }}
      >
        SAMPLE KIT
      </p>
      <p
        className="font-oswald text-orange-400 leading-none font-bold"
        style={{
          fontSize: isDesktop
            ? "clamp(1.5rem, 2.15vw, 2.25rem)"
            : "clamp(1.1rem, 4.8vw, 1.55rem)",
          marginTop: isDesktop ? "0.5rem" : "0.35rem",
          textShadow: "0 2px 10px rgba(0,0,0,0.65)",
        }}
      >
        {sampleFormatted}
      </p>
    </div>
  ) : null;

  const getQuoteButton = (
    <Link
      href="/contact"
      className={`${btnBase} bg-orange-500 text-white border-2 border-orange-500 hover:bg-orange-600 hover:border-orange-600`}
      style={btnStyle}
    >
      GET QUOTE
      <ArrowIcon />
    </Link>
  );

  const orderSampleButton = hasSample ? (
    <Link
      href="/contact?sample=1"
      className={`${btnBase} bg-white text-[#0f1830] border-2 border-white hover:bg-transparent hover:text-white`}
      style={btnStyle}
    >
      ORDER SAMPLE
      <ArrowIcon />
    </Link>
  ) : null;

  /* ── Mobile: two stacked rows — prices row, then buttons row ── */
  if (!isDesktop) {
    return (
      <div className="mt-3 w-full">
        <div className="flex items-end gap-2 w-full">
          <div className="flex-1 min-w-0">{startingPriceContent}</div>
          {sampleKitContent && (
            <div className="flex-1 min-w-0">{sampleKitContent}</div>
          )}
        </div>
        <div className="mt-3 flex items-stretch gap-2 w-full">
          <div className="flex-1 min-w-0">{getQuoteButton}</div>
          {orderSampleButton && (
            <div className="flex-1 min-w-0">{orderSampleButton}</div>
          )}
        </div>
      </div>
    );
  }

  /* ── Desktop: two aligned columns — price on top, button below ── */
  return (
    <div className="mt-4 lg:mt-5 flex items-end gap-3 lg:gap-4 flex-wrap justify-end text-left w-full">
      <div
        className="flex flex-col items-stretch text-left"
        style={{ width: "clamp(220px, 20vw, 280px)" }}
      >
        {startingPriceContent}
        <div className="mt-3">{getQuoteButton}</div>
      </div>
      {sampleKitContent && (
        <div
          className="flex flex-col items-stretch"
          style={{ width: "clamp(170px, 15vw, 210px)" }}
        >
          {sampleKitContent}
          <div className="mt-3">{orderSampleButton}</div>
        </div>
      )}
    </div>
  );
}

/* ── Shared desktop text block (used by both slide types) ── */
function DesktopText({ slide }: { slide: Slide }) {
  const hasPricing =
    typeof slide.startingPrice === "number" &&
    Number.isFinite(slide.startingPrice);
  return (
    <div
      className="hidden md:flex md:flex-col md:items-end md:text-right absolute"
      style={{
        right: "5.5%",
        top: "50%",
        transform: "translateY(-50%)",
        maxWidth: hasPricing ? "min(52%, 560px)" : "min(42%, 480px)",
        width: hasPricing ? "min(52%, 560px)" : undefined,
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
      {hasPricing ? (
        <PricingBlock slide={slide} variant="desktop" />
      ) : (
        <div className="flex items-end justify-end gap-3 mt-6 flex-wrap">
          <Link
            href={slide.link}
            className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.18em] text-[11px] bg-orange-500 text-white rounded-sm px-7 py-3 hover:bg-orange-600 transition-all duration-200"
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
      )}
    </div>
  );
}

/* ── Shared mobile text block ── */
function MobileText({ slide }: { slide: Slide }) {
  const hasPricing =
    typeof slide.startingPrice === "number" &&
    Number.isFinite(slide.startingPrice);
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
      {hasPricing ? (
        <PricingBlock slide={slide} variant="mobile" />
      ) : (
        <div className="flex items-center gap-2.5 mt-4 flex-wrap">
          <Link
            href={slide.link}
            className="inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.16em] text-[9.5px] bg-orange-500 text-white rounded-sm px-5 py-2.5 hover:bg-orange-600 transition-all duration-200"
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
      )}
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
