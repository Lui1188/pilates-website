"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavbarProps = {
  studioName?: string;
  logoUrl?: string | null;
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

export default function Navbar({ studioName, logoUrl }: NavbarProps) {
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

  return (
    <>
      <header className="sticky top-0 z-50 bg-soft">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-6 py-3">
          <Link href="/" onClick={close} className="flex items-center justify-center">
            <img
              src={logoUrl || "/logo.svg"}
              alt={brand}
              className="h-26 w-auto md:h-35"
            />
          </Link>
        </div>
      </header>

      {/* Hamburger always visible above everything */}
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
          "fixed inset-0 z-[90] flex min-h-screen w-full flex-col justify-center bg-soft transition-all duration-300 text-[#8C5A5A]",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center justify-center gap-6 px-6 text-center">
          <Link
            href="/"
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            Home
          </Link>

          <Link
            href="/servizi/chiropratica"
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            Chiropratica
          </Link>

          <Link
            href="/servizi/pilates"
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            Pilates
          </Link>

          <Link
            href="/chi-sono"
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            Chi sono
          </Link>

          <Link
            href="/contatti"
            onClick={close}
            className="text-3xl font-light tracking-wide transition hover:opacity-60 md:text-5xl"
          >
            Contatti
          </Link>
        </nav>
      </div>
    </>
  );
}