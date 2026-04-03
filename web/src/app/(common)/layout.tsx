import SiteShell from "@/components/SiteShell";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell themeClass="theme-common">{children}</SiteShell>;
}