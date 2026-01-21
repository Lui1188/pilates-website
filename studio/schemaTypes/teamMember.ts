import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Ruolo", type: "string", description: "es. Insegnante Pilates" }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 10 }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "isOwner", title: "Professionista principale", type: "boolean", initialValue: false }),

    defineField({
      name: "specialties",
      title: "Specialità",
      type: "array",
      of: [{ type: "string" }],
      description: 'Es. ["Chiropratica", "Pilates"]',
    }),

    defineField({
      name: "credentials",
      title: "Certificazioni / Titoli",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "education",
      title: "Formazione",
      type: "array",
      of: [{ type: "string" }],
    }),

  ],
});
