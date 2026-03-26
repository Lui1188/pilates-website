import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "heroMarqueeText",
      title: "Testo scorrevole hero",
      type: "string",
      description: "Esempio: Pilates • Chiropratica • Benessere • Movimento",
    }),

    defineField({
      name: "heroImages",
      title: "Immagini hero",
      type: "array",
      of: [
        defineField({
          name: "imageItem",
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
        }),
      ],
      validation: (Rule) => Rule.required().min(3).max(5),
      description: "Carica esattamente 3 immagini per la prima sezione",
    }),

    defineField({
      name: "section2ScrollText",
      title: "Testo grande scorrevole sezione 2",
      type: "string",
      description: 'Esempio: CHIROLATES.',
    }),

    defineField({
      name: "section2Title",
      title: "Titolo grande sezione 2",
      type: "string",
      description: 'Esempio: CHIROLATES',
    }),

    defineField({
      name: "section2Subtitle",
      title: "Sottotitolo sezione 2",
      type: "string",
      description: 'Esempio: IL BENESSERE PRENDE UNA NUOVA FORMA',
    }),

    defineField({
      name: "section2ButtonText",
      title: "Testo bottone sezione 2",
      type: "string",
      initialValue: "CHI SIAMO",
    }),

    defineField({
      name: "section2ButtonLink",
      title: "Link bottone sezione 2",
      type: "string",
      initialValue: "/about",
    }),
  ],
});