import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  chiropracticTreatmentBySlugQuery,
  chiropracticTreatmentSlugsQuery,
} from "@/sanity/lib/queries";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await client.fetch(chiropracticTreatmentSlugsQuery);

  return slugs.map((item: { slug: string; language: string }) => ({
    lang: item.language,
    slug: item.slug,
  }));
}

export default async function TreatmentPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const data = await client.fetch(chiropracticTreatmentBySlugQuery, {
    slug,
    lang,
  });

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-[#EAF5F0] px-6 py-12 md:py-16">
      <div className="mx-auto mb-40 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl uppercase text-[#3B2F2F] md:text-8xl">
            {data.title}
          </h1>

          {data.subtitle && (
            <p className="mt-4 text-lg text-[#3B2F2F]/80">{data.subtitle}</p>
          )}
        </div>

        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            {data.shortDescription && (
              <h2 className="text-2xl uppercase text-[#3B2F2F] md:text-3xl">
                {data.shortDescription}
              </h2>
            )}

            {data.content?.length > 0 && (
              <div className="mt-6 max-w-none prose prose-p:text-[#3B2F2F]/85">
                {data.content.map((block: any) => (
                  <p key={block._key} className="mb-4 leading-8">
                    {block.children?.map((child: any) => child.text).join("")}
                  </p>
                ))}
              </div>
            )}
          </div>

          {data.heroImageUrl && (
            <div className="overflow-hidden">
              <img
                src={data.heroImageUrl}
                alt={data.heroImageAlt || data.title}
                className="h-[420px] w-full object-cover"
              />
            </div>
          )}
        </section>

        {data.pricingSection?.imageUrl && (
          <section className="relative mx-auto mt-20 max-w-5xl pb-24">
            <div className="overflow-hidden">
              <img
                src={data.pricingSection.imageUrl}
                alt={
                  data.pricingSection.imageAlt ||
                  data.pricingSection.title ||
                  data.title
                }
                className="h-[520px] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-1/2 w-[90%] max-w-xl -translate-x-1/2 translate-y-1/2 bg-[#EAF5F0] p-8 shadow-xl md:p-10">
              {data.pricingSection.price && (
                <p className="text-sm uppercase tracking-[0.2em] text-[#3B2F2F]/70">
                  {data.pricingSection.price}
                </p>
              )}

              {data.pricingSection.title && (
                <h3 className="mt-3 text-3xl uppercase text-[#3B2F2F] md:text-4xl">
                  {data.pricingSection.title}
                </h3>
              )}

              {data.pricingSection.features?.length > 0 && (
                <ul className="mt-6 space-y-3 text-[#3B2F2F]/85">
                  {data.pricingSection.features.map(
                    (feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3B2F2F]" />
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              )}

              {data.pricingSection.buttonText &&
                data.pricingSection.buttonLink && (
                  <div className="mt-8">
                    <Link
                      href={data.pricingSection.buttonLink}
                      className="inline-block border border-[#3B2F2F] px-6 py-3 text-sm uppercase tracking-wide text-[#3B2F2F] transition hover:bg-[#3B2F2F] hover:text-white"
                    >
                      {data.pricingSection.buttonText}
                    </Link>
                  </div>
                )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}