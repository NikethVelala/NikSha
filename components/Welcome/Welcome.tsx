"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

const details = [
  { label: "Date", value: wedding.ceremony.date, icon: CalendarDays },
  { label: "Muhurtham", value: wedding.ceremony.time, icon: Clock3 },
  { label: "Venue", value: wedding.ceremony.venue.name, icon: MapPin },
];

function Ornament() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-32 items-center justify-center gap-3 text-champagne">
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
    <Section id="welcome" className="relative overflow-hidden bg-paper py-20 sm:py-28 lg:py-36">
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
          <p className="mt-7 text-[10px] uppercase tracking-[0.42em] text-muted">With our families</p>

          <h2 className="mt-6 font-heading text-5xl leading-[0.95] text-charcoal sm:text-7xl lg:text-8xl">
            The Invitation
          </h2>

          <div className="mt-8 sm:mt-10">
            <Ornament />
          </div>

          <p className="mx-auto mt-8 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/80 sm:text-4xl">
            We invite you to celebrate the beginning of our forever.
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-9">
            Your presence, blessings, and laughter will make this celebration complete.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-12 max-w-4xl border-y border-line py-6 sm:mt-16 sm:py-10"
        >
          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {details.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 px-4 py-4 sm:block sm:px-8 sm:py-2 sm:text-center">
                <Icon className="h-5 w-5 shrink-0 text-rose sm:mx-auto" strokeWidth={1.25} />
                <div className="sm:mt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted">{label}</p>
                  <p className={`mt-2 font-heading text-xl text-charcoal sm:text-3xl ${label === "Date" ? "text-2xl sm:text-4xl" : ""}`}>
                    {value}
                  </p>
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
          className="mt-10 text-center sm:mt-14"
        >
          <p className="text-[10px] uppercase tracking-[0.38em] text-rose">On the evening of</p>
          <p className="mt-3 font-heading text-3xl text-charcoal sm:text-5xl">18 November 2026</p>
          <p className="mt-2 font-heading text-xl text-charcoal/65 sm:text-2xl">Niketh <span className="text-rose">&amp;</span> Sirisha</p>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted">Together Forever</p>
        </motion.div>
      </div>
    </Section>
  );
}
