"use client";

import { useState } from "react";

// ─── Size data (matches official BH chart images) ─────────────────────────────

type Cat = "youth" | "men" | "women";

const TSHIRT: Record<
  Cat,
  { label: string; sizes: { size: string; w: string; h: string }[] }
> = {
  youth: {
    label: "Youth",
    sizes: [
      { size: "YXS", w: "13.5", h: "19.5" },
      { size: "YS", w: "16", h: "22.5" },
      { size: "YM", w: "17", h: "23.5" },
      { size: "YL", w: "18", h: "24.5" },
      { size: "YXL", w: "19", h: "25.5" },
    ],
  },
  men: {
    label: "Adult Men",
    sizes: [
      { size: "AS", w: "20", h: "27" },
      { size: "AM", w: "21", h: "28" },
      { size: "AL", w: "22.5", h: "29" },
      { size: "AXL", w: "24", h: "30" },
      { size: "A2XL", w: "25.5", h: "31" },
      { size: "A3XL", w: "27", h: "32" },
    ],
  },
  women: {
    label: "Adult Women",
    sizes: [
      { size: "WS", w: "18", h: "25" },
      { size: "WM", w: "19", h: "26" },
      { size: "WL", w: "20", h: "27" },
      { size: "WXL", w: "21.5", h: "28" },
      { size: "W2XL", w: "23", h: "29" },
      { size: "W3XL", w: "24.5", h: "30" },
    ],
  },
};

const SHORTS: Record<
  Cat,
  { label: string; sizes: { size: string; waist: string; out: string }[] }
> = {
  youth: {
    label: "Youth",
    sizes: [
      { size: "YXS", waist: "9.5", out: "10.5" },
      { size: "YS", waist: "10.5", out: "13" },
      { size: "YM", waist: "11.5", out: "13.5" },
      { size: "YL", waist: "12.5", out: "14.5" },
      { size: "YXL", waist: "13.5", out: "15" },
    ],
  },
  men: {
    label: "Adult Men",
    sizes: [
      { size: "AS", waist: "12.5", out: "18.5" },
      { size: "AM", waist: "13.5", out: "19" },
      { size: "AL", waist: "14.5", out: "19" },
      { size: "AXL", waist: "15.5", out: "19.5" },
      { size: "A2XL", waist: "17.5", out: "20" },
      { size: "A3XL", waist: "19", out: "21" },
    ],
  },
  women: {
    label: "Adult Women",
    sizes: [
      { size: "WS", waist: "13", out: "17" },
      { size: "WM", waist: "14", out: "17.5" },
      { size: "WL", waist: "15", out: "18" },
      { size: "WXL", waist: "16", out: "18.5" },
      { size: "W2XL", waist: "17", out: "19" },
      { size: "W3XL", waist: "18", out: "19.5" },
    ],
  },
};

// ─── SVG primitive helpers ────────────────────────────────────────────────────

const RED = "#ef4444";
const NAVY = "#1e3056";
const AH = 7; // arrowhead tip-to-base half-height

/** Filled arrowhead pointing in direction d at position (x,y) */
function AHead({
  x,
  y,
  d,
}: {
  x: number;
  y: number;
  d: "L" | "R" | "U" | "D";
}) {
  const pts =
    d === "L"
      ? `${x},${y} ${x + AH},${y - 4} ${x + AH},${y + 4}`
      : d === "R"
        ? `${x},${y} ${x - AH},${y - 4} ${x - AH},${y + 4}`
        : d === "U"
          ? `${x},${y} ${x - 4},${y + AH} ${x + 4},${y + AH}`
          : `${x},${y} ${x - 4},${y - AH} ${x + 4},${y - AH}`;
  return <polygon points={pts} fill={RED} />;
}

/**
 * Navy pill badge with label text.
 * Pass label as "WORD" for single line, or "WORD1/WORD2" for two lines.
 */
