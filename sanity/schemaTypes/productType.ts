import { defineField, defineType } from "sanity";

/**
 * A "Product" is one item shown on a sport page and at /product/[slug].
 * Mirrors the `Product` interface in lib/products.ts. This is the document
 * the client edits most often (swapping images, tweaking text).
 */
export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "images", title: "Images" },
    { name: "specs", title: "Specs & Options" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sport",
      title: "Sport / Range",
      type: "reference",
      to: [{ type: "sport" }],
      group: "content",
      description: "Which sport page this product appears on.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productCode",
      title: "Product code",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      type: "text",
      rows: 5,
      group: "content",
    }),
    defineField({
      name: "idealFor",
      title: "Ideal for",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "images",
      description: "Card / thumbnail image used on listing pages.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Image alt text",
      type: "string",
      group: "images",
    }),
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "images",
      description: "Additional images shown in the product gallery.",
      options: { layout: "grid" },
    }),
    defineField({
      name: "fabric",
      title: "Fabric",
      type: "string",
      group: "specs",
    }),
    defineField({
      name: "specs",
      title: "Specs",
      type: "object",
      group: "specs",
      fields: [
        defineField({ name: "minOrder", title: "Minimum order", type: "string" }),
        defineField({ name: "turnaround", title: "Turnaround", type: "string" }),
        defineField({ name: "sizes", title: "Sizes", type: "string" }),
        defineField({ name: "printing", title: "Printing", type: "string" }),
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      group: "specs",
    }),
    defineField({
      name: "customOptions",
      title: "Custom options",
      type: "array",
      of: [{ type: "string" }],
      group: "specs",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "sport.title", media: "mainImage" },
  },
});
