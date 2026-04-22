import SiteShell from "@/components/SiteShell";
import ChiropracticPageShell from "@/components/chiropractic/ChiropracticPageShell";
import { client } from "@/sanity/lib/client";
import { chiropracticPageQuery } from "@/sanity/lib/queries";

export default async function ChiroLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const data = await client.fetch(chiropracticPageQuery, { lang });
  const whoWeHelpSlug = data?.whoWeHelpSlug || "chi-aiutiamo";
  const conditionsSlug = data?.conditionsSlug || "problematiche-trattate";

  return (
    <SiteShell themeClass="theme-chiro" lang={lang}>
      <ChiropracticPageShell
        lang={lang}
        approachLabel={data?.approachTitle}
        whoWeHelpLabel={data?.whoWeHelpTitle}
        conditionsLabel={data?.conditionsTitle}
        whoWeHelpHref={`/${lang}/servizi/chiropratica/${whoWeHelpSlug}`}
        conditionsHref={`/${lang}/servizi/chiropratica/${conditionsSlug}`}
      >
        {children}
      </ChiropracticPageShell>
    </SiteShell>
  );
}