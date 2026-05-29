import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // We rely on Next.js' data cache + tag-based revalidation (see
  // app/api/revalidate/route.ts), so the Sanity CDN is left off here to
  // avoid double-caching stale content.
  useCdn: false,
});

/**
 * Thin wrapper around client.fetch that caches results in the Next.js data
 * cache. Content refreshes either:
 *   1. immediately, when a Sanity webhook hits /api/revalidate on publish
 *      (revalidatePath("/", "layout")), or
 *   2. at most every 60s via the ISR window below (safety net).
 * Tags are attached for future fine-grained revalidation if ever needed.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60,
      tags,
    },
  });
}
