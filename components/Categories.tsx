import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { homepageSportsQuery, TAGS } from "@/lib/sanity/queries";
import { imageUrl } from "@/lib/sanity/image";
import type { SportCard } from "@/lib/sanity/types";

export default async function Categories() {
  const categories = await sanityFetch<SportCard[]>({
    query: homepageSportsQuery,
    tags: [TAGS.sport],
  });

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-orange-500 text-xs font-black uppercase tracking-[0.2em] mb-2">
            Browse by Sports
          </p>
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-3">
            Our Range
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Fully customized sportswear for every sport. From amateur clubs to
            professional teams, we kit you out.
          </p>
          <div className="mt-4 mx-auto w-12 h-1 bg-orange-500 rounded" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/sport/${cat.slug}`}
              className="category-card group relative rounded-xl overflow-hidden shadow-md card-hover block"
            >
              {/* Image */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={imageUrl(cat.cardImage, 600)}
                  alt={cat.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Always-on gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Hover overlay */}
                <div className="overlay absolute inset-0 bg-orange-600/30" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-lg">
                  {cat.title}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-orange-300 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View range</span>
                  <svg
                    className="w-3 h-3"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
