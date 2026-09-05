"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [stage, setStage] = useState<"cover" | "opening" | "done">("cover");
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (stage !== "opening") return;

    const timer = window.setTimeout(() => {
      setStage("done");
      window.setTimeout(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }, 3600);

    return () => window.clearTimeout(timer);
  }, [stage]);

  const openInvitation = () => {
    if (stage !== "cover") return;
    setStage("opening");
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

      <motion.div
        className="absolute inset-0 bg-charcoal"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: stage === "opening" ? 0.5 : 0.3 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-transparent to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(20,20,18,0.48)_100%)]" />

      <AnimatePresence mode="wait">
        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center"
          >
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="text-[9px] uppercase tracking-[0.5em] text-champagne sm:text-[11px]"
              >
                An invitation to celebrate love
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]"
              >
                {groom}
                <span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>
                {bride}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/75 sm:mt-10 sm:text-[10px]"
              >
                <span>Wednesday</span>
                <span className="h-1 w-1 rounded-full bg-champagne" />
                <span>Visakhapatnam</span>
              </motion.div>

              <motion.button
                type="button"
                onClick={openInvitation}
                initial={{ opacity: 0, y: 15, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.96 }}
                className="group relative mx-auto mt-12 flex h-[82px] w-[82px] items-center justify-center rounded-full border border-champagne/65 bg-charcoal/20 backdrop-blur-[2px] outline-none sm:mt-14 sm:h-[92px] sm:w-[92px]"
                aria-label="Open the invitation"
              >
                <span className="absolute inset-1 rounded-full border border-ivory/15 transition-transform duration-700 group-hover:scale-[1.08]" />
                <span className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-[0.22em] text-ivory/90">
                  <span>Open</span>
                  <ArrowUpRight className="h-4 w-4 text-champagne transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.2} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === "opening" && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-30 overflow-hidden bg-[#201e1a]"
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3eadc]"
              initial={{ scale: 0.7, opacity: 0.96 }}
              animate={{ scale: 18, opacity: 1 }}
              transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,235,0.95)_0%,rgba(244,234,218,0.9)_24%,rgba(232,215,192,0.45)_50%,transparent_72%)]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 1.8] }}
              transition={{ duration: 2.6, ease: "easeOut" }}
            />

            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -12], scale: [0.96, 1, 1, 1.02] }}
                transition={{ duration: 2.7, times: [0, 0.22, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-charcoal"
              >
                <p className="text-[9px] uppercase tracking-[0.46em] text-[#9d8060]">With our families</p>
                <h2 className="mt-6 font-heading text-5xl leading-[0.9] tracking-[-0.035em] sm:text-7xl">
                  {groom}
                  <span className="mx-2 font-normal italic text-[#ae8b69]">&amp;</span>
                  {bride}
                </h2>
                <p className="mt-6 text-[9px] uppercase tracking-[0.38em] text-charcoal/60">18 November 2026 · Visakhapatnam</p>
              </motion.div>
            </div>

            {Array.from({ length: 18 }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute z-20 h-1.5 w-1 rounded-full bg-[#b28d67]"
                style={{
                  left: `${8 + ((index * 31) % 84)}%`,
                  top: `${8 + ((index * 47) % 82)}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 1, 0.5],
                  x: [0, index % 2 ? 18 : -18],
                  y: [0, index % 3 === 0 ? -22 : 18],
                }}
                transition={{ delay: 0.5 + index * 0.025, duration: 1.8, ease: "easeOut" }}
              />
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.65, 0] }}
              transition={{ delay: 1.9, duration: 1.4 }}
              className="absolute bottom-[11%] left-0 right-0 z-20 text-center text-[8px] uppercase tracking-[0.42em] text-[#7f684e]"
            >
              Welcome to our celebration
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" && <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />}
    </section>
  );
}
