import { defineField, defineType } from "sanity";

const chiropracticTreatment = defineType({
  name: "chiropracticTreatment",
  title: "Trattamento Chiropratica",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Lingua",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Italiano", value: "it" },
          { title: "English", value: "en" },
        ],
      },
    }),
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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sottotitolo",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Descrizione breve",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Immagine hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImageAlt",
      title: "Alt immagine hero",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Contenuto",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pricingSection",
      title: "Sezione finale",
      type: "object",
      fields: [
        defineField({
          name: "price",
          title: "Prezzo / label",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Titolo",
          type: "string",
        }),
        defineField({
          name: "features",
          title: "Lista punti",
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
        defineField({
          name: "image",
          title: "Immagine",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "imageAlt",
          title: "Alt immagine",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "cardTitle",
      title: "Titolo card",
      type: "string",
      description: "Se vuoto, verrà usato il titolo principale.",
    }),
    defineField({
      name: "cardDescription",
      title: "Descrizione card",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cardImage",
      title: "Immagine card",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cardImageAlt",
      title: "Alt immagine card",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "language",
      media: "cardImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});

export default chiropracticTreatment;