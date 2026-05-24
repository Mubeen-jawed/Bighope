import React from "react";

/**
 * All Simple-Icons paths are from the `simple-icons` npm package (v13.x).
 * viewBox is always "0 0 24 24" for Simple Icons.
 * Brand hex colours are taken directly from the simple-icons dataset.
 */

/* ─── Apple Pay ─────────────────────────────────────────────────────────────
   Source: simple-icons `siApplepay`, hex #000000
   The path already encodes the full Apple Pay badge (card frame + Apple mark
   + "Pay" wordmark) using even-odd fill so the inner shapes punch through.
   Render on a light background so the black frame reads clearly.
────────────────────────────────────────────────────────────────────────────── */
function ApplePayIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      {/* Soft light background so the black badge is legible */}
      <rect width="24" height="24" rx="4" fill="#F5F5F7" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#000000"
        d="M2.15 4.318a42.16 42.16 0 0 0-.454.003c-.15.005-.303.013-.452.04a1.44 1.44 0 0 0-1.06.772c-.07.138-.114.278-.14.43-.028.148-.037.3-.04.45A10.2 10.2 0 0 0 0 6.222v11.557c0 .07.002.138.003.207.004.15.013.303.04.452.027.15.072.291.142.429a1.436 1.436 0 0 0 .63.63c.138.07.278.115.43.142.148.027.3.036.45.04l.208.003h20.194l.207-.003c.15-.004.303-.013.452-.04.15-.027.291-.071.428-.141a1.432 1.432 0 0 0 .631-.631c.07-.138.115-.278.141-.43.027-.148.036-.3.04-.45.002-.07.003-.138.003-.208l.001-.246V6.221c0-.07-.002-.138-.004-.207a2.995 2.995 0 0 0-.04-.452 1.446 1.446 0 0 0-1.2-1.201 3.022 3.022 0 0 0-.452-.04 10.448 10.448 0 0 0-.453-.003zm0 .512h19.942c.066 0 .131.002.197.003.115.004.25.01.375.032.109.02.2.05.287.094a.927.927 0 0 1 .407.407.997.997 0 0 1 .094.288c.022.123.028.258.031.374.002.065.003.13.003.197v11.552c0 .065 0 .13-.003.196-.003.115-.009.25-.032.375a.927.927 0 0 1-.5.693 1.002 1.002 0 0 1-.286.094 2.598 2.598 0 0 1-.373.032l-.2.003H1.906c-.066 0-.133-.002-.196-.003a2.61 2.61 0 0 1-.375-.032c-.109-.02-.2-.05-.288-.094a.918.918 0 0 1-.406-.407 1.006 1.006 0 0 1-.094-.288 2.531 2.531 0 0 1-.032-.373 9.588 9.588 0 0 1-.002-.197V6.224c0-.065 0-.131.002-.197.004-.114.01-.248.032-.375.02-.108.05-.199.094-.287a.925.925 0 0 1 .407-.406 1.03 1.03 0 0 1 .287-.094c.125-.022.26-.029.375-.032.065-.002.131-.002.196-.003zm4.71 3.7c-.3.016-.668.199-.88.456-.191.22-.36.58-.316.918.338.03.675-.169.888-.418.205-.258.345-.603.308-.955zm2.207.42v5.493h.852v-1.877h1.18c1.078 0 1.835-.739 1.835-1.812 0-1.07-.742-1.805-1.808-1.805zm.852.719h.982c.739 0 1.161.396 1.161 1.089 0 .692-.422 1.092-1.164 1.092h-.979zm-3.154.3c-.45.01-.83.28-1.05.28-.235 0-.593-.264-.981-.257a1.446 1.446 0 0 0-1.23.747c-.527.908-.139 2.255.374 2.995.249.366.549.769.944.754.373-.014.52-.242.973-.242.454 0 .586.242.98.235.41-.007.667-.366.915-.733.286-.417.403-.82.41-.841-.007-.008-.79-.308-.797-1.209-.008-.754.615-1.113.644-1.135-.352-.52-.9-.578-1.09-.593a1.123 1.123 0 0 0-.092-.002zm8.204.397c-.99 0-1.606.533-1.652 1.256h.777c.072-.358.369-.586.845-.586.502 0 .803.266.803.711v.309l-1.097.064c-.951.054-1.488.484-1.488 1.184 0 .72.548 1.207 1.332 1.207.526 0 1.032-.281 1.264-.727h.019v.659h.788v-2.76c0-.803-.62-1.317-1.591-1.317zm1.94.072l1.446 4.009c0 .003-.073.24-.073.247-.125.41-.33.571-.711.571-.069 0-.206 0-.267-.015v.666c.06.011.267.019.335.019.83 0 1.226-.312 1.568-1.283l1.5-4.214h-.868l-1.012 3.259h-.015l-1.013-3.26zm-1.167 2.189v.316c0 .521-.45.917-1.024.917-.442 0-.731-.228-.731-.579 0-.342.278-.56.769-.593z"
      />
    </svg>
  );
}

