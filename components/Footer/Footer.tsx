"use client";

import { motion } from "framer-motion";
import { ArrowUp, RotateCcw } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

function ClosingOrnament() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-36 items-center justify-center gap-3 text-champagne/70">
      <span className="h-px flex-1 bg-champagne/35" />
      <svg viewBox="0 0 32 24" className="h-6 w-8" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 2c0 6-5 6-5 10s5 4 5 10M16 2c0 6 5 6 5 10s-5 4-5 10" />
        <path d="M8 7c3 1 5 3 8 3s5-2 8-3M8 17c3-1 5-3 8-3s5 2 8 3" />
      </svg>
      <span className="h-px flex-1 bg-champagne/35" />
    </div>
  );
}

export default function Footer() {
  const reliveOpening = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    window.location.reload();
  };

  return (
    <footer id="footer" className="bg-forest text-ivory">
      <Section id="forever" className="relative overflow-hidden bg-transparent px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,165,115,0.13),transparent_68%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-champagne sm:text-xs">Chapter IV · Forever</p>
          <div className="mt-7"><ClosingOrnament /></div>

          <p className="mt-9 font-heading text-2xl italic text-ivory/65 sm:text-3xl">And so, our forever begins.</p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 flex h-32 w-32 items-center justify-center rounded-full border border-champagne/35 bg-[radial-gradient(circle_at_35%_30%,rgba(255,245,220,0.13),transparent_62%)] sm:h-40 sm:w-40"
          >
            <span className="font-heading text-4xl italic tracking-[-0.06em] text-champagne sm:text-5xl">{wedding.couple.monogram}</span>
          </motion.div>

          <h2 className="mt-9 font-heading text-6xl leading-none text-ivory sm:text-8xl lg:text-9xl">
            {wedding.couple.groom} <span className="text-champagne/70">&amp;</span> {wedding.couple.bride}
          </h2>

          <div className="mx-auto my-12 h-px w-20 bg-champagne/35" />

          <p className="mx-auto max-w-xl font-heading text-xl leading-relaxed text-ivory/75 sm:text-2xl">
            Thank you for being part of our journey and for making this celebration even more special with your presence and blessings.
          </p>

          <div className="mx-auto mt-12 grid max-w-md grid-cols-2 border-y border-ivory/15">
            <div className="px-4 py-5 sm:py-6">
              <p className="text-[8px] uppercase tracking-[0.3em] text-ivory/40">The date</p>
              <p className="mt-2 font-heading text-lg text-ivory/80 sm:text-xl">18 · 11 · 2026</p>
            </div>
            <div className="border-l border-ivory/15 px-4 py-5 sm:py-6">
              <p className="text-[8px] uppercase tracking-[0.3em] text-ivory/40">The place</p>
              <p className="mt-2 font-heading text-lg text-ivory/80 sm:text-xl">SB Square</p>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            <a href="#top" className="group inline-flex min-h-12 items-center gap-3 border-b border-ivory/30 pb-2 text-[10px] uppercase tracking-[0.26em] text-ivory transition-colors hover:border-champagne hover:text-champagne sm:text-xs">
              Back to the beginning
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.5} />
            </a>
            <button type="button" onClick={reliveOpening} className="group inline-flex min-h-12 items-center gap-3 border-b border-champagne/35 pb-2 text-[10px] uppercase tracking-[0.26em] text-champagne/85 transition-colors hover:border-champagne hover:text-champagne sm:text-xs">
              Relive the opening
              <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-[-90deg]" strokeWidth={1.35} />
            </button>
          </div>

          <p className="mt-20 text-[9px] uppercase tracking-[0.38em] text-ivory/30">With love, NikSha</p>
        </motion.div>
      </Section>
    </footer>
  );
}
