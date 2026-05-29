import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a CDN URL for a Sanity image. Chain .width()/.height()/.url() etc.
 * Returns null for missing images so callers can guard.
 */
export function urlFor(source: SanityImageSource | undefined | null) {
  if (!source) return null;
  return builder.image(source);
}

/** Convenience: resolve straight to a URL string (or empty string). */
export function imageUrl(
  source: SanityImageSource | undefined | null,
  width?: number,
): string {
  const b = urlFor(source);
  if (!b) return "";
  return (width ? b.width(width) : b).auto("format").url();
}
