import Link from "next/link";

type FooterProps = {
  lang: string;
  studioName?: string;
  legalName?: string;
  footerTagline?: string;
  logoUrl?: string | null;
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressName?: string;
  addressLine1?: string;
  addressLine2?: string;
  mapsUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  privacyUrl?: string;
  cookieUrl?: string;
  vatNumber?: string;
};

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4H16V5.5c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.2v2.6H9v2.8h2.3v7h2.2Z" />
    </svg>
  );
}

function sanitizePhone(phone?: string) {
  return phone?.replace(/\s+/g, "");
}

function sanitizeWhatsapp(whatsapp?: string) {
  return whatsapp?.replace(/[^\d]/g, "");
}

export default function Footer({
  lang,
  studioName,
  legalName,
  footerTagline,
  logoUrl,
  phone,
  whatsapp,
  email,
  addressName,
  addressLine1,
  addressLine2,
  mapsUrl,
  instagramUrl,
  facebookUrl,
  privacyUrl,
  cookieUrl,
  vatNumber,
}: FooterProps) {
  const brand = studioName || "Chirolates";

  const labels = {
    it: {
      followUs: "Seguici",
      address: "Indirizzo",
      contacts: "Contatti",
      vat: "P.IVA",
    },
    en: {
      followUs: "Follow us",
      address: "Address",
      contacts: "Contacts",
      vat: "VAT",
    },
  };

  const t = labels[lang as keyof typeof labels] ?? labels.it;

  const hasAddressBlock = addressName || addressLine1 || addressLine2;
  const hasContactsBlock = phone || email || whatsapp;
  const hasSocials = instagramUrl || facebookUrl;
  const hasLegalLinks = privacyUrl || cookieUrl;

  return (
    <footer className="bg-soft accent-text">
      <div className="border-y border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1.4fr] md:items-start md:gap-10 lg:gap-16">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <Link href={`/${lang}`} className="inline-flex justify-center md:justify-start">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={brand}
                    className="h-24 w-auto md:h-28 lg:h-32"
                  />
                ) : (
                  <span className="text-2xl font-semibold tracking-wide">
                    {brand}
                  </span>
                )}
              </Link>

              {footerTagline && (
                <p className="mt-5 max-w-sm text-sm leading-7 accent-text/85">
                  {footerTagline}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center text-center">
              {hasSocials && (
                <>
                  <h4 className="mb-4 text-base font-semibold">{t.followUs}</h4>
                  <div className="flex flex-col items-center gap-3">
                    {instagramUrl && (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8C5A5A]/25 transition hover:opacity-70"
                      >
                        <InstagramIcon />
                      </a>
                    )}

                    {facebookUrl && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#8C5A5A]/25 transition hover:opacity-70"
                      >
                        <FacebookIcon />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="grid gap-10 text-center sm:grid-cols-2 md:justify-self-end md:gap-12 md:text-left">
              {hasAddressBlock && (
                <div className="min-w-[180px]">
                  <h4 className="mb-3 text-base font-semibold">{t.address}</h4>

                  {addressName && <p className="text-sm leading-7">{addressName}</p>}

                  {addressLine1 &&
                    (mapsUrl ? (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm leading-7 hover:underline"
                      >
                        {addressLine1}
                      </a>
                    ) : (
                      <p className="text-sm leading-7">{addressLine1}</p>
                    ))}

                  {addressLine2 &&
                    (mapsUrl ? (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm leading-7 hover:underline"
                      >
                        {addressLine2}
                      </a>
                    ) : (
                      <p className="text-sm leading-7">{addressLine2}</p>
                    ))}
                </div>
              )}

              {hasContactsBlock && (
                <div className="min-w-[180px]">
                  <h4 className="mb-3 text-base font-semibold">{t.contacts}</h4>

                  {phone && (
                    <a
                      href={`tel:${sanitizePhone(phone)}`}
                      className="block text-sm leading-7 hover:underline"
                    >
                      T: {phone}
                    </a>
                  )}

                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="block text-sm leading-7 hover:underline"
                    >
                      E: {email}
                    </a>
                  )}

                  {whatsapp && (
                    <a
                      href={`https://wa.me/${sanitizeWhatsapp(whatsapp)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm leading-7 hover:underline"
                    >
                      W: {whatsapp.startsWith("+") ? whatsapp : `+${whatsapp}`}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-center text-sm md:flex-row md:items-center md:justify-between md:px-8 md:text-left">
        <div className="accent-text/80">
          © {new Date().getFullYear()} {legalName || brand}
          {vatNumber ? ` · ${t.vat} ${vatNumber}` : ""}
        </div>

        {hasLegalLinks && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
            {privacyUrl && (
              <Link
                href={privacyUrl}
                className="underline underline-offset-4 hover:opacity-70"
              >
                Privacy Policy
              </Link>
            )}

            {cookieUrl && (
              <Link
                href={cookieUrl}
                className="underline underline-offset-4 hover:opacity-70"
              >
                Cookie Policy
              </Link>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}