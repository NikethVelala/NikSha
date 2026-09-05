"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";
import Countdown from "@/components/Countdown/Countdown";

export default function Celebration() {
  const ceremony = wedding.ceremony;
  const venue = ceremony.venue;

  return (
    <Section id="celebration" className="relative overflow-hidden bg-ivory pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter III</p>
            <div className="mt-5 h-px w-16 bg-champagne" />
            <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
              The Day We Celebrate
            </h2>
            <p className="mt-7 max-w-md font-heading text-2xl leading-relaxed text-charcoal/75 sm:text-3xl">
              A day filled with love, laughter, blessings, and the people who mean the most to us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border-y border-line py-8 sm:py-10"
          >
            <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <Detail icon={CalendarDays} label="Date" value={ceremony.date} />
              <Detail icon={Clock3} label="Muhurtham" value={ceremony.time} />
              <Detail icon={MapPin} label="Place" value={venue.name} />
            </div>
          </motion.div>
        </div>

        <Countdown />
      </div>
    </Section>
  );
}

type DetailProps = {
  icon: typeof CalendarDays;
  label: string;
  value: string;
};

function Detail({ icon: Icon, label, value }: DetailProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-5 sm:block sm:px-6 sm:py-2 sm:text-center">
      <Icon className="h-5 w-5 shrink-0 text-rose sm:mx-auto" strokeWidth={1.35} />
      <div className="sm:mt-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">{label}</p>
        <p className="mt-2 font-heading text-2xl leading-tight text-charcoal sm:text-3xl">{value}</p>
      </div>
    </div>
  );
}
