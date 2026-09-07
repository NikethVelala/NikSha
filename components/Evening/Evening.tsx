"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Evening() {
  return (
    <Section id="evening" className="relative overflow-hidden bg-[#f5eee2] py-20 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80vw] -translate-x-1/2 bg-[radial-gradient(circle,rgba(183,126,59,0.1),transparent_68%)]" />
      <div className="relative mx-auto max-w-4xl">
        <motion.header initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }} className="text-center">
          <p className="text-[9px] uppercase tracking-[0.48em] text-rose sm:text-[10px]">The Evening</p>
          <h2 className="mt-5 font-heading text-5xl leading-none text-charcoal sm:text-7xl">One evening, two beautiful moments.</h2>
          <p className="mt-5 font-heading text-xl italic text-charcoal/60 sm:text-2xl">18 November 2026 · SB Square</p>
        </motion.header>

        <div className="relative mx-auto mt-12 max-w-2xl sm:mt-16">
          <div aria-hidden="true" className="absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-champagne/35" />
          {wedding.timeline.map((event, index) => (
            <motion.article key={event.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: index * 0.08 }} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-7 sm:gap-6 sm:py-9">
              <div className={`${index % 2 === 0 ? "text-right" : "text-left col-start-3"} ${index % 2 === 0 ? "col-start-1" : ""}`}>
                <p className="text-[8px] uppercase tracking-[0.28em] text-rose sm:text-[9px]">{event.title}</p>
                <p className="mt-1.5 font-heading text-3xl leading-none text-charcoal sm:text-4xl">{event.time}</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-muted">{event.venue}</p>
              </div>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/60 bg-[#f5eee2] font-heading text-lg text-gold sm:h-14 sm:w-14">{event.icon}</div>
              <div className={`${index % 2 === 0 ? "col-start-3 text-left" : "col-start-1 row-start-1 text-right"}`}>
                <p className="text-[8px] uppercase tracking-[0.22em] text-muted sm:text-[9px]">{index === 0 ? "Dinner begins" : "Auspicious time"}</p>
                <p className="mt-1.5 font-heading text-lg text-charcoal/75 sm:text-xl">{event.date}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto mt-10 max-w-md border-y border-champagne/30 py-7 text-center sm:mt-12 sm:py-8">
          <p className="text-[8px] uppercase tracking-[0.32em] text-muted">We&apos;ll be waiting for you at</p>
          <p className="mt-2 font-heading text-3xl text-charcoal sm:text-4xl">SB Square</p>
          <p className="mt-1 text-[11px] leading-5 text-muted">Chinna Bazaar · Rushikonda · Visakhapatnam</p>
          <a href={wedding.ceremony.venue.maps} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#8c6130] bg-[#8c6130] px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]">Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </motion.div>
      </div>
    </Section>
  );
}
