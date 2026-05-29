import { defineField, defineType } from "sanity";

/**
 * Singleton holding editable homepage imagery: the hero slider and the
 * "Why Big Hope" (DSP) banner image. There is only ever one of these
 * documents (id: "siteSettings").
 */
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero slider",
      type: "array",
      description: "Full-width slides shown in the homepage hero carousel.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "desktopImage",
              title: "Desktop image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "topText", title: "Top text", type: "string" }),
            defineField({ name: "mainText", title: "Main heading", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "link",
              title: "Button link",
              type: "string",
              description: 'Where "View Range" goes, e.g. /sport/soccer',
            }),
          ],
          preview: { select: { title: "mainText", subtitle: "topText", media: "desktopImage" } },
        },
      ],
    }),
    defineField({
      name: "dspImage",
      title: '"Why Big Hope" banner image',
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
