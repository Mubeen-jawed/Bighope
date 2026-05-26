"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface PackageImage {
  src: string;
  tier: string | null;
  tierColor: string | null;
}

interface Props {
  images: PackageImage[];
  sport: string;
}

export default function PackageGallery({ images, sport }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const openAt = (i: number) => {
    setActiveIndex(i);
    resetView();
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    resetView();
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
    resetView();
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
    resetView();
  }, [images.length]);

  /* ── double-click: zoom in 33%, reset after 3× ── */
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((s) => {
      const next = parseFloat((s + 0.33).toFixed(2));
      if (next > 3) {
        setPosition({ x: 0, y: 0 });
        return 1;
      }
      return next;
    });
  }, []);

  /* ── scroll-wheel fine zoom ── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setScale((s) => {
      const next = parseFloat(Math.min(4, Math.max(1, s + delta)).toFixed(2));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  /* ── drag to pan (only when zoomed) ── */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [scale, position],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ── backdrop click closes only when clicking the backdrop itself ── */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) close();
    },
    [close],
  );

  /* ── keyboard ── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, goNext, goPrev]);

  const zoomPct = Math.round(scale * 100);

  return (
    <>
      {/* ── Thumbnail grid ─────────────────────────────────── */}
      {images.length === 1 ? (
        <div
          className="max-w-xl mx-auto cursor-zoom-in"
          onClick={() => openAt(0)}
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white group"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src={images[0].src}
              alt={`${sport} Packages`}
              fill
              className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 580px"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={img.tier}
              className="flex flex-col items-center gap-3 cursor-zoom-in"
              onClick={() => openAt(i)}
            >
              <span
                className={`${img.tierColor} text-white text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-md`}
              >
                {img.tier} Package
              </span>
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={img.src}
                  alt={`${sport} ${img.tier} Package`}
                  fill
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Lightbox ───────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center select-none"
          onClick={handleBackdropClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Close button */}
          <button
            aria-label="Close"
            className="absolute top-5 right-5 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2.5 transition-colors shadow"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Zoom level badge */}
          {scale !== 1 && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 bg-gray-100 text-gray-700 text-xs font-bold px-4 py-1.5 rounded-full shadow">
              {zoomPct}%
            </div>
          )}

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <svg
                  className="w-6 h-6"
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
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <svg
                  className="w-6 h-6"
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
            </>
          )}

          {/* Image, scale + pan transforms applied here */}
          <div
            style={{
              width: "min(90vw, 560px)",
              height: "min(90vh, 700px)",
              position: "relative",
              flexShrink: 0,
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: "center center",
              transition: isDragging
                ? "none"
                : "transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              cursor:
                scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            }}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          >
            <Image
              src={images[activeIndex].src}
              alt={`${sport} ${images[activeIndex].tier ?? ""} Package`}
              fill
              className="object-contain"
              sizes="100vw"
              draggable={false}
            />
          </div>

          {/* Tier pills */}
          {images.length > 1 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img.tier}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                    resetView();
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    i === activeIndex
                      ? `${img.tierColor} text-white scale-110`
                      : "bg-white/15 text-white/60 hover:bg-white/30"
                  }`}
                >
                  {img.tier}
                </button>
              ))}
            </div>
          )}

          {/* Hint text */}
          <p className="absolute bottom-5 right-5 z-20 text-gray-400 text-xs pointer-events-none">
            {scale > 1
              ? "Drag to pan · Double-click to zoom · Scroll to adjust"
              : "Double-click to zoom · Scroll to zoom"}
          </p>
        </div>
      )}
    </>
  );
}
