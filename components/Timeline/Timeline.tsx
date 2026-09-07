"use client";

import { motion } from "framer-motion";
import { Clock3, UtensilsCrossed } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Timeline() {
  const events = wedding.timeline.filter((event) => event.title !== "Wedding Muhurtham");

  return (
    <Section id="timeline" className="relative overflow-hidden bg-paper py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter III</p>
            <div className="mt-5 h-px w-16 bg-champagne" />
            <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">The Day</h2>
            <p className="mt-6 max-w-md font-heading text-2xl leading-relaxed text-charcoal/80 sm:text-4xl">
              An evening of celebration before we begin forever.
            </p>
          </motion.div>

          <div className="relative mt-1 sm:mt-3">
            <div className="relative">
              {events.map((event, index) => (
                <motion.article key={`${event.title}-${event.time}`} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: index * 0.12 }} className="relative grid grid-cols-[2.75rem_1fr] gap-5 sm:grid-cols-[3.25rem_1fr] sm:gap-7">
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-paper sm:h-12 sm:w-12">
                    <UtensilsCrossed className="h-4 w-4 text-rose/80 sm:h-5 sm:w-5" strokeWidth={1.5} />
                  </div>
                  <div className="border-t border-line pt-1 sm:pt-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Evening gathering</p>
                    <h3 className="mt-2 font-heading text-3xl leading-none text-charcoal sm:text-5xl">{event.title}</h3>
                    <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-rose sm:mt-4 sm:text-sm">
                      <Clock3 className="h-4 w-4" strokeWidth={1.5} />
                      {event.time}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
