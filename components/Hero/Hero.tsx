"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const petals = [
  { left: "5%", delay: 0, duration: 6.8, drift: 36, rotate: 22, size: 10 },
  { left: "14%", delay: 1.6, duration: 8.1, drift: -24, rotate: -30, size: 8 },
  { left: "25%", delay: 3.1, duration: 7.2, drift: 30, rotate: 42, size: 9 },
  { left: "38%", delay: 0.8, duration: 8.7, drift: -34, rotate: -18, size: 10 },
  { left: "51%", delay: 2.6, duration: 7.7, drift: 26, rotate: 34, size: 8 },
  { left: "63%", delay: 4, duration: 8.5, drift: -30, rotate: -40, size: 10 },
  { left: "75%", delay: 1, duration: 7, drift: 38, rotate: 28, size: 9 },
  { left: "87%", delay: 3.5, duration: 8.2, drift: -26, rotate: -26, size: 10 },
  { left: "95%", delay: 0.3, duration: 7.5, drift: 22, rotate: 40, size: 8 },
];

export default function Hero() {
  const [isOpening, setIsOpening] = useState(false);
  const [isCurtainVisible, setIsCurtainVisible] = useState(true);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!isOpening) return;

    const timer = window.setTimeout(() => {
      setIsCurtainVisible(false);
      window.requestAnimationFrame(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 2050);

    return () => window.clearTimeout(timer);
  }, [isOpening]);

  const openInvitation = () => {
    if (!isOpening) setIsOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#201b16] text-white"
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />

      <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
        {petals.map((petal, index) => (
          <motion.span
            key={index}
            initial={{ x: 0, y: "-12vh", opacity: 0, rotate: petal.rotate }}
            animate={{
              x: [0, petal.drift, petal.drift * -0.45, petal.drift * 0.7],
              y: ["-12vh", "30vh", "72vh", "116vh"],
              opacity: [0, 0.7, 0.62, 0],
              rotate: [petal.rotate, petal.rotate + 90, petal.rotate + 210, petal.rotate + 330],
            }}
            transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 rounded-[70%_30%_65%_35%] bg-[#fff4dd]/80 shadow-[0_1px_8px_rgba(255,239,200,0.2)]"
            style={{ left: petal.left, width: petal.size, height: petal.size * 0.62 }}
          />
        ))}
      </div>

      {!isOpening && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-[9%] z-50 flex flex-col items-center text-center"
        >
          <p className="mb-4 text-[9px] uppercase tracking-[0.42em] text-white/80 sm:text-[10px]">
            An invitation to celebrate love
          </p>
          <div className="group flex h-[78px] w-[78px] items-center justify-center rounded-full border border-white/65 bg-black/10 backdrop-blur-sm transition-transform duration-500 hover:scale-105 sm:h-[88px] sm:w-[88px]">
            <span className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-[0.28em]">
              <span>Open</span>
              <ArrowDown className="h-4 w-4 text-[#f1d19a] transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.1} />
            </span>
          </div>
          <p className="mt-4 text-[8px] uppercase tracking-[0.34em] text-white/60">Tap to begin</p>
        </motion.div>
      )}

      {isCurtainVisible && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
          {/* Deep outer drapes stay at the edges while the center opening reveals the photograph. */}
          <motion.div
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpening ? { x: "-72%", scaleX: 0.94 } : { x: 0, scaleX: 1 }}
            transition={{ duration: 1.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-[58%] origin-left"
            style={{
              background: "linear-gradient(90deg,#c6a46d 0%,#f5e2b9 12%,#c59d63 26%,#f7e7c2 39%,#b88b52 52%,#f3dfb5 66%,#bd9259 80%,#e8cf9f 92%,#8f683d 100%)",
              boxShadow: "inset -28px 0 48px rgba(72,45,19,0.25), 18px 0 45px rgba(73,48,24,0.2)",
            }}
          >
            <div className="absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-[#8b653b]/55 via-[#f5e3bb]/40 to-transparent" />
            <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,transparent_0%,rgba(255,250,235,.34)_5%,rgba(117,81,38,.16)_11%,transparent_17%)]" />
          </motion.div>

          <motion.div
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpening ? { x: "72%", scaleX: 0.94 } : { x: 0, scaleX: 1 }}
            transition={{ duration: 1.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-[58%] origin-right"
            style={{
              background: "linear-gradient(90deg,#8f683d 0%,#e8cf9f 8%,#bd9259 20%,#f3dfb5 34%,#b88b52 48%,#f7e7c2 61%,#c59d63 74%,#f5e2b9 88%,#c6a46d 100%)",
              boxShadow: "inset 28px 0 48px rgba(72,45,19,0.25), -18px 0 45px rgba(73,48,24,0.2)",
            }}
          >
            <div className="absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-[#8b653b]/55 via-[#f5e3bb]/40 to-transparent" />
            <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(90deg,transparent_0%,rgba(255,250,235,.34)_5%,rgba(117,81,38,.16)_11%,transparent_17%)]" />
          </motion.div>

          {/* A slim top valance gives the opening a finished theatrical frame without blocking the photograph. */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={isOpening ? { y: "-115%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-[13vh] min-h-[74px]"
            style={{
              background: "linear-gradient(180deg,#8f673c 0%,#e8ce9d 15%,#fff1cd 45%,#c59b60 76%,#805b35 100%)",
              boxShadow: "0 8px 24px rgba(69,44,19,0.25)",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-[#7d5832] via-[#f6e5bd] to-[#7d5832] opacity-80" />
            <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(90deg,transparent_0%,rgba(255,255,255,.35)_8%,rgba(100,69,31,.16)_14%,transparent_22%)]" />
          </motion.div>

          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#f3dfb5]/80 bg-[#6e4d2c]/35 text-[8px] uppercase tracking-[0.3em] text-[#fff4dd] shadow-[0_8px_30px_rgba(70,42,18,0.18)] backdrop-blur-sm sm:h-[76px] sm:w-[76px]">
                <span>Open</span>
              </div>
              <p className="mt-4 text-[8px] uppercase tracking-[0.4em] text-[#fff3d8]/75">Tap anywhere to open</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
