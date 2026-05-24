/**
 * Lightweight slug → QuoteModal category lookups.
 * Kept separate from lib/products.ts so the Header client bundle
 * doesn't carry all product image URLs and long descriptions.
 *
 * Category values must match the CATEGORIES array in QuoteModal.tsx:
 *   Soccer | Rugby | Basketball | Cricket | 7v7 Football |
 *   Baseball | MMA | Teamwear | Accessories
 */

/** /product/[slug] → category */
export const productSlugCategory: Record<string, string> = {
  // Soccer
  "custom-soccer-kit": "Soccer",
  "custom-soccer-jerseys": "Soccer",
  "custom-shorts": "Soccer",
  "custom-socks-2": "Soccer",
  "custom-goalkeeper-jersey": "Soccer",
  // Rugby
  "custom-rugby-kit": "Rugby",
  // Basketball
  "custom-basketball-jersey": "Basketball",
  "custom-basketball-shorts": "Basketball",
  "custom-basketball-uniform": "Basketball",
  "custom-reversible-basketball-jersey": "Basketball",
  "custom-shooting-hoodies": "Basketball",
  "custom-shooting-shirts": "Basketball",
  "custom-shooting-sleeves": "Basketball",
  "v-neck-basketball-jersey": "Basketball",
  // Cricket
  "custom-cricket-kit": "Cricket",
  // 7v7 Football
  "custom-7v7-uniforms": "7v7 Football",
  "custom-7v7-hooded-uniforms": "7v7 Football",
  "custom-7v7-sleeveless-hooded-jerseys": "7v7 Football",
  "custom-7v7-sleeveless-jerseys": "7v7 Football",
  "custom-7v7-football-shorts": "7v7 Football",
  // Baseball
  "custom-baseball-uniforms": "Baseball",
  "2-button-baseball-jerseys": "Baseball",
  "baseball-crew-neck-jerseys": "Baseball",
  "baseball-v-neck-jerseys": "Baseball",
  "full-button-baseball-jerseys": "Baseball",
  // MMA
  "custom-mma-fight-shorts": "MMA",
  "custom-rashguard": "MMA",
  "custom-wrestling-singlets": "MMA",
  // Teamwear
  "custom-team-hoodies": "Teamwear",
  "custom-zipper-hoodies": "Teamwear",
  "custom-tracksuits": "Teamwear",
  "custom-polo-shirts": "Teamwear",
  "custom-t-shirts": "Teamwear",
  "custom-quarter-zipper-ls": "Teamwear",
  "custom-1-4-zipper-ss": "Teamwear",
  "custom-jackets": "Teamwear",
  // Accessories
  "custom-bags": "Accessories",
  "custom-duffle-bags": "Accessories",
  "custom-socks": "Accessories",
};

/** /sport/[slug] → category */
export const sportSlugCategory: Record<string, string> = {
  soccer: "Soccer",
  rugby: "Rugby",
  basketball: "Basketball",
  cricket: "Cricket",
  "7v7-football": "7v7 Football",
  baseball: "Baseball",
  mma: "MMA",
  teamwear: "Teamwear",
  accessories: "Accessories",
};

/** /range/[slug] → category */
export const rangeSlugCategory: Record<string, string> = {
  hoodie: "Teamwear",
  "t-shirts": "Teamwear",
  polo: "Teamwear",
  "track-suits": "Teamwear",
  "quarter-zipper": "Teamwear",
  jackets: "Teamwear",
  "bags-packs": "Accessories",
  "duffle-bags": "Accessories",
  socks: "Accessories",
  hats: "Accessories",
};
