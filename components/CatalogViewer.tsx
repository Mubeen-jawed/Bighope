"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface CatalogViewerProps {
  label?: string;
  variant?: "hero-desktop" | "hero-mobile" | "section-blue" | "section-dark";
}

const PDF_PATH = "/catalog/PRODUCT-BIGHOPE.PDF.pdf";

export default function CatalogViewer({
  label = "VIEW CATALOG",
  variant = "section-blue",
}: CatalogViewerProps) {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock / unlock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  /* ── Trigger button styles ── */
  const btnClass = (() => {
    const base = "inline-flex items-center gap-2 font-bold uppercase transition-all duration-200";
    switch (variant) {
      case "hero-desktop":
      case "hero-mobile":
        return `${base} border-2 border-white/60 text-white hover:border-white hover:bg-white hover:text-gray-900`;
      case "section-dark":
        return `${base} border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg hover:-translate-y-0.5`;
      case "section-blue":
      default:
        return `${base} bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg hover:-translate-y-0.5 text-sm tracking-wide`;
    }
  })();

  const btnStyle: React.CSSProperties =
    variant === "hero-desktop" ? { padding: "11px 30px", fontSize: "11px", letterSpacing: "0.18em" }
    : variant === "hero-mobile" ? { padding: "9px 24px",  fontSize: "11px", letterSpacing: "0.18em" }
    : {};

  /* ── Modal ── */
  const modal = open ? (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.87)", zIndex: 99999 }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="relative flex flex-col w-full sm:rounded-xl overflow-hidden shadow-2xl"
        style={{
          maxWidth: "980px",
          height: "97dvh",
          background: "#1e1e1e",
          animation: "fadeScale 0.18s cubic-bezier(0.4,0,0.2,1) both",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-4 flex-shrink-0"
          style={{
            background: "#111827",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            minHeight: "44px",
          }}
        >
          {/* Download */}
          <a
            href={PDF_PATH}
            download="BigHopeSports-ProductCatalog.pdf"
            className="flex items-center gap-2 font-semibold text-white hover:text-orange-400 transition-colors select-none"
            style={{ fontSize: "13px" }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>

          <div className="flex items-center gap-4">
            {/* Open in new tab */}
            <a
              href={PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors select-none"
              style={{ fontSize: "13px" }}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in new tab
            </a>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── PDF iframe — shown on all screen sizes ── */}
        <div className="flex-1 relative overflow-hidden">
          <iframe
            src={`${PDF_PATH}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            title="Big Hope Sports Product Catalog"
            className="w-full h-full border-0"
            style={{
              display: "block",
              background: "#525659",
            }}
            tabIndex={-1}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeScale {
          from { transform: scale(0.96); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={btnClass}
        style={btnStyle}
        aria-label="Open product catalog"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {label}
      </button>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}
