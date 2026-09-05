"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
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
  return (
    <footer id="footer" className="bg-forest text-ivory">
      <Section id="forever" className="bg-transparent px-6 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-champagne">Chapter VII</p>
          <ClosingOrnament />

          <p className="mt-8 font-heading text-2xl text-ivory/70 sm:text-3xl">And so, our forever begins.</p>

          <h2 className="mt-8 font-heading text-7xl leading-none text-ivory sm:text-8xl lg:text-9xl">
            {wedding.couple.monogram}
          </h2>

          <p className="mt-7 text-sm uppercase tracking-[0.28em] text-ivory/60 sm:text-base">
            {wedding.couple.groom} &amp; {wedding.couple.bride}
          </p>

          <div className="mx-auto my-12 h-px w-24 bg-ivory/20" />

          <p className="mx-auto max-w-xl font-heading text-xl leading-relaxed text-ivory/75 sm:text-2xl">
            Thank you for being part of our journey and for making this celebration even more special with your presence and blessings.
          </p>

          <div className="mt-12 flex flex-col items-center gap-3 text-sm uppercase tracking-[0.22em] text-ivory/55">
            <span>{wedding.ceremony.date}</span>
            <span>{wedding.ceremony.venue.name} · Visakhapatnam</span>
          </div>

          <a
            href="#top"
            className="group mx-auto mt-14 inline-flex items-center gap-3 border-b border-ivory/30 pb-2 text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:border-champagne hover:text-champagne"
          >
            Back to the beginning
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.5} />
          </a>

          <p className="mt-20 text-[9px] uppercase tracking-[0.38em] text-ivory/30">With love, NikSha</p>
        </motion.div>
      </Section>
    </footer>
  );
}
