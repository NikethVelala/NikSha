"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const petals = [
  { left: "6%", delay: 0, duration: 6.8, drift: 42, rotate: 22, size: 11 },
  { left: "16%", delay: 1.7, duration: 8.2, drift: -28, rotate: -35, size: 8 },
  { left: "27%", delay: 3.2, duration: 7.4, drift: 36, rotate: 48, size: 9 },
  { left: "39%", delay: 0.9, duration: 9.1, drift: -44, rotate: -20, size: 10 },
  { left: "51%", delay: 2.8, duration: 7.8, drift: 30, rotate: 35, size: 8 },
  { left: "63%", delay: 4.1, duration: 8.8, drift: -38, rotate: -42, size: 10 },
  { left: "74%", delay: 1.1, duration: 7.1, drift: 46, rotate: 30, size: 9 },
  { left: "86%", delay: 3.6, duration: 8.5, drift: -32, rotate: -28, size: 11 },
  { left: "94%", delay: 0.4, duration: 7.6, drift: 26, rotate: 44, size: 8 },
];

export default function Hero() {
  const [isOpening, setIsOpening] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!isOpening) return;

    const timer = window.setTimeout(() => {
      document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2350);

    return () => window.clearTimeout(timer);
  }, [isOpening]);

  const openInvitation = () => {
    if (!isOpening) setIsOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#211b16] text-white"
      onClick={openInvitation}
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invitation"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openInvitation();
        }
      }}
    >
      <Image
        src="/images/hero.jpg"
        alt={`${groom} and ${bride}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,12,7,0.34)_100%)]" />

      {!isOpening && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-[10%] z-20 flex flex-col items-center text-center"
        >
          <p className="mb-5 text-[9px] uppercase tracking-[0.42em] text-white/75 sm:text-[10px]">
            An invitation to celebrate love
          </p>
          <div className="group flex h-[78px] w-[78px] items-center justify-center rounded-full border border-white/60 bg-black/10 backdrop-blur-[3px] transition-transform duration-700 hover:scale-105 sm:h-[88px] sm:w-[88px]">
            <span className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-[0.28em]">
              <span>Open</span>
              <ArrowUpRight className="h-4 w-4 text-[#f1d19a] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.15} />
            </span>
          </div>
          <p className="mt-4 text-[8px] uppercase tracking-[0.34em] text-white/55">Tap to begin</p>
        </motion.div>
      )}

      {/* Soft foreground petals are present before the transition begins, so the opening feels alive rather than staged. */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
        {petals.map((petal, index) => (
          <motion.span
            key={index}
            initial={{ x: 0, y: "-12vh", opacity: 0, rotate: petal.rotate }}
            animate={{
              x: [0, petal.drift, petal.drift * -0.45, petal.drift * 0.7],
              y: ["-12vh", "32vh", "72vh", "116vh"],
              opacity: [0, 0.75, 0.65, 0],
              rotate: [petal.rotate, petal.rotate + 90, petal.rotate + 210, petal.rotate + 330],
            }}
            transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 rounded-[70%_30%_65%_35%] bg-[#fff5df]/75 shadow-[0_1px_8px_rgba(255,239,200,0.18)]"
            style={{ left: petal.left, width: petal.size, height: petal.size * 0.62 }}
          />
        ))}
      </div>

      {/* A short, layered veil reveal replaces the previous artificial curtain stage. */}
      {isOpening && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden bg-[#f4e8d2]">
          <motion.div
            initial={{ y: "108%", rotate: 1.5 }}
            animate={{ y: "-108%", rotate: -1.5 }}
            transition={{ duration: 1.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-[-8%] top-[-8%] h-[120%]"
            style={{
              background: "linear-gradient(105deg, rgba(232,215,181,0.98) 0%, rgba(255,248,232,0.98) 24%, rgba(213,189,148,0.95) 47%, rgba(255,247,225,0.98) 70%, rgba(225,204,166,0.98) 100%)",
              boxShadow: "0 -30px 90px rgba(117,77,28,0.18), inset 0 0 90px rgba(255,255,255,0.24)",
            }}
          >
            <div className="absolute inset-0 opacity-55 [background:repeating-linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.38)_7%,rgba(144,106,57,0.12)_13%,rgba(255,255,255,0.3)_20%,transparent_28%)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1.02, 1.04] }}
            transition={{ duration: 2.05, times: [0, 0.25, 0.7, 1], ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-center"
          >
            <div className="px-8">
              <p className="text-[9px] uppercase tracking-[0.5em] text-[#7a5b35]/75">The celebration begins</p>
              <h2 className="mt-5 font-heading text-[3.7rem] leading-[0.86] tracking-[-0.035em] text-[#4d3824] sm:text-7xl">
                {groom}
                <span className="my-2 block text-xl italic text-[#aa8250] sm:text-3xl">&amp;</span>
                {bride}
              </h2>
              <div className="mx-auto mt-6 h-px w-14 bg-[#b28a55]/60" />
              <p className="mt-5 text-[9px] uppercase tracking-[0.34em] text-[#7a5b35]/75">18 November 2026 · Visakhapatnam</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
