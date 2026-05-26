import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { PaymentLogoCards } from "@/components/PaymentLogos";

export const metadata: Metadata = {
  title: "How It Works",
};

const steps = [
  {
    number: "01",
    title: "Contact Us",
    desc: "Fill out our contact form or give us a call. Tell us your sport, quantity, and design ideas, we'll take it from there.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design",
    desc: "Submit your existing artwork or request a free custom design. Our team revises until you're 100% satisfied, unlimited rounds.",
    icon: (
      <svg
        className="w-10 h-10"
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
    number: "03",
    title: "Team Roster",
    desc: "Send us your team roster with player names, numbers, and sizes for each item. We handle the rest.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Production",
    desc: "Once design is approved and 50% deposit received, production begins. A test print is conducted before bulk manufacturing.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Delivery",
    desc: "After final payment, your order ships worldwide via DHL, FedEx, or UPS with full tracking provided.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
];

const specs = [
  {
    label: "Standard Turnaround",
    value: "2–3 Weeks",
    sub: "Design approval to your door",
  },
  {
    label: "Rush Orders",
    value: "15 Days",
    sub: "Subject to capacity & quantity",
  },
  {
    label: "Minimum Order",
    value: "10 Pieces",
    sub: "Per design, colour & style",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How It Works"
        subtitle="From concept to delivery in 2–3 weeks. Here's our simple, transparent process."
        breadcrumb="Home / How It Works"
      />

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Simple. Fast. Transparent.
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <div className="space-y-12">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div
                    key={step.number}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${isEven ? "lg:flex-row-reverse" : ""}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? "lg:text-right" : ""}`}>
                      <div
                        className={`bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 max-w-lg ${isEven ? "lg:ml-auto" : ""}`}
                      >
                        <div className="text-orange-500 mb-4">{step.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Step bubble */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-[#1e3056] text-white flex items-center justify-center shrink-0 shadow-lg">
                      <span className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-orange-400">
                        {step.number}
                      </span>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Turnaround Specs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Timelines
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Turnaround & Order Specs
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specs.map((spec, idx) => (
              <div
                key={spec.label}
                className={`rounded-2xl p-10 text-center ${idx === 0 ? "bg-[#1e3056] text-white" : "bg-white border border-gray-100"}`}
              >
                <div
                  className={`text-4xl font-[family-name:var(--font-oswald)] font-bold mb-2 ${idx === 0 ? "text-orange-400" : "text-orange-500"}`}
                >
                  {spec.value}
                </div>
                <div
                  className={`font-bold text-lg mb-1 ${idx === 0 ? "text-white" : "text-gray-900"}`}
                >
                  {spec.label}
                </div>
                <div
                  className={`text-sm ${idx === 0 ? "text-gray-300" : "text-gray-500"}`}
                >
                  {spec.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sampling */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                Quality Assurance
              </p>
              <h2 className="text-3xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                Physical Samples Available
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Before bulk production, you can request physical samples to
                verify quality, fit, and colour accuracy. We also send photos
                and videos of every sample for remote approval, no matter where
                you are in the world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A test print is conducted on every order before full production
                begins, ensuring your design looks exactly as intended.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Physical Samples", desc: "Available on request" },
                { label: "Photo & Video", desc: "Remote approval" },
                { label: "Test Print", desc: "Before bulk production" },
                {
                  label: "Unlimited Revisions",
                  desc: "Until you're satisfied",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                >
                  <div className="mb-3">
                    <svg
                      className="w-5 h-5 text-orange-500"
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
                  </div>
                  <div className="font-bold text-gray-900 text-sm mb-1">
                    {item.label}
                  </div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Payment
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Flexible Payment Options
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-6" />
            <p className="text-gray-600 max-w-xl mx-auto">
              50% advance required to begin production. Balance due before
              shipment.
            </p>
          </div>
          <div className="mb-8">
            <PaymentLogoCards />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f1830] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase mb-3 md:mb-4">
            Ready to Place an Order?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8">
            Get in touch and we&apos;ll have your team kitted out in 3–4 weeks.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Start Your Order
            </a>
            <Link
              href="/contact"
              className="border-2 border-white/50 hover:border-white text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
