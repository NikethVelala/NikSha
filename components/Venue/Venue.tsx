"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Venue() {
  const venue = wedding.ceremony.venue;

  return (
    <Section
      id="venue"
      className="relative overflow-hidden bg-paper pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter V</p>
            <div className="mt-5 h-px w-16 bg-champagne" />
            <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
              The Place
            </h2>
            <p className="mt-7 max-w-md font-heading text-2xl leading-relaxed text-charcoal/75 sm:text-3xl">
              A place to gather, celebrate, and remember this evening together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border-y border-line py-9 sm:py-11"
          >
            <div className="flex items-center gap-3 text-rose">
              <MapPin className="h-5 w-5" strokeWidth={1.35} />
              <span className="text-[11px] uppercase tracking-[0.32em]">Visakhapatnam, Andhra Pradesh</span>
            </div>

            <h3 className="mt-5 font-heading text-5xl leading-none text-charcoal sm:text-6xl">
              {venue.name}
            </h3>

            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {venue.address}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={venue.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-b border-charcoal/30 pb-2 text-sm uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-rose hover:text-rose"
              >
                {venue.directionsLabel}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
              <span className="text-sm text-muted">SB Square · Rushikonda</span>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-center font-heading text-xl text-charcoal/65 sm:text-2xl"
        >
          {venue.note}
        </motion.p>
      </div>
    </Section>
  );
}
