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
    <section
      id="categories"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Decorative texture + soft accents */}
      <div className="pointer-events-none absolute inset-0">
        {/* dotted grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,24,48,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 35%, transparent 80%)",
          }}
        />
        {/* soft orange glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 ring-1 ring-orange-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em]">
              Browse by Sports
            </span>
          </span>
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase mb-3 tracking-tight">
            Our <span className="text-orange-500">Range</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Fully customized sportswear for every sport. From amateur clubs to
            professional teams, we kit you out.
          </p>
          <div className="mt-5 mx-auto w-16 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/sport/${cat.slug}`}
              className="category-card group relative rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 card-hover block hover:ring-2 hover:ring-orange-400/60"
            >
              {/* Image */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={imageUrl(cat.cardImage, 600)}
                  alt={cat.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Always-on gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                {/* Hover orange wash */}
                <div className="overlay absolute inset-0 bg-gradient-to-t from-orange-600/50 via-orange-500/10 to-transparent" />
                {/* Number badge */}
                <span className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-white text-xs font-bold font-[family-name:var(--font-oswald)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 className="text-white font-[family-name:var(--font-oswald)] font-bold uppercase text-sm sm:text-lg leading-tight drop-shadow-lg tracking-wide">
                  {cat.title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-orange-300 text-xs font-bold uppercase tracking-wider translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>View range</span>
                  <svg
                    className="w-3.5 h-3.5"
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

              {/* Bottom accent line on hover */}
              <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
