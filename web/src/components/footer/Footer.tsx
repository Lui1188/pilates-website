import Link from "next/link";

type FooterProps = {
  studioName?: string;
  tagline?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  bookingUrl?: string | null;
  ctaText?: string | null;
};

export default function Footer({
  studioName,
  tagline,
  phone,
  whatsapp,
  address,
  bookingUrl,
  ctaText,
}: FooterProps) {
  return (
    <footer className="mt-20 border-t navbar-bg">
      <div className="mx-auto max-w-5xl px-6 py-12 grid gap-8 md:grid-cols-2">
        {/* Brand */}
        <div>
          <div className="text-sm font-semibold accent-text">
            {studioName || "Studio"}
          </div>
          {tagline && (
            <p className="mt-2 text-sm opacity-80 max-w-sm">
              {tagline}
            </p>
          )}
        </div>

        {/* Contacts */}
        <div className="text-sm space-y-2">
          {phone && (
            <div>
              Tel:{" "}
              <a href={`tel:${phone}`} className="hover:underline">
                {phone}
              </a>
            </div>
          )}

          {whatsapp && (
            <div>
              WhatsApp:{" "}
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                +{whatsapp}
              </a>
            </div>
          )}

          {address && <div>{address}</div>}

          {bookingUrl && (
            <div className="mt-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl px-4 py-2 accent-strong-bg accent-strong-text hover:opacity-90 transition"
              >
                {ctaText || "Prenota"}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {studioName || "Studio"}
      </div>
    </footer>
  );
}
