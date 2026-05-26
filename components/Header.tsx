"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import QuoteModal from "./QuoteModal";
import {
  productSlugCategory,
  sportSlugCategory,
  rangeSlugCategory,
} from "@/lib/slug-category-map";
import { sportPackages } from "@/lib/packages";

const rangeCategories = [
  {
    heading: "Custom Uniforms",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    items: [
      { label: "Soccer / Football", href: "/sport/soccer" },
      { label: "Rugby", href: "/sport/rugby" },
      { label: "Basketball", href: "/sport/basketball" },
      { label: "Cricket", href: "/sport/cricket" },
      { label: "7v7 Football", href: "/sport/7v7-football" },
      { label: "Baseball / Softball", href: "/sport/baseball" },
      { label: "MMA", href: "/sport/mma" },
    ],
  },
  {
    heading: "Custom Teamwear",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    items: [
      { label: "Hoodie", href: "/range/hoodie" },
      { label: "T-Shirts", href: "/range/t-shirts" },
      { label: "Polo", href: "/range/polo" },
      { label: "Track Suits", href: "/range/track-suits" },
      { label: "1/4 Zipper", href: "/range/quarter-zipper" },
      { label: "Jackets", href: "/range/jackets" },
    ],
  },
  {
    heading: "Accessories",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    items: [
      { label: "Bags & Packs", href: "/range/bags-packs" },
      { label: "Duffle Bags", href: "/range/duffle-bags" },
      { label: "Socks", href: "/range/socks" },
      { label: "Hats", href: "/range/hats" },
    ],
  },
];

const infoLinks = [
  {
    label: "About Us",
    href: "/about",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "How It Works",
    href: "/how-it-works",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    label: "Size Chart",
    href: "/size-chart",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    ),
  },
  {
    label: "Fabrics",
    href: "/fabrics",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
];

