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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "heroImage",
    },
  },
});