/**
 * Sanity Studio configuration. The Studio is mounted inside the Next.js
 * app at /studio (see app/studio/[[...tool]]/page.tsx), so the client
 * edits content at https://<your-site>/studio.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Big Hope Sports",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schema.types,
    // Lets "Create new" inside a range's product list pre-fill the Range.
    templates: (prev) => [
      ...prev,
      {
        id: "product-by-sport",
        title: "Product (in this range)",
        schemaType: "product",
        parameters: [{ name: "sportId", type: "string" }],
        value: (params: { sportId: string }) => ({
          sport: { _type: "reference", _ref: params.sportId },
        }),
      },
    ],
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