const searchIndex = [
  {
    label: "Soccer / Football Uniforms",
    href: "/sport/soccer",
    category: "Custom Uniforms",
  },
  { label: "Rugby Kits", href: "/sport/rugby", category: "Custom Uniforms" },
  {
    label: "Basketball Uniforms",
    href: "/sport/basketball",
    category: "Custom Uniforms",
  },
  {
    label: "Cricket Uniforms",
    href: "/sport/cricket",
    category: "Custom Uniforms",
  },
  {
    label: "7v7 Football Uniforms",
    href: "/sport/7v7-football",
    category: "Custom Uniforms",
  },
  {
    label: "Baseball / Softball Uniforms",
    href: "/sport/baseball",
    category: "Custom Uniforms",
  },
  { label: "MMA Gear", href: "/sport/mma", category: "Custom Uniforms" },
  { label: "Hoodie", href: "/range/hoodie", category: "Custom Teamwear" },
  { label: "T-Shirts", href: "/range/t-shirts", category: "Custom Teamwear" },
  { label: "Polo", href: "/range/polo", category: "Custom Teamwear" },
  {
    label: "Track Suits",
    href: "/range/track-suits",
    category: "Custom Teamwear",
  },
  {
    label: "1/4 Zipper",
    href: "/range/quarter-zipper",
    category: "Custom Teamwear",
  },
  { label: "Jackets", href: "/range/jackets", category: "Custom Teamwear" },
  { label: "Bags & Packs", href: "/range/bags-packs", category: "Accessories" },
  { label: "Duffle Bags", href: "/range/duffle-bags", category: "Accessories" },
  { label: "Socks", href: "/range/socks", category: "Accessories" },
  { label: "Hats", href: "/range/hats", category: "Accessories" },
  { label: "Packages", href: "/packages", category: "Pages" },
  { label: "Soccer Packages", href: "/packages/soccer", category: "Packages" },
  {
    label: "7v7 Football Packages",
    href: "/packages/7v7-football",
    category: "Packages",
  },
  {
    label: "Baseball Packages",
    href: "/packages/baseball",
    category: "Packages",
  },
  { label: "B2B Services", href: "/b2b", category: "Pages" },
  { label: "About Us", href: "/about", category: "Pages" },
  { label: "How It Works", href: "/how-it-works", category: "Pages" },
  { label: "Size Chart", href: "/size-chart", category: "Pages" },
  { label: "Fabrics", href: "/fabrics", category: "Pages" },
  { label: "Contact Us", href: "/contact", category: "Pages" },
  { label: "FAQ", href: "/faq", category: "Pages" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rangeDropdown, setRangeDropdown] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const [infoDropdown, setInfoDropdown] = useState(false);
  const [mobileRangeOpen, setMobileRangeOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchIndex>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const packagesDropdownRef = useRef<HTMLDivElement>(null);
  const infoDropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const rangeCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const packagesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const infoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openRange = () => {
    if (rangeCloseTimer.current) clearTimeout(rangeCloseTimer.current);
    if (packagesCloseTimer.current) clearTimeout(packagesCloseTimer.current);
    if (infoCloseTimer.current) clearTimeout(infoCloseTimer.current);
    setPackagesDropdown(false);
    setInfoDropdown(false);
    setRangeDropdown(true);
  };
  const closeRange = () => {
    rangeCloseTimer.current = setTimeout(() => setRangeDropdown(false), 150);
  };

  const openPackages = () => {
    if (packagesCloseTimer.current) clearTimeout(packagesCloseTimer.current);
    if (rangeCloseTimer.current) clearTimeout(rangeCloseTimer.current);
    if (infoCloseTimer.current) clearTimeout(infoCloseTimer.current);
    setRangeDropdown(false);
    setInfoDropdown(false);
    setPackagesDropdown(true);
  };
  const closePackages = () => {
    packagesCloseTimer.current = setTimeout(
      () => setPackagesDropdown(false),
      150,
    );
  };

  const openInfo = () => {
    if (infoCloseTimer.current) clearTimeout(infoCloseTimer.current);
    if (rangeCloseTimer.current) clearTimeout(rangeCloseTimer.current);
    if (packagesCloseTimer.current) clearTimeout(packagesCloseTimer.current);
    setRangeDropdown(false);
    setPackagesDropdown(false);
    setInfoDropdown(true);
  };
  const closeInfo = () => {
    infoCloseTimer.current = setTimeout(() => setInfoDropdown(false), 150);
  };

  const autoCategory = (() => {
    if (!pathname) return "";
    const productMatch = pathname.match(/^\/product\/([^/]+)/);
    if (productMatch) return productSlugCategory[productMatch[1]] ?? "";
    const sportMatch = pathname.match(/^\/sport\/([^/]+)/);
    if (sportMatch) return sportSlugCategory[sportMatch[1]] ?? "";
    const rangeMatch = pathname.match(/^\/range\/([^/]+)/);
    if (rangeMatch) return rangeSlugCategory[rangeMatch[1]] ?? "";
    return "";
  })();

  const isActive = (href: string) => pathname === href;
  const isRangeActive = () =>
    pathname?.startsWith("/sport") || pathname?.startsWith("/range");
  const isPackagesActive = () =>
    pathname === "/packages" || pathname?.startsWith("/packages/");
  const isInfoActive = () =>
    ["/about", "/how-it-works", "/size-chart", "/fabrics"].includes(
      pathname ?? "",
    );

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const q = query.toLowerCase();
    setSearchResults(
      searchIndex
        .filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q),
        )
        .slice(0, 8),
    );
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (searchResults.length > 0) {
      router.push(searchResults[0].href);
      closeSearch();
    }
  }, [searchResults, router, closeSearch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setRangeDropdown(false);
      if (
        packagesDropdownRef.current &&
        !packagesDropdownRef.current.contains(e.target as Node)
      )
        setPackagesDropdown(false);
      if (
        infoDropdownRef.current &&
        !infoDropdownRef.current.contains(e.target as Node)
      )
        setInfoDropdown(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        closeSearch();
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSearch]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : ""
      }`}
    >
      {/* ── Top contact bar, collapses smoothly on scroll ── */}
      <div
        className={`hidden sm:block bg-gray-950 text-white overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 text-xs">
          <Link href="/contact" className="flex items-center gap-2">
            {[
              { code: "pk", name: "Pakistan" },
              { code: "us", name: "USA" },
              { code: "au", name: "Australia" },
              { code: "es", name: "Spain" },
              { code: "gb", name: "UK" },
            ].map((f) => (
              <div
                key={f.code}
                className="w-5 h-5 rounded-full overflow-hidden border border-gray-700 hover:border-orange-500 transition-colors duration-200 shrink-0"
                title={f.name}
              >
                <Image
                  src={`https://flagcdn.com/w40/${f.code}.png`}
                  alt={`${f.name} flag`}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@bighopesports.com"
              className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@bighopesports.com
            </a>
            <div className="flex items-center gap-2.5 border-l border-gray-800 pl-4">
              <a
                href="https://www.facebook.com/bighopesports/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bighopesports/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-pink-400 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/bighopesports"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-blue-700 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <div
        className={`transition-all duration-300 ease-in-out sm:px-12 px-4 ${
          scrolled
            ? "bg-[#16254a]/95 backdrop-blur-md py-2 border-b border-white/10"
            : "bg-[#1e3056] py-3 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center shrink-0">
            <Image
              src="/logo/bighope-logo.png"
              alt="Big Hope Sports"
              width={250}
              height={60}
              className={`object-contain transition-all duration-300 ${
                scrolled ? "h-10 sm:h-12" : "h-10 sm:h-11 lg:h-13"
              }`}
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link
              href="/"
              className={`group relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive("/")
                  ? "text-orange-400"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              Home
              <span
                className={`absolute bottom-0 inset-x-3 h-[2px] bg-orange-400 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  isActive("/") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>

            {/* Our Range mega-menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isRangeActive()
                    ? "text-orange-400"
                    : "text-gray-200 hover:text-white"
                }`}
                onMouseEnter={openRange}
                onMouseLeave={closeRange}
                onClick={() => setRangeDropdown(!rangeDropdown)}
              >
                Our Range
                <span
                  className={`absolute bottom-0 inset-x-3 h-[2px] bg-orange-400 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    isRangeActive() ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${rangeDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mega-menu dropdown */}
              <div
                className={`absolute top-full left-0 z-50 mt-1 bg-white text-gray-800 shadow-2xl shadow-black/20 rounded-xl border border-gray-100 overflow-hidden transition-all duration-150 ease-out ${
                  rangeDropdown
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                style={{ minWidth: "680px" }}
                onMouseEnter={openRange}
                onMouseLeave={closeRange}
              >
                <div className="grid grid-cols-3 divide-x divide-gray-100 p-2">
                  {rangeCategories.map((cat) => (
                    <div key={cat.heading} className="py-4 px-5">
                      <div className="flex items-center gap-2 text-orange-500 mb-3 pb-2.5 border-b border-gray-100">
                        {cat.icon}
                        <p className="text-xs font-black uppercase tracking-widest text-gray-900">
                          {cat.heading}
                        </p>
                      </div>
                      <ul className="space-y-0.5">
                        {cat.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-150 group/item"
                              onClick={() => setRangeDropdown(false)}
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/item:bg-orange-400 transition-colors shrink-0" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages dropdown */}
            <div className="relative" ref={packagesDropdownRef}>
              <button
                className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isPackagesActive()
                    ? "text-orange-400"
                    : "text-gray-200 hover:text-white"
                }`}
                onMouseEnter={openPackages}
                onMouseLeave={closePackages}
                onClick={() => setPackagesDropdown(!packagesDropdown)}
              >
                Packages
                <span
                  className={`absolute bottom-0 inset-x-3 h-[2px] bg-orange-400 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    isPackagesActive() ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${packagesDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`absolute top-full left-0 mt-1 bg-white text-gray-800 shadow-2xl shadow-black/20 rounded-xl min-w-[240px] z-50 border border-gray-100 overflow-hidden transition-all duration-150 ease-out ${
                  packagesDropdown
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                onMouseEnter={openPackages}
                onMouseLeave={closePackages}
              >
                <div className="p-1.5">
                  <Link
                    href="/packages"
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                      pathname === "/packages"
                        ? "text-orange-500 bg-orange-50 font-medium"
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                    }`}
                    onClick={() => setPackagesDropdown(false)}
                  >
                    All Packages
                  </Link>
                  <div className="my-1 h-px bg-gray-100" />
                  {sportPackages.map((pkg) => (
                    <Link
                      key={pkg.slug}
                      href={pkg.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                        pathname === pkg.href
                          ? "text-orange-500 bg-orange-50 font-medium"
                          : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                      }`}
                      onClick={() => setPackagesDropdown(false)}
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      {pkg.sport}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/b2b"
              className={`group relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive("/b2b")
                  ? "text-orange-400"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              B2B Services
              <span
                className={`absolute bottom-0 inset-x-3 h-[2px] bg-orange-400 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  isActive("/b2b") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>

            {/* Info & About dropdown */}
            <div className="relative" ref={infoDropdownRef}>
              <button
                className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isInfoActive()
                    ? "text-orange-400"
                    : "text-gray-200 hover:text-white"
                }`}
                onMouseEnter={openInfo}
                onMouseLeave={closeInfo}
                onClick={() => setInfoDropdown(!infoDropdown)}
              >
                Info & About
                <span
                  className={`absolute bottom-0 inset-x-3 h-[2px] bg-orange-400 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    isInfoActive() ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${infoDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`absolute top-full left-0 mt-1 bg-white text-gray-800 shadow-2xl shadow-black/20 rounded-xl min-w-[210px] z-50 border border-gray-100 overflow-hidden transition-all duration-150 ease-out ${
                  infoDropdown
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                onMouseEnter={openInfo}
                onMouseLeave={closeInfo}
              >
                <div className="p-1.5">
                  {infoLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`block px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                        isActive(item.href)
                          ? "text-orange-500 bg-orange-50 font-medium"
                          : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                      }`}
                      onClick={() => setInfoDropdown(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={`group relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive("/contact")
                  ? "text-orange-400"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              Contact
              <span
                className={`absolute bottom-0 inset-x-3 h-[2px] bg-orange-400 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  isActive("/contact") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          </nav>

          {/* Desktop right-side actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center">
                {/* Animated input, always mounted, width-transitions open/closed */}
                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    searchOpen
                      ? "max-w-[11rem] xl:max-w-[13rem] opacity-100"
                      : "max-w-0 opacity-0"
                  }`}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearchSubmit();
                      if (e.key === "Escape") closeSearch();
                    }}
                    placeholder="Search..."
                    className="w-44 xl:w-52 bg-white/10 text-white placeholder-gray-400 text-sm px-3 py-1.5 rounded-l-lg border border-white/20 border-r-0 outline-none focus:bg-white/15"
                  />
                </div>
                <button
                  aria-label="Search"
                  onClick={() => {
                    if (searchOpen) handleSearchSubmit();
                    else setSearchOpen(true);
                  }}
                  className={`flex items-center justify-center w-9 h-9 transition-all duration-200 ${
                    searchOpen
                      ? "bg-orange-500 hover:bg-orange-600 text-white rounded-r-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                  }`}
                >
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {searchOpen && searchQuery && (
                <div className="absolute top-full right-0 mt-1.5 bg-white text-gray-800 shadow-2xl shadow-black/20 rounded-xl min-w-[280px] xl:min-w-[320px] z-50 border border-gray-100 overflow-hidden dropdown-menu">
                  {searchResults.length > 0 ? (
                    <div className="p-1.5">
                      {searchResults.map((result) => (
                        <Link
                          key={result.href + result.label}
                          href={result.href}
                          onClick={closeSearch}
                          className="flex items-center justify-between px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors group"
                        >
                          <span className="text-sm font-medium text-gray-800 group-hover:text-orange-600">
                            {result.label}
                          </span>
                          <span className="text-xs text-gray-400 ml-3 shrink-0 bg-gray-100 px-2 py-0.5 rounded-full">
                            {result.category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No results for &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quote CTA */}
            <QuoteModal
              key={`desktop-${autoCategory}`}
              defaultCategory={autoCategory}
              buttonClassName="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
              buttonLabel="Get a Quote"
            />
          </div>

          {/* Mobile right-side actions */}
          <div className="lg:hidden flex items-center gap-1">
            {/* Mobile search icon */}
            <button
              aria-label="Search"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileOpen(false);
              }}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                searchOpen
                  ? "bg-orange-500/20 text-orange-400"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <svg
                className="w-[18px] h-[18px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-5 h-5 transition-all duration-200 ${mobileOpen ? "rotate-90 opacity-0 absolute" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`w-5 h-5 transition-all duration-200 ${mobileOpen ? "" : "rotate-90 opacity-0 absolute"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile inline search (tap search icon in header) ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          searchOpen && !mobileOpen
            ? "max-h-24 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="bg-[#16254a] border-t border-white/10 px-4 py-2.5"
          ref={searchRef}
        >
          <div className="flex items-center bg-white/10 rounded-xl px-3 py-2 gap-2 max-w-lg mx-auto">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                  closeSearch();
                }
                if (e.key === "Escape") closeSearch();
              }}
            />
            {searchQuery && (
              <button
                onClick={closeSearch}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && searchResults.length > 0 && (
            <div className="mt-1 bg-[#162440] rounded-xl overflow-hidden border border-white/10 max-w-lg mx-auto">
              {searchResults.map((result) => (
                <Link
                  key={result.href}
                  href={result.href}
                  className="flex items-center justify-between px-3 py-2 text-sm hover:bg-white/10 border-b border-white/5 last:border-0"
                  onClick={closeSearch}
                >
                  <span className="text-gray-200">{result.label}</span>
                  <span className="text-xs text-gray-500">
                    {result.category}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0f1c3a] border-t border-white/10 text-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-3 flex flex-col gap-0.5">
            {/* Home */}
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                isActive("/")
                  ? "text-orange-400 bg-white/10"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            {/* Our Range accordion */}
            <div className="rounded-xl overflow-hidden border border-white/5">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                  mobileRangeOpen
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setMobileRangeOpen(!mobileRangeOpen)}
              >
                <span>Our Range</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileRangeOpen ? "rotate-180 text-orange-400" : "text-gray-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${mobileRangeOpen ? "max-h-[600px]" : "max-h-0"}`}
              >
                <div className="bg-[#0c1629] border-t border-white/5">
                  {rangeCategories.map((cat, idx) => (
                    <div
                      key={cat.heading}
                      className={idx > 0 ? "border-t border-white/5" : ""}
                    >
                      <div className="flex items-center gap-2 px-5 pt-3 pb-1">
                        <span className="text-orange-400">{cat.icon}</span>
                        <p className="text-xs font-black uppercase tracking-widest text-orange-400">
                          {cat.heading}
                        </p>
                      </div>
                      {cat.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`flex items-center gap-2 px-8 py-2 text-sm transition-colors ${
                            pathname === item.href
                              ? "text-orange-400 bg-orange-500/10"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <div className="h-2" />
                </div>
              </div>
            </div>

            {/* Packages accordion */}
            <div className="rounded-xl overflow-hidden border border-white/5">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                  mobilePackagesOpen
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
              >
                <span>Packages</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobilePackagesOpen ? "rotate-180 text-orange-400" : "text-gray-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${mobilePackagesOpen ? "max-h-[400px]" : "max-h-0"}`}
              >
                <div className="bg-[#0c1629] border-t border-white/5 p-1.5">
                  <Link
                    href="/packages"
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      pathname === "/packages"
                        ? "text-orange-400 bg-orange-500/10 font-medium"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    All Packages
                  </Link>
                  {sportPackages.map((pkg) => (
                    <Link
                      key={pkg.slug}
                      href={pkg.href}
                      className={`flex items-center gap-2 px-8 py-2 text-sm transition-colors ${
                        pathname === pkg.href
                          ? "text-orange-400 bg-orange-500/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                      {pkg.sport}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* B2B Services */}
            <Link
              href="/b2b"
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                isActive("/b2b")
                  ? "text-orange-400 bg-white/10"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              B2B Services
            </Link>

            {/* Info & About accordion */}
            <div className="rounded-xl overflow-hidden border border-white/5">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                  mobileInfoOpen
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
              >
                <span>Info & About</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileInfoOpen ? "rotate-180 text-orange-400" : "text-gray-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${mobileInfoOpen ? "max-h-[300px]" : "max-h-0"}`}
              >
                <div className="bg-[#0c1629] border-t border-white/5 p-1.5">
                  {infoLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "text-orange-400 bg-orange-500/10 font-medium"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                isActive("/contact")
                  ? "text-orange-400 bg-white/10"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            {/* Quote CTA */}
            <div className="pt-2">
              <QuoteModal
                key={`mobile-${autoCategory}`}
                defaultCategory={autoCategory}
                buttonClassName="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200"
                buttonLabel="Get a Quote"
              />
            </div>

            {/* Contact info strip */}
            <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-1">
              <a
                href="tel:+17473547351"
                className="flex items-center gap-2 px-1 py-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-blue-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +1 (747) 354-7351
              </a>
              <a
                href="mailto:info@bighopesports.com"
                className="flex items-center gap-2 px-1 py-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-blue-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@bighopesports.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
