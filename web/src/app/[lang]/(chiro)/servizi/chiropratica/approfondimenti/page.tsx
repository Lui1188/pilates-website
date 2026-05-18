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

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function InsightsPage({
  params,
}: PageProps) {
  const { lang } = await params;

  const data = await client.fetch(chiropracticPageQuery, { lang });

  if (!data) {
    notFound();
  }

  const title =
    data?.insightsTitle ||
    (lang === "en" ? "Insights" : "Approfondimenti");

  const sections: SectionItem[] =
    data?.insightsSections || [];

  return (
    <ChiropracticSectionPage
      title={title}
      sections={sections}
    />
  );
}