import Image from "next/image";
import Link from "next/link";
import { sportPackages } from "@/lib/packages";

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
          {sportPackages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={pkg.href}
              className="relative bg-white rounded-2xl overflow-hidden shadow-md card-hover border-2 border-transparent"
            >
              {/* Sport badge */}
              <div className="absolute top-4 left-4 z-10 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {pkg.shortName}
              </div>

              {/* Image */}
              <div className="relative bg-white" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={pkg.cardImage}
                  alt={`${pkg.sport} Package`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  {pkg.sport} Package
                </h3>

                {/* Includes list */}
                <div className="space-y-2 mb-5">
                  {pkg.includes.slice(0, 4).map((item) => (
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
                  {pkg.minOrder}
                </div>

                {/* CTA */}
                <span
                  className="block text-center font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 bg-[#1e3056] hover:bg-[#162440] text-white"
                >
                  View Package
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
}
