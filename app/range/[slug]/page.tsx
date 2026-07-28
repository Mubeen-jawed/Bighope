import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CatalogViewer from "@/components/CatalogViewer";
import { sanityFetch } from "@/lib/sanity/client";
import { rangeBySlugQuery, rangeSlugsQuery, TAGS } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import { formatPrice } from "@/lib/format";
import type { RangePage as RangePageData } from "@/lib/sanity/types";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ranges = await sanityFetch<{ slug: string }[]>({
    query: rangeSlugsQuery,
    tags: [TAGS.range],
  });
  return ranges.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const range = await sanityFetch<RangePageData | null>({
    query: rangeBySlugQuery,
    params: { slug },
    tags: [TAGS.range],
  });
  if (!range) return {};
  return { title: range.title };
}

export default async function RangePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const range = await sanityFetch<RangePageData | null>({
    query: rangeBySlugQuery,
    params: { slug },
    tags: [TAGS.range, TAGS.product],
  });
  if (!range) notFound();

  const products = range.products || [];

  return (
    <>
      <PageHero
        title={range.title}
        subtitle={range.description}
        breadcrumb={`Home / Our Range / ${range.title}`}
      />

      {/* ── Products ── */}
      <section className="relative py-14 md:py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* texture + accents */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,24,48,0.06) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 85%)",
            }}
          />
          <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-14">
            {range.category && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 ring-1 ring-orange-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">
                  {range.category}
                </span>
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4 tracking-tight">
              {range.title}
            </h2>
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-6" />
            <CatalogViewer label="VIEW CATALOG" variant="section-blue" />
          </div>

          {products.length === 0 ? (
            /* Coming Soon state */
            <div className="relative overflow-hidden text-center py-16 md:py-24 rounded-3xl border border-dashed border-orange-300/70 bg-white/70 backdrop-blur-sm px-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent" />
              <div className="relative">
                <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20">
                  <svg
                    className="w-8 h-8 text-orange-500"
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
                <h3 className="text-lg md:text-2xl font-[family-name:var(--font-oswald)] font-bold text-gray-800 uppercase tracking-widest mb-3">
                  Coming Soon
                </h3>
                <p className="text-gray-500 mb-7 md:mb-8 max-w-sm mx-auto text-sm">
                  Products in this category are on their way. Contact us to
                  enquire about custom orders.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  Enquire Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
              {products.map((product, i) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 card-hover hover:ring-2 hover:ring-orange-400/60"
                >
                  <div
                    className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100"
                    style={{ aspectRatio: "1 / 1.1" }}
                  >
                    <Image
                      src={imageUrl(product.mainImage, 500)}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-3 sm:p-5 md:p-6 group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Corner index */}
                    <span className="absolute top-2.5 left-2.5 flex items-center justify-center w-7 h-7 rounded-full bg-gray-900/5 text-gray-400 text-[10px] font-bold font-[family-name:var(--font-oswald)] group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-5">
                    <h3 className="font-bold text-gray-900 text-[11px] sm:text-sm uppercase tracking-wider leading-snug mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    {typeof product.price === "number" &&
                      Number.isFinite(product.price) && (
                        <div className="flex items-baseline gap-1.5 mb-2 sm:mb-3">
                          <span className="font-[family-name:var(--font-oswald)] font-bold text-orange-500 text-base sm:text-lg leading-none">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          {product.priceUnit && (
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                              {product.priceUnit}
                            </span>
                          )}
                        </div>
                      )}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 sm:pt-3">
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
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-20">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 ring-1 ring-orange-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">
              Custom Teamwear
            </span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-[#1e3056] uppercase mb-3 md:mb-4">
            Ready to Kit Out Your Team?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-7 md:mb-9 max-w-lg mx-auto">
            Send us your design ideas or let our team create something amazing.
            Free quote, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-7 sm:px-8 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get a Free Quote
            </a>
            <Link
              href="/packages"
              className="border-2 border-[#1e3056]/40 hover:border-[#1e3056] hover:bg-[#1e3056] hover:text-white text-[#1e3056] font-bold px-7 sm:px-8 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
