"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  lang: string;
  approachLabel?: string;
  whoWeHelpLabel?: string;
  conditionsLabel?: string;
  whoWeHelpHref: string;
  conditionsHref: string;
  children: React.ReactNode;
};

export default function ChiropracticPageShell({
  lang,
  approachLabel = "Il nostro approccio",
  whoWeHelpLabel = "Chi aiutiamo",
  conditionsLabel = "Problematiche trattate",
  whoWeHelpHref,
  conditionsHref,
  children,
}: Props) {
  const pathname = usePathname();

  const navItems = [
    {
      label: approachLabel,
      href: `/${lang}/servizi/chiropratica`,
    },
    {
      label: whoWeHelpLabel,
      href: whoWeHelpHref,
    },
    {
      label: conditionsLabel,
      href: conditionsHref,
    },
  ];

  return (
    <main className="bg-[#EAF5F0] accent-text">

     <section className="fixed left-0 right-0 top-[104px] z-30 border-b border-black/10 bg-[#b2e0cb] backdrop-blur md:top-[120px]">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="overflow-x-auto md:hidden">
            <div className="flex min-w-max gap-6 py-4 text-sm uppercase tracking-[0.12em]">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap transition hover:opacity-70 ${
                      isActive ? "accent-text" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="flex gap-10 py-4 text-sm uppercase tracking-[0.12em]">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap transition hover:opacity-70 ${
                      isActive ? "accent-text" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {children}
    </main>
  );
}