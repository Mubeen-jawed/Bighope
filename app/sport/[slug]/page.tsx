import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CatalogViewer from "@/components/CatalogViewer";
import ProductFilterGrid from "@/components/ProductFilterGrid";
import { sanityFetch } from "@/lib/sanity/client";
import { sportBySlugQuery, sportSlugsQuery, TAGS } from "@/lib/sanity/queries";
import type { SportPage as SportPageData } from "@/lib/sanity/types";

// Allow sports added in Sanity after build to be generated on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  const sports = await sanityFetch<{ slug: string }[]>({
    query: sportSlugsQuery,
    tags: [TAGS.sport],
  });
  return sports.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sport = await sanityFetch<SportPageData | null>({
    query: sportBySlugQuery,
    params: { slug },
    tags: [TAGS.sport],
  });
  if (!sport) return {};
  return { title: sport.title, description: sport.description };
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sport = await sanityFetch<SportPageData | null>({
    query: sportBySlugQuery,
    params: { slug },
    tags: [TAGS.sport, TAGS.product],
  });
  if (!sport) notFound();

  const products = sport.products || [];

  return (
    <>
      <PageHero
        title={sport.title}
        subtitle={sport.description}
        breadcrumb={`Home / Our Range / ${sport.title}`}
      />

      {/* ── Products ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-orange-500 font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
              Products
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Our {sport.title} Range
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-5 md:mb-6" />
            <CatalogViewer label="VIEW FULL CATALOG" variant="section-blue" />
          </div>

          {products.length === 0 ? (
            /* Empty / coming-soon state */
            <div className="text-center py-14 md:py-24 border border-gray-100 rounded-2xl bg-gray-50 px-4">
              <h3 className="text-lg md:text-xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase tracking-widest mb-3">
                Coming Soon
              </h3>
              <p className="text-gray-500 mb-7 md:mb-8 max-w-sm mx-auto text-sm">
                Products in this category are on their way. Contact us to
                enquire about custom orders.
              </p>
              <a
                href="/contact"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Enquire Now
              </a>
            </div>
          ) : (
            <ProductFilterGrid products={products} />
          )}
        </div>
      </section>

      {/* ── CTA ── */}
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
            <a
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get a Free Quote
            </a>
            <Link
              href="/packages"
              className="border-2 border-white/50 hover:border-white text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
