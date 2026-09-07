"use client";

import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Section from "@/components/common/Section";

function Ornament() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-36 items-center justify-center gap-3 text-champagne">
      <span className="h-px flex-1 bg-champagne/60" />
      <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M14 3v22M3 14h22M6.5 6.5l15 15M21.5 6.5l-15 15" />
        <circle cx="14" cy="14" r="3.5" />
      </svg>
      <span className="h-px flex-1 bg-champagne/60" />
    </div>
  );
}

export default function Welcome() {
  return (
    <Section id="welcome" className="relative overflow-hidden bg-paper py-24 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-12 h-40 w-40 -translate-x-1/2 rounded-full bg-champagne/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.46em] text-rose sm:text-xs">Chapter I</p>
          <div className="mx-auto mt-5 h-px w-14 bg-champagne sm:mt-6" />
          <p className="mt-8 text-[10px] uppercase tracking-[0.38em] text-muted sm:text-xs">With the blessings of our families</p>

          <h2 className="mt-6 font-heading text-6xl leading-[0.86] text-charcoal sm:text-8xl lg:text-9xl">
            The Invitation
          </h2>

          <div className="mt-9 sm:mt-11"><Ornament /></div>

          <p className="mx-auto mt-9 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/80 sm:mt-11 sm:text-4xl">
            We invite you to celebrate the beginning of our forever.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8">
            Your presence, blessings, and laughter will make this celebration complete.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-2xl text-center sm:mt-20"
        >
          <p className="text-[10px] uppercase tracking-[0.42em] text-rose">Together in love</p>
          <div className="mt-5 flex items-center justify-center gap-3 sm:gap-5">
            <h3 className="font-heading text-5xl leading-none text-charcoal sm:text-7xl">{wedding.couple.groom}</h3>
            <span className="font-heading text-3xl text-champagne sm:text-5xl">&amp;</span>
            <h3 className="font-heading text-5xl leading-none text-charcoal sm:text-7xl">{wedding.couple.bride}</h3>
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-[0.36em] text-muted sm:text-xs">Together Forever</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-2xl border-y border-line sm:mt-18"
        >
          <div className="py-8 text-center sm:py-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted">The wedding day</p>
            <p className="mt-3 font-heading text-4xl text-charcoal sm:text-6xl">18 November 2026</p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-rose sm:text-sm">Wednesday</p>
          </div>

          <div className="border-t border-line py-8 text-center sm:py-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted">Wedding Muhurtham</p>
            <p className="mt-3 font-heading text-4xl text-charcoal sm:text-6xl">10:05 PM</p>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-rose sm:text-sm">The auspicious moment</p>
          </div>

          <div className="border-t border-line py-8 text-center sm:py-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted">At</p>
            <p className="mt-3 font-heading text-4xl text-charcoal sm:text-6xl">SB Square</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
              Chinna Bazaar · Rushikonda · Visakhapatnam, Andhra Pradesh
            </p>
            <a
              href={wedding.ceremony.venue.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-champagne/70 pb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-charcoal transition-colors hover:text-rose"
            >
              {wedding.ceremony.venue.directionsLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-14 text-center sm:mt-18"
        >
          <Ornament />
          <p className="mx-auto mt-8 max-w-xl font-heading text-xl leading-relaxed text-charcoal/65 sm:text-3xl">
            Come be part of the moments we will remember forever.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
