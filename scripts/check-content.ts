/** Read-only diagnostic: shows ranges + their categories and slugs. */
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});

async function run() {
  const ranges = await client.fetch(
    `*[_type=="range"]{ "id": _id, title, category, "slug": slug.current } | order(category asc)`,
  );
  console.log("\n● All RANGE docs (Teamwear / Accessory groups):");
  ranges.forEach((r: any) =>
    console.log(
      `  [${r.id.startsWith("drafts.") ? "DRAFT" : "PUB  "}] cat=${JSON.stringify(r.category)}  slug=${r.slug}  "${r.title}"`,
    ),
  );

  const sports = await client.fetch(
    `*[_type=="sport"]{ "slug": slug.current, title, showOnHomepage } | order(title asc)`,
  );
  console.log("\n● All SPORT docs:");
  sports.forEach((s: any) =>
    console.log(`  slug=${s.slug}  home=${s.showOnHomepage}  "${s.title}"`),
  );
  console.log();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
