"use client";

import Link from "next/link";
import { useRef } from "react";

type CourseCard = {
  _key: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
  url?: string;
};

export default function PilatesCoursesSection({
  title,
  description,
  courses,
}: {
  title?: string;
  description?: string;
  courses: CourseCard[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 420;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-soft-gradient px-6 pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="mx-auto max-w-7xl">
        {(title || description) && (
          <section className="mb-10 md:mb-14">
            {title && (
              <h2 className="whitespace-pre-line text-2xl uppercase text-[#8C5A5A] md:text-3xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#8C5A5A]/85 md:text-lg">
                {description}
              </p>
            )}
          </section>
        )}

        <section className="relative">
          <button
            onClick={() => scrollGallery("left")}
            className="absolute left-[-30px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#8C5A5A] shadow-md transition hover:bg-white md:flex"
          >
            ‹
          </button>

          <button
            onClick={() => scrollGallery("right")}
           className="absolute right-[-30px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#8C5A5A] shadow-md transition hover:bg-white md:flex"
          >
            ›
          </button>

          <div ref={scrollRef} className="overflow-hidden">
            <div className="flex w-max gap-5">
              {courses.map((course) => {
                console.log(course);

  return (
                <Link
                  key={course._key}
                  href={course.url || (course.slug ? `/corsi/${course.slug}` : "#")}
                  className="group relative block h-[618px] w-[400px] shrink-0"
                >
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.imageAlt || course.title || "Corso Pilates"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/20" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-0 p-6 text-white">
                    {course.title && (
                      <h3 className="text-lg uppercase">
                        {course.title}
                      </h3>
                    )}

                    {course.description && (
                      <p className="mt-2 text-sm text-white/90">
                        {course.description}
                      </p>
                    )}
                  </div>
                </Link>
              )})}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}