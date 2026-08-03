"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Timeline() {
  return (
    <Section id="timeline">
      <div className="mx-auto max-w-4xl">

        <p className="text-center text-xs uppercase tracking-[0.35em] text-stone-500">
          Wedding Schedule
        </p>

        <h2 className="mt-4 text-center font-heading text-5xl text-stone-900">
          The Celebration
        </h2>

        <div className="mt-20 space-y-12">

          {wedding.timeline.map((event, index) => (

            <motion.div
  key={index}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.15 }}
  className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
>

              <div className="text-4xl">
                {event.icon}
              </div>

              <h3 className="mt-6 font-heading text-4xl text-stone-900">
                {event.title}
              </h3>

              <p className="mt-6 text-lg tracking-wide text-stone-700">
                {event.date}
              </p>

              <p className="mt-1 text-stone-500">
                {event.time}
              </p>

              <p className="mt-8 font-semibold text-stone-800">
                {event.venue}
              </p>

              <p className="text-stone-500">
                {event.address}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </Section>
  );
}