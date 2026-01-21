import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Recensioni",
  type: "document",
  fields: [
    defineField({ name: "published", title: "Pubblicata", type: "boolean", initialValue: true }),
    defineField({ name: "authorName", title: "Nome", type: "string", description: 'Puoi mettere "Anonimo"' }),
    defineField({ name: "text", title: "Testo", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      title: "Valutazione",
      type: "number",
      description: "1–5 (opzionale)",
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "source",
      title: "Fonte",
      type: "string",
      options: { list: ["Google", "Instagram", "Altro"] },
    }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
