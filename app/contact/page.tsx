import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactSupportFaq from "@/components/ContactSupportFaq";
import PartnersAccordion from "@/components/PartnersAccordion";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team for quotes, partnerships, or any questions."
        breadcrumb="Home / Contact"
      />

      {/* Two contact boxes */}

      {/* Contact Form + Partners Side by Side */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Send Us a Message
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Request a Quote
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* ── Left: Contact Form (3/5) ── */}
            <div className="lg:col-span-3">
              <form
                action="mailto:info@bighopesports.com"
                method="post"
                encType="text/plain"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="john@club.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sport / Product *
                    </label>
                    <select
                      name="sport"
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors bg-white"
                    >
                      <option value="">Select a sport...</option>
                      <option>Soccer / Football</option>
                      <option>Rugby</option>
                      <option>Basketball</option>
                      <option>Cricket</option>
                      <option>7v7 Football</option>
                      <option>Baseball / Softball</option>
                      <option>MMA</option>
                      <option>Teamwear / Hoodies</option>
                      <option>B2B / Wholesale</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="10"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                      placeholder="Min. 10 pieces"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                    placeholder="Tell us about your project — sport, team size, colours, design ideas..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-base"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* ── Right: Partners (2/5) ── */}
            <div className="lg:col-span-2">
              <div className="mb-5">
                <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-1">
                  Global Network
                </p>
                <h3 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-1">
                  Our Partners
                </h3>
              </div>
              <PartnersAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* Help & Support FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Help & Support
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Browse common questions by category, or reach out directly — we
              reply within one business day.
            </p>
          </div>
          <ContactSupportFaq />

          {/* Still need help CTA */}
        </div>
      </section>

      {/* Address strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Address</h3>
              <p className="text-gray-500 text-sm">
                Railway Road, Sialkot, Pakistan
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
              <p className="text-gray-500 text-sm">
                Mon – Fri: 9:00 AM – 6:00 PM PKT
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Follow Us</h3>
              <div className="flex items-center justify-center gap-3 mt-2">
                <a
                  href="https://facebook.com/bighopesports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/bighopesports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/bighopesports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
