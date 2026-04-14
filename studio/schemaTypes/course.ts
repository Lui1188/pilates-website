import { defineType, defineField } from "sanity";

export default defineType({
  name: "course",
  title: "Corso",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sottotitolo",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Immagine hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Descrizione breve",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Contenuto",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "pricingSection",
      title: "Sezione finale prezzo",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Immagine",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "price",
          title: "Prezzo",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Titolo",
          type: "string",
        }),
        defineField({
          name: "features",
          title: "Lista elementi",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "buttonText",
          title: "Testo bottone",
          type: "string",
        }),
        defineField({
          name: "buttonLink",
          title: "Link bottone",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "heroImage",
    },
  },
});