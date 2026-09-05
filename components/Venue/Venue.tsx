"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Venue() {
  const venue = wedding.ceremony.venue;

  return (
    <Section id="venue" className="relative overflow-hidden bg-paper pt-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter V</p>
          <div className="mx-auto mt-5 h-px w-16 bg-champagne" />
          <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">The Place</h2>
          <p className="mx-auto mt-7 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/75 sm:text-3xl">
            The setting where we gather, celebrate, and make this evening a memory to keep.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-12 max-w-3xl border-y border-line py-9 sm:py-10"
        >
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-12">
            <div>
              <div className="flex items-center gap-3 text-rose">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-[0.32em]">Visakhapatnam</span>
              </div>
              <h3 className="mt-5 font-heading text-5xl text-charcoal sm:text-6xl">{venue.name}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg">{venue.address}</p>
            </div>
            <a
              href={venue.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 border-b border-charcoal/30 pb-2 text-sm uppercase tracking-[0.22em] text-charcoal transition-colors hover:border-rose hover:text-rose"
            >
              {venue.directionsLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>

        <p className="mx-auto mt-9 max-w-xl text-center text-sm leading-7 text-muted sm:text-base">{venue.note}</p>
      </div>
    </Section>
  );
}
