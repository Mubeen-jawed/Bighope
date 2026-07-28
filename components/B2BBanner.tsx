import Link from "next/link";

const highlights = [
  { value: "Private Label", label: "Your brand, our factory" },
  { value: "10 pcs", label: "Flexible minimums" },
  { value: "3–4 Weeks", label: "Predictable turnaround" },
  { value: "50+", label: "Countries served" },
];

export default function B2BBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0f1629]">
      {/* Top accent hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient orange glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[320px] bg-orange-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-20 w-[420px] h-[420px] bg-orange-600/[0.07] rounded-full blur-[110px]" />

      <div className="relative max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-orange-500/60" />
          <span className="text-orange-400 text-xs font-black uppercase tracking-[0.25em]">
            B2B Partnerships
          </span>
          <span className="h-px w-8 bg-orange-500/60" />
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase leading-[1.04]">
          Let&apos;s build it
          <br />
          <span className="relative inline-block text-orange-500">
            together.
            <svg
              className="absolute -bottom-2 left-0 w-full text-orange-500/40"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 6C60 2 140 2 198 5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        {/* Supporting line */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mt-8">
          Private-label sportswear, flexible minimums, and a predictable
          turnaround, for brands, distributors, and resellers ready to grow.
        </p>

        {/* Trust strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-3xl mx-auto mt-12">
          {highlights.map((h) => (
            <div
              key={h.value}
              className="bg-[#131b33] px-4 py-5 transition-colors duration-200 hover:bg-[#18213d]"
            >
              <p className="text-white font-[family-name:var(--font-oswald)] font-bold text-lg sm:text-xl uppercase leading-none">
                {h.value}
              </p>
              <p className="text-gray-500 text-xs mt-2">{h.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/b2b"
            className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore B2B Partnerships
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-200 hover:bg-white/5"
          >
            Start a Conversation
          </Link>
        </div>
      </div>

      {/* Bottom accent hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
    </section>
  );
}
