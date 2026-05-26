const guarantees = [
  {
    title: "Free Design",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    title: "Quality Guaranteed",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "On-Time Delivery",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "No Hidden Fees",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const stats = [
  { value: "10,000+", label: "Kits Delivered" },
  { value: "50+", label: "Countries" },
  { value: "4.9 / 5", label: "Avg. Rating" },
  { value: "85%", label: "Repeat Clients" },
];

export default function TrustGuarantees() {
  return (
    <section className="bg-[#0f1830] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-1.5">
            Our Commitment
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Why Teams Trust Us
          </h2>
        </div>

        {/* 4 guarantees, 2x2 on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.07] rounded-xl overflow-hidden mb-3">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="group bg-[#0f1830] hover:bg-white/[0.04] transition-colors duration-300 p-3 sm:p-5 flex items-center gap-2.5"
            >
              <div className="text-orange-500 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {g.icon}
              </div>
              <p className="text-white font-semibold text-xs leading-snug">
                {g.title}
              </p>
            </div>
          ))}
        </div>

        {/* Stats, 2x2 on mobile, 4-col on sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.07] rounded-xl overflow-hidden">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0f1830] hover:bg-white/[0.04] transition-colors duration-300 px-3 sm:px-5 py-4 sm:py-6 text-center"
            >
              <div className="text-lg sm:text-xl font-black text-white tabular-nums">
                {s.value}
              </div>
              <div className="text-white/35 text-[9px] sm:text-[10px] font-medium uppercase tracking-widest mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
