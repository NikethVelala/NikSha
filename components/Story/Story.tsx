"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Story() {
  return (
    <Section id="story">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-stone-400">
          Chapter II
        </p>

        <h2 className="font-heading text-5xl text-stone-900">
          {wedding.story.title}
        </h2>

        <p className="mt-12 text-4xl md:text-5xl leading-relaxed text-stone-800">
          {wedding.story.intro}
        </p>
        <div className="my-16 overflow-hidden rounded-3xl">
  <img
    src="/images/story.jpg"
    alt="Our Story"
    className="h-[500px] w-full object-cover"
  />
</div>

        <div className="mt-14 space-y-8 text-left text-lg leading-9 text-stone-500">
          {wedding.story.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}