import { defineType, defineField } from "sanity";

export default defineType({
  name: "course",
  title: "Corsi",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome corso", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: ["Chiropratica", "Pilates"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Descrizione", type: "text" }),
    defineField({ name: "duration", title: "Durata", type: "string", description: "es. 50 min" }),
    defineField({ name: "level", title: "Livello", type: "string", options: { list: ["Base", "Intermedio", "Avanzato", "Tutti"] }, initialValue: "Tutti" }),
    defineField({ name: "price", title: "Prezzo", type: "string", description: 'es. "€15" oppure "Su richiesta"' }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 10 }),
    defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true } }),
    defineField({
      name: "subServices",
      title: "Sotto-servizi (opzionale)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titolo", type: "string" }),
            defineField({ name: "description", title: "Descrizione", type: "text" }),
            defineField({ name: "duration", title: "Durata", type: "string" }),
            defineField({ name: "price", title: "Prezzo", type: "string" }),
          ],
        },
      ],
      description: 'Esempio: Pilates → "Reformer", "Matwork"',
    }),
    defineField({
      name: "highlights",
      title: "Punti chiave",
      type: "array",
      of: [{ type: "string" }],
      description: "3–6 bullet (benefici / focus)",
    }),
    defineField({
      name: "practitioners",
      title: "Erogato da",
      type: "array",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
    }),
  ],

  orderings: [
    { title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
