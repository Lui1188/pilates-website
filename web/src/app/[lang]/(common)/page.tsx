import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Reveal from "@/components/animations/Reveal";
import { homePageQuery } from "@/sanity/lib/queries";
import Section2Title from "@/components/home/Section2Title";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const data = await client.fetch(homePageQuery, { lang });
  const settings = data?.settings ?? {};
  const home = data?.home ?? {};

  return (
    <div className="theme-common">
      <main className="min-h-screen bg-soft-gradient">
        {/* SECTION 1 */}
        <Reveal>
          <section className="px-6 pt-10 pb-12 md:pt-14 md:pb-16">
            <div className="mx-auto max-w-6xl">
              {home.heroMarqueeText && (
                <div className="mb-8 overflow-hidden border-y border-black/10 py-3">
                  {/* MOBILE */}
                  <div className="overflow-hidden md:hidden">
                    <div className="flex w-max animate-marquee">
                      <span className="mx-6 text-sm uppercase tracking-[0.22em] text-[#8C5A5A]/80">
                        {home.heroMarqueeText}
                      </span>
                      <span className="mx-6 text-sm uppercase tracking-[0.22em] text-[#8C5A5A]/80">
                        {home.heroMarqueeText}
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP */}
                  <p className="hidden text-center text-sm uppercase tracking-[0.22em] text-[#8C5A5A]/80 md:block">
                    {home.heroMarqueeText}
                  </p>
                </div>
              )}

              {Array.isArray(home.heroImages) && home.heroImages.length >= 5 && (
                <>
                  {/* MOBILE: 3 images */}
                  <div className="flex items-end justify-center gap-3 md:hidden">
                    {home.heroImages.slice(0, 3).map((img: any, i: number) => {
                      const isCenter = i === 1;

                      return (
                        <div
                          key={i}
                          className={`w-1/3 ${!isCenter ? "mb-6" : ""}`}
                        >
                          <div
                            className={`overflow-hidden ${
                              isCenter ? "rounded-t-[120px]" : "rounded-t-[90px]"
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={img.alt || settings.studioName || "Studio"}
                              className={`w-full object-cover ${
                                isCenter ? "h-[280px]" : "h-[220px]"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP: 5 images */}
                  <div className="hidden items-end justify-center gap-4 md:flex md:gap-6">
                    {home.heroImages.slice(0, 5).map((img: any, i: number) => {
                      const isCenter = i === 2;
                      const isNear = i === 1 || i === 3;
                      const isOuter = i === 0 || i === 4;

                      return (
                        <div
                          key={i}
                          className={`w-1/6 
                            ${isOuter ? "mb-8 md:mb-12" : ""}
                            ${isNear ? "mb-5 md:mb-8" : ""}
                          `}
                        >
                          <div
                            className={`overflow-hidden ${
                              isCenter ? "rounded-t-[160px]" : "rounded-t-[120px]"
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={img.alt || settings.studioName || "Studio"}
                              className={`w-full object-cover 
                                ${
                                  isCenter
                                    ? "h-[340px] md:h-[460px]"
                                    : isNear
                                    ? "h-[300px] md:h-[400px]"
                                    : "h-[260px] md:h-[340px]"
                                }
                              `}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>
        </Reveal>

        {/* SECTION 2 */}
        <section className="overflow-hidden px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl border-t border-black/10 pt-10 md:pt-14">
            <Reveal>
              <div className="mt-1 mb-3 flex flex-col items-center gap-10 text-center">
                {home.section2Title && <Section2Title title={home.section2Title} />}

                {home.section2Subtitle && (
                  <p className="text-lg font-medium uppercase tracking-[0.14em] text-[#8C5A5A] md:text-xl lg:text-4xl">
                    {home.section2Subtitle}
                  </p>
                )}

                <Link
                  href={home.section2ButtonLink || `/${lang}/about`}
                  className="inline-flex rounded-full accent-bg px-6 py-3 text-sm uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-[#6f4444]"
                >
                  {home.section2ButtonText || "CHI SIAMO"}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}