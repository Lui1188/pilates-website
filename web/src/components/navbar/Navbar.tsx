"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavbarProps = {
  studioName?: string;
  logoUrl?: string | null;
  bookingUrl?: string | null;
  ctaText?: string | null;
};

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-6">
      <span
        className={[
          "absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-200",
          open ? "translate-y-[7px] rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-[14px] h-0.5 w-6 rounded-full bg-current transition-transform duration-200",
          open ? "-translate-y-[7px] -rotate-45" : "",
        ].join(" ")}
      />
    </span>
  );
}

export default function Navbar({ studioName, logoUrl, bookingUrl, ctaText }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const brand = studioName || "Chirolates Studio";

  // Close on ESC + lock scroll when open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b navbar-bg navbar-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          {logoUrl ? (
            <img src={logoUrl} alt={brand} className="h-8 w-auto" />
          ) : (
            <div className="h-8 w-8 rounded-full accent-bg" />
          )}
          <span className="text-sm font-semibold tracking-wide accent-text">{brand}</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-5 text-sm md:flex accent-strong-text font-semibold">
          <Link href="/servizi/chiropratica" className="opacity-100 hover:opacity-80 transition">
            Chiropratica
          </Link>
          <Link href="/servizi/pilates" className="opacity-100 hover:opacity-80 transition">
            Pilates
          </Link>

          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-4 py-2 text-white accent-bg hover:opacity-90 transition focus:accent-ring"
            >
              {ctaText || "Prenota"}
            </a>
          ) : (
            <button
              type="button"
              className="rounded-xl px-4 py-2 accent-strong-bg accent-light-text hover:opacity-90 transition focus:accent-ring"
            >Prenota</button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden rounded-xl border px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
        >
          <Hamburger open={open} />
        </button>
      </div>

      {/* Mobile overlay + panel */}
      {open && (
        <>
          {/* Overlay */}
          <button
            aria-label="Chiudi menu"
            className="fixed inset-0 z-40 bg-black/30"
            onClick={close}
          />

          {/* Panel */}
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-[65px] z-50 border-b bg-white"
          >
            <div className="mx-auto max-w-5xl px-6 py-4 space-y-2 text-sm">
              <Link
                href="/servizi/chiropratica"
                className="block rounded-xl px-3 py-2 bg-soft-hover"
                onClick={close}
              >
                Chiropratica
              </Link>

              <Link
                href="/servizi/pilates"
                className="block rounded-xl px-3 py-2 bg-soft-hover"
                onClick={close}
              >
                Pilates
              </Link>

              <Link
                href="/chi-sono"
                className="block rounded-xl px-3 py-2 bg-soft-hover"
                onClick={close}
              >
                Chi sono
              </Link>

              <Link
                href="/contatti"
                className="block rounded-xl px-3 py-2 bg-soft-hover"
                onClick={close}
              >
                Contatti
              </Link>

              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl px-3 py-2 text-white accent-bg hover:opacity-90 transition"
                  onClick={close}
                >
                  {ctaText || "Prenota"}
                </a>
              ) : (
                <div className="block rounded-xl border px-3 py-2 opacity-70">
                  (Imposta bookingUrl in Sanity)
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
