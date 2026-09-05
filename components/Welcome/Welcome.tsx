"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";

export default function Welcome() {
  return (
    <Section id="welcome">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl py-28 text-center md:py-36"
      >
        <p className="text-xs uppercase tracking-[0.42em] text-stone-500 sm:text-sm">
          A Personal Invitation
        </p>

        <h2 className="mt-5 font-heading text-5xl leading-none text-stone-900 md:text-6xl">
          Welcome
        </h2>

        <div className="mx-auto mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-stone-300" />
          <span className="font-heading text-xl text-stone-400">♥</span>
          <span className="h-px w-10 bg-stone-300" />
        </div>

        <p className="mx-auto mt-9 max-w-2xl font-heading text-2xl leading-relaxed text-stone-700 sm:text-3xl">
          With immense joy and grateful hearts, we invite you to celebrate the
          beginning of our forever.
        </p>

        <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-stone-500 sm:text-lg sm:leading-9">
          Your presence, blessings, and laughter will make our celebration
          complete.
        </p>

        <div className="mx-auto mt-12 h-px w-12 bg-stone-300" />

        <p className="mt-8 font-heading text-3xl text-stone-800 sm:text-4xl">
          Niketh <span className="text-stone-400">♥</span> Sirisha
        </p>
      </motion.div>
    </Section>
  );
}
