"use client";

import { motion } from "framer-motion";
import { Clock3, UtensilsCrossed } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Timeline() {
  return (
    <Section id="timeline" className="relative overflow-hidden pb-20 sm:pb-24 lg:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter IV</p>
            <div className="mt-5 h-px w-16 bg-champagne" />
            <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">The Day</h2>
            <p className="mt-7 max-w-md font-heading text-3xl leading-relaxed text-charcoal/80 sm:text-4xl">
              An evening of celebration, leading to the moment we begin forever.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-8 left-[1.35rem] top-8 w-px bg-champagne/60 sm:left-[1.6rem]" />
            <div className="space-y-12">
              {wedding.timeline.map((event, index) => {
                const isDinner = event.title === "Dinner";
                const Icon = isDinner ? UtensilsCrossed : Clock3;

                return (
                  <motion.article
                    key={`${event.title}-${event.date}`}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: index * 0.12 }}
                    className="relative grid grid-cols-[2.75rem_1fr] gap-6 sm:grid-cols-[3.25rem_1fr] sm:gap-7"
                  >
                    <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-ivory sm:h-13 sm:w-13">
                      <Icon className="h-4 w-4 text-rose sm:h-5 sm:w-5" strokeWidth={1.5} />
                    </div>
                    <div className="border-t border-line pt-1 sm:pt-2">
                      <p className="text-[11px] uppercase tracking-[0.32em] text-muted">{event.date}</p>
                      <h3 className="mt-3 font-heading text-4xl leading-none text-charcoal sm:text-5xl">{event.title}</h3>
                      <p className="mt-4 flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-rose">
                        <Clock3 className="h-4 w-4" strokeWidth={1.5} />
                        {event.time}
                      </p>
                      <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
                        {event.venue}
                        <br />
                        {event.address}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