/* ─── Google Pay ────────────────────────────────────────────────────────────
   Source: simple-icons `siGooglepay`, hex #4285F4
   Renders the "GPay" wordmark as a monotone path in Google Blue.
   White card background so it reads cleanly.
────────────────────────────────────────────────────────────────────────────── */
function GooglePayIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      <rect width="24" height="24" rx="4" fill="#FFFFFF" />
      <rect width="24" height="24" rx="4" fill="none" stroke="#E5E7EB" strokeWidth="0.75" />
      <path
        fill="#4285F4"
        d="M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z"
      />
    </svg>
  );
}

/* ─── Stripe ────────────────────────────────────────────────────────────────
   Source: simple-icons `siStripe`, hex #635BFF
   Pure S-mark rendered white on brand-purple background.
────────────────────────────────────────────────────────────────────────────── */
function StripeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      <rect width="24" height="24" rx="4" fill="#635BFF" />
      <path
        fill="#FFFFFF"
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
      />
    </svg>
  );
}

/* ─── Zelle ─────────────────────────────────────────────────────────────────
   Source: simple-icons `siZelle`, hex #6D1ED4
   The path draws Zelle's official Z-mark (with decorative terminals).
   White mark on brand-purple background.
────────────────────────────────────────────────────────────────────────────── */
function ZelleIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      <rect width="24" height="24" rx="4" fill="#6D1ED4" />
      <path
        fill="#FFFFFF"
        d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-2.765H5.638a.667.667 0 0 1-.666-.666v-2.234a.67.67 0 0 1 .142-.412l8.139-10.382h-7.25a.667.667 0 0 1-.667-.667V3.914c0-.367.299-.666.666-.666h4.23V.483c0-.266.217-.483.483-.483h2.841c.266 0 .483.217.483.483v2.765h4.323c.367 0 .666.299.666.666v2.137a.67.67 0 0 1-.141.41l-8.19 10.481h7.665c.367 0 .666.299.666.666v2.477a.667.667 0 0 1-.666.667h-4.32v2.765a.483.483 0 0 1-.483.483Z"
      />
    </svg>
  );
}

/* ─── MoneyGram ─────────────────────────────────────────────────────────────
   Source: simple-icons `siMoneygram`, hex #DA291C
   Path draws the MoneyGram globe mark. White on brand-red.
────────────────────────────────────────────────────────────────────────────── */
function MoneyGramIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      <rect width="24" height="24" rx="4" fill="#DA291C" />
      <path
        fill="#FFFFFF"
        d="M24 12c0 6.6274-5.3726 12-12 12S0 18.6274 0 12c0-1.8257.4071-3.5554 1.1374-5.1051C.6514 8.1257.433 9.3446.433 10.4863c0 5.4334 4.3868 6.2203 6.2537 6.2023 2.8371-.0257 6.1543-1.416 8.9485-3.9909l-.4714 2.6494c-.1054.606.2906 1.1392.8957 1.1426h.2503c.6274 0 1.0732-.5108 1.1863-1.1426l1.0063-5.6622c.12-.6283-.2932-1.14-.9214-1.14h-5.6726c-.6309 0-1.2077.3342-1.32.9677l-.0446.2554c-.09.6026.33 1.0569.9317 1.0569h2.9589a9.48 9.48 0 0 0-.1414.1388c-2.04 1.9312-4.5558 2.988-6.6403 2.988-2.0803 0-4.41-1.3123-4.41-4.2686C3.2426 3.5546 8.9906 0 12 0c6.6137 0 12 5.3726 12 12"
      />
    </svg>
  );
}

