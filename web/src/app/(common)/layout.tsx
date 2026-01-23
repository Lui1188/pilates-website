import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder(client);

const SETTINGS_QUERY = `*[_type=="siteSettings"][0]{
  studioName,
  ctaText,
  bookingUrl,
  ctaUrl,
  logo
}`;

export default async function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await client.fetch(SETTINGS_QUERY);

    const logoUrl = settings?.logo
        ? builder.image(settings.logo).width(240).url()
        : null;

    const bookingUrl = settings?.bookingUrl || settings?.ctaUrl || null;

    return (
        <div className="theme-common">
            <Navbar
                studioName={settings?.studioName}
                logoUrl={logoUrl}
                bookingUrl={bookingUrl}
                ctaText={settings?.ctaText}
            />
            {children}
            <Footer
                studioName={settings?.studioName}
                tagline={settings?.tagline}
                phone={settings?.phone}
                whatsapp={settings?.whatsapp}
                address={settings?.address}
                bookingUrl={bookingUrl}
                ctaText={settings?.ctaText}
            />

        </div>
    );
}
