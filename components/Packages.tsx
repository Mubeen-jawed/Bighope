import Image from "next/image";

const packages = [
  {
    image: "/images/gujb5mnmp1joc4vt2adt-1200x1603.webp",
    title: "Soccer Package 1",
    sport: "Soccer",
    includes: [
      "Custom Soccer Jersey",
      "Custom Soccer Shorts",
      "Custom Soccer Socks",
      "Sublimated Name & Number",
    ],
    min: "Minimum 10 units",
    popular: false,
  },
  {
    image: "/images/R1-1200x1603.webp",
    title: "Rugby Package 1",
    sport: "Rugby",
    includes: [
      "Custom Rugby Jersey",
      "Custom Rugby Shorts",
      "Custom Rugby Socks",
      "Sublimated Logo & Name",
    ],
    min: "Minimum 10 units",
    popular: true,
  },
  {
    image: "/images/lvhjk7p925zplkrnegxn.webp",
    title: "Cricket Package 1",
    sport: "Cricket",
    includes: [
      "Custom Cricket Polo S/S",
      "Custom Cricket Pants",
      "Custom Cricket Cap",
      "Sublimated Name & Number",
    ],
    min: "Minimum 15 units",
    popular: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Sport Packages
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Pre-designed bundles to get your team kitted out fast.
          </p>
          <div className="mt-4 mx-auto w-16 h-1 bg-blue-600 rounded" />
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-md card-hover border-2 ${
                pkg.popular
                  ? "border-blue-600 shadow-blue-100"
                  : "border-transparent"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}

              {/* Sport badge */}
              <div className="absolute top-4 left-4 z-10 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {pkg.sport}
              </div>

              {/* Image */}
              <div className="relative" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  {pkg.title}
                </h3>

                {/* Includes list */}
                <div className="space-y-2 mb-5">
                  {pkg.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-gray-700 text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-blue-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Min order */}
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-5 bg-gray-50 rounded-lg px-3 py-2">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {pkg.min}
                </div>

                {/* CTA */}
                <a
                  href="mailto:info@bighopesports.com"
                  className={`block text-center font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${
                    pkg.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30"
                      : "bg-[#1e3056] hover:bg-[#162440] text-white"
                  }`}
                >
                  Request a Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
}
