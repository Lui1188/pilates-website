"use client";

import { useEffect, useMemo, useState } from "react";

type PilatesSection = {
  _key: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type PilatesPageData = {
  pageTitle?: string;
  introText?: string;
  sections?: PilatesSection[];
};

export default function PilatesScrollSection({
  data,
}: {
  data: PilatesPageData;
}) {
  const sections = useMemo(() => data?.sections ?? [], [data]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    const elements = document.querySelectorAll("[data-pilates-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const index = Number(
            visible[0].target.getAttribute("data-section-index")
          );

          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="min-h-screen bg-soft-gradient px-6 pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="mx-auto max-w-7xl">
        {data?.pageTitle && (
          <h1 className="mb-6 text-4xl uppercase tracking-tight accent-text md:mb-8 md:text-5xl">
            {data.pageTitle}
          </h1>
        )}

        {data?.introText && (
          <p className="mb-10 max-w-2xl text-base leading-8 accent-text/85 md:mb-14">
            {data.introText}
          </p>
        )}

        <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:gap-14">
          <div className="space-y-24 md:space-y-32">
            {sections.map((section, index) => (
              <section
                key={section._key || index}
                data-pilates-section
                data-section-index={index}
                className="min-h-[55vh] scroll-mt-28"
              >
                <div className="max-w-xl">
                  {/* Mobile image above section title */}
                  <div className="mb-8 overflow-hidden rounded-t-[280px] md:hidden">
                    {section.imageUrl ? (
                      <img
                        src={section.imageUrl}
                        alt={section.imageAlt || section.title || "Pilates"}
                        className="h-[360px] w-full object-cover"
                      />
                    ) : (
                      <div className="h-[360px] w-full bg-white/20" />
                    )}
                  </div>

                  {section.title && (
                    <h2 className="text-2xl uppercase accent-text md:text-3xl">
                      {section.title}
                    </h2>
                  )}

                  {section.text && (
                    <p className="mt-5 whitespace-pre-line text-base leading-8 accent-text/85 md:text-lg">
                      {section.text}
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="sticky top-28">
              <div className="relative h-[640px] overflow-hidden rounded-t-[280px] bg-white/10">
                {sections.map((section, index) =>
                  section.imageUrl ? (
                    <img
                      key={section._key || index}
                      src={section.imageUrl}
                      alt={section.imageAlt || section.title || "Pilates"}
                      className={[
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
                        activeIndex === index ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}