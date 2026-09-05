"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [isOpening, setIsOpening] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!isOpening) return;

    const timer = window.setTimeout(() => {
      document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [isOpening]);

  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory">
      <Image
        src="/images/hero.jpg"
        alt={`${groom} and ${bride}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-center"
      />

      <div className="absolute inset-0 bg-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/85" />

      {/* The hero remains underneath the entire interaction, so there is never a blank transition screen. */}
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -18 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="text-[9px] uppercase tracking-[0.5em] text-champagne sm:text-[11px]">
            An invitation to celebrate love
          </p>

          <h1 className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]">
            {groom}
            <span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>
            {bride}
          </h1>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/80 sm:mt-10 sm:text-[10px]">
            <span>Wednesday</span>
            <span className="h-1 w-1 rounded-full bg-champagne" />
            <span>Visakhapatnam</span>
          </div>
        </motion.div>
      </div>

      {!isOpening && (
        <motion.button
          type="button"
          onClick={openInvitation}
          initial={{ opacity: 0, y: 15, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.95 }}
          className="group absolute bottom-[11%] left-1/2 z-30 flex h-[86px] w-[86px] -translate-x-1/2 items-center justify-center rounded-full border border-champagne/75 bg-charcoal/25 shadow-[0_8px_40px_rgba(0,0,0,0.22)] backdrop-blur-[3px] outline-none sm:h-[94px] sm:w-[94px]"
          aria-label="Open the invitation"
        >
          <span className="absolute inset-1 rounded-full border border-ivory/20 transition-transform duration-700 group-hover:scale-[1.08]" />
          <span className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-[0.22em] text-ivory/95">
            <span>Open</span>
            <ArrowUpRight className="h-4 w-4 text-champagne transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.2} />
          </span>
        </motion.button>
      )}

      {/* Curtain reveal. The folds are built with CSS gradients so the animation stays crisp and dependency-free on mobile. */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={false}
          animate={{ x: isOpening ? "-103%" : "0%" }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-y-0 left-0 w-[54%] origin-left"
          style={{
            background:
              "linear-gradient(90deg, #2b1718 0%, #6a3435 10%, #3b1e20 20%, #7b4140 31%, #432224 43%, #7a3c3d 55%, #321a1c 68%, #6a3032 81%, #32181a 100%)",
            boxShadow: "18px 0 35px rgba(24, 12, 12, 0.28)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,238,214,0.13)_14%,transparent_25%,rgba(255,238,214,0.08)_42%,transparent_55%,rgba(255,238,214,0.12)_72%,transparent_84%)]" />
          <div className="absolute right-0 top-0 h-full w-px bg-champagne/25" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{ x: isOpening ? "103%" : "0%" }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-y-0 right-0 w-[54%] origin-right"
          style={{
            background:
              "linear-gradient(90deg, #32181a 0%, #6a3032 19%, #321a1c 32%, #7a3c3d 45%, #432224 57%, #7b4140 69%, #3b1e20 80%, #6a3435 90%, #2b1718 100%)",
            boxShadow: "-18px 0 35px rgba(24, 12, 12, 0.28)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(255deg,transparent_0%,rgba(255,238,214,0.13)_14%,transparent_25%,rgba(255,238,214,0.08)_42%,transparent_55%,rgba(255,238,214,0.12)_72%,transparent_84%)]" />
          <div className="absolute left-0 top-0 h-full w-px bg-champagne/25" />
        </motion.div>

        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[8%] h-7 w-24 -translate-x-1/2 border-y border-champagne/35"
          />
        )}

        <motion.div
          animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -8 : 0 }}
          transition={{ duration: 0.45 }}
          className="absolute bottom-[4.5%] left-1/2 -translate-x-1/2 text-center text-[8px] uppercase tracking-[0.38em] text-champagne/75 sm:bottom-[5%]"
        >
          Tap to open
        </motion.div>
      </div>

      {isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
          className="pointer-events-none fixed inset-0 z-[25] flex items-center justify-center px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -12] }}
            transition={{ duration: 1.25, times: [0, 0.25, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
            className="text-ivory"
          >
            <p className="text-[9px] uppercase tracking-[0.48em] text-champagne">The celebration begins</p>
            <p className="mt-5 font-heading text-4xl tracking-[-0.025em] sm:text-6xl">
              {groom} <span className="font-normal italic text-champagne">&amp;</span> {bride}
            </p>
            <p className="mt-4 text-[9px] uppercase tracking-[0.36em] text-ivory/70">18 November 2026 · Visakhapatnam</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
