import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Titolo Hero", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroSubtitle", title: "Sottotitolo Hero", type: "string" }),
    defineField({ name: "introText", title: "Testo introduttivo (breve)", type: "text" }),

    defineField({
      name: "studioVideoUrl",
      title: "Video studio (URL YouTube/Vimeo)",
      type: "url",
      description: "Inserisci un link YouTube o Vimeo",
    }),

    defineField({
      name: "featuredServices",
      title: "Servizi in evidenza",
      type: "array",
      of: [{ type: "reference", to: [{ type: "course" }] }],
      description: "Seleziona 2–4 servizi da mostrare in Home",
    }),

    defineField({
      name: "collaborations",
      title: "Collaborazioni",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nome", type: "string" }),
            defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
            defineField({ name: "url", title: "Link", type: "url" }),
          ],
        },
      ],
    }),
  ],
});
