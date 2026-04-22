import { client } from "@/sanity/lib/client";
import { chiropracticPageQuery } from "@/sanity/lib/queries";
import ChiropracticPage from "@/components/chiropractic/ChiropracticPage";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = await client.fetch(chiropracticPageQuery, { lang });

  return <ChiropracticPage data={data} lang={lang} />;
}