"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

function KolamOrnament() {
  return (
    <div aria-hidden="true" className="mx-auto mt-8 flex h-14 w-44 items-center justify-center text-champagne">
      <svg viewBox="0 0 176 56" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M88 7c-7 8-7 14 0 21 7-7 7-13 0-21ZM88 49c7-8 7-14 0-21-7 7-7 13 0 21ZM39 28c8-7 14-7 21 0-7 7-13 7-21 0ZM137 28c-8 7-14 7-21 0 7-7 13-7 21 0Z" />
        <path d="M58 14c10 0 18 5 24 14-6 9-14 14-24 14 4-8 4-20 0-28ZM118 14c-10 0-18 5-24 14 6 9 14 14 24 14-4-8-4-20 0-28Z" />
        <circle cx="88" cy="28" r="3" />
      </svg>
    </div>
  );
}

export default function Story() {
  return (
    <Section id="story" className="relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-rose">Chapter II</p>
          <div className="mt-5 h-px w-12 bg-champagne" />
          <h2 className="mt-7 font-heading text-6xl leading-none text-charcoal sm:text-7xl">
            {wedding.story.title}
          </h2>
          <p className="mt-10 max-w-2xl font-heading text-3xl leading-tight text-stone-700 sm:text-4xl">
            {wedding.story.intro}
          </p>
          <KolamOrnament />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="relative mt-14 sm:mt-18"
        >
          <div className="relative overflow-hidden border-y border-champagne/50 bg-paper py-2">
            <img
              src="/images/story.jpg"
              alt="Niketh and Sirisha through the years"
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>

        <div className="mt-20 sm:mt-24">
          <div className="grid gap-0 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="hidden md:block">
              <div className="sticky top-28 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-stone-400 [writing-mode:vertical-rl]">
                Our Story
              </div>
            </div>

            <div className="space-y-0">
              {wedding.story.paragraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="relative border-l border-champagne/70 pb-12 pl-8 last:pb-0 sm:pl-10"
                >
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-champagne ring-4 ring-ivory" />
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-rose">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg sm:leading-9">
                    {paragraph}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
