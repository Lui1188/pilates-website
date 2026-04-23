"use client";
import SectionBand from "@/components/SectionBand";

type AlternatingSectionItem = {
  _key: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type Props = {
  title: string;
  sections: AlternatingSectionItem[];
};

export default function ChiropracticSectionPage({
  title,
  sections,
}: Props) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-10 md:pt-27">
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl uppercase tracking-[0.08em] md:text-5xl">
            {title}
          </h2>
        </div>
      </div>

      <div>
        {sections.map((section, index) => {
          const reversed = index % 2 !== 0;

          return (
            <SectionBand
              key={section._key}
              variant={index % 2 === 0 ? "band1" : "band2"}
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
            </SectionBand>
          );
        })}
      </div>
    </section>
  );
}