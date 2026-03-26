import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Reveal from "@/components/animations/Reveal";
import { homePageQuery } from "@/sanity/lib/queries";
import Section2Title from "@/components/home/Section2Title";


export default async function HomePage() {
  const data = await client.fetch(homePageQuery);
  const settings = data?.settings ?? {};
  const home = data?.home ?? {};

  return (
    <main className="min-h-screen bg-soft-gradient">
      {/* SECTION 1 */}
      <Reveal>
        <section className="px-6 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="mx-auto max-w-6xl">
            {home.heroMarqueeText && (
              <div className="mb-8 overflow-hidden border-y border-black/10 py-3">
                <p className="whitespace-nowrap text-center text-sm uppercase tracking-[0.22em] text-[#8C5A5A]/80">
                  {home.heroMarqueeText}
                </p>
              </div>
            )}

            {Array.isArray(home.heroImages) && home.heroImages.length >= 5 && (
              <div className="flex items-end justify-center gap-4 md:gap-6">
                <div className="mb-8 w-1/6 md:mb-12">
                  <div className="overflow-hidden rounded-t-[120px]">
                    <img
                      src={home.heroImages[0].url}
                      alt={home.heroImages[0].alt || settings.studioName || "Studio"}
                      className="h-[260px] w-full object-cover md:h-[340px]"
                    />
                  </div>
                </div>
                <div className="mb-5 w-1/6 md:mb-8">
                  <div className="overflow-hidden rounded-t-[120px]">
                    <img
                      src={home.heroImages[0].url}
                      alt={home.heroImages[0].alt || settings.studioName || "Studio"}
                      className="h-[300px] w-full object-cover md:h-[400px]"
                    />
                  </div>
                </div>

                <div className="w-1/6">
                  <div className="overflow-hidden rounded-t-[160px]">
                    <img
                      src={home.heroImages[1].url}
                      alt={home.heroImages[1].alt || settings.studioName || "Studio"}
                      className="h-[340px] w-full object-cover md:h-[460px]"
                    />
                  </div>
                </div>

                <div className="mb-5 w-1/6 md:mb-8">
                  <div className="overflow-hidden rounded-t-[160px]">
                    <img
                      src={home.heroImages[2].url}
                      alt={home.heroImages[2].alt || settings.studioName || "Studio"}
                      className="h-[300px] w-full object-cover md:h-[400px]"
                    />
                  </div>
                </div>
                <div className="mb-8 w-1/6 md:mb-12">
                  <div className="overflow-hidden rounded-t-[120px]">
                    <img
                      src={home.heroImages[0].url}
                      alt={home.heroImages[0].alt || settings.studioName || "Studio"}
                      className="h-[260px] w-full object-cover md:h-[340px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </Reveal>

      {/* SECTION 2 */}
      <section className="px-6 pb-16 md:pb-24 overflow-hidden">
        <div className="mx-auto max-w-6xl border-t border-black/10 pt-10 md:pt-14">
          <Reveal>
            <div className="mt-1 mb-3 flex flex-col items-center text-center gap-10">
              {home.section2Title && (
                <Section2Title title={home.section2Title} />
              )}

              {home.section2Subtitle && (
                <p className="text-lg font-medium uppercase tracking-[0.14em] text-[#8C5A5A] md:text-xl lg:text-4xl">
                  {home.section2Subtitle}
                </p>
              )}

              <Link
                href={home.section2ButtonLink || "/about"}
                className="inline-flex rounded-full bg-[#8C5A5A] px-6 py-3 text-sm uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#6f4444]"
              >
                {home.section2ButtonText || "CHI SIAMO"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
