import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export default async function SiteShell({
  children,
  themeClass,
  lang,
}: {
  children: React.ReactNode;
  themeClass: string;
  lang: string;
}) {
  const settings = await client.fetch(siteSettingsQuery);
  const logoUrl = settings?.logoUrl ?? null;

  return (
    <div className={themeClass}>
      <Navbar
        lang={lang}
        studioName={settings?.studioName}
        logoUrl={logoUrl}
      />

      {children}

      <Footer
        studioName={settings?.studioName}
        legalName={settings?.legalName}
        footerTagline={settings?.footerTagline}
        logoUrl={logoUrl}
        phone={settings?.phone}
        whatsapp={settings?.whatsapp}
        email={settings?.email}
        addressName={settings?.addressName}
        addressLine1={settings?.addressLine1}
        addressLine2={settings?.addressLine2}
        mapsUrl={settings?.mapsUrl}
        instagramUrl={settings?.instagramUrl}
        facebookUrl={settings?.facebookUrl}
        privacyUrl={settings?.privacyUrl}
        cookieUrl={settings?.cookieUrl}
        vatNumber={settings?.vatNumber}
      />
    </div>
  );
}