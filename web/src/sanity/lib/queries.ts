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


export const homePageQuery = `
{
  "settings": *[_type == "siteSettings"][0]{
    studioName
  },
  "home": *[_type == "homePage" && language == $lang][0]{
    heroMarqueeText,
    "heroImages": heroImages[]{
      "url": asset->url,
      alt
    },
    section2Title,
    section2Subtitle,
    section2ButtonText,
    section2ButtonLink
  }
}`;

export const aboutPageQuery = `
  *[_type == "aboutPage" && language == $lang][0]{
    pageTitle,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    contentBlocks[]{
      title,
      text
    }
  }
`;

export const pilatesPageQuery = `
  *[_type == "pilatesPage" && language == $lang][0]{
    pageTitle,
    introText,
    sections[]{
      _key,
      title,
      text,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    },
    coursesSectionTitle,
    coursesSectionDescription,
    coursesGallery[]{
      _key,
      title,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "slug": course->slug.current
    }
  }
`;

export const courseSlugsQuery = `
  *[_type == "course" && defined(slug.current) && defined(language)]{
    "slug": slug.current,
    "lang": language
  }
`;

export const courseBySlugQuery = `
  *[_type == "course" && slug.current == $slug && language == $lang][0]{
    title,
    subtitle,
    shortDescription,
    content,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "pricingSection": pricingSection{
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      price,
      title,
      features,
      buttonText,
      buttonLink
    }
  }
`;