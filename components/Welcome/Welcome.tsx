'use client';

import { motion } from "framer-motion";
import { ArrowDown, HeartHandshake } from "lucide-react";
import Section from "@/components/common/Section/Section";

export default function Welcome() {
  return (
    <>
      <section id="welcome" className="min-h-screen bg-stone-50 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-4xl border border-stone-200 bg-white/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.05)] backdrop-blur sm:p-12 lg:p-16"
          >
            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-stone-500">
              <HeartHandshake className="h-4 w-4" />
              <span>Welcome</span>
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-light leading-tight tracking-[0.16em] text-stone-900 sm:text-4xl lg:text-5xl">
              A celebration of love, crafted in quiet elegance.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              We are delighted to invite you into a day shaped by heartfelt moments, warm hospitality, and the beauty of gathering with those we cherish most.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-stone-900 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-stone-50 transition hover:bg-stone-700"
              >
                Tap to Enter
                <ArrowDown className="h-4 w-4" />
              </a>
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
                Scroll gently into the celebration
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="details" title="The Celebration" eyebrow="Milestone 2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-3"
        >
          <div className="rounded-3xl border border-stone-200 bg-stone-100/70 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Date</p>
            <p className="mt-4 text-xl font-light text-stone-900">October 18, 2026</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-100/70 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Venue</p>
            <p className="mt-4 text-xl font-light text-stone-900">A Private Garden Estate</p>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-stone-100/70 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Dress Code</p>
            <p className="mt-4 text-xl font-light text-stone-900">Formal Evening</p>
          </div>
        </motion.div>
      </Section>
    </>
  );
}