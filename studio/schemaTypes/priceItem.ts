import { defineType, defineField } from "sanity";

export default defineType({
  name: "priceItem",
  title: "Prezzi",
  type: "document",
  fields: [
    defineField({ name: "active", title: "Attivo", type: "boolean", initialValue: true }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: ["Chiropratica", "Pilates"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Prezzo", type: "string", description: 'Es. "€70" oppure "Su richiesta"' }),
    defineField({ name: "note", title: "Nota", type: "string" }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
