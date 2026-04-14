import { client } from "@/sanity/lib/client";
import PilatesScrollSection from "@/components/pilates/PilatesScrollSection";
import PilatesCoursesSection from "@/components/pilates/PilatesCoursesSection";
import { pilatesPageQuery } from "@/sanity/lib/queries";

export default async function PilatesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = await client.fetch(pilatesPageQuery);

  return (
    <>
      <PilatesScrollSection
        data={{
          pageTitle: data.pageTitle,
          introText: data.introText,
          sections: data.sections,
        }}
      />

      <PilatesCoursesSection
        title={data.coursesSectionTitle}
        description={data.coursesSectionDescription}
        courses={data.coursesGallery ?? []}
        lang={lang}
      />
    </>
  );
}