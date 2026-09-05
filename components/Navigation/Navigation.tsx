"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { wedding } from "@/data/wedding";

const links = [
  { number: "01", label: "Invitation", href: "#welcome" },
  { number: "02", label: "Our Story", href: "#story" },
  { number: "03", label: "Celebration", href: "#celebration" },
  { number: "04", label: "The Day", href: "#timeline" },
  { number: "05", label: "The Place", href: "#venue" },
  { number: "06", label: "Memories", href: "#gallery" },
  { number: "07", label: "Forever", href: "#forever" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-stone-200/70 bg-stone-50/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <a
          href="#top"
          onClick={closeMenu}
          className={`font-heading text-3xl tracking-wide transition-colors ${scrolled ? "text-stone-900" : "text-white"}`}
          aria-label="NikSha home"
        >
          {wedding.couple.monogram}
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex h-11 items-center gap-3 border-b px-1 text-[10px] uppercase tracking-[0.25em] transition-colors ${
            scrolled ? "border-stone-300 text-stone-800" : "border-white/50 text-white"
          }`}
          aria-label={open ? "Close invitation index" : "Open invitation index"}
          aria-expanded={open}
        >
          <span className="hidden sm:inline">Index</span>
          {open ? <X size={18} strokeWidth={1.35} /> : <Menu size={18} strokeWidth={1.35} />}
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-0 z-[-1] h-[100svh] overflow-y-auto bg-paper/98 backdrop-blur-xl transition-all duration-500 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-6 py-28 sm:px-10 lg:px-12">
          <div className="mb-10 flex items-center gap-4 text-rose">
            <span className="text-[10px] uppercase tracking-[0.4em]">The NikSha invitation</span>
            <span className="h-px w-12 bg-champagne" />
          </div>

          <nav className="grid border-y border-line" aria-label="Invitation index">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-line py-5 last:border-b-0 sm:grid-cols-[4rem_1fr_auto] sm:py-6"
              >
                <span className="text-[10px] tracking-[0.25em] text-muted">{link.number}</span>
                <span className="font-heading text-4xl leading-none text-charcoal transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl lg:text-6xl">
                  {link.label}
                </span>
                <span className="hidden text-[10px] uppercase tracking-[0.25em] text-muted sm:block">Open</span>
              </a>
            ))}
          </nav>

          <p className="mt-10 font-heading text-xl text-charcoal/60">{wedding.ceremony.date} · Visakhapatnam</p>
        </div>
      </div>
    </header>
  );
}
