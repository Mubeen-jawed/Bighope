"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
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
        return `${base} border-2 border-white bg-white text-[#0f1830] rounded-sm hover:bg-transparent hover:text-white transition-all duration-200`;
      case "section-dark":
        return `${base} border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg hover:-translate-y-0.5`;
      case "section-blue":
      default:
        return `${base} bg-[#111827] hover:bg-[#0a0f1a] text-white px-6 py-2.5 rounded-lg hover:-translate-y-0.5 text-sm tracking-wide`;
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
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {label}
      </button>

      {open &&
        createPortal(
          <CatalogPDFModal onClose={() => setOpen(false)} />,
          document.body,
        )}
    </>
  );
}
