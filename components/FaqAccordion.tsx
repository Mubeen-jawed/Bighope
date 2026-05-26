"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What products do you offer?",
    a: "We manufacture custom sports uniforms and teamwear for clubs, schools, and wholesale customers, including soccer kits, basketball uniforms, rugby jerseys, cricket whites, tracksuits, hoodies, and more. Every product is fully customisable in size, colour, and design.",
  },
  {
    q: "Do you provide custom designs?",
    a: "Yes, we include free custom design services with every order. Our design team works with you through unlimited revisions until you're 100% satisfied. Complex designs may require additional time but are always included at no extra cost.",
  },
  {
    q: "Can I get samples before bulk production?",
    a: "Absolutely. Physical samples are available upon request. We also provide photos and videos of samples for remote approval. Standard bulk production takes 2–3 weeks, with rush options available in approximately 15 days.",
  },
  {
    q: "What printing methods do you use?",
    a: "We use sublimation printing, screen printing, heat transfer vinyl, and embroidery, chosen based on your product and design requirements. All sublimation is done fully in-house on our own equipment.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. We ship globally via DHL, FedEx, UPS, DPEX, and SKYNET. Tracking numbers are provided once your order ships. Carrier selection depends on speed, cost, weight, and destination.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Our minimum order quantity is 10 pieces per design, colour, and style. This applies to uniforms, kits, and most teamwear items. Contact us for larger wholesale or B2B order requirements.",
  },
  {
    q: "Do you offer custom branding?",
    a: "Yes. We provide custom neck labels, team logos, wash care labels, packaging, and hangtags for professional brand presentation. Private label services are available for B2B partners.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Remitly, MoneyGram, Stripe, Apple Pay/Google Pay, Zelle, and bank transfers. A 50% advance is required to begin production, with the balance due before shipment.",
  },
  {
    q: "What if my order arrives with errors?",
    a: "We offer replacement, remake, or partial refund options for any production errors. Issues must be reported within 48 hours of delivery with photographic evidence.",
  },
  {
    q: "Where are you based?",
    a: "Our production facility is in Sialkot, Pakistan, the world's leading sports equipment manufacturing city. We also have partner support in the USA 🇺🇸, Australia 🇦🇺, Spain 🇪🇸, and UK 🇬🇧.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
          >
            <span className="font-bold text-gray-900 text-base">{faq.q}</span>
            <span
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                open === idx
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${open === idx ? "rotate-45" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === idx ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
