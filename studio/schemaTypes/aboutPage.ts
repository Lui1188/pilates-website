import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Titolo pagina",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Foto principale",
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
      name: "contentBlocks",
      title: "Blocchi contenuto",
      type: "array",
      of: [
        defineField({
          name: "contentBlock",
          title: "Blocco",
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
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "text",
            },
          },
        }),
      ],
      description: "Aggiungi uno o più blocchi con titolo e testo",
    }),
  ],
});