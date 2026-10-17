"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { wedding } from "@/data/wedding";

const links = [
  { number: "01", label: "Invitation", href: "#welcome", note: "The celebration" },
  { number: "02", label: "Our Story", href: "#story", note: "How it all began" },
  { number: "03", label: "Forever", href: "#forever", note: "With love, always" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#welcome");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let frame = 0;
    const restoreHistoryPosition = (event: PopStateEvent) => {
      cancelAnimationFrame(frame);
      const savedY = event.state?.nikshaIndexScrollY;
      if (typeof savedY !== "number") return;
      frame = requestAnimationFrame(() => {
        const state = { ...window.history.state };
        delete state.nikshaIndexScrollY;
        window.history.replaceState(state, "");
        window.scrollTo({ top: savedY, behavior: "instant" });
      });
    };
    window.addEventListener("popstate", restoreHistoryPosition);
    return () => { window.removeEventListener("popstate", restoreHistoryPosition); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href)).filter((section): section is Element => Boolean(section));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target.id) setActiveHref(`#${visible[0].target.id}`);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.08, 0.2, 0.45, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previousHistoryState = window.history.state;
    let leavingThroughHistory = false;
    // Fixed-body locking makes the browser see scrollY=0. Preserve this entry's
    // actual position if Back/Forward is used before the menu is dismissed.
    window.history.replaceState({ ...previousHistoryState, nikshaIndexScrollY: scrollY }, "");
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow, htmlOverflow: html.style.overflow };
    // Inert siblings at every ancestor level, including any future page wrappers.
    const background: Array<{ element: HTMLElement; inert: boolean }> = [];
    let branch: HTMLElement = dialog;
    while (branch.parentElement) {
      const parent = branch.parentElement;
      for (const element of Array.from(parent.children)) {
        if (element instanceof HTMLElement && element !== branch) {
          background.push({ element, inert: element.inert });
          element.inert = true;
        }
      }
      if (parent === body) break;
      branch = parent;
    }
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeMenu(); return; }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')).filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) closeRef.current?.focus({ preventScroll: true });
    };
    // Close before the browser restores a history entry's scroll position.
    const historyNavigation = () => {
      leavingThroughHistory = true;
      flushSync(closeMenu);
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("focusin", containFocus);
    window.addEventListener("popstate", historyNavigation);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("focusin", containFocus);
      window.removeEventListener("popstate", historyNavigation);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      html.style.overflow = previous.htmlOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      if (!leavingThroughHistory) window.history.replaceState(previousHistoryState, "");
      trigger?.focus({ preventScroll: true });
    };
  }, [open, closeMenu]);

  const selectSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Finish lock cleanup before scrolling and preserve Next's history state.
    flushSync(closeMenu);
    const section = document.getElementById(href.slice(1));
    // Before discovery, later sections are outside the scrollable document.
    // Bring guests to the invitation's entry action instead of bypassing it.
    if (section?.closest("[hidden]")) {
      event.preventDefault();
      const discovery = document.getElementById("discover-our-story");
      discovery?.focus({ preventScroll: true });
      discovery?.scrollIntoView({ behavior: "auto", block: "center" });
      return;
    }
    event.preventDefault();
    if (window.location.hash !== href) window.history.pushState(window.history.state, "", href);
    section?.setAttribute("tabindex", "-1");
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] pt-[env(safe-area-inset-top)] transition-all duration-500 ${scrolled ? "border-b border-stone-200/70 bg-stone-50/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:h-20 sm:px-8 lg:px-12">
          <a href="#top" onClick={(event) => selectSection(event, "#top")} className={`rounded-full border px-5 py-2 font-heading text-[1.45rem] leading-none tracking-wide transition-all sm:px-6 sm:py-2.5 sm:text-[1.7rem] ${scrolled ? "border-stone-300 bg-white/80 text-stone-900" : "border-white/15 bg-black/10 text-white backdrop-blur-[2px]"}`} aria-label="NikSha home">{wedding.couple.monogram}</a>
          <span className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.2em] transition-all duration-500 sm:text-[9px] sm:tracking-[0.25em] ${scrolled ? "translate-y-0 opacity-100 text-stone-500" : "-translate-y-1 opacity-0"}`}>18 · 11 · 2026</span>
          <button ref={triggerRef} type="button" aria-controls="invitation-index-dialog" aria-haspopup="dialog" onClick={() => setOpen(true)} className={`relative z-[90] inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.28em] transition-all sm:min-w-0 sm:px-6 sm:text-[10px] ${scrolled || open ? "border-stone-300 bg-white/80 text-stone-800" : "border-white/15 bg-black/10 text-white backdrop-blur-[2px]"}`} aria-label={open ? "Close invitation index" : "Open invitation index"} aria-expanded={open}><span className="hidden sm:inline">Index</span>{open ? <X size={18} strokeWidth={1.25} /> : <Menu size={18} strokeWidth={1.25} />}</button>
        </div>
      </header>

      <div ref={dialogRef} id="invitation-index-dialog" role="dialog" aria-label="Invitation index" aria-modal={open ? true : undefined} tabIndex={-1} inert={!open} className={`fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-paper/98 backdrop-blur-xl transition-all duration-500 motion-reduce:transition-none motion-reduce:transform-none ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"}`} aria-hidden={!open}>
        <div className="pointer-events-none absolute inset-x-0 top-0 pt-[env(safe-area-inset-top)]">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-end px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:h-20 sm:px-8 lg:px-12">
            <button ref={closeRef} type="button" onClick={closeMenu} aria-label="Close invitation index" className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-[9px] uppercase tracking-[0.28em] text-stone-800 sm:min-w-0 sm:px-6 sm:text-[10px]">
              <span className="hidden sm:inline">Index</span><X size={18} strokeWidth={1.25} />
            </button>
          </div>
        </div>
        <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-start px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(6rem,calc(env(safe-area-inset-top)+5rem))] sm:justify-center sm:px-10 sm:py-28 lg:px-12">
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-12"><div><div className="mb-3 flex items-center gap-3 text-rose sm:mb-4 sm:gap-4"><span className="text-[9px] uppercase tracking-[0.35em] sm:text-[10px] sm:tracking-[0.4em]">The NikSha invitation</span><span className="h-px w-10 bg-champagne sm:w-12" /></div><p className="font-heading text-3xl leading-none text-charcoal sm:text-5xl">A little journey,</p><p className="mt-1 font-heading text-3xl italic leading-none text-charcoal/55 sm:text-5xl">from here to forever.</p></div><span className="hidden pb-1 text-[9px] uppercase tracking-[0.25em] text-muted sm:block">{wedding.ceremony.date}</span></div>
          <nav className="grid border-y border-line" aria-label="Invitation index">
            {links.map((link) => { const active = activeHref === link.href; return <a key={link.href} href={link.href} onClick={(event) => selectSection(event, link.href)} aria-current={active ? "true" : undefined} className={`group relative grid min-h-[5.6rem] grid-cols-[2.1rem_1fr_auto] items-center gap-3 border-b border-line py-5 last:border-b-0 sm:min-h-[7rem] sm:grid-cols-[4rem_1fr_auto] sm:gap-5 sm:py-6 ${active ? "bg-champagne/[0.045]" : ""}`}><span className={`absolute inset-y-0 left-0 w-px origin-center transition-transform duration-500 ${active ? "scale-y-100 bg-champagne" : "scale-y-0 bg-transparent"}`} /><span className={`self-start pt-1 text-[9px] tracking-[0.22em] transition-colors duration-300 sm:text-[10px] sm:tracking-[0.25em] ${active ? "text-gold" : "text-muted"}`}>{link.number}</span><span className="min-w-0"><span className={`block font-heading text-[2.15rem] leading-none transition-all duration-300 sm:text-5xl lg:text-6xl ${active ? "translate-x-1 text-charcoal" : "text-charcoal group-hover:translate-x-1"}`}>{link.label}</span><span className={`mt-2 block text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 sm:text-[10px] sm:tracking-[0.25em] ${active ? "text-gold/80" : "text-muted"}`}>{link.note}</span></span><span className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${active ? "border-champagne text-gold" : "border-line text-muted group-hover:border-champagne group-hover:text-gold"}`}><ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.25} /></span></a>; })}
          </nav>
          <div className="mt-8 flex items-center justify-between gap-5 sm:mt-10"><p className="font-heading text-lg text-charcoal/60 sm:text-xl">The NikSha wedding</p><span className="text-[9px] uppercase tracking-[0.25em] text-muted sm:hidden">{wedding.ceremony.date}</span></div>
        </div>
      </div>
    </>
  );
}