/* ─── Remitly ────────────────────────────────────────────────────────────────
   Remitly is not yet in Simple Icons.
   Brand colours: blue #003B7E, orange #FF6600.
   Logo: An orange wordmark "R" on a deep-blue rounded square.
   The R is drawn using correct letterform proportions — vertical stem,
   curved bowl at the top-right, and a diagonal leg bottom-right.
────────────────────────────────────────────────────────────────────────────── */
function RemitlyIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      <rect width="24" height="24" rx="4" fill="#003B7E" />
      {/*
        R letterform:
        – Vertical stem:  x=5..8.5, y=4..20
        – Bowl top half:  arcs from (8.5,4) → (15,4) → (15,11) → (8.5,11)
        – Diagonal leg:   from where bowl meets stem (8.5,11) → (16,20)
      */}
      <path
        fill="#FF6600"
        d="
          M5 4 h6
          c4 0 6 2 6 5.5
          c0 2.4-1.3 4.2-3.3 4.9
          L20 20 h-4.5
          L11 14.5 H8.5 V20 H5 Z
          M8.5 7 v5 h2.5
          c1.8 0 2.8-0.9 2.8-2.5
          c0-1.6-1-2.5-2.8-2.5 Z
        "
      />
    </svg>
  );
}

/* ─── Bank Transfer ──────────────────────────────────────────────────────────
   Custom icon: classic bank / columned building silhouette.
   Navy background, white architecture.
────────────────────────────────────────────────────────────────────────────── */
function BankTransferIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
      <rect width="24" height="24" rx="4" fill="#1E3056" />
      {/* Pediment / roof triangle */}
      <path d="M12 3 L22 8 H2 Z" fill="#93C5FD" />
      {/* Four columns */}
      <rect x="4"   y="9" width="2" height="9" fill="#FFFFFF" rx="0.5" />
      <rect x="8.5" y="9" width="2" height="9" fill="#FFFFFF" rx="0.5" />
      <rect x="13"  y="9" width="2" height="9" fill="#FFFFFF" rx="0.5" />
      <rect x="17.5" y="9" width="2" height="9" fill="#FFFFFF" rx="0.5" />
      {/* Base / steps */}
      <rect x="2" y="18" width="20" height="2" fill="#93C5FD" rx="0.5" />
      <rect x="1" y="20" width="22" height="1.5" fill="#7CB5D8" rx="0.5" />
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────  */

export const paymentMethods = [
  {
    id: "remitly",
    name: "Remitly",
    tagline: "Intl. Transfer",
    icon: (size?: number) => <RemitlyIcon size={size} />,
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    tagline: "Global Money",
    icon: (size?: number) => <MoneyGramIcon size={size} />,
  },
  {
    id: "stripe",
    name: "Stripe",
    tagline: "Card / Online",
    icon: (size?: number) => <StripeIcon size={size} />,
  },
  {
    id: "applepay",
    name: "Apple Pay",
    tagline: "One-tap payment",
    icon: (size?: number) => <ApplePayIcon size={size} />,
  },
  {
    id: "googlepay",
    name: "Google Pay",
    tagline: "One-tap payment",
    icon: (size?: number) => <GooglePayIcon size={size} />,
  },
  {
    id: "zelle",
    name: "Zelle",
    tagline: "US Bank Transfer",
    icon: (size?: number) => <ZelleIcon size={size} />,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    tagline: "SWIFT / Wire",
    icon: (size?: number) => <BankTransferIcon size={size} />,
  },
];

/* ─── Large Cards — How It Works page ──────────────────────────────────────── */

export function PaymentLogoCards() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="group flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 min-w-[130px]"
        >
          {/* Icon — 48 × 48 */}
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
            {method.icon(48)}
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800 text-sm leading-tight">{method.name}</p>
            <p className="text-gray-400 text-xs mt-0.5">{method.tagline}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Compact Badges — Footer bottom bar ───────────────────────────────────── */

export function PaymentLogoBadges() {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          title={method.name}
          className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 hover:border-gray-500 transition-colors duration-200"
        >
          {/* Icon — 20 × 20 */}
          <span className="w-5 h-5 rounded overflow-hidden flex items-center justify-center shrink-0">
            {method.icon(20)}
          </span>
          <span className="text-gray-300 text-xs font-semibold hidden sm:inline whitespace-nowrap">
            {method.name}
          </span>
        </div>
      ))}
    </div>
  );
}
