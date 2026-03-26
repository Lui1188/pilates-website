import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    // --- BRAND ---
    defineField({
      name: "studioName",
      title: "Nome studio",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "legalName",
      title: "Nome legale",
      type: "string",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),

    // --- TESTI ---
    defineField({
      name: "tagline",
      title: "Sottotitolo (Hero)",
      type: "string",
    }),

    defineField({
      name: "footerTagline",
      title: "Testo footer",
      type: "text",
      rows: 3,
    }),

    // --- CONTATTI ---
    defineField({
      name: "phone",
      title: "Telefono",
      type: "string",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    // --- INDIRIZZO ---
    defineField({
      name: "addressName",
      title: "Nome sede",
      type: "string",
    }),

    defineField({
      name: "addressLine1",
      title: "Indirizzo",
      type: "string",
    }),

    defineField({
      name: "addressLine2",
      title: "Città / CAP",
      type: "string",
    }),

    defineField({
      name: "mapsUrl",
      title: "Google Maps link",
      type: "url",
    }),

    // --- SOCIAL ---
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
    }),

    defineField({
      name: "facebookUrl",
      title: "Facebook",
      type: "url",
    }),

    // --- LEGALI ---
    defineField({
      name: "vatNumber",
      title: "P.IVA",
      type: "string",
    }),

    defineField({
      name: "privacyUrl",
      title: "Privacy Policy",
      type: "string",
      initialValue: "/privacy-policy",
    }),

    defineField({
      name: "cookieUrl",
      title: "Cookie Policy",
      type: "string",
      initialValue: "/cookie-policy",
    }),

    // --- SEO ---
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),
  ],
});