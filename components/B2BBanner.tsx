import Link from "next/link";

export default function B2BBanner() {
  return (
    <section className="bg-[#0f1629]">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28 text-center">
        {/* Eyebrow */}

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase leading-[1.04]">
          Let&apos;s build it
          <br />
          <span className="text-orange-500">together.</span>
        </h2>

        {/* Supporting line */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mt-7">
          Private-label sportswear, flexible minimums, and a predictable
          three-week turnaround, for brands, distributors, and resellers ready
          to grow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          <Link
            href="/b2b"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore B2B Partnerships
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-white/70 hover:text-white font-semibold text-sm transition-colors"
          >
            Start a conversation
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
        </div>
      </div>
    </section>
  );
}
