import { client } from "@/sanity/lib/client";
import { courseBySlugQuery, courseSlugsQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await client.fetch(courseSlugsQuery);

  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await client.fetch(courseBySlugQuery, { slug });

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-soft-gradient px-6 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {data.heroImageUrl && (
          <div className="mb-10 overflow-hidden">
            <img
              src={data.heroImageUrl}
              alt={data.heroImageAlt || data.title}
              className="h-[420px] w-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl uppercase text-[#8C5A5A] md:text-5xl">
          {data.title}
        </h1>

        {data.subtitle && (
          <p className="mt-4 text-lg text-[#8C5A5A]/80">
            {data.subtitle}
          </p>
        )}

        {data.shortDescription && (
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#8C5A5A]/85 md:text-lg">
            {data.shortDescription}
          </p>
        )}

        {data.content?.length > 0 && (
          <div className="mt-10 prose max-w-none prose-p:text-[#8C5A5A]/85">
            {data.content.map((block: any) => (
              <p key={block._key}>
                {block.children?.map((child: any) => child.text).join("")}
              </p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}