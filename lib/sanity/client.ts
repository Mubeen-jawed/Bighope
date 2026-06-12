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
 * cache. Content is cached indefinitely and refreshed ON DEMAND only, when a
 * Sanity webhook hits /api/revalidate on publish and revalidates the matching
 * tag(s). There is intentionally no time-based ISR window: a 60s window made
 * every trafficked page regenerate (and write to the ISR cache) every minute,
 * which exhausted Vercel's ISR Writes quota.
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
      revalidate: false,
      tags,
    },
  });
}
