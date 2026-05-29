/**
 * This route mounts the Sanity Studio. The client logs in and edits all
 * content at /studio. The Studio itself runs in a Client Component (see
 * Studio.tsx); this server component just sets the static rendering + metadata.
 */
import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
