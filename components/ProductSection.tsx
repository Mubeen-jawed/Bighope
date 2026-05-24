import Image from "next/image";
import Link from "next/link";

interface Product {
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
}

interface ProductSectionProps {
  title: string;
  slug: string;
  products: Product[];
  bgColor?: string;
}

export default function ProductSection({
  title,
  slug,
  products,
  bgColor,
}: ProductSectionProps) {
  return (
    <section
      id={slug}
      className="py-12"
      style={{ backgroundColor: bgColor || "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between bg-[#1e3056] rounded-lg px-6 py-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
            {title}
          </h2>
          <Link
            href={`/sport/${slug}`}
            className="text-sm font-semibold text-white border border-white/50 hover:border-white hover:bg-white hover:text-[#1e3056] px-4 py-2 rounded transition-all duration-200 whitespace-nowrap"
          >
            View all {title}
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <Link
              key={idx}
              href={`/product/${product.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group transition-all duration-300 hover:-translate-y-1 block"
            >
              {/* Product image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Quick view badge on hover */}
                <div className="absolute top-3 right-3 bg-[#1e3056] text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Custom
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 leading-snug line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-semibold group/link">
                  View product
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
      </div>
    </section>
  );
}
