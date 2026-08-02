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
        className="mx-auto max-w-3xl py-32 md:py-40 text-center"
      >
        <p className="mb-4 uppercase tracking-[0.4em] text-stone-500 text-sm">
          A Personal Invitation
        </p>

        <h2 className="font-heading text-5xl md:text-6xl text-stone-900">
          Welcome
        </h2>

        <p className="mt-10 text-xl leading-10 text-stone-600">
          With immense joy and grateful hearts,
          we invite you to celebrate the beginning
          of our forever.
        </p>

        <p className="mt-8 text-lg leading-9 text-stone-500">
          Your presence, blessings, and laughter
          will make our celebration complete.
        </p>

        <p className="mt-16 font-heading text-3xl text-stone-800">
          Niketh ♥ Sirisha
        </p>
      </motion.div>
    </Section>
  );
}