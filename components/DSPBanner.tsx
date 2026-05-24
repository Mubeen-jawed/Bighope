import Image from "next/image";
import Link from "next/link";

const usps = [
  {
    title: "Free Design",
    note: "Unlimited revisions",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
  {
    title: "Direct Factory",
    note: "Sialkot, Pakistan",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Fully Custom",
    note: "Colours, logo, name",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
  {
    title: "3–4 Week Delivery",
    note: "Worldwide, tracked",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "10-Piece Minimum",
    note: "Clubs of any size",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Ships to 50+ Countries",
    note: "Fast, insured freight",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const stats = [
  { value: "10,000+", label: "Kits Delivered" },
  { value: "50+", label: "Countries" },
  { value: "10 pcs", label: "Min. Order" },
  { value: "100%", label: "Customized" },
];

export default function DSPBanner() {
  return (
    <section className="bg-[#0f1830] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[620px]">

          {/* ── Left: Image panel ─────────────────────────── */}
          <div className="relative hidden lg:block">
            <Image
              src="/images/R1-1200x1603.webp"
              alt="Big Hope Sports custom rugby kit"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* right-side fade into dark content area */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f1830]" />
            {/* bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1830]/60 to-transparent" />

            {/* Floating stat chips */}
            <div className="absolute bottom-10 left-8 flex flex-col gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5"
                >
                  <span className="text-orange-400 font-black text-xl leading-none">{s.value}</span>
                  <span className="text-white/70 text-xs font-medium">{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Content panel ─────────────────────── */}
          <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 flex flex-col justify-center">
            <p className="text-orange-500 text-xs font-black uppercase tracking-[0.2em] mb-3">
              Why Big Hope
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase leading-tight mb-8">
              Built Different.
            </h2>

            {/* USP grid */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
              {usps.map((usp) => (
                <div key={usp.title} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={usp.icon} />
                  </svg>
                  <div>
                    <p className="text-white font-semibold text-sm leading-none">{usp.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{usp.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile stats strip */}
            <div className="flex flex-wrap gap-4 lg:hidden mb-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-orange-400 font-black text-2xl leading-none">{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 text-center"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/how-it-works"
                className="border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 text-center"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
