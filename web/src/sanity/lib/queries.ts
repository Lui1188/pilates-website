export const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  studioName,
  legalName,
  tagline,
  footerTagline,
  phone,
  whatsapp,
  email,
  addressName,
  addressLine1,
  addressLine2,
  mapsUrl,
  instagramUrl,
  facebookUrl,
  privacyUrl,
  cookieUrl,
  vatNumber,
  "logoUrl": logo.asset->url
}
`;


export const homePageQuery = `{
 "settings": *[_type=="siteSettings"][0]{
    studioName
  },
  "home": *[_type=="homePage"][0]{
    heroMarqueeText,
    "heroImages": heroImages[]{
      "url": asset->url,
      alt
    },
    section2ScrollText,
    section2Title,
    section2Subtitle,
    section2ButtonText,
    section2ButtonLink
  }
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  pageTitle,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  contentBlocks[]{
    title,
    text
  }
}`;