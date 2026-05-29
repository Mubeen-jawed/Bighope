import { defineField, defineType } from "sanity";

/**
 * A "Sport" is one card in the homepage "Our Range" grid and one
 * `/sport/[slug]` page. Creating a new Sport document is how the client
 * adds a brand-new range section to the site.
 */
export const sportType = defineType({
  name: "sport",
  title: "Range (main section)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      description: 'Shown on the homepage card, e.g. "Soccer / Football".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: 'Page address, e.g. "soccer" → /sport/soccer.',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "image",
      description: "The image shown on the homepage range card (portrait works best).",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Shown at the top of the sport page.",
    }),
    defineField({
      name: "quoteCategory",
      title: "Quote category",
      type: "string",
      description:
        "Category used by the Get-a-Quote form. Must be one of: Soccer, Rugby, Basketball, Cricket, 7v7 Football, Baseball, MMA, Teamwear, Accessories.",
      options: {
        list: [
          "Soccer",
          "Rugby",
          "Basketball",
          "Cricket",
          "7v7 Football",
          "Baseball",
          "MMA",
          "Teamwear",
          "Accessories",
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first in the homepage grid.",
      initialValue: 100,
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage grid",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "cardImage" },
  },
});
