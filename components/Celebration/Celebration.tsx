"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";
import Countdown from "@/components/Countdown/Countdown";

export default function Celebration() {
  const ceremony = wedding.ceremony;
  const venue = ceremony.venue;

  return (
    <Section id="celebration" className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-rose">Chapter III</p>
          <div className="mx-auto mt-5 h-px w-16 bg-champagne" />
          <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
            The Day We Celebrate
          </h2>
          <p className="mx-auto mt-7 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/70 sm:text-3xl">
            A day filled with love, laughter, blessings, and the people who mean the most to us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-16 border-y border-line py-10 sm:py-12"
        >
          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-6 text-center sm:px-8 sm:py-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">Date</p>
              <p className="mt-3 font-heading text-3xl text-charcoal sm:text-4xl">{ceremony.date}</p>
            </div>
            <div className="px-4 py-6 text-center sm:px-8 sm:py-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">Time</p>
              <p className="mt-3 font-heading text-3xl text-charcoal sm:text-4xl">{ceremony.time}</p>
            </div>
            <div className="px-4 py-6 text-center sm:px-8 sm:py-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted">Place</p>
              <p className="mt-3 font-heading text-3xl text-charcoal sm:text-4xl">{venue.name}</p>
            </div>
          </div>
        </motion.div>

        <Countdown />
      </div>
    </Section>
  );
}
