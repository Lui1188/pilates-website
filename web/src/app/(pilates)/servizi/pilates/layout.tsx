import SiteShell from "@/components/SiteShell";

export default async function PilatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell themeClass="theme-pilates">{children}</SiteShell>;
}