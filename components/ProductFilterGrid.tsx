"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/sanity/image";
import type { ProductCard } from "@/lib/sanity/types";

type SortKey = "featured" | "az" | "za";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "Name (A–Z)" },
  { value: "za", label: "Name (Z–A)" },
];

export default function ProductFilterGrid({
  products,
}: {
  products: ProductCard[];
}) {
  const [search, setSearch] = useState("");
  const [fabric, setFabric] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  // Unique fabrics present in this range (skip if none have a fabric set).
  const fabrics = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.fabric && set.add(p.fabric));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.productCode?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);
      const matchesFabric = fabric === "all" || p.fabric === fabric;
      return matchesSearch && matchesFabric;
    });

    if (sort === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "za") {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [products, search, fabric, sort]);

  const hasFilters = search.trim() !== "" || fabric !== "all" || sort !== "featured";

  const resetFilters = () => {
    setSearch("");
    setFabric("all");
    setSort("featured");
  };

  return (
    <div>
      {/* ── Filter toolbar ── */}
      <div className="sticky top-16 md:top-20 z-20 -mx-4 px-4 py-3 mb-6 md:mb-8 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-y border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Selects */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {fabrics.length > 0 && (
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  aria-label="Filter by fabric"
                  className="w-full sm:w-auto appearance-none pl-3.5 pr-9 py-2.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all cursor-pointer"
                >
                  <option value="all">All fabrics</option>
                  {fabrics.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <Chevron />
              </div>
            )}

            <div className="relative flex-1 sm:flex-none">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort products"
                className="w-full sm:w-auto appearance-none pl-3.5 pr-9 py-2.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort: {o.label}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>

        {/* Result count + active filters */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>
            Showing <span className="font-bold text-gray-900">{visible.length}</span> of{" "}
            {products.length} products
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-bold uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Grid / empty state ── */}
      {visible.length === 0 ? (
        <div className="text-center py-14 md:py-20 border border-gray-100 rounded-2xl bg-gray-50 px-4">
          <h3 className="text-base md:text-lg font-[family-name:var(--font-oswald)] font-bold text-gray-900 uppercase tracking-widest mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
            Try a different search term or clear your filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {visible.map((product) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-md card-hover"
            >
              <div className="relative w-full bg-white" style={{ aspectRatio: "1 / 1.1" }}>
                <Image
                  src={imageUrl(product.mainImage, 500)}
                  alt={product.alt || product.name}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
