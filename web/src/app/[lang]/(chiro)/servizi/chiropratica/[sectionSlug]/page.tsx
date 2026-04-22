import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { chiropracticPageQuery } from "@/sanity/lib/queries";
import ChiropracticSectionPage from "@/components/chiropractic/ChiropracticSectionPage";

type SectionItem = {
  _key: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; sectionSlug: string }>;
}) {
  const { lang, sectionSlug } = await params;

  const data = await client.fetch(chiropracticPageQuery, { lang });

  const whoWeHelpSlug = data?.whoWeHelpSlug || "chi-aiutiamo";
  const conditionsSlug = data?.conditionsSlug || "problematiche-trattate";

  let title = "";
  let sections: SectionItem[] = [];

  if (sectionSlug === whoWeHelpSlug) {
    title = data?.whoWeHelpTitle || "Chi aiutiamo";
    sections = data?.whoWeHelpSections || [];
  } else if (sectionSlug === conditionsSlug) {
    title = data?.conditionsTitle || "Problematiche trattate";
    sections = data?.conditionsSections || [];
  } else {
    notFound();
  }

  return <ChiropracticSectionPage title={title} sections={sections} />;
}