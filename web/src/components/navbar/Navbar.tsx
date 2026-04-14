"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavbarProps = {
  studioName?: string;
  logoUrl?: string | null;
  lang: string;
};

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6 text-[#8C5A5A]">
      <span
        className={[
          "absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
          open ? "translate-y-[9px] rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-300",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-[18px] h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
          open ? "-translate-y-[9px] -rotate-45" : "",
        ].join(" ")}
      />
    </span>
  );
}

export default function Navbar({ studioName, logoUrl, lang }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const brand = studioName || "Chirolates Studio";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  const t = {
    home: lang === "en" ? "Home" : "Home",
    chiropractic: lang === "en" ? "Chiropractic" : "Chiropratica",
    pilates: "Pilates",
    about: lang === "en" ? "About us" : "Chi siamo",
    contacts: lang === "en" ? "Contacts" : "Contatti",
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-soft">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-6 py-3">

          <div className="absolute left-6 flex items-center gap-3 text-sm uppercase text-[#8C5A5A]">
            <Link href="/it">IT</Link>|<Link href="/en">EN</Link>
          </div>

          <Link href={`/${lang}`} onClick={close} className="flex items-center justify-center">
            <img
              src={logoUrl || "/logo.svg"}
              alt={brand}
              className="h-20 w-auto md:h-24"
            />
          </Link>

        </div>
      </header>

      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={open}
        aria-controls="fullscreen-menu"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        className="fixed right-6 top-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full text-current transition hover:opacity-70"
      >
        <Hamburger open={open} />
      </button>

      <div
        id="fullscreen-menu"
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[90] flex min-h-screen w-full flex-col justify-center bg-soft text-[#8C5A5A] transition-all duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center justify-center gap-6 px-6 text-center">
          <Link
            href={`/${lang}`}
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            {t.home}
          </Link>

          <Link
            href={`/${lang}/servizi/chiropratica`}
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            {t.chiropractic}
          </Link>

          <Link
            href={`/${lang}/servizi/pilates`}
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            {t.pilates}
          </Link>

          <Link
            href={`/${lang}/about`}
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            {t.about}
          </Link>

          <Link
            href={`/${lang}/contatti`}
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            {t.contacts}
          </Link>
        </nav>
      </div>
    </>
  );
}