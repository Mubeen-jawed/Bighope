/**
 * One-time migration: pushes all existing hardcoded content + images into
 * Sanity. Safe to re-run (uses createOrReplace with deterministic IDs;
 * Sanity dedupes identical image assets by content hash).
 *
 * Run with:  npx tsx scripts/migrate-to-sanity.ts
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_WRITE_TOKEN  (Editor token from Sanity → API → Tokens)
 */
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { allProducts } from "../lib/products";
import { sportPackages } from "../lib/packages";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

/* ── Image upload (cached by source, retried, serialized) ──────── */
const assetCache = new Map<string, string>();

function imageRef(assetId: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function uploadImage(src?: string) {
  if (!src) return undefined;
  if (assetCache.has(src)) return imageRef(assetCache.get(src)!);

  // 1. Load the bytes (local file or remote URL), with retries for URLs.
  let buffer: Buffer;
  const filename = decodeURIComponent(src.split("/").pop() || "image");
  try {
    if (src.startsWith("http")) {
      buffer = await withRetry(`fetch ${filename}`, async () => {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return Buffer.from(await res.arrayBuffer());
      });
    } else {
      const rel = src.replace(/^\//, "");
      buffer = readFileSync(join(process.cwd(), "public", rel));
    }
  } catch {
    console.warn(`  ⚠ skip (could not load): ${src}`);
    return undefined;
  }

  // 2. Upload to Sanity, retrying transient errors (502 / rate limit).
  try {
    const asset = await withRetry(`upload ${filename}`, () =>
      client.assets.upload("image", buffer, { filename }),
    );
    assetCache.set(src, asset._id);
    // Gentle pacing to stay under Sanity's ~25 req/s asset limit.
    await sleep(120);
    return imageRef(asset._id);
  } catch (err) {
    console.warn(`  ⚠ skip (upload failed): ${src}`);
    return undefined;
  }
}

/** Retry an async operation up to 5 times with exponential backoff. */
async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const wait = 500 * 2 ** (attempt - 1); // 0.5s, 1s, 2s, 4s, 8s
      console.warn(`    ↻ retry ${attempt}/5 (${label}) in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

/* ── Source data not exported elsewhere ────────────────────────── */

const sports = [
  { slug: "soccer", title: "Soccer / Football", card: "/ranges/soccer/FOOTBALL CTG.png", quoteCategory: "Soccer", order: 10, home: true, description: "Fully sublimated, 100% Cool-Dry Polyester. UPF 50+ protection. Free design included." },
  { slug: "rugby", title: "Rugby", card: "/ranges/rugby/RUGBY CTG.png", quoteCategory: "Rugby", order: 20, home: true, description: "Durable 100% polyester scuba performance fabric with reinforced stitching for contact sport." },
  { slug: "basketball", title: "Basketball", card: "/ranges/basketball/BASKETBALL CTG.png", quoteCategory: "Basketball", order: 30, home: true, description: "Cool-dry micromesh jerseys, shorts, and shooting gear for peak court performance." },
  { slug: "cricket", title: "Cricket", card: "/ranges/cricket/CRICKET CTG.png", quoteCategory: "Cricket", order: 40, home: true, description: "UPF 50+ sun protection in premium Cool-Dry Polyester for all formats." },
  { slug: "baseball", title: "Baseball / Softball", card: "/ranges/baseball/BASEBALL CTG.png", quoteCategory: "Baseball", order: 50, home: true, description: "100% cool-dry polyester mesh/interlock jerseys for all levels of play." },
  { slug: "7v7-football", title: "7v7 Football", card: "/sports/7v7-football-uniform.webp", quoteCategory: "7v7 Football", order: 60, home: true, description: "Lightweight, fully sublimated uniforms built for flag and 7v7 football." },
  { slug: "mma", title: "MMA", card: "/sports/mma-fighter.webp", quoteCategory: "MMA", order: 70, home: true, description: "Custom MMA shorts, rashguards, and wrestling singlets, sublimated for any gym or promotion." },
  { slug: "teamwear", title: "Hoodies & Teamwear", card: "/sports/teamwear-hoodies.png", quoteCategory: "Teamwear", order: 80, home: true, description: "Hoodies, tracksuits, polo shirts, T-shirts, and jackets, fully sublimated for your team." },
  { slug: "accessories", title: "Accessories", card: "/ranges/accessories/custom-backpacks.webp", quoteCategory: "Accessories", order: 90, home: false, description: "Durable custom bags and socks built for athletes and clubs." },
];

// Sub-collection ranges (mirrors rangeData in the old app/range/[slug] page).
const ranges = [
  { slug: "hoodie", title: "Custom Hoodies", category: "Custom Teamwear", description: "Fully sublimated custom hoodies in premium 100% polyester fleece. Unlimited colours, team logos, and player names.", products: ["custom-team-hoodies", "custom-zipper-hoodies"] },
  { slug: "t-shirts", title: "Custom T-Shirts", category: "Custom Teamwear", description: "Dye-sublimated team T-shirts in 100% cool-dry micromesh or interlock polyester. Men's, women's and youth sizing.", products: ["custom-t-shirts"] },
  { slug: "polo", title: "Custom Polo Shirts", category: "Custom Teamwear", description: "Moisture-wicking custom polo shirts. Fully dye sublimated, no colour limits. Available in mesh or spandex fabric.", products: ["custom-polo-shirts"] },
  { slug: "track-suits", title: "Custom Track Suits", category: "Custom Teamwear", description: "Premium 100% polyester fleece or Scuba fabric tracksuits, fully sublimated for your team's identity.", products: ["custom-tracksuits"] },
  { slug: "quarter-zipper", title: "Custom 1/4 Zipper", category: "Custom Teamwear", description: "Custom 1/4 zip pullovers available in long sleeve and short sleeve. 100% polyester mesh, fully sublimated.", products: ["custom-quarter-zipper-ls", "custom-1-4-zipper-ss"] },
  { slug: "jackets", title: "Custom Jackets", category: "Custom Teamwear", description: "Durable, fully sublimated custom jackets for teams and clubs. Ideal for warm-ups, travel, and bench wear.", products: ["custom-jackets"] },
  { slug: "bags-packs", title: "Custom Bags & Packs", category: "Accessories", description: "Heavy-duty polyester/nylon custom backpacks. Personalised with embroidery, heat transfer, or sublimation.", products: ["custom-bags"] },
  { slug: "duffle-bags", title: "Custom Duffle Bags", category: "Accessories", description: "Team duffle bags in heavy-duty nylon with reinforced stitching. Custom branding via embroidery or sublimation.", products: ["custom-duffle-bags"] },
  { slug: "socks", title: "Custom Socks", category: "Accessories", description: "High-performance nylon/polyester/spandex blend socks with reinforced heel and toe. Full colour sublimation.", products: ["custom-socks"] },
  { slug: "hats", title: "Custom Hats", category: "Accessories", description: "Custom sublimated and embroidered sports caps for your team. Coming soon - contact us to enquire.", products: [] },
];

// Hero slider (mirrors `slides` in components/Hero.tsx).
const heroSlides = [
  { desktop: "/hero/FOOTBALL.DESK.SLIDER.png", mobile: "/hero/FOOTBALL.mbl.SLIDER.png", topText: "CUSTOM SOCCER", mainText: "UNIFORMS", description: "Fully sublimated soccer uniforms, unlimited colors and logos. Fast turnaround, worldwide shipping.", link: "/sport/soccer" },
  { desktop: "/hero/cricket.DESK.SLIDER.png", mobile: "/hero/cricket.mb.SLIDER.png", topText: "CUSTOM CRICKET", mainText: "KITS", description: "Premium quality cricket kits, 100% customized for your team. Free design service included with every order.", link: "/sport/cricket" },
  { desktop: "/hero/baseBALL.DESK.SLIDER.png", mobile: "/hero/baseBALL.mb.SLIDER.png", topText: "CUSTOM BASEBALL", mainText: "UNIFORMS", description: "Custom baseball uniforms built for champions, designed by you, manufactured by us.", link: "/sport/baseball" },
  { desktop: "/hero/RUGBY.DSK.SL.png", mobile: "/hero/RUGBY.mb.SL.png", topText: "CUSTOM RUGBY", mainText: "KITS", description: "Premium quality rugby kits, 100% customized for your team. Free design service included with every order.", link: "/sport/rugby" },
];

/* ── Migrate ───────────────────────────────────────────────────── */

async function run() {
  console.log("→ Sports / ranges");
  for (const s of sports) {
    await client.createOrReplace({
      _id: `sport-${s.slug}`,
      _type: "sport",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      cardImage: await uploadImage(s.card),
      description: s.description,
      quoteCategory: s.quoteCategory,
      order: s.order,
      showOnHomepage: s.home,
    });
    console.log(`  ✓ ${s.title}`);
  }

  console.log("→ Products");
  for (const p of allProducts) {
    const gallery: object[] = [];
    for (const src of p.images || []) {
      const img = await uploadImage(src);
      if (img) gallery.push({ ...img, _key: `g${gallery.length}` });
    }

    await client.createOrReplace({
      _id: `product-${p.slug}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      sport: { _type: "reference", _ref: `sport-${p.sportSlug}` },
      productCode: p.productCode,
      description: p.description,
      longDescription: p.longDescription,
      idealFor: p.idealFor,
      mainImage: await uploadImage(p.image),
      alt: p.alt,
      gallery,
      fabric: p.fabric,
      specs: p.specs,
      features: p.features,
      customOptions: p.customOptions,
    });
    console.log(`  ✓ ${p.name}`);
  }

  console.log("→ Ranges (sub-collections)");
  for (const r of ranges) {
    await client.createOrReplace({
      _id: `range-${r.slug}`,
      _type: "range",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      category: r.category,
      description: r.description,
      products: r.products.map((slug) => ({
        _type: "reference",
        _ref: `product-${slug}`,
        _key: slug,
      })),
    });
    console.log(`  ✓ ${r.title}`);
  }

  console.log("→ Packages");
  for (const pkg of sportPackages) {
    const images = [];
    for (const im of pkg.images || []) {
      images.push({
        _key: `t${images.length}`,
        image: await uploadImage(im.src),
        tier: im.tier || undefined,
        tierColor: im.tierColor || undefined,
      });
    }

    await client.createOrReplace({
      _id: `package-${pkg.slug}`,
      _type: "package",
      sport: pkg.sport,
      shortName: pkg.shortName,
      slug: { _type: "slug", current: pkg.slug },
      description: pkg.description,
      longDescription: pkg.longDescription,
      cardImage: await uploadImage(pkg.cardImage),
      popular: pkg.popular,
      images,
      includes: pkg.includes,
      minOrder: pkg.minOrder,
    });
    console.log(`  ✓ ${pkg.sport} package`);
  }

  console.log("→ Site settings (hero + banner)");
  const slides = [];
  for (const h of heroSlides) {
    slides.push({
      _key: `h${slides.length}`,
      desktopImage: await uploadImage(h.desktop),
      mobileImage: await uploadImage(h.mobile),
      topText: h.topText,
      mainText: h.mainText,
      description: h.description,
      link: h.link,
    });
  }
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    heroSlides: slides,
    dspImage: await uploadImage("/sports/rugby-kit-front.webp"),
  });
  console.log("  ✓ siteSettings");

  console.log("\n✅ Migration complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
