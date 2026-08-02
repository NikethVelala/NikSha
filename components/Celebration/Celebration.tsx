"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";
import Countdown from "@/components/Countdown/Countdown";

export default function Celebration() {
  return (
    <Section id="celebration">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl py-24 text-center"
      >
        <p className="uppercase tracking-[0.35em] text-sm text-stone-500">
          Celebrate With Us
        </p>

        <h2 className="mt-6 font-heading text-5xl text-stone-900">
          We can't wait to celebrate together
        </h2>

        <div className="mt-16 space-y-8">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-stone-500">
              Date
            </p>

            <p className="mt-3 text-3xl font-heading">
              {wedding.ceremony.date}
            </p>
          </div>

          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-stone-500">
              Venue
            </p>

            <p className="mt-3 text-2xl font-heading">
              {wedding.ceremony.venue.name}
            </p>

            <p className="mt-2 text-stone-600">
              {wedding.ceremony.venue.address}
            </p>
          </div>

          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-stone-500">
              Time
            </p>

            <p className="mt-3 text-2xl">
              {wedding.ceremony.time}
            </p>
          </div>

<Countdown />
          <a
            href={wedding.ceremony.venue.maps}
            target="_blank"
            rel="noreferrer"
            className="inline-block pt-6 text-sm uppercase tracking-[0.3em] text-stone-800 hover:underline"
          >
            View on Maps →
          </a>
        </div>
      </motion.div>
    </Section>
  );
}