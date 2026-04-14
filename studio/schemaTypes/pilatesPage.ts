import { defineType, defineField } from "sanity";

export default defineType({
  name: "pilatesPage",
  title: "Pagina Pilates",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Lingua",
      type: "string",
      options: {
        list: [
          { title: "Italiano", value: "it" },
          { title: "English", value: "en" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageTitle",
      title: "Titolo pagina",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introText",
      title: "Testo introduttivo",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "sections",
      title: "Sezioni",
      type: "array",
      of: [
        defineField({
          name: "section",
          title: "Sezione",
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
              rows: 6,
              validation: (Rule) => Rule.required(),
            }),
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "text",
              media: "image",
            },
          },
        }),
      ],
      description:
        "Aggiungi tutte le sezioni che vuoi. Ogni sezione ha titolo, testo e immagine.",
    }),
    defineField({
      name: "coursesSectionTitle",
      title: "Titolo sezione corsi",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "coursesSectionDescription",
      title: "Descrizione sezione corsi",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "coursesGallery",
      title: "Gallery corsi",
      type: "array",
      of: [
        defineField({
          name: "courseCard",
          title: "Card corso",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descrizione",
              type: "text",
              rows: 3,
            }),
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "course",
              title: "Corso collegato",
              type: "reference",
              to: [{ type: "course" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "course.title",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
});