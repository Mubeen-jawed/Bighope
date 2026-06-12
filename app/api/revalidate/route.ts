import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { TAGS } from "@/lib/sanity/queries";

/**
 * Called by a Sanity webhook whenever content is published/changed, so the
 * live site reflects edits within seconds (no manual rebuild).
 *
 * Configure the webhook in Sanity → API → Webhooks:
 *   URL:        https://<your-site>/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 *   Projection: {"_type": _type}
 *
 * On-demand only: pages are cached indefinitely (see sanityFetch) and we
 * invalidate just the tags affected by the changed document type. The map
 * accounts for cross-references (e.g. a product is embedded in sport and
 * range pages), so we revalidate those too — but nothing more. This avoids
 * regenerating (and re-writing to the ISR cache) pages that didn't change.
 */
const DEPENDENT_TAGS: Record<string, string[]> = {
  [TAGS.product]: [TAGS.product, TAGS.sport, TAGS.range],
  [TAGS.sport]: [TAGS.sport, TAGS.product],
  [TAGS.range]: [TAGS.range],
  [TAGS.package]: [TAGS.package],
  [TAGS.siteSettings]: [TAGS.siteSettings],
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const type = body?._type;
    // Fall back to all tags if the type is unknown, so content never goes stale.
    const tags = (type && DEPENDENT_TAGS[type]) ?? Object.values(TAGS);
    // Next.js 16 requires a cache-life profile as the second argument. We
    // cache content indefinitely and only purge here on a Sanity webhook, so
    // "max" (the longest-lived profile) matches our on-demand-only strategy.
    for (const tag of tags) revalidateTag(tag, "max");

    return NextResponse.json({
      revalidated: true,
      type: type ?? null,
      tags,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
