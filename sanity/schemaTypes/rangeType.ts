import { defineField, defineType } from "sanity";

/**
 * A "Range" is a curated sub-collection shown at /range/[slug]
 * (e.g. Hoodies, T-Shirts, Bags). Mirrors `rangeData` in the old
 * app/range/[slug]/page.tsx. It simply groups existing products.
 */
export const rangeType = defineType({
  name: "range",
  title: "Teamwear / Accessory group",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      type: "string",
      description: 'Small label shown above the title, e.g. "Custom Teamwear".',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      description:
        "Products in this range. Leave empty to show a 'Coming Soon' state.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
