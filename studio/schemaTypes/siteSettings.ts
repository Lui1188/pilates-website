import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({ name: "studioName", title: "Nome studio", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Sottotitolo (Hero)", type: "string" }),
    defineField({ name: "ctaText", title: "Testo CTA", type: "string", initialValue: "Prenota lezione di prova" }),

    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (numero)", type: "string", description: "Esempio: 393331112222" }),
    defineField({ name: "address", title: "Indirizzo", type: "string" }),
    defineField({ name: "mapsEmbedUrl", title: "Google Maps embed URL", type: "url" }),

    defineField({ name: "seoTitle", title: "SEO Title (default)", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description (default)", type: "text" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),

    defineField({ name: "bookingUrl", title: "Link prenotazione", type: "url" }),

    defineField({ name: "showPrices", title: "Mostra prezzi", type: "boolean", initialValue: true }),
    defineField({ name: "showReviews", title: "Mostra recensioni", type: "boolean", initialValue: false }),

  ],
});