function Badge({ cx, cy, label }: { cx: number; cy: number; label: string }) {
  const lines = label.split("/");
  const twoLine = lines.length > 1;
  const bw = twoLine ? 44 : Math.max(label.length * 6.8 + 10, 38);

  return (
    <g>
      <rect
        x={cx - bw / 2}
        y={cy - 12}
        width={bw}
        height={24}
        rx={12}
        fill={NAVY}
      />
      {twoLine ? (
        <>
          <text
            x={cx}
            y={cy - 3}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="7"
            fontWeight="bold"
          >
            {lines[0]}
          </text>
          <text
            x={cx}
            y={cy + 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="7"
            fontWeight="bold"
          >
            {lines[1]}
          </text>
        </>
      ) : (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="7.5"
          fontWeight="bold"
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Red pill showing the measurement value */
function Val({ cx, cy, v }: { cx: number; cy: number; v: string }) {
  const text = `${v}"`;
  const w = Math.max(text.length * 8 + 8, 40);
  return (
    <g>
      <rect
        x={cx - w / 2}
        y={cy - 11}
        width={w}
        height={22}
        rx={5}
        fill={RED}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="11"
        fontWeight="bold"
      >
        {text}
      </text>
    </g>
  );
}

// ─── T-Shirt SVG diagram ─────────────────────────────────────────────────────
//
//  Shirt body:  x 80–240, y 70–280
//  Left sleeve: (80,78)→(32,92)→(50,132)→(80,115)
//  Right sleeve:(240,78)→(288,92)→(270,132)→(240,115)
//  WIDTH arrow: horizontal at y=150, badge right, value left
//  HEIGHT arrow:vertical at x=92, badge & value on the left side inside body

function TshirtDiagram({ width, height }: { width: string; height: string }) {
  return (
    <svg
      viewBox="0 0 320 308"
      className="w-full"
      aria-label="T-shirt measurement diagram"
    >
      {/* ── Shirt silhouette ── */}
      <path
        d="M 112,70 C 132,51 188,51 208,70
           L 240,76 L 288,91 L 270,132 L 240,116
           L 240,280 L 80,280
           L 80,116 L 50,132 L 32,91 L 80,76 Z"
        fill="#e5e7eb"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Dark collar trim */}
      <path
        d="M 112,70 C 132,51 188,51 208,70 C 192,84 128,84 112,70 Z"
        fill="#374151"
      />

      {/* ── WIDTH annotation (y = 150) ── */}
      {/* End tick marks */}
      <line x1="80" y1="144" x2="80" y2="156" stroke={RED} strokeWidth="1.5" />
      <line
        x1="240"
        y1="144"
        x2="240"
        y2="156"
        stroke={RED}
        strokeWidth="1.5"
      />
      {/* Main arrow line */}
      <line x1="80" y1="150" x2="240" y2="150" stroke={RED} strokeWidth="2" />
      <AHead x={80} y={150} d="L" />
      <AHead x={240} y={150} d="R" />
      {/* Badge at right, value at left-center */}
      <Badge cx={203} cy={150} label="WIDTH" />
      <Val cx={132} cy={150} v={width} />

      {/* ── HEIGHT annotation (x = 92) ── */}
      {/* End tick marks */}
      <line x1="86" y1="70" x2="98" y2="70" stroke={RED} strokeWidth="1.5" />
      <line x1="86" y1="280" x2="98" y2="280" stroke={RED} strokeWidth="1.5" />
      {/* Main arrow line */}
      <line x1="92" y1="70" x2="92" y2="280" stroke={RED} strokeWidth="2" />
      <AHead x={92} y={70} d="U" />
      <AHead x={92} y={280} d="D" />
      {/* Badge then value – both centred at x=92, well below the WIDTH crossing */}
      <Badge cx={92} cy={192} label="HEIGHT" />
      <Val cx={92} cy={220} v={height} />
    </svg>
  );
}

// ─── Shorts SVG diagram ───────────────────────────────────────────────────────
//
//  Waistband:    x 78–242, y 50–74 (dark charcoal rect)
//  Shorts body:  y 74–262, crotch meets at (160, 138)
//  WAIST arrow:  horizontal at y=62 (waistband midpoint)
//  OUTSEAM arrow:vertical at x=52, from top of waistband (y=50) to hem (y=262)

function ShortsDiagram({ waist, outseam }: { waist: string; outseam: string }) {
  const bodyPath = `
    M 78,74 L 242,74
    C 242,118 248,188 240,262
    L 204,262
    C 198,196 178,153 160,139
    C 142,153 122,196 116,262
    L 80,262
    C 72,188 78,118 78,74 Z
  `;

  return (
    <svg
      viewBox="0 0 320 284"
      className="w-full"
      aria-label="Shorts measurement diagram"
    >
      {/* ── Shorts body ── */}
      <path
        d={bodyPath}
        fill="#e5e7eb"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* ── Waistband (dark) ── */}
      <rect x="78" y="50" width="164" height="24" rx="3" fill="#374151" />

      {/* Center seam hint */}
      <line
        x1="160"
        y1="74"
        x2="160"
        y2="139"
        stroke="#9ca3af"
        strokeWidth="1"
        strokeDasharray="4,3"
      />

      {/* ── WAIST annotation (y = 62, middle of waistband) ── */}
      <line x1="78" y1="56" x2="78" y2="68" stroke={RED} strokeWidth="1.5" />
      <line x1="242" y1="56" x2="242" y2="68" stroke={RED} strokeWidth="1.5" />
      <line x1="78" y1="62" x2="242" y2="62" stroke={RED} strokeWidth="2" />
      <AHead x={78} y={62} d="L" />
      <AHead x={242} y={62} d="R" />
      <Badge cx={200} cy={62} label="WAIST" />
      <Val cx={127} cy={62} v={waist} />

      {/* ── OUTSEAM annotation (x = 52, from y=50 to y=262) ── */}
      <line x1="45" y1="50" x2="59" y2="50" stroke={RED} strokeWidth="1.5" />
      <line x1="45" y1="262" x2="59" y2="262" stroke={RED} strokeWidth="1.5" />
      <line x1="52" y1="50" x2="52" y2="262" stroke={RED} strokeWidth="2" />
      <AHead x={52} y={50} d="U" />
      <AHead x={52} y={262} d="D" />
      {/* Badge & value sit left of the shorts body (entirely outside it) */}
      <Badge cx={52} cy={142} label="OUT/SEAM" />
      <Val cx={52} cy={170} v={outseam} />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TshirtsTemplateDiagram() {
  const [cat, setCat] = useState<Cat>("men");
  const [tIdx, setTIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);

  const tData = TSHIRT[cat];
  const sData = SHORTS[cat];
  const tSize = tData.sizes[tIdx];
  const sSize = sData.sizes[sIdx];

  const handleCat = (c: Cat) => {
    setCat(c);
    setTIdx(0);
    setSIdx(0);
  };

  const catTabs: { id: Cat; label: string }[] = [
    { id: "youth", label: "Youth" },
    { id: "men", label: "Adult Men" },
    { id: "women", label: "Adult Women" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 mb-10">
      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-5">
        <span className="text-2xl leading-none mt-0.5">📐</span>
        <div>
          <h3 className="font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase tracking-wide text-base">
            Interactive Measurement Guide
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Select a category &amp; size, measurements update on the template
            below
          </p>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {catTabs.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCat(c.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
              cat === c.id
                ? "bg-[#1e3056] text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#1e3056]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Diagram cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* T-Shirt */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              T-Shirt / Jersey
            </h4>
            <select
              value={tIdx}
              onChange={(e) => setTIdx(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white
                         focus:outline-none focus:ring-2 focus:ring-[#1e3056] cursor-pointer"
            >
              {tData.sizes.map((s, i) => (
                <option key={s.size} value={i}>
                  {s.size}
                </option>
              ))}
            </select>
          </div>

          <div className="px-2">
            <TshirtDiagram width={tSize.w} height={tSize.h} />
          </div>

          {/* Value summary below diagram */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-orange-50 border border-orange-100 p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                Width
              </div>
              <div className="text-2xl font-bold text-orange-500 leading-none">
                {tSize.w}&quot;
              </div>
              <div className="text-xs text-gray-400 mt-1">
                pit-to-pit (flat)
              </div>
            </div>
            <div className="rounded-lg bg-orange-50 border border-orange-100 p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                Height
              </div>
              <div className="text-2xl font-bold text-orange-500 leading-none">
                {tSize.h}&quot;
              </div>
              <div className="text-xs text-gray-400 mt-1">collar to hem</div>
            </div>
          </div>
        </div>

        {/* Shorts */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Shorts
            </h4>
            <select
              value={sIdx}
              onChange={(e) => setSIdx(Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white
                         focus:outline-none focus:ring-2 focus:ring-[#1e3056] cursor-pointer"
            >
              {sData.sizes.map((s, i) => (
                <option key={s.size} value={i}>
                  {s.size}
                </option>
              ))}
            </select>
          </div>

          <div className="px-2">
            <ShortsDiagram waist={sSize.waist} outseam={sSize.out} />
          </div>

          {/* Value summary */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-orange-50 border border-orange-100 p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                Waist
              </div>
              <div className="text-2xl font-bold text-orange-500 leading-none">
                {sSize.waist}&quot;
              </div>
              <div className="text-xs text-gray-400 mt-1">flat across band</div>
            </div>
            <div className="rounded-lg bg-orange-50 border border-orange-100 p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                Outseam
              </div>
              <div className="text-2xl font-bold text-orange-500 leading-none">
                {sSize.out}&quot;
              </div>
              <div className="text-xs text-gray-400 mt-1">waist to hem</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-5 text-center italic">
        All measurements in inches (flat lay). Width = pit-to-pit = half chest
        circumference. Contact us for CM charts or custom sizing.
      </p>
    </div>
  );
}
