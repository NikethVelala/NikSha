"use client";

import { useEffect, useRef, useState } from "react";
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
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollYRef.current = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, overflow: body.style.overflow };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${scrolled ? "border-b border-stone-200/70 bg-stone-50/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
          <a
            href="#top"
            onClick={closeMenu}
            className={`rounded-full border px-5 py-2 font-heading text-[1.45rem] leading-none tracking-wide transition-all sm:px-6 sm:py-2.5 sm:text-[1.7rem] ${scrolled ? "border-stone-300 bg-white/80 text-stone-900" : "border-white/15 bg-black/10 text-white backdrop-blur-[2px]"}`}
            aria-label="NikSha home"
          >
            {wedding.couple.monogram}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`relative z-[90] inline-flex min-h-11 items-center gap-3 rounded-full border px-5 py-2 text-[9px] uppercase tracking-[0.28em] transition-all sm:px-6 sm:text-[10px] ${scrolled || open ? "border-stone-300 bg-white/80 text-stone-800" : "border-white/15 bg-black/10 text-white backdrop-blur-[2px]"}`}
            aria-label={open ? "Close invitation index" : "Open invitation index"}
            aria-expanded={open}
          >
            <span>Index</span>
            {open ? <X size={18} strokeWidth={1.25} /> : <Menu size={18} strokeWidth={1.25} />}
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-paper/98 backdrop-blur-xl transition-all duration-500 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`} aria-hidden={!open}>
        <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-start px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(6rem,calc(env(safe-area-inset-top)+5rem))] sm:justify-center sm:px-10 sm:py-28 lg:px-12">
          <div className="mb-7 flex items-center gap-3 text-rose sm:mb-10 sm:gap-4">
            <span className="text-[9px] uppercase tracking-[0.35em] sm:text-[10px] sm:tracking-[0.4em]">The NikSha invitation</span>
            <span className="h-px w-10 bg-champagne sm:w-12" />
          </div>
          <nav className="grid border-y border-line" aria-label="Invitation index">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="group grid min-h-16 grid-cols-[2.5rem_1fr] items-center gap-3 border-b border-line py-4 last:border-b-0 sm:grid-cols-[4rem_1fr_auto] sm:py-6">
                <span className="text-[9px] tracking-[0.22em] text-muted sm:text-[10px] sm:tracking-[0.25em]">{link.number}</span>
                <span className="font-heading text-[2.15rem] leading-none text-charcoal transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl lg:text-6xl">{link.label}</span>
                <span className="hidden text-[10px] uppercase tracking-[0.25em] text-muted sm:block">Open</span>
              </a>
            ))}
          </nav>
          <p className="mt-7 font-heading text-lg text-charcoal/60 sm:mt-10 sm:text-xl">{wedding.ceremony.date} · Visakhapatnam</p>
        </div>
      </div>
    </>
  );
}
