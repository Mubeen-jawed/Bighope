import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CatalogViewer from "@/components/CatalogViewer";

interface Product {
  slug: string;
  name: string;
  desc: string;
  image: string;
}

interface RangeData {
  title: string;
  category: string;
  description: string;
  products: Product[];
}

const rangeData: Record<string, RangeData> = {
  hoodie: {
    title: "Custom Hoodies",
    category: "Custom Teamwear",
    description:
      "Fully sublimated custom hoodies in premium 100% polyester fleece. Unlimited colours, team logos, and player names.",
    products: [
      {
        slug: "custom-team-hoodies",
        name: "Custom Team Hoodies",
        desc: "100% polyester fleece, fully sublimated, unlimited colours and logos",
        image: "/ranges/teamwear/custom-team-hoodies.webp",
      },
      {
        slug: "custom-zipper-hoodies",
        name: "Custom Zipper Hoodies",
        desc: "Full-zip fleece hoodie, sublimated design, moisture-wicking lining",
        image: "/ranges/teamwear/custom-zipper-hoodies.webp",
      },
    ],
  },
  "t-shirts": {
    title: "Custom T-Shirts",
    category: "Custom Teamwear",
    description:
      "Dye-sublimated team T-shirts in 100% cool-dry micromesh or interlock polyester. Men's, women's and youth sizing.",
    products: [
      {
        slug: "custom-t-shirts",
        name: "Custom T-Shirts",
        desc: "100% cool-dry micromesh polyester, fully sublimated, breathable and moisture-wicking",
        image: "/ranges/teamwear/custom-t-shirts.webp",
      },
    ],
  },
  polo: {
    title: "Custom Polo Shirts",
    category: "Custom Teamwear",
    description:
      "Moisture-wicking custom polo shirts. Fully dye sublimated, no colour limits. Available in mesh or spandex fabric.",
    products: [
      {
        slug: "custom-polo-shirts",
        name: "Custom Polo Shirts",
        desc: "100% polyester mesh or spandex, moisture-wicking, fully sublimated",
        image: "/ranges/teamwear/custom-polo-shirts.webp",
      },
    ],
  },
  "track-suits": {
    title: "Custom Track Suits",
    category: "Custom Teamwear",
    description:
      "Premium 100% polyester fleece or Scuba fabric tracksuits, fully sublimated for your team's identity.",
    products: [
      {
        slug: "custom-tracksuits",
        name: "Custom Tracksuits",
        desc: "100% polyester fleece or Scuba fabric, fully sublimated tracksuit set",
        image: "/ranges/teamwear/custom-tracksuits.webp",
      },
    ],
  },
  "quarter-zipper": {
    title: "Custom 1/4 Zipper",
    category: "Custom Teamwear",
    description:
      "Custom 1/4 zip pullovers available in long sleeve and short sleeve. 100% polyester mesh, fully sublimated.",
    products: [
      {
        slug: "custom-quarter-zipper-ls",
        name: "Custom 1/4 Zipper LS",
        desc: "Long sleeve 1/4 zip pullover, 100% polyester mesh, fully sublimated",
        image: "/ranges/teamwear/custom-quarter-zipper-ls.webp",
      },
      {
        slug: "custom-1-4-zipper-ss",
        name: "Custom 1/4 Zipper SS",
        desc: "Short sleeve 1/4 zip pullover, 100% polyester mesh, fully sublimated",
        image: "/ranges/teamwear/custom-quarter-zipper-ss.webp",
      },
    ],
  },
  jackets: {
    title: "Custom Jackets",
    category: "Custom Teamwear",
    description:
      "Durable, fully sublimated custom jackets for teams and clubs. Ideal for warm-ups, travel, and bench wear.",
    products: [
      {
        slug: "custom-jackets",
        name: "Custom Coach Jackets",
        desc: "Premium polyester & nylon, embroidery or sublimation, coach, rain & puffer styles",
        image: "/ranges/teamwear/custom-coach-jackets.webp",
      },
    ],
  },
  "bags-packs": {
    title: "Custom Bags & Packs",
    category: "Accessories",
    description:
      "Heavy-duty polyester/nylon custom backpacks. Personalised with embroidery, heat transfer, or sublimation.",
    products: [
      {
        slug: "custom-bags",
        name: "Custom Bagpacks",
        desc: "Heavy-duty polyester/nylon, reinforced stitching, custom branding",
        image: "/ranges/accessories/custom-backpacks.webp",
      },
    ],
  },
  "duffle-bags": {
    title: "Custom Duffle Bags",
    category: "Accessories",
    description:
      "Team duffle bags in heavy-duty nylon with reinforced stitching. Custom branding via embroidery or sublimation.",
    products: [
      {
        slug: "custom-duffle-bags",
        name: "Custom Duffle Bags",
        desc: "Heavy-duty nylon with reinforced stitching, custom embroidery or sublimation",
        image: "/ranges/accessories/custom-duffle-bags.webp",
      },
    ],
  },
  socks: {
    title: "Custom Socks",
    category: "Accessories",
    description:
      "High-performance nylon/polyester/spandex blend socks with reinforced heel and toe. Full colour sublimation.",
    products: [
      {
        slug: "custom-socks",
        name: "Custom Socks",
        desc: "Nylon/polyester/spandex blend, reinforced heel and toe, fully sublimated",
        image: "/ranges/accessories/custom-socks.webp",
      },
    ],
  },
  hats: {
    title: "Custom Hats",
    category: "Accessories",
    description:
      "Custom sublimated and embroidered sports caps for your team. Coming soon - contact us to enquire.",
    products: [],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = rangeData[slug];
  if (!data) return {};
  return { title: data.title };
}

export function generateStaticParams() {
  return Object.keys(rangeData).map((slug) => ({ slug }));
}

export default async function RangePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const range = rangeData[slug];
  if (!range) notFound();

  return (
    <>
      <PageHero
        title={range.title}
        subtitle={range.description}
        breadcrumb={`Home / Our Range / ${range.title}`}
      />

      {/* ── Products ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header, centered like sport pages */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-orange-500 font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
              {range.category}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-4">
              {range.title}
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded mx-auto mb-5 md:mb-6" />
            <CatalogViewer label="VIEW CATALOG" variant="section-blue" />
          </div>

          {range.products.length === 0 ? (
            /* Coming Soon state */
            <div className="text-center py-14 md:py-24 border border-gray-200 rounded-2xl bg-gray-50 px-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-700 uppercase tracking-widest mb-3">
                Coming Soon
              </h3>
              <p className="text-gray-400 mb-7 md:mb-8 max-w-sm mx-auto text-sm">
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
              {range.products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md card-hover"
                >
                  <div
                    className="relative w-full bg-white"
                    style={{ aspectRatio: "1 / 1.1" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-3 sm:p-5 md:p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

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
