"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

const details = [
  {
    label: "Date",
    value: wedding.ceremony.date,
    icon: CalendarDays,
  },
  {
    label: "Muhurtham",
    value: wedding.ceremony.time,
    icon: Clock3,
  },
  {
    label: "Venue",
    value: wedding.ceremony.venue.name,
    icon: MapPin,
  },
];

export default function Welcome() {
  return (
    <Section id="welcome" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-rose">Chapter I</p>
          <div className="mx-auto mt-5 h-px w-16 bg-champagne" />

          <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
            The Invitation
          </h2>

          <p className="mx-auto mt-7 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/75 sm:text-3xl">
            With immense joy and grateful hearts, we invite you to celebrate the beginning of our forever.
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-9">
            Your presence, blessings, and laughter will make our celebration complete.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-14 max-w-4xl border-y border-line py-8 sm:mt-16 sm:py-10"
        >
          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {details.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 px-5 py-5 sm:block sm:px-8 sm:py-2 sm:text-center">
                <Icon className="h-5 w-5 shrink-0 text-rose sm:mx-auto" strokeWidth={1.35} />
                <div className="sm:mt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted">{label}</p>
                  <p className="mt-2 font-heading text-2xl text-charcoal sm:text-3xl">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center sm:mt-14"
        >
          <p className="font-heading text-3xl text-charcoal sm:text-4xl">
            Niketh <span className="text-rose">&amp;</span> Sirisha
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted">Together Forever</p>
        </motion.div>
      </div>
    </Section>
  );
}
