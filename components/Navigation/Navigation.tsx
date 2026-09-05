"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { wedding } from "@/data/wedding";

const links = [
  { label: "Story", href: "#story" },
  { label: "Celebration", href: "#celebration" },
  { label: "Venue", href: "#venue" },
  { label: "Gallery", href: "#gallery" },
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

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200/70 bg-stone-50/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <a
          href="#top"
          onClick={closeMenu}
          className="font-heading text-3xl tracking-wide text-stone-900"
          aria-label="NikSha home"
        >
          {wedding.couple.monogram}
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-stone-600 transition-colors hover:text-stone-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300/70 text-stone-800 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-stone-200/70 bg-stone-50/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3 sm:px-8" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-stone-200/70 py-4 text-sm uppercase tracking-[0.18em] text-stone-600 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
