import PageHero from "@/components/PageHero";
import FeatureBar from "@/components/FeatureBar";
import PackageGallery from "@/components/PackageGallery";
import Link from "next/link";

const sportPackages = [
  {
    sport: "Soccer / Football",
    href: "/sport/soccer",
    description:
      "Multiple package tiers — from a basic jersey & shorts combo all the way to full team bundles with bags and accessories.",
    images: [
      {
        src: "/images/packages/football/hd9qmjhcknd1ov8mtbi2-1200x1500.webp",
        tier: null,
        tierColor: null,
      },
    ],
  },
  {
    sport: "7v7 Football",
    href: "/sport/7v7-football",
    description:
      "Three premium package tiers built specifically for 7v7 teams. Pick the level that fits your squad.",
    images: [
      {
        src: "/images/packages/7v7-football/vzm5ztn3mdqxrspzogs4-1200x1500.webp",
        tier: "Silver",
        tierColor: "bg-gray-400",
      },
      {
        src: "/images/packages/7v7-football/zbytjipflj10kvenddit-1200x1500.webp",
        tier: "Gold",
        tierColor: "bg-yellow-500",
      },
      {
        src: "/images/packages/7v7-football/zly3kabyhuaaxbwviis7-1200x1500.webp",
        tier: "Diamond",
        tierColor: "bg-cyan-600",
      },
    ],
  },
  {
    sport: "Baseball & Softball",
    href: "/sport/baseball",
    description:
      "Full-team baseball and softball packages — jerseys, pants, hats, hoodies, and more. Free coaches shirts on all packages.",
    images: [
      {
        src: "/images/packages/baseball&softball/icldyzxq0ajn1wg5m4jx.webp",
        tier: null,
        tierColor: null,
      },
    ],
  },
];


export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="Sport Packages"
        subtitle="Pre-designed team bundles to get your squad kitted out fast — at unbeatable direct-manufacturer pricing."
        breadcrumb="Home / Packages"
      />

      <FeatureBar />

      {/* ── Available Packages ─────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Team Bundles
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Choose Your Sport
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Every package includes free custom design, sublimated name &amp; number, and worldwide shipping.
            </p>
          </div>

          {/* Sport sections */}
          <div className="space-y-24">
            {sportPackages.map((pkg) => (
              <div key={pkg.sport}>

                {/* Sport heading */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-px flex-1 bg-gray-300" />
                  <h3 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase tracking-wide px-2">
                    {pkg.sport}
                  </h3>
                  <div className="h-px flex-1 bg-gray-300" />
                </div>
                <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
                  {pkg.description}
                </p>

                {/* Package image(s) */}
                <PackageGallery images={pkg.images} sport={pkg.sport} />

                {/* CTA */}
                <div className="text-center mt-10">
                  <a
                    href="mailto:info@bighopesports.com"
                    className="inline-flex items-center gap-2 bg-[#1e3056] hover:bg-[#162440] text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg text-sm sm:text-base"
                  >
                    Request a Quote — {pkg.sport}
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Sports CTA ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">
            Rugby · Cricket · Basketball · MMA · And More
          </p>
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
            Package for Your Sport?
          </h2>
          <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-6" />
          <p className="text-gray-500 text-base mb-10 max-w-xl mx-auto">
            We offer full team packages for every sport. Get in touch and we&apos;ll put together a custom bundle tailored to your team&apos;s needs and budget.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base shadow-lg"
          >
            Contact Us for a Package
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── What's Included strip ──────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-2">
              Every Package Includes
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                label: "Free Custom Design",
                icon: (
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                ),
              },
              {
                label: "Unlimited Revisions",
                icon: (
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
              {
                label: "Sublimated Printing",
                icon: (
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
              },
              {
                label: "Worldwide Shipping",
                icon: (
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom CTA ────────────────────────────────────────── */}
      <section className="bg-[#0f1830] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase mb-3 md:mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
            We can build a package for any sport, any team size, any budget. Tell us what you need.
          </p>
          <a
            href="mailto:info@bighopesports.com"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base md:text-lg"
          >
            Build a Custom Package
          </a>
        </div>
      </section>
    </>
  );
}
