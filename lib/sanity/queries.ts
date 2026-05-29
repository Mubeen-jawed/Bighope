import { groq } from "next-sanity";

/* ── Cache tags (kept in sync with app/api/revalidate/route.ts) ── */
export const TAGS = {
  sport: "sport",
  product: "product",
  range: "range",
  package: "package",
  siteSettings: "siteSettings",
} as const;

/* ── Sports / ranges ───────────────────────────────────────────── */

/** Homepage "Our Range" grid. */
export const homepageSportsQuery = groq`
  *[_type == "sport" && showOnHomepage == true] | order(order asc){
    _id, title, "slug": slug.current, cardImage
  }
`;

/** All sport slugs for generateStaticParams. */
export const sportSlugsQuery = groq`
  *[_type == "sport" && defined(slug.current)]{ "slug": slug.current }
`;

/** One sport page with its products. */
export const sportBySlugQuery = groq`
  *[_type == "sport" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, description, quoteCategory,
    "products": *[_type == "product" && references(^._id)] | order(name asc){
      _id, name, "slug": slug.current, description, mainImage, alt
    }
  }
`;

/* ── Products ──────────────────────────────────────────────────── */

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)]{ "slug": slug.current }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id, "slug": slug.current, productCode, name, description, longDescription,
    idealFor, mainImage, gallery, alt, fabric, specs, features, customOptions,
    "sportId": sport._ref,
    "sportTitle": sport->title,
    "sportSlug": sport->slug.current,
    "quoteCategory": sport->quoteCategory
  }
`;

/** Up to 4 other products in the same sport. */
export const relatedProductsQuery = groq`
  *[_type == "product" && sport._ref == $sportId && slug.current != $slug]
    | order(name asc)[0...4]{
      _id, name, "slug": slug.current, description, mainImage, alt
    }
`;

/* ── Ranges (sub-collections) ──────────────────────────────────── */

export const rangeSlugsQuery = groq`
  *[_type == "range" && defined(slug.current)]{ "slug": slug.current }
`;

export const rangeBySlugQuery = groq`
  *[_type == "range" && slug.current == $slug][0]{
    title, "slug": slug.current, category, description,
    "products": products[]->{
      _id, name, "slug": slug.current, description, mainImage, alt
    }
  }
`;

/* ── Packages ──────────────────────────────────────────────────── */

export const packagesQuery = groq`
  *[_type == "package"] | order(_createdAt asc){
    _id, sport, shortName, "slug": slug.current, description, longDescription,
    cardImage, popular, includes, minOrder,
    images[]{ image, tier, tierColor }
  }
`;

export const packageSlugsQuery = groq`
  *[_type == "package" && defined(slug.current)]{ "slug": slug.current }
`;

export const packageBySlugQuery = groq`
  *[_type == "package" && slug.current == $slug][0]{
    _id, sport, shortName, "slug": slug.current, description, longDescription,
    cardImage, popular, includes, minOrder,
    images[]{ image, tier, tierColor }
  }
`;

/* ── Navbar "Our Range" dropdown (sports + teamwear + accessories) ── */
export const navRangeQuery = groq`{
  "uniforms": *[_type == "sport" && !(slug.current in ["teamwear","accessories"])]
    | order(order asc){ "label": title, "slug": slug.current },
  "teamwear": *[_type == "range" && category == "Custom Teamwear"]
    | order(_createdAt asc){ "label": title, "slug": slug.current },
  "accessories": *[_type == "range" && category == "Accessories"]
    | order(_createdAt asc){ "label": title, "slug": slug.current }
}`;

/* ── Site settings (hero slider + banner image) ────────────────── */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    heroSlides[]{ desktopImage, mobileImage, topText, mainText, description, link },
    dspImage
  }
`;

/* ── Quote category lookups (replaces lib/slug-category-map.ts) ── */

/** Map every product slug → its sport's quote category. */
export const productCategoryMapQuery = groq`
  *[_type == "product" && defined(slug.current)]{
    "slug": slug.current, "category": sport->quoteCategory
  }
`;

/** Map every sport slug → its quote category. */
export const sportCategoryMapQuery = groq`
  *[_type == "sport" && defined(slug.current)]{
    "slug": slug.current, "category": quoteCategory
  }
`;
