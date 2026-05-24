import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before placing your order."
        breadcrumb="Home / FAQs"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Common Questions
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-500 mb-6">
            Our team is ready to help. Reach out and we&apos;ll get back to you within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
