"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Props {
  images: { src: string; alt: string }[];
  badge?: string;
}

export default function ProductGallery({ images, badge }: Props) {
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin({ x, y });
    },
    []
  );

  return (
    <div className="flex flex-col gap-3 max-w-full sm:max-w-sm mx-auto">
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 cursor-crosshair"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="relative" style={{ aspectRatio: "3/4" }}>
          <Image
            src={images[active].src}
            alt={images[active].alt}
            fill
            priority
            className="object-contain object-center transition-transform duration-200 ease-out"
            style={{
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transform: zooming ? "scale(2.5)" : "scale(1)",
            }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {badge && !zooming && (
            <div className="absolute top-4 left-4 bg-[#1e3056] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide z-10">
              {badge}
            </div>
          )}
          {images.length > 1 && !zooming && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {active + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative flex-shrink-0 w-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                i === active
                  ? "border-orange-500 shadow-md"
                  : "border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100"
              }`}
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={img.src}
                alt={`${img.alt} view ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
