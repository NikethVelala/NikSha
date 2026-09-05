"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory">
      <Image
        src="/images/hero.jpg"
        alt={`${groom} and ${bride}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/75" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="mb-8 flex items-center gap-3 text-champagne"
        >
          <span className="h-px w-10 bg-champagne/70 sm:w-16" />
          <span className="font-heading text-2xl">{wedding.couple.monogram}</span>
          <span className="h-px w-10 bg-champagne/70 sm:w-16" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[10px] uppercase tracking-[0.5em] text-ivory/75 sm:text-xs"
        >
          Together, forever
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-7 font-heading text-7xl leading-[0.82] tracking-tight sm:text-8xl lg:text-[9.5rem]"
        >
          {groom}
          <span className="block text-4xl font-normal italic text-champagne sm:text-5xl lg:text-6xl">&amp;</span>
          {bride}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-9 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-ivory/80"
        >
          <span>18</span>
          <span className="h-1 w-1 rounded-full bg-champagne" />
          <span>11</span>
          <span className="h-1 w-1 rounded-full bg-champagne" />
          <span>2026</span>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="group mt-12 inline-flex items-center gap-4 border-b border-ivory/50 pb-3 text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-champagne hover:text-champagne"
        >
          Open Invitation
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.4} />
        </motion.button>

        <motion.a
          href="#welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.8 }}
          className="absolute bottom-7 inline-flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-ivory/60"
        >
          Scroll to begin
          <ArrowDown className="h-4 w-4 animate-pulse" strokeWidth={1.2} />
        </motion.a>
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 px-6 py-10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative w-full max-w-lg border border-champagne/40 bg-paper px-7 py-12 text-center text-charcoal shadow-2xl sm:px-12 sm:py-16"
            >
              <button
                type="button"
                onClick={() => setOpened(false)}
                className="absolute right-5 top-5 rounded-full p-2 text-muted transition-colors hover:text-charcoal"
                aria-label="Close invitation"
              >
                <X className="h-5 w-5" strokeWidth={1.3} />
              </button>

              <p className="text-[10px] uppercase tracking-[0.45em] text-rose">With our families</p>
              <div className="mx-auto mt-6 h-px w-14 bg-champagne" />
              <p className="mt-8 font-heading text-3xl leading-relaxed sm:text-4xl">
                We invite you to celebrate the beginning of our forever.
              </p>
              <p className="mt-8 font-heading text-4xl sm:text-5xl">
                {groom} <span className="text-rose">&amp;</span> {bride}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-muted">18 November 2026 · Visakhapatnam</p>
              <button
                type="button"
                onClick={() => {
                  setOpened(false);
                  document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-10 inline-flex items-center gap-3 border-b border-charcoal/30 pb-2 text-[10px] uppercase tracking-[0.25em] text-charcoal transition-colors hover:border-rose hover:text-rose"
              >
                Enter the invitation
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
