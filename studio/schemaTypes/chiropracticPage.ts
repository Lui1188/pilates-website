import { defineField, defineType } from "sanity";

const alternatingSection = defineField({
  name: "sectionItem",
  title: "Section item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Testo",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
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
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "text",
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || "Section item",
        media,
        subtitle: subtitle ? String(subtitle).slice(0, 60) : "",
      };
    },
  },
});


const faqItem = defineField({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Domanda",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Risposta",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question",
    },
  },
});

export default defineType({
  name: "chiropracticPage",
  title: "Pagina Chiropratica",
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
      name: "approachTitle",
      title: "Titolo sezione - Il nostro approccio",
      type: "string",
      initialValue: "Il nostro approccio",
    }),
    defineField({
      name: "approachSections",
      title: "Sezioni - Il nostro approccio",
      type: "array",
      of: [alternatingSection],
    }),

    defineField({
      name: "approachGalleryTitle",
      title: "Titolo gallery approccio",
      type: "string",
    }),

    defineField({
      name: "approachGalleryTreatments",
      title: "Trattamenti in gallery",
      type: "array",
      of: [
        defineField({
          name: "treatmentReference",
          title: "Trattamento",
          type: "reference",
          to: [{ type: "chiropracticTreatment" }],
        }),
      ],
    }),

    defineField({
      name: "faqTitle",
      title: "Titolo FAQ",
      type: "string",
      initialValue: "Domande frequenti",
    }),
    defineField({
      name: "faqs",
      title: "FAQ",
      type: "array",
      of: [faqItem],
    }),

    defineField({
      name: "whoWeHelpTitle",
      title: "Titolo sezione - Chi aiutiamo",
      type: "string",
      initialValue: "Chi aiutiamo",
    }),
    defineField({
      name: "whoWeHelpSlug",
      title: "Slug pagina - Chi aiutiamo",
      type: "slug",
      options: {
        source: "whoWeHelpTitle",
      },
      initialValue: {
        current: "chi-aiutiamo",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whoWeHelpSections",
      title: "Sezioni - Chi aiutiamo",
      type: "array",
      of: [alternatingSection],
    }),

    defineField({
      name: "conditionsTitle",
      title: "Titolo sezione - Problematiche trattate",
      type: "string",
      initialValue: "Problematiche trattate",
    }),
    defineField({
      name: "conditionsSlug",
      title: "Slug pagina - Problematiche trattate",
      type: "slug",
      options: {
        source: "conditionsTitle",
      },
      initialValue: {
        current: "problematiche-trattate",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "conditionsSections",
      title: "Sezioni - Problematiche trattate",
      type: "array",
      of: [alternatingSection],
    }),
  ],

  preview: {
    select: {
      title: "pageTitle",
      subtitle: "language",
    },
  },
});