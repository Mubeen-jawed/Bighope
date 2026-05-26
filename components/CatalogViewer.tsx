"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const CatalogPDFModal = dynamic(() => import("./CatalogPDFModal"), {
  ssr: false,
});

interface CatalogViewerProps {
  label?: string;
  variant?: "hero-desktop" | "hero-mobile" | "section-blue" | "section-dark";
}

export default function CatalogViewer({
  label = "VIEW CATALOG",
  variant = "section-blue",
}: CatalogViewerProps) {
  const [open, setOpen] = useState(false);

  const btnClass = (() => {
    const base =
      "inline-flex items-center gap-2 font-bold uppercase transition-all duration-200";
    switch (variant) {
      case "hero-desktop":
      case "hero-mobile":
        return `${base} border border-white/40 text-white bg-navy-dark/50 rounded-sm hover:bg-navy-dark/70 hover:border-white/60 transition-all duration-200`;
      case "section-dark":
        return `${base} border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg hover:-translate-y-0.5`;
      case "section-blue":
      default:
        return `${base} bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg hover:-translate-y-0.5 text-sm tracking-wide`;
    }
  })();

  const btnStyle: React.CSSProperties =
    variant === "hero-desktop"
      ? { padding: "12px 28px", fontSize: "11px", letterSpacing: "0.18em" }
      : variant === "hero-mobile"
        ? { padding: "10px 22px", fontSize: "9.5px", letterSpacing: "0.16em" }
        : {};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={btnClass}
        style={btnStyle}
        aria-label="Open product catalog"
      >
        <svg
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        {label}
      </button>

      {open && <CatalogPDFModal onClose={() => setOpen(false)} />}
    </>
  );
}
