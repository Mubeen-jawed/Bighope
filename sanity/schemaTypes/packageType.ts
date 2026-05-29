import { defineField, defineType } from "sanity";

/**
 * A "Package" is a pre-designed bundle shown in the homepage Packages
 * section and at /packages/[slug]. Mirrors `SportPackage` in lib/packages.ts.
 */
export const packageType = defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({
      name: "sport",
      title: "Sport name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name (badge)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "sport", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "popular",
      title: "Mark as popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "images",
      title: "Tier images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "tier", title: "Tier label", type: "string" }),
            defineField({
              name: "tierColor",
              title: "Tier color (Tailwind class)",
              type: "string",
              description: 'e.g. "bg-yellow-500". Leave blank if no tier.',
            }),
          ],
          preview: { select: { title: "tier", media: "image" } },
        },
      ],
    }),
    defineField({
      name: "includes",
      title: "Includes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "minOrder",
      title: "Minimum order",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "sport", subtitle: "minOrder", media: "cardImage" },
  },
});
