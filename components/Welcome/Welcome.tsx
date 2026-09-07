"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import Countdown from "@/components/Countdown/Countdown";
import Invitation3D from "@/components/Welcome/Invitation3D";
import { wedding } from "@/data/wedding";

function CardOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" aria-hidden="true" className={`h-8 w-28 text-[#a8783f] ${className}`} fill="none"><path d="M2 16h30M88 16h30" stroke="currentColor" strokeWidth=".8" /><path d="M60 4c-5 6-5 18 0 24M60 4c5 6 5 18 0 24M48 16c5-5 19-5 24 0M48 16c5 5 19 5 24 0" stroke="currentColor" strokeWidth=".8" /><path d="M54 10c-2 2-2 10 0 12M66 10c2 2 2 10 0 12" stroke="currentColor" strokeWidth=".6" /><circle cx="60" cy="16" r="2.5" stroke="currentColor" strokeWidth=".8" /></svg>
  );
}
function CornerFlourish({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const transforms = { tl: "left-0 top-0", tr: "right-0 top-0 scale-x-[-1]", bl: "left-0 bottom-0 scale-y-[-1]", br: "right-0 bottom-0 scale-[-1]" };
  return <svg viewBox="0 0 90 90" aria-hidden="true" className={`absolute h-20 w-20 text-[#a8783f]/80 sm:h-24 sm:w-24 ${transforms[position]}`} fill="none"><path d="M2 2h42c24 0 44 20 44 44v42" stroke="currentColor" strokeWidth="1" /><path d="M8 8h35c21 0 39 18 39 39v35" stroke="currentColor" strokeWidth=".55" /><path d="M18 8c0 14 7 22 20 25M8 18c14 0 22 7 25 20" stroke="currentColor" strokeWidth=".7" /><path d="M31 10c7 5 10 11 10 19M10 31c5 7 11 10 19 10" stroke="currentColor" strokeWidth=".55" /><circle cx="43" cy="43" r="2" fill="currentColor" /></svg>;
}

export default function Welcome() {
  const gateActive = useRef(false);
  const gateReleased = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previous = { htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow, htmlTouch: html.style.touchAction, bodyTouch: body.style.touchAction, htmlOverscroll: html.style.overscrollBehavior, bodyOverscroll: body.style.overscrollBehavior };
    html.style.overflow = "auto";
    body.style.overflow = "auto";
    html.style.touchAction = "auto";
    body.style.touchAction = "auto";
    html.style.overscrollBehavior = "auto";
    body.style.overscrollBehavior = "auto";

    const clampStoryBoundary = () => {
      if (gateReleased.current) return;
      const section = document.getElementById("welcome");
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionBottom = sectionTop + section.offsetHeight;
      const maxScroll = Math.max(sectionTop, sectionBottom - window.innerHeight);
      if (window.scrollY > maxScroll) {
        gateActive.current = true;
        window.scrollTo({ top: maxScroll, behavior: "auto" });
      }
    };

    window.addEventListener("scroll", clampStoryBoundary, { passive: true });
    window.addEventListener("resize", clampStoryBoundary);
    return () => {
      window.removeEventListener("scroll", clampStoryBoundary);
      window.removeEventListener("resize", clampStoryBoundary);
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      html.style.touchAction = previous.htmlTouch;
      body.style.touchAction = previous.bodyTouch;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overscrollBehavior = previous.bodyOverscroll;
    };
  }, []);

  const openStory = () => {
    gateReleased.current = true;
    gateActive.current = false;
    requestAnimationFrame(() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <Section id="welcome" className="relative overflow-hidden bg-[#f5eee2] py-7 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(183,126,59,0.13),transparent_34%)]" />
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto max-w-xl px-3 sm:max-w-2xl sm:px-6">
        <Invitation3D>
          <div className="relative overflow-hidden border-[1.5px] border-[#a8783f]/70 bg-[#fcfaf4] px-6 py-8 shadow-[0_22px_65px_rgba(73,55,35,0.14)] sm:px-12 sm:py-11">
            <div aria-hidden="true" className="pointer-events-none absolute inset-[4px] border border-[#a8783f]/45" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-[9px] border border-[#a8783f]/18" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.7),transparent_34%),linear-gradient(115deg,rgba(165,120,63,0.035),transparent_24%,rgba(165,120,63,0.025)_76%,transparent)]" />
            <CornerFlourish position="tl" /><CornerFlourish position="tr" /><CornerFlourish position="bl" /><CornerFlourish position="br" />
            <div className="relative text-center">
              <motion.div initial={{ opacity: 0, scale: 0.86 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.12 }}><div aria-hidden="true" className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#a8783f]/65 bg-[radial-gradient(circle_at_35%_30%,#fffaf0,#ead8b9_62%,#c49a60)] shadow-[0_5px_18px_rgba(105,70,32,0.16)] sm:h-[4.5rem] sm:w-[4.5rem]"><div className="absolute inset-1.5 rounded-full border border-[#8c6130]/35" /><span className="font-heading text-xl italic tracking-[-0.05em] text-[#70491f] sm:text-2xl">{wedding.couple.monogram}</span></div></motion.div>
              <p className="mt-5 font-heading text-xl tracking-wide text-[#8c6130] sm:mt-6 sm:text-2xl">శ్రీ</p><p className="mt-1 font-heading text-xs tracking-[0.18em] text-[#8c6130] sm:text-sm">శుభమస్తు</p><p className="mx-auto mt-4 max-w-sm text-[10px] uppercase leading-5 tracking-[0.24em] text-[#756957] sm:text-[10px] sm:tracking-[0.4em]">With the blessings of our parents &amp; elders</p>
              <div className="mt-5 flex justify-center sm:mt-6"><CardOrnament /></div><p className="mt-5 text-[9px] uppercase tracking-[0.34em] text-[#93673b]">The Wedding Invitation</p>
              <div className="mt-4 flex items-center justify-center gap-2.5 sm:gap-5"><h1 className="font-heading text-[3rem] leading-none text-[#292622] sm:text-6xl">{wedding.couple.groom}</h1><span className="font-heading text-2xl text-[#a8783f] sm:text-3xl">&amp;</span><h1 className="font-heading text-[3rem] leading-none text-[#292622] sm:text-6xl">{wedding.couple.bride}</h1></div>
              <p className="mx-auto mt-4 max-w-sm font-heading text-base italic leading-relaxed text-[#5e554c] sm:mt-5 sm:text-xl">We cordially invite you to grace the occasion with your presence and blessings.</p>
              <div className="my-6 flex items-center justify-center gap-3 sm:my-7"><span className="h-px w-10 bg-[#a8783f]/40 sm:w-16" /><span className="text-[8px] text-[#a8783f]">✦</span><span className="h-px w-10 bg-[#a8783f]/40 sm:w-16" /></div>
              <div className="rounded-[2px] border-y border-[#a8783f]/25 py-5 sm:py-6"><p className="text-[10px] uppercase tracking-[0.3em] text-[#756957] sm:text-[9px]">Wednesday</p><p className="mt-1.5 font-heading text-[2.15rem] leading-none text-[#292622] sm:text-5xl">18 November 2026</p><p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-[#a8783f]">A day we will remember forever</p></div>
              <div className="mx-auto mt-6 grid max-w-md grid-cols-2 border-b border-[#a8783f]/35"><div className="border-r border-[#a8783f]/35 px-2 py-4 sm:px-5 sm:py-5"><p className="text-[10px] uppercase tracking-[0.2em] text-[#756957] sm:text-[9px]">Dinner</p><p className="mt-1.5 font-heading text-2xl text-[#292622] sm:text-3xl">8:00 PM</p><p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#93673b] sm:text-[8px]">onwards</p></div><div className="px-2 py-4 sm:px-5 sm:py-5"><p className="text-[10px] uppercase tracking-[0.2em] text-[#756957] sm:text-[9px]">Muhurtham</p><p className="mt-1.5 font-heading text-2xl text-[#292622] sm:text-3xl">10:05 PM</p><p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#93673b] sm:text-[8px]">auspicious time</p></div></div>
              <div className="mt-6"><p className="text-[10px] uppercase tracking-[0.26em] text-[#756957] sm:text-[9px]">Venue</p><p className="mt-1.5 font-heading text-3xl text-[#292622] sm:text-4xl">SB Square</p><p className="mx-auto mt-1.5 max-w-sm text-[12px] leading-5 text-[#6f665d] sm:text-sm sm:leading-6">Chinna Bazaar · Rushikonda · Visakhapatnam, Andhra Pradesh</p><a href={wedding.ceremony.venue.maps} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 border border-[#8c6130] bg-[#8c6130] px-5 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#714b24] hover:shadow-[0_8px_20px_rgba(113,75,36,0.2)] sm:mt-5 sm:px-6 sm:text-[9px]">Open in Google Maps <span aria-hidden="true">→</span></a></div>
              <div className="mt-6 flex justify-center sm:mt-7"><CardOrnament /></div><p className="mt-2 text-[8px] uppercase tracking-[0.28em] text-[#a8783f]/80">With love, Niketh &amp; Sirisha</p>
            </div>
          </div>
        </Invitation3D>
        <Countdown compact />
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.8, delay: 0.15 }} className="px-3 pb-3 pt-4 text-center sm:pb-8 sm:pt-6"><p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#756957] sm:text-[9px]">There&apos;s more to our story</p><p className="mt-1 font-heading text-lg italic text-[#5e554c] sm:text-2xl">If you&apos;d like to stay a little longer…</p><a href="#story" onClick={(event) => { event.preventDefault(); openStory(); }} className="group mx-auto mt-4 flex min-h-12 w-full max-w-sm items-center justify-center gap-3 rounded-full border-2 border-[#b58a52] bg-[#174f3b] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#fbf5e8] shadow-[0_10px_28px_rgba(23,79,59,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#123f30] active:translate-y-0 sm:mt-6 sm:min-h-16 sm:max-w-md sm:text-xs sm:tracking-[0.28em]">Discover Our Story <span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:translate-y-1 sm:text-lg">↓</span></a></motion.div>
      </motion.div>
    </Section>
  );
}
