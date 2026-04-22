"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type AlternatingSectionItem = {
  _key: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type GalleryCard = {
  _id?: string;
  cardTitle?: string;
  cardDescription?: string;
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
};

type FAQItem = {
  _key: string;
  question?: string;
  answer?: string;
};

type ChiropracticPageData = {
  approachTitle?: string;
  approachSections?: AlternatingSectionItem[];
  approachGalleryTitle?: string;
  approachGalleryTreatments?: GalleryCard[];
  faqTitle?: string;
  faqs?: FAQItem[];
};

export default function ChiropracticPage({
  data,
  lang,
}: {
  data: ChiropracticPageData;
  lang: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [canScroll, setCanScroll] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const approachSections = useMemo(() => data?.approachSections ?? [], [data]);
  const cards = useMemo(() => data?.approachGalleryTreatments ?? [], [data]);
  const faqs = useMemo(() => data?.faqs ?? [], [data]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth + 1;
    const isAtStart = el.scrollLeft <= 4;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

    setCanScroll(hasOverflow);
    setShowLeftButton(hasOverflow && !isAtStart);
    setShowRightButton(hasOverflow && !isAtEnd);
  };

  useEffect(() => {
    updateScrollState();

    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [cards]);

  const scrollGallery = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <SectionTitle title={data?.approachTitle || "Il nostro approccio"} />
        </div>
        <AlternatingSections sections={approachSections} />
      </section>

      {!!cards.length && (
        <section className="bg-[#EAF5F0] py-10 ">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            {data?.approachGalleryTitle && (
              <h2 className="mb-8 text-2xl uppercase tracking-[0.08em] md:text-3xl">
                {data.approachGalleryTitle}
              </h2>
            )}

            <section className="relative">
              {canScroll && showLeftButton && (
                <button
                  type="button"
                  onClick={() => scrollGallery("left")}
                  className="absolute left-[-30px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#8C5A5A] shadow-md transition hover:bg-white md:flex"
                  aria-label="Scorri galleria a sinistra"
                >
                  ‹
                </button>
              )}

              {canScroll && showRightButton && (
                <button
                  type="button"
                  onClick={() => scrollGallery("right")}
                  className="absolute right-[-30px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#8C5A5A] shadow-md transition hover:bg-white md:flex"
                  aria-label="Scorri galleria a destra"
                >
                  ›
                </button>
              )}

              <div
                ref={scrollRef}
                className="overflow-x-auto overflow-y-hidden scroll-smooth"
              >
                <div className="flex w-max gap-5 snap-x snap-mandatory">
                  {cards.map((card) => (
                    <Link
                      key={card._id || card.slug}
                      href={
                        card.slug
                          ? `/${lang}/servizi/chiropratica/trattamenti/${card.slug}`
                          : "#"
                      }
                      className="group relative block h-[618px] w-[85vw] max-w-[400px] shrink-0 snap-start md:w-[400px]"
                    >
                      {card.imageUrl ? (
                        <img
                          src={card.imageUrl}
                          alt={
                            card.imageAlt ||
                            card.cardTitle ||
                            "Trattamento chiropratico"
                          }
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/20" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                      <div className="absolute bottom-0 p-6 text-white">
                        {card.cardTitle && (
                          <h3 className="text-lg uppercase">{card.cardTitle}</h3>
                        )}

                        {card.cardDescription && (
                          <p className="mt-2 text-sm text-white/90">
                            {card.cardDescription}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      )}

      {!!faqs.length && (
        <section className="bg-[#F7FCF9] py-14 md:py-24">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <h2 className="mb-8 text-2xl uppercase tracking-[0.08em] md:text-3xl">
              {data?.faqTitle || "Domande frequenti"}
            </h2>

            <ul className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <li
                    key={faq._key}
                    className="border-b border-[#8C5A5A]/30"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-[#8C5A5A]"
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-base uppercase tracking-[0.06em] md:text-lg">
                        {faq.question}
                      </h3>

                      <span
                        className={`text-xl text-[#8C5A5A] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                      >
                        ›
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 leading-7 text-black/75">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <h2 className="text-3xl uppercase tracking-[0.08em] md:text-5xl">{title}</h2>
    </div>
  );
}

function AlternatingSections({
  sections,
}: {
  sections: AlternatingSectionItem[];
}) {
  if (!sections.length) return null;

  return (
    <div>
      {sections.map((section, index) => {
        const reversed = index % 2 !== 0;

        return (
          <article
            key={section._key}
            className={index % 2 === 0 ? "bg-[#EAF5F0]" : "bg-[#F7FCF9]"}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 md:grid-cols-2 md:gap-14 md:px-10 md:py-16">
              <div className={reversed ? "md:order-2" : "md:order-1"}>
                {section.imageUrl ? (
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt || section.title || "Immagine sezione"}
                    className="h-[320px] w-full rounded-[28px] object-cover md:h-[500px]"
                  />
                ) : (
                  <div className="h-[320px] w-full rounded-[28px] bg-white/40 md:h-[500px]" />
                )}
              </div>

              <div className={reversed ? "md:order-1" : "md:order-2"}>
                {section.title && (
                  <h3 className="text-2xl uppercase tracking-[0.06em] md:text-4xl">
                    {section.title}
                  </h3>
                )}

                {section.text && (
                  <p className="mt-5 text-base leading-7 text-black/75 md:text-lg">
                    {section.text}
                  </p>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}