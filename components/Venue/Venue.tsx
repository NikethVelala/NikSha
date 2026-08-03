"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Venue() {
  const venue = wedding.ceremony.venue;

  return (
    <Section id="venue">
      <div className="mx-auto max-w-4xl">

        <p className="text-center text-xs uppercase tracking-[0.35em] text-stone-500">
          Wedding Venue
        </p>

        <h2 className="mt-4 text-center font-heading text-5xl text-stone-900">
          Join Us
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-stone-600">
          {venue.note}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-[2rem] border border-stone-200 bg-white p-10 shadow-lg"
        >

          <div className="flex justify-center">
            <div className="rounded-full bg-stone-100 p-5">
              <MapPin className="h-8 w-8 text-stone-700" />
            </div>
          </div>

          <h3 className="mt-8 text-center font-heading text-4xl text-stone-900">
            {venue.name}
          </h3>

          <p className="mt-6 text-center leading-8 text-stone-600">
            {venue.address}
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href={venue.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-white transition hover:bg-stone-700"
            >
              <Navigation className="h-5 w-5" />
              {venue.directionsLabel}
            </a>
          </div>

        </motion.div>

      </div>
    </Section>
  );
}