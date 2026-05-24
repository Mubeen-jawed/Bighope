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

const B = "https://bighopesports.com/wp-content/uploads";

const rangeData: Record<string, RangeData> = {
  hoodie: {
    title: "Custom Hoodies",
    category: "Custom Teamwear",
    description: "Fully sublimated custom hoodies in premium 100% polyester fleece. Unlimited colours, team logos, and player names.",
    products: [
      { slug: "custom-team-hoodies", name: "Custom Team Hoodies", desc: "100% polyester fleece, fully sublimated, unlimited colours and logos", image: `${B}/2025/11/i6pbbxnuqnyco20dspzu-1200x1603.webp` },
      { slug: "custom-zipper-hoodies", name: "Custom Zipper Hoodies", desc: "Full-zip fleece hoodie, sublimated design, moisture-wicking lining", image: `${B}/2025/11/s67d3nnpgmwihlqxg0yl.webp` },
    ],
  },
  "t-shirts": {
    title: "Custom T-Shirts",
    category: "Custom Teamwear",
    description: "Dye-sublimated team T-shirts in 100% cool-dry micromesh or interlock polyester. Men's, women's and youth sizing.",
    products: [
      { slug: "custom-t-shirts", name: "Custom T-Shirts", desc: "100% cool-dry micromesh polyester, fully sublimated, breathable and moisture-wicking", image: `${B}/2025/11/sufbcn8kyf81eia10qhl.webp` },
    ],
  },
  polo: {
    title: "Custom Polo Shirts",
    category: "Custom Teamwear",
    description: "Moisture-wicking custom polo shirts. Fully dye sublimated, no colour limits. Available in mesh or spandex fabric.",
    products: [
      { slug: "custom-polo-shirts", name: "Custom Polo Shirts", desc: "100% polyester mesh or spandex, moisture-wicking, fully sublimated", image: `${B}/2025/11/uo7nngnyidgvkc8ljxsq-1200x1603.webp` },
    ],
  },
  "track-suits": {
    title: "Custom Track Suits",
    category: "Custom Teamwear",
    description: "Premium 100% polyester fleece or Scuba fabric tracksuits, fully sublimated for your team's identity.",
    products: [
      { slug: "custom-tracksuits", name: "Custom Tracksuits", desc: "100% polyester fleece or Scuba fabric, fully sublimated tracksuit set", image: `${B}/2025/11/elx0jhwf6jw8wo5xtbtk.webp` },
    ],
  },
  "quarter-zipper": {
    title: "Custom 1/4 Zipper",
    category: "Custom Teamwear",
    description: "Custom 1/4 zip pullovers available in long sleeve and short sleeve. 100% polyester mesh, fully sublimated.",
    products: [
      { slug: "custom-quarter-zipper-ls", name: "Custom 1/4 Zipper LS", desc: "Long sleeve 1/4 zip pullover, 100% polyester mesh, fully sublimated", image: `${B}/2025/11/saupe0lpduqh9ybdrr8q-1200x1603.webp` },
      { slug: "custom-1-4-zipper-ss", name: "Custom 1/4 Zipper SS", desc: "Short sleeve 1/4 zip pullover, 100% polyester mesh, fully sublimated", image: `${B}/2025/12/syeboevcchh58qmoatze-1200x1603.webp` },
    ],
  },
  jackets: {
    title: "Custom Jackets",
    category: "Custom Teamwear",
    description: "Durable, fully sublimated custom jackets for teams and clubs. Ideal for warm-ups, travel, and bench wear.",
    products: [
      { slug: "custom-jackets", name: "Custom Coach Jackets", desc: "Premium polyester & nylon, embroidery or sublimation, coach, rain & puffer styles", image: `${B}/2025/11/omsc8lldid8tuazhl9zv-1200x1603.webp` },
    ],
  },
  "bags-packs": {
    title: "Custom Bags & Packs",
    category: "Accessories",
    description: "Heavy-duty polyester/nylon custom backpacks. Personalised with embroidery, heat transfer, or sublimation.",
    products: [
      { slug: "custom-bags", name: "Custom Bagpacks", desc: "Heavy-duty polyester/nylon, reinforced stitching, custom branding", image: `${B}/2025/11/grojrhjupl7fa7osf91j-1200x1603.webp` },
    ],
  },
  "duffle-bags": {
    title: "Custom Duffle Bags",
    category: "Accessories",
    description: "Team duffle bags in heavy-duty nylon with reinforced stitching. Custom branding via embroidery or sublimation.",
    products: [
      { slug: "custom-duffle-bags", name: "Custom Duffle Bags", desc: "Heavy-duty nylon with reinforced stitching, custom embroidery or sublimation", image: `${B}/2025/12/hvqllx0q7lnmmsv61wi0-1200x1603.webp` },
    ],
  },
  socks: {
    title: "Custom Socks",
    category: "Accessories",
    description: "High-performance nylon/polyester/spandex blend socks with reinforced heel and toe. Full colour sublimation.",
    products: [
      { slug: "custom-socks", name: "Custom Socks", desc: "Nylon/polyester/spandex blend, reinforced heel and toe, fully sublimated", image: `${B}/2025/11/f1apodtfbsiqkuvmtubc-1200x1603.webp` },
    ],
  },
  hats: {
    title: "Custom Hats",
    category: "Accessories",
    description: "Custom sublimated and embroidered sports caps for your team. Coming soon - contact us to enquire.",
    products: [],
  },
};

export function generateStaticParams() {
  return Object.keys(rangeData).map((slug) => ({ slug }));
}

export default async function RangePage({ params }: { params: Promise<{ slug: string }> }) {
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

          {/* Dark navy header banner — matches MORE BASKETBALL PRODUCTS style */}
          <div className="flex items-center justify-between bg-[#1e3056] rounded-lg px-6 py-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              {range.title}
            </h2>
            <div className="flex items-center gap-3">
              <CatalogViewer label="VIEW CATALOG" variant="section-blue" />
              <Link
                href={`/sport/${
                  range.category === "Accessories" ? "accessories" : "teamwear"
                }`}
                className="text-sm font-semibold text-white border border-white/50 hover:border-white hover:bg-white hover:text-[#1e3056] px-4 py-2 rounded transition-all duration-200 whitespace-nowrap"
              >
                View All {range.category}
              </Link>
            </div>
          </div>

        {range.products.length === 0 ? (
          /* Coming Soon state */
          <div className="text-center py-14 md:py-24 border border-gray-200 rounded-2xl bg-gray-50 px-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-700 uppercase tracking-widest mb-3">
              Coming Soon
            </h3>
            <p className="text-gray-400 mb-7 md:mb-8 max-w-sm mx-auto text-sm">
              Products in this category are on their way. Contact us to enquire about custom orders.
            </p>
            <a
              href="mailto:info@bighopesports.com"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Enquire Now
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {range.products.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group transition-all duration-300 hover:-translate-y-1 block"
              >
                {/* Image — object-cover with 3/4 aspect ratio */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Orange Custom badge */}
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">
                    Custom
                  </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-1 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 leading-snug line-clamp-2">
                    {product.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-orange-500 text-sm font-semibold group/link">
                    Read more
                    <svg
                      className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
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
            Send us your design ideas or let our team create something amazing. Free quote, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="mailto:info@bighopesports.com"
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
