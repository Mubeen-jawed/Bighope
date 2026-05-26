import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { allProducts } from "@/lib/products";
import CatalogViewer from "@/components/CatalogViewer";

const sportMeta: Record<string, { title: string; description: string }> = {
  soccer: {
    title: "Soccer / Football Uniforms",
    description:
      "Fully sublimated, 100% Cool-Dry Polyester. UPF 50+ protection. Free design included.",
  },
  rugby: {
    title: "Rugby Uniforms",
    description:
      "Durable 100% polyester scuba performance fabric with reinforced stitching for contact sport.",
  },
  basketball: {
    title: "Basketball Uniforms",
    description:
      "Cool-dry micromesh jerseys, shorts, and shooting gear for peak court performance.",
  },
  cricket: {
    title: "Cricket Uniforms",
    description:
      "UPF 50+ sun protection in premium Cool-Dry Polyester for all formats.",
  },
  "7v7-football": {
    title: "7v7 Football Uniforms",
    description:
      "Lightweight, fully sublimated uniforms built for flag and 7v7 football.",
  },
  baseball: {
    title: "Baseball Uniforms",
    description:
      "100% cool-dry polyester mesh/interlock jerseys for all levels of play.",
  },
  mma: {
    title: "MMA & Fight Gear",
    description:
      "Custom MMA shorts, rashguards, and wrestling singlets, sublimated for any gym or promotion.",
  },
  teamwear: {
    title: "Custom Teamwear",
    description:
      "Hoodies, tracksuits, polo shirts, T-shirts, and jackets, fully sublimated for your team.",
  },
  accessories: {
    title: "Custom Accessories",
    description: "Durable custom bags and socks built for athletes and clubs.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = sportMeta[slug];
  if (!meta) return {};
  return { title: meta.title };
}

export function generateStaticParams() {
  return Object.keys(sportMeta).map((slug) => ({ slug }));
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = sportMeta[slug];
  if (!meta) notFound();

  const products = allProducts.filter((p) => p.sportSlug === slug);

  return (
    <>
      <PageHero
        title={meta.title}
        subtitle={meta.description}
        breadcrumb={`Home / Our Range / ${meta.title}`}
      />

      {/* ── Products ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-orange-500 font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
              Products
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              Our {meta.title} Range
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md card-hover"
                >
                  {/* Image, object-contain on white background */}
                  <div
                    className="relative w-full bg-white"
                    style={{ aspectRatio: "1 / 1.1" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-contain object-center p-3 sm:p-5 md:p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

                  {/* Card footer */}
                  <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-5">
                    <h3 className="font-bold text-gray-900 text-[11px] sm:text-sm uppercase tracking-wider leading-snug mb-2 sm:mb-3">
                      {product.name}
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
