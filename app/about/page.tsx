import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
};

const stats = [
  { number: "10+", label: "Years in Manufacturing" },
  { number: "50+", label: "Countries Served" },
  { number: "500K+", label: "Uniforms Produced" },
  { number: "98%", label: "Client Satisfaction" },
];

const differentiators = [
  {
    title: "Free Custom Design",
    desc: "Professional artwork with every order. Unlimited revisions until you're satisfied.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Fast Turnaround",
    desc: "3–4 weeks standard delivery. Rush orders available in as little as 15 days.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Worldwide Shipping",
    desc: "DHL, FedEx, and UPS delivery to 50+ countries with full tracking.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Competitive Pricing",
    desc: "Direct manufacturer pricing. Low minimums starting at just 10 pieces.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
];

const partners = [
  { name: "USA", flagCode: "us", role: "US Distributor" },
  { name: "UK", flagCode: "gb", role: "Partner Support" },
  { name: "Germany", flagCode: "de", role: "Partner Support" },
  { name: "Croatia", flagCode: "hr", role: "Partner Support" },
];

const leadership = [
  {
    title: "Design & Creative",
    desc: "Kit designs and brand visuals.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Production",
    desc: "Manufacturing oversight and quality control.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Sales & Logistics",
    desc: "Order coordination and global shipping.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Research & Dev",
    desc: "Fabric innovation and production improvements.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Management",
    desc: "Operations and global partnerships.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Big Hope Sports"
        subtitle="International manufacturer of custom sports uniforms for teams, clubs, and B2B partners worldwide."
        breadcrumb="Home / About Us"
      />

      {/* Mission & Story */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                Who We Are
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                Built to Help Teams Dream Bigger
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mb-5" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Big Hope is an international manufacturer of custom sports uniforms, serving clubs, schools, and B2B partners worldwide. With production in Pakistan and partners across the UK, Germany, Croatia, and the USA, we deliver quality teamwear with trusted local support.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Professional-grade uniforms shouldn&apos;t come with premium price tags. Every order — from grassroots clubs to global distributors — is backed by the same reliability, honest communication, and consistent quality.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-50 rounded-2xl p-5 sm:p-7 text-center border border-gray-100"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-oswald)] font-bold text-orange-500 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Our Difference
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Why Teams Choose Us
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group"
              >
                <div className="text-orange-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e3056] text-white rounded-2xl p-6 sm:p-8 md:p-10">
              <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">
                Our Mission
              </p>
              <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-oswald)] font-bold uppercase mb-4">
                Dream Bigger
              </h3>
              <div className="w-12 h-1 bg-orange-500 rounded mb-5" />
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Helping athletes and teams dream bigger with quality custom teamwear — without premium brand pricing. From grassroots clubs to semi-pro academies, we deliver reliable, professional-grade apparel.
              </p>
            </div>
            <div className="bg-orange-500 text-white rounded-2xl p-6 sm:p-8 md:p-10">
              <p className="text-white/80 font-bold text-sm uppercase tracking-widest mb-3">
                Our Vision
              </p>
              <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-oswald)] font-bold uppercase mb-4">
                Global Community
              </h3>
              <div className="w-12 h-1 bg-white/50 rounded mb-5" />
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                Building a community driven by big ambitions — where Big Hope helps people achieve their goals, through custom teamwear or by supporting them in growing their own sports business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                Our Story
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                Where It All Began
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mb-5" />
              <p className="text-gray-600 leading-relaxed">
                Big Hope was founded to give every team access to professional-quality uniforms — without the high price tag. From small local clubs to international distributors, our growth has been built on reliability, honest communication, and long-term partnerships.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Reliability",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  label: "Honest Communication",
                  icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                },
                {
                  label: "Consistent Quality",
                  icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                },
                {
                  label: "Long-Term Partnerships",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm text-center"
                >
                  <div className="flex justify-center mb-3">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-gray-800 font-semibold text-xs sm:text-sm leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Leadership Structure */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              How We Operate
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Our Leadership Structure
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {leadership.map((role) => (
              <div
                key={role.title}
                className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 group text-center"
              >
                <div className="flex justify-center mb-3 text-orange-500">
                  {role.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">
                  {role.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Partners */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Global Reach
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              International Operations
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-5" />
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              Production in Sialkot with partner support across three continents — consistent quality delivered worldwide.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {/* HQ tile */}
            <div className="bg-orange-500 text-white rounded-xl px-5 sm:px-7 py-4 text-center shadow-md">
              <div className="flex justify-center mb-2">
                <Image
                  src="https://flagcdn.com/w40/pk.png"
                  alt="Pakistan flag"
                  width={40}
                  height={27}
                  className="rounded shadow-sm"
                  unoptimized
                />
              </div>
              <div className="text-lg sm:text-xl font-[family-name:var(--font-oswald)] font-bold mb-0.5">
                Pakistan
              </div>
              <div className="text-orange-100 text-xs sm:text-sm">HQ &amp; Production</div>
            </div>
            {/* Partner tiles */}
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-white border-2 border-gray-200 rounded-xl px-5 sm:px-7 py-4 text-center hover:border-orange-500 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex justify-center mb-2">
                  <Image
                    src={`https://flagcdn.com/w40/${p.flagCode}.png`}
                    alt={`${p.name} flag`}
                    width={40}
                    height={27}
                    className="rounded shadow-sm"
                    unoptimized
                  />
                </div>
                <div className="text-lg sm:text-xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 mb-0.5 group-hover:text-orange-500 transition-colors duration-200">
                  {p.name}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f1830] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-md mx-auto">
            Contact us for a free design consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="mailto:info@bighopesports.com"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get a Free Quote
            </a>
            <Link
              href="/how-it-works"
              className="border-2 border-white/50 hover:border-white text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
