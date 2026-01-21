import { defineType, defineField } from "sanity";

export default defineType({
  name: "scheduleItem",
  title: "Orari",
  type: "document",
  fields: [
    defineField({
      name: "day",
      title: "Giorno",
      type: "string",
      options: { list: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "startTime", title: "Ora inizio", type: "string", description: "es. 18:30", validation: (r) => r.required() }),
    defineField({ name: "endTime", title: "Ora fine", type: "string", description: "es. 19:20" }),
    defineField({
      name: "course",
      title: "Corso",
      type: "reference",
      to: [{ type: "course" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "note", title: "Nota", type: "string", description: "es. Solo su prenotazione" }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 10 }),
  ],
});
