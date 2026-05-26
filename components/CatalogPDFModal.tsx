"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDF_PATH = "/catalog/PRODUCT-BIGHOPE.PDF.pdf";

interface Props {
  onClose: () => void;
}

export default function CatalogPDFModal({ onClose }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [ready, setReady] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstPageRendered = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const onPageRender = useCallback(() => {
    if (!firstPageRendered.current) {
      firstPageRendered.current = true;
      setReady(true);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.87)", zIndex: 99999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex flex-col w-full sm:rounded-xl overflow-hidden shadow-2xl"
        style={{
          maxWidth: "980px",
          height: "97dvh",
          background: "#525659",
          animation: "catalogFadeIn 0.18s cubic-bezier(0.4,0,0.2,1) both",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 flex-shrink-0"
          style={{
            background: "#111827",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            minHeight: "44px",
          }}
        >
          <a
            href={PDF_PATH}
            download="BigHopeSports-ProductCatalog.pdf"
            className="flex items-center gap-2 font-semibold text-white hover:text-orange-400 transition-colors select-none"
            style={{ fontSize: "13px" }}
          >
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </a>

          <div className="flex items-center gap-4">
            <a
              href={PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors select-none"
              style={{ fontSize: "13px" }}
            >
              <svg
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Open in new tab
            </a>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Loading overlay — covers until first page is painted */}
        {!ready && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "#525659", zIndex: 10, top: "44px" }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="catalogSpinner" />
              <span className="text-white/70 text-sm">
                Loading catalog...
              </span>
            </div>
          </div>
        )}

        {/* PDF pages */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto"
          style={{ background: "#525659" }}
        >
          <Document
            file={PDF_PATH}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            loading={null}
            error={
              <div className="flex items-center justify-center py-20 text-white text-sm">
                Failed to load catalog.
              </div>
            }
          >
            {numPages > 0 &&
              Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={`page_${i + 1}`}
                  pageNumber={i + 1}
                  width={containerWidth > 0 ? containerWidth : undefined}
                  className="catalogPage"
                  onRenderSuccess={i === 0 ? onPageRender : undefined}
                  loading={null}
                />
              ))}
          </Document>
        </div>
      </div>

      <style>{`
        @keyframes catalogFadeIn {
          from { transform: scale(0.96); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes catalogSpin {
          to { transform: rotate(360deg); }
        }
        .catalogSpinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: #f97316;
          border-radius: 50%;
          animation: catalogSpin 0.7s linear infinite;
        }
        .catalogPage canvas {
          display: block;
        }
      `}</style>
    </div>
  );
}
