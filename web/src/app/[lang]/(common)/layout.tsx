import SiteShell from "@/components/SiteShell";

export default async function CommonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <SiteShell themeClass="theme-common" lang={lang}>
      {children}
    </SiteShell>
  );
}