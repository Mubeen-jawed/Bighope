import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "B2B Partnerships",
};

const clientTypes = [
  { title: "Fan Merchandise Businesses", desc: "Custom branded gear for fan stores and sports merchandise." },
  { title: "Sportswear Labels", desc: "Private label manufacturing for your own brand." },
  { title: "Uniform Suppliers", desc: "Bulk uniform production for schools and clubs." },
  { title: "Print & Embroidery Shops", desc: "Blank sublimation blanks and finished garments." },
  { title: "Resellers & Startup Labels", desc: "Low MOQs to help you launch and scale." },
  { title: "Teamwear Companies", desc: "OEM production with your own branding." },
  { title: "Corporate Buyers", desc: "Staff uniforms, polos, and branded apparel." },
  { title: "Schools & Academies", desc: "Consistent kits for entire student athlete programs." },
];

const services = [
  {
    title: "Custom Sublimation Printing",
    desc: "Full-coverage digital sublimation on all polyester garments. Vibrant, permanent colour that won't crack or fade.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Embroidery & Screen Print",
    desc: "Traditional embroidery and screen printing available for garments requiring a classic finish.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Private Label Branding",
    desc: "Custom neck labels, woven labels, hang tags, and packaging for full brand presentation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: "Fabric Sourcing",
    desc: "Customised material options with certified mill sourcing and sample testing before bulk orders.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "Technical Design",
    desc: "Custom pattern development and garment construction for technically demanding sportswear.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    title: "Partner Training",
    desc: "Pricing strategy, trend guidance, and product planning support to help your business grow.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const factoryStats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Countries Shipped" },
  { value: "100%", label: "In-House Sublimation" },
  { value: "3 Wks", label: "Avg. Turnaround" },
];

export default function B2BPage() {
  return (
    <>
      <PageHero
        title="Wholesale Manufacturing"
        subtitle="Your growth partner — not just your factory. Built for brands, distributors, and sportswear businesses that demand consistency."
        breadcrumb="Home / B2B Services"
      />

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                B2B Services
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                Scale with Confidence
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                We operate dedicated in-house departments for cutting, stitching, quality
                assurance, and sampling. Advanced sublimation and embroidery capabilities, custom
                pattern development, and flexible minimum order quantities — designed for
                growth-stage brands and established distributors alike.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We&apos;re not just a factory. We invest in our partners through training, product
                planning support, and trend guidance — helping you build a stronger business.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Start a Partnership
              </Link>
            </div>
            <div className="bg-orange-500 text-white rounded-2xl p-10">
              <div className="text-6xl font-[family-name:var(--font-oswald)] font-bold mb-4 leading-none">
                3-Week
              </div>
              <div className="text-2xl font-bold mb-4">Predictable Turnaround</div>
              <div className="w-12 h-1 bg-white/40 rounded mb-6" />
              <p className="text-orange-100 text-lg leading-relaxed">
                Consistent. Every order. Every time. Our streamlined production pipeline means
                you can plan your inventory with confidence.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["Test Print Before Bulk", "Dedicated QA Dept.", "Sample Approval", "Flexible MOQs"].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-orange-100">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Our Clients
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Who We Work With
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientTypes.map((client) => (
              <div
                key={client.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group"
              >
                <div className="mb-4">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{client.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Full-Service Manufacturing
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Stats */}
      <section className="bg-[#1e3056] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
              Our Factory
            </p>
            <h2 className="text-3xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase">
              By the Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {factoryStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl font-[family-name:var(--font-oswald)] font-bold text-orange-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with contacts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Ready to Build a Lasting Partnership?
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-1">US Contact</h3>
              <p className="text-gray-500 text-sm mb-4">For US-based buyers &amp; distributors</p>
              <a href="tel:+17473547351" className="block text-orange-500 font-bold mb-1 hover:text-orange-600">+1 (747) 354-7351</a>
              <a href="mailto:info@bighopesports.com" className="block text-gray-600 text-sm hover:text-orange-500 transition-colors">info@bighopesports.com</a>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Pakistan Direct</h3>
              <p className="text-gray-500 text-sm mb-4">For global partnerships &amp; manufacturing</p>
              <a href="tel:+923299766660" className="block text-[#1e3056] font-bold mb-1 hover:text-orange-500 transition-colors">+92 (329) 976-6660</a>
              <a href="mailto:bighopesports@gmail.com" className="block text-gray-600 text-sm hover:text-orange-500 transition-colors">bighopesports@gmail.com</a>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base md:text-lg"
            >
              Start a Partnership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
