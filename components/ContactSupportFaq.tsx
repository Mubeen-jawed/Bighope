"use client";

import { useState } from "react";

const supportFaqs = [
  {
    category: "Orders & Quotes",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    faqs: [
      {
        q: "How do I request a quote?",
        a: "Fill out the contact form on this page or email us directly at info@bighopesports.com. Include the sport, quantity, and any design ideas. We typically respond within 24 hours with a full quote.",
      },
      {
        q: "How long does it take to receive my order?",
        a: "Standard production takes 3–4 weeks from design approval to delivery. Rush orders can be completed in approximately 15 days. Timeline may vary based on quantity and complexity.",
      },
      {
        q: "What is your minimum order quantity?",
        a: "Our minimum order quantity is 10 pieces per design, colour, and style. For B2B or wholesale orders, different minimums may apply — contact us for details.",
      },
    ],
  },
  {
    category: "Design & Samples",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    faqs: [
      {
        q: "Is custom design included in the price?",
        a: "Yes! Custom design services are free with every order. Our design team works with you through unlimited revisions until you are 100% satisfied. No extra charges for complex designs.",
      },
      {
        q: "Can I get a physical sample before bulk production?",
        a: "Absolutely. Physical samples are available on request. We can also send photos and videos of samples for remote approval before committing to full production.",
      },
      {
        q: "What file formats do you accept for logos and artwork?",
        a: "We accept AI, EPS, PDF, PNG (high-res), and SVG files. If you only have a low-resolution logo, our design team can redraw it for production at no extra cost.",
      },
    ],
  },
  {
    category: "Shipping & Payments",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    faqs: [
      {
        q: "Do you ship worldwide?",
        a: "Yes. We ship globally via DHL, FedEx, UPS, DPEX, and SKYNET. Tracking numbers are provided once your order ships. Carrier selection depends on speed, cost, weight, and destination.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Remitly, MoneyGram, Stripe, Apple Pay, Google Pay, Zelle, and bank transfers. A 50% advance is required to begin production, with the balance due before shipment.",
      },
      {
        q: "What if my order arrives with errors or damage?",
        a: "We offer replacement, remake, or partial refund for any production errors. Issues must be reported within 48 hours of delivery with photographic evidence. Your satisfaction is guaranteed.",
      },
    ],
  },
];

export default function ContactSupportFaq() {
  const [openCategory, setOpenCategory] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {supportFaqs.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => { setOpenCategory(idx); setOpenFaq(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
              openCategory === idx
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "bg-white text-gray-600 border border-gray-200 hover:border-orange-400 hover:text-orange-500"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
            </svg>
            {cat.category}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {supportFaqs[openCategory].faqs.map((faq, idx) => {
          const key = `${openCategory}-${idx}`;
          const isOpen = openFaq === key;
          return (
            <div
              key={key}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpenFaq(isOpen ? null : key)}
                aria-expanded={isOpen}
              >
                <span className="font-bold text-gray-900 text-base">{faq.q}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isOpen ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-60" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
