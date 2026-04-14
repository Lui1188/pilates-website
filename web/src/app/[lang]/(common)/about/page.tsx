import { client } from "@/sanity/lib/client";
import Reveal from "@/components/animations/Reveal";
import { aboutPageQuery } from "@/sanity/lib/queries";


export default async function AboutPage() {
    const about = await client.fetch(aboutPageQuery);

    return (
        <div className="theme-common">

            <main className="min-h-screen bg-soft-gradient px-6 pt-10 pb-16 md:pt-14 md:pb-24">
                <div className="mx-auto max-w-6xl">
                    {about?.pageTitle && (
                        <Reveal>
                            <h1 className="mb-10 text-4xl text-center tracking-tight text-[#8C5A5A] md:mb-30 md:text-6xl">
                                {about.pageTitle}
                            </h1>
                        </Reveal>
                    )}

                    <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start md:gap-14">
                        {/* Left image */}
                        <Reveal>
                            <div className="overflow-hidden rounded-t-[280px]">
                                {about?.heroImageUrl ? (
                                    <img
                                        src={about.heroImageUrl}
                                        alt={about?.heroImageAlt || about?.pageTitle || "About image"}
                                        className="h-[420px] w-full object-cover md:h-[640px]"
                                    />
                                ) : (
                                    <div className="h-[420px] w-full bg-white/20 md:h-[640px]" />
                                )}
                            </div>
                        </Reveal>

                        {/* Right content */}
                        <div className="mt-30 space-y-10">
                            {Array.isArray(about?.contentBlocks) &&
                                about.contentBlocks.map(
                                    (block: { title?: string; text?: string }, index: number) => (
                                        <Reveal key={index}>
                                            <div className="max-w-xl">
                                                {block?.title && (
                                                    <h2 className="text-2xl font-semibold text-[#8C5A5A] md:text-3xl">
                                                        {block.title}
                                                    </h2>
                                                )}

                                                {block?.text && (
                                                    <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#8C5A5A]/85">
                                                        {block.text}
                                                    </p>
                                                )}
                                            </div>
                                        </Reveal>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}