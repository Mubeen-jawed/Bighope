import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fabrics & Materials",
};

const fabrics = [
  {
    name: "Bamboo",
    category: "Treinda",
    image: "/fabrics/bamboo.png",
    properties: ["100% Polyester", "Brushed", "Warp Knitted", "From 170g to 200+g", "Shrink Resistant"],
  },
  {
    name: "Cotton",
    category: "Treinda",
    image: "/fabrics/cotton.png",
    properties: ["100% Polyester", "Brushed", "Warp Knitted", "From 170g to 200+g", "Shrink Resistant"],
  },
  {
    name: "Nylon",
    category: "Treinda",
    image: "/fabrics/nylon.png",
    properties: ["100% Polyester", "Brushed", "Warp Knitted", "From 170g to 200+g", "Shrink Resistant"],
  },
  {
    name: "Tencel",
    category: "Treinda",
    image: "/fabrics/tencel.png",
    properties: ["100% Polyester", "Brushed", "Warp Knitted", "From 170g to 200+g", "Shrink Resistant"],
  },
  {
    name: "Waterproof Shell",
    category: "Treinda",
    image: "/fabrics/waterproof-shell.png",
    properties: ["100% Polyester", "Brushed", "Warp Knitted", "From 170g to 200+g", "Shrink Resistant"],
  },
  {
    name: "Micro Interlock",
    category: "Micro Interlock / Smooth Interlock",
    image: "/fabrics/interlock.png",
    properties: ["100% Polyester", "Elasticity", "Soft Sensation", "Sweat Dryer", "From 100g to 200+g"],
  },
  {
    name: "Mesh",
    category: "Micro Interlock / Smooth Interlock",
    image: "/fabrics/mesh.png",
    properties: ["100% Polyester", "Elasticity", "Soft Sensation", "Sweat Dryer", "From 100g to 200+g"],
  },
  {
    name: "Spandex",
    category: "Micro Interlock / Smooth Interlock",
    image: "/fabrics/spandex.png",
    properties: ["100% Polyester", "Elasticity", "Soft Sensation", "Sweat Dryer", "From 100g to 200+g"],
  },
  {
    name: "Tricot",
    category: "Micro Interlock / Smooth Interlock",
    image: "/fabrics/tricot.png",
    properties: ["100% Polyester", "Elasticity", "Soft Sensation", "Sweat Dryer", "From 100g to 200+g"],
  },
];

export default function FabricsPage() {
  return (
    <>
      <PageHero
        title="Our Fabrics"
        subtitle="Premium performance fabrics for every sport and climate."
        breadcrumb="Home / Fabrics"
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
                Material Quality
              </p>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
                Materials That Perform
              </h2>
              <div className="w-16 h-1 bg-orange-500 rounded mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Fabric selection is one of the most important steps in the custom ordering process.
                Key factors to consider include fabric type, GSM, colour shade, performance
                features, and overall feel.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Big Hope Sports, we typically recommend exchanging fabric samples before moving
                into production. While this can involve additional costs due to offshore shipping,
                many of our professional clients prefer this step—especially for large orders—to
                ensure consistent quality and, when needed, support with laboratory test reports.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                In some cases, clients request unique fabrics that are not readily available in
                stock. These may require custom knitting, which is only feasible for larger orders
                of around 400 pieces or more of the same fabric. However, for regular fabrics,
                there is no minimum order requirement.
              </p>
              <a
                href="mailto:info@bighopesports.com"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Request Fabric Samples
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Certified Mills", value: "100%" },
                { label: "Fabric Options", value: "9+" },
                { label: "Custom from", value: "400 pcs" },
                { label: "Sample Time", value: "7–10 days" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                  <div className="text-3xl font-[family-name:var(--font-oswald)] font-bold text-orange-500 mb-1">
                    {item.value}
                  </div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Fabric Range
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Available Fabrics
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fabrics.map((fabric) => (
              <div
                key={fabric.name}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-orange-200 group"
              >
                {/* Fabric Image */}
                <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Category badge */}
                  <span className="inline-block bg-orange-50 text-orange-500 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-orange-100">
                    {fabric.category}
                  </span>

                  {/* Name */}
                  <h3 className="font-bold text-gray-900 text-xl mb-4">{fabric.name}</h3>

                  {/* Properties */}
                  <div className="space-y-2">
                    {fabric.properties.map((prop) => (
                      <div key={prop} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="shrink-0">
                          <svg
                            className="w-4 h-4 text-orange-500"
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
                        {prop}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Fabric CTA */}
      <section className="bg-[#1e3056] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
                Large Orders
              </p>
              <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase mb-2">
                Custom Fabric for 400+ Pieces
              </h2>
              <p className="text-gray-300 max-w-xl">
                For large orders, we offer fully customised fabric with specific GSM, colour shade,
                performance specs, and construction — knitted to your exact requirements.
              </p>
            </div>
            <a
              href="mailto:info@bighopesports.com"
              className="w-full md:w-auto md:shrink-0 text-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Request Samples
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-3">
            Not Sure Which Fabric?
          </h3>
          <p className="text-gray-500 mb-6">
            Tell us your sport and we&apos;ll recommend the perfect fabric for your order.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1e3056] hover:bg-[#162440] text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Get Expert Advice
          </Link>
        </div>
      </section>
    </>
  );
}
