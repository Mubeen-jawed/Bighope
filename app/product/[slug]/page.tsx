import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  allProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const galleryImages = product.images.map((src) => ({
    src,
    alt: product.alt,
  }));

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <section className="bg-[#0f1830] py-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/sport/${product.sportSlug}`}
              className="hover:text-orange-400 transition-colors capitalize"
            >
              {product.sport}
            </Link>
            <span>/</span>
            <span className="text-orange-400 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* ── Product Main ───────────────────────────────────────────── */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
            {/* Left, image gallery */}
            <ProductGallery images={galleryImages} />

            {/* Right, product details */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-[170px]">
              {/* Sport tag + title + code */}
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
                  {product.sport} Uniforms
                </span>
                <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase leading-tight mb-1">
                  {product.name}
                </h1>
                <p className="text-xs text-gray-400 font-mono tracking-wider">
                  Product Code: {product.productCode}
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Quick specs strip */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Material", value: product.fabric },
                  { label: "Min. Order", value: product.specs.minOrder },
                  { label: "Turnaround", value: product.specs.turnaround },
                  { label: "Sizes", value: product.specs.sizes },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      {s.label}
                    </p>
                    <p className="text-xs font-semibold text-gray-800 leading-snug">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <ProductTabs
                description={product.description}
                longDescription={product.longDescription}
                idealFor={product.idealFor}
                features={product.features}
                customOptions={product.customOptions}
                specs={product.specs}
              />

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/contact"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-4 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm text-sm"
                >
                  Request a Quote
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {[
                  {
                    label: "Free Design",
                    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
                  },
                  {
                    label: "Min 10 Pcs",
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                  },
                  {
                    label: "2–3 Wk Lead",
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2 border border-gray-100"
                  >
                    <svg
                      className="w-5 h-5 text-[#1e3056]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d={b.icon}
                      />
                    </svg>
                    <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature strip ──────────────────────────────────────────── */}
      <div className="bg-[#1e3056] text-white py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-8 text-xs sm:text-sm font-medium">
          {[
            "Free Custom Design",
            "No Hidden Fees",
            "2–4 Week Turnaround",
            "Worldwide Shipping",
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-orange-400 shrink-0"
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
              {feat}
            </div>
          ))}
        </div>
      </div>

      {/* ── How to Order ───────────────────────────────────────────── */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2">
              Simple Process
            </p>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase">
              How to Order
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Send Your Brief",
                desc: "Email us your team colours, logo, and any design ideas.",
              },
              {
                step: "02",
                title: "Free Artwork",
                desc: "Our designers create your custom artwork, no charge.",
              },
              {
                step: "03",
                title: "Approve & Pay",
                desc: "Review your design, approve and place your order.",
              },
              {
                step: "04",
                title: "We Deliver",
                desc: "Production in 2–4 weeks with worldwide shipping.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-[#1e3056] text-white rounded-xl flex items-center justify-center font-[family-name:var(--font-oswald)] font-bold text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Products ───────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#1e3056] rounded-xl px-4 sm:px-6 py-3 sm:py-4 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wide">
                More {product.sport} Products
              </h2>
              <Link
                href={`/sport/${product.sportSlug}`}
                className="text-xs sm:text-sm font-semibold text-white border border-white/50 hover:border-white hover:bg-white hover:text-[#1e3056] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                View All {product.sport}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/product/${rel.slug}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md card-hover"
                >
                  <div
                    className="relative w-full bg-white"
                    style={{ aspectRatio: "1 / 1.1" }}
                  >
                    <Image
                      src={rel.image}
                      alt={rel.alt}
                      fill
                      className="object-contain object-center p-3 sm:p-5 md:p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-5">
                    <h3 className="font-bold text-gray-900 text-[11px] sm:text-sm uppercase tracking-wider leading-snug mb-2 sm:mb-3">
                      {rel.name}
                    </h3>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-2 sm:pt-3">
                      <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-orange-500 transition-colors duration-200">
                        View Product
                      </span>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="bg-[#0f1830] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-oswald)] font-bold text-white uppercase mb-3 md:mb-4">
            Ready to Kit Out Your Team?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-6 md:mb-8 max-w-lg mx-auto">
            Send us your design ideas or let our team create something amazing.
            Free quote, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/packages"
              className="border-2 border-white/50 hover:border-white text-white font-bold px-6 sm:px-8 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
