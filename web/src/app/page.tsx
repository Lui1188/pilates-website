import Link from "next/link";
import { client } from "@/sanity/lib/client";

const QUERY = `{
  "settings": *[_type=="siteSettings"][0]{
    studioName, tagline, ctaText, ctaUrl, bookingUrl,
    phone, whatsapp, address, mapsEmbedUrl,
    showPrices, showReviews
  },
  "home": *[_type=="homePage"][0]{
    heroTitle, heroSubtitle, introText, studioVideoUrl,
    featuredServices[]->{
      _id, title, category, description, duration, price, highlights
    },
    collaborations[]{name, url}
  },
  "prices": *[_type=="priceItem" && active==true]|order(order asc){
    _id, category, title, price, note
  },
  "reviews": *[_type=="review" && published==true]|order(order asc){
    _id, authorName, text, rating, source
  }
}`;

export default async function HomePage() {
  const data = await client.fetch(QUERY);

  const settings = data?.settings ?? {};
  const home = data?.home ?? {};
  const prices = Array.isArray(data?.prices) ? data.prices : [];
  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];

  const bookingUrl = settings.bookingUrl || settings.ctaUrl;
  const ctaText = settings.ctaText || "Prenota";

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="px-6 pt-10 pb-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm opacity-70">{settings.studioName}</p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {home.heroTitle || "Titolo Hero"}
          </h1>

          {home.heroSubtitle && (
            <p className="mt-3 max-w-2xl text-base opacity-80">
              {home.heroSubtitle}
            </p>
          )}

          {home.introText && (
            <p className="mt-4 max-w-2xl text-sm opacity-80">
              {home.introText}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {bookingUrl ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border px-5 py-3 text-sm font-medium"
              >
                {ctaText}
              </a>
            ) : (
              <span className="rounded-2xl border px-5 py-3 text-sm opacity-70">
                (Imposta bookingUrl in Impostazioni sito)
              </span>
            )}

            <Link
              href="/servizi/chiropratica"
              className="rounded-2xl border px-5 py-3 text-sm"
            >
              Chiropratica
            </Link>
            <Link
              href="/servizi/pilates"
              className="rounded-2xl border px-5 py-3 text-sm"
            >
              Pilates
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      {home.studioVideoUrl && (
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border">
              <iframe
                src={home.studioVideoUrl}
                className="aspect-video w-full"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
                title="Video dello studio"
              />
            </div>
          </div>
        </section>
      )}

      {/* FEATURED SERVICES */}
      {Array.isArray(home.featuredServices) && home.featuredServices.length > 0 && (
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold">Servizi</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {home.featuredServices.map((s: any) => (
                <div key={s._id} className="rounded-2xl border p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-lg font-medium">{s.title}</div>
                    {s.category && (
                      <span className="rounded-full border px-3 py-1 text-xs opacity-80">
                        {s.category}
                      </span>
                    )}
                  </div>

                  {s.description && (
                    <p className="mt-2 text-sm opacity-80">{s.description}</p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    {s.duration && (
                      <span className="rounded-full border px-3 py-1">
                        {s.duration}
                      </span>
                    )}
                    {s.price && (
                      <span className="rounded-full border px-3 py-1">
                        {s.price}
                      </span>
                    )}
                  </div>

                  {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                    <ul className="mt-4 list-disc pl-5 text-sm">
                      {s.highlights.slice(0, 6).map((h: string, i: number) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICES (toggle) */}
      {settings.showPrices && prices.length > 0 && (
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold">Prezzi</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {prices.map((p: any) => (
                <div key={p._id} className="rounded-2xl border p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-medium">{p.title}</div>
                    {p.price && <div className="text-sm opacity-90">{p.price}</div>}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {p.category && (
                      <span className="rounded-full border px-3 py-1 opacity-80">
                        {p.category}
                      </span>
                    )}
                    {p.note && (
                      <span className="rounded-full border px-3 py-1 opacity-80">
                        {p.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS (toggle) */}
      {settings.showReviews && reviews.length > 0 && (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold">Recensioni</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {reviews.map((r: any) => (
                <div key={r._id} className="rounded-2xl border p-5">
                  <p className="text-sm opacity-80">{r.text}</p>

                  <div className="mt-3 flex items-center justify-between text-xs opacity-80">
                    <span>{r.authorName || "Anonimo"}</span>
                    <span className="flex items-center gap-2">
                      {typeof r.rating === "number" ? `★ ${r.rating}/5` : null}
                      {r.source ? `· ${r.source}` : null}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACTS / FOOTER CTA */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-5xl rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Contatti</h2>

          <div className="mt-3 grid gap-2 text-sm opacity-85">
            {settings.phone && <div>Telefono: {settings.phone}</div>}
            {settings.whatsapp && <div>WhatsApp: {settings.whatsapp}</div>}
            {settings.address && <div>Indirizzo: {settings.address}</div>}
          </div>

          {bookingUrl && (
            <div className="mt-5">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-2xl border px-5 py-3 text-sm font-medium"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
