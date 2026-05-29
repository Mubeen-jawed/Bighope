/** Read-only diagnostic: shows what's actually stored in Sanity right now. */
import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // lets us also see drafts
  useCdn: false,
  perspective: "raw", // return both published docs and drafts
});

async function run() {
  const docs = await client.fetch(
    `*[_type in ["product","range","sport","package"]]{
      "id": _id,
      _type,
      "title": coalesce(title, name),
      "sport": sport->slug.current,
      "hasSlug": defined(slug.current),
      "hasMainImage": defined(mainImage)
    } | order(_type asc)`,
  );

  const isDraft = (id: string) => id.startsWith("drafts.");
  const isUserCreated = (id: string) =>
    !/^(product-|sport-|range-|package-|drafts\.(product-|sport-|range-|package-))/.test(
      id,
    ) && id !== "siteSettings";

  console.log("\n=== USER-CREATED docs (not from migration) ===");
  docs
    .filter((d: any) => isUserCreated(d.id))
    .forEach((d: any) =>
      console.log(
        `  [${isDraft(d.id) ? "DRAFT    " : "PUBLISHED"}] ${d._type.padEnd(8)} "${d.title}"  sport=${d.sport ?? "—"} slug=${d.hasSlug} mainImage=${d.hasMainImage}  (${d.id})`,
      ),
    );

  console.log("\n=== Any DRAFT docs (unpublished) ===");
  const drafts = docs.filter((d: any) => isDraft(d.id));
  if (!drafts.length) console.log("  (none)");
  drafts.forEach((d: any) =>
    console.log(`  ${d._type} "${d.title}" sport=${d.sport ?? "—"} (${d.id})`),
  );

  console.log(`\nTotal product/range/sport/package docs: ${docs.length}\n`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
