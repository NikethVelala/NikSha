"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const petals = [
  { left: "4%", delay: 0, duration: 7.2, drift: 42, rotate: 18, size: 10 },
  { left: "12%", delay: 1.8, duration: 8.4, drift: -28, rotate: -26, size: 8 },
  { left: "23%", delay: 3.2, duration: 7.6, drift: 34, rotate: 38, size: 9 },
  { left: "36%", delay: 0.9, duration: 8.8, drift: -36, rotate: -16, size: 10 },
  { left: "49%", delay: 2.5, duration: 7.9, drift: 28, rotate: 32, size: 8 },
  { left: "61%", delay: 4.1, duration: 8.6, drift: -34, rotate: -38, size: 10 },
  { left: "74%", delay: 1.1, duration: 7.3, drift: 40, rotate: 24, size: 9 },
  { left: "86%", delay: 3.7, duration: 8.3, drift: -30, rotate: -24, size: 10 },
  { left: "96%", delay: 0.4, duration: 7.7, drift: 24, rotate: 36, size: 8 },
];

const jasmineDrops = [
  { left: "8%", height: "18vh", delay: 0.1 },
  { left: "21%", height: "13vh", delay: 0.35 },
  { left: "35%", height: "17vh", delay: 0.2 },
  { left: "50%", height: "12vh", delay: 0.5 },
  { left: "65%", height: "16vh", delay: 0.25 },
  { left: "79%", height: "13vh", delay: 0.45 },
  { left: "92%", height: "18vh", delay: 0.15 },
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
    }, 2150);

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

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

      <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
        {petals.map((petal, index) => (
          <motion.span
            key={index}
            initial={{ x: 0, y: "-12vh", opacity: 0, rotate: petal.rotate }}
            animate={{
              x: [0, petal.drift, petal.drift * -0.45, petal.drift * 0.7],
              y: ["-12vh", "30vh", "72vh", "116vh"],
              opacity: [0, 0.72, 0.62, 0],
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
          {/* A full-width floral canopy replaces the old solid top bar. */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={isOpening ? { y: "-105%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-[15vh] min-h-[82px]"
          >
            <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[#6f4a24] via-[#d6ad6d] to-transparent opacity-80" />
            <div className="absolute inset-x-0 top-3 h-8 bg-gradient-to-b from-[#f4dfb1]/90 via-[#d4aa67]/70 to-transparent blur-[1px]" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between px-[2%]">
              {Array.from({ length: 15 }).map((_, index) => (
                <span
                  key={index}
                  className="relative block h-5 w-5 rounded-full bg-[#fff7e8] shadow-[0_2px_8px_rgba(255,239,192,0.55)] sm:h-7 sm:w-7"
                  style={{ marginTop: `${(index % 3) * 5}px` }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 top-[34px] flex justify-around">
              {jasmineDrops.map((drop, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -6, opacity: 0.9 }}
                  animate={{ y: [-6, 1, -6], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3.5 + index * 0.12, delay: drop.delay, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                  style={{ left: drop.left, height: drop.height }}
                >
                  <div className="h-full w-[2px] bg-gradient-to-b from-[#b38a50] via-[#d7bc82] to-[#8d6838]" />
                  <div className="absolute top-0 flex -translate-y-1/2 gap-0.5">
                    <span className="h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_1px_6px_rgba(255,245,214,0.55)]" />
                    <span className="h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_1px_6px_rgba(255,245,214,0.55)]" />
                    <span className="h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_1px_6px_rgba(255,245,214,0.55)]" />
                  </div>
                  <div className="absolute bottom-0 h-7 w-8 rounded-b-[55%] rounded-t-[25%] bg-gradient-to-b from-[#c79b53] via-[#8e642f] to-[#5e3f1e] shadow-[0_4px_10px_rgba(72,44,18,0.3)]" />
                  <span className="absolute bottom-[-11px] h-2.5 w-2.5 rounded-full bg-[#d7b36c]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Left gathered silk drape. The curtain is rich at the edge and opens away from the photograph. */}
          <motion.div
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpening ? { x: "-93%", scaleX: 0.94 } : { x: 0, scaleX: 1 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-[53%] origin-left"
            style={{
              background: "linear-gradient(90deg,#7b5128 0%,#d6ad69 7%,#f8e5bd 16%,#a8753d 25%,#e8c98e 35%,#8e5e30 45%,#f4dbab 56%,#b57f42 67%,#f7e6bd 77%,#9a6735 88%,#d9b172 100%)",
              clipPath: "polygon(0 0,100% 0,97% 8%,100% 18%,96% 29%,100% 40%,96% 51%,100% 62%,96% 74%,100% 86%,96% 100%,0 100%)",
              boxShadow: "inset -30px 0 50px rgba(73,42,15,0.3), 18px 0 48px rgba(65,39,18,0.2)",
            }}
          >
            <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(93deg,transparent_0%,rgba(255,248,226,.45)_5%,rgba(90,57,24,.22)_11%,transparent_18%)]" />
            <div className="absolute inset-y-0 right-0 w-[10px] bg-gradient-to-l from-[#6f4926] via-[#f0d39b] to-transparent opacity-80" />
            <div className="absolute right-[-3px] top-[17%] h-[68%] w-3 rounded-full bg-gradient-to-b from-[#f5dfb2] via-[#8b5b2d] to-[#e8c58b] opacity-70" />
            <div className="absolute left-0 top-[12%] h-[18%] w-[34%] rounded-r-[100%] bg-gradient-to-r from-[#5d3b1d]/55 to-transparent" />
          </motion.div>

          {/* Right gathered silk drape. */}
          <motion.div
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpening ? { x: "93%", scaleX: 0.94 } : { x: 0, scaleX: 1 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-[53%] origin-right"
            style={{
              background: "linear-gradient(90deg,#d9b172 0%,#9a6735 12%,#f7e6bd 23%,#b57f42 33%,#f4dbab 44%,#8e5e30 55%,#e8c98e 65%,#a8753d 75%,#f8e5bd 84%,#d6ad69 93%,#7b5128 100%)",
              clipPath: "polygon(0 8%,3% 0,100% 0,100% 100%,4% 100%,0 86%,4% 74%,0 62%,4% 51%,0 40%,4% 29%,0 18%)",
              boxShadow: "inset 30px 0 50px rgba(73,42,15,0.3), -18px 0 48px rgba(65,39,18,0.2)",
            }}
          >
            <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(87deg,transparent_0%,rgba(255,248,226,.45)_5%,rgba(90,57,24,.22)_11%,transparent_18%)]" />
            <div className="absolute inset-y-0 left-0 w-[10px] bg-gradient-to-r from-[#6f4926] via-[#f0d39b] to-transparent opacity-80" />
            <div className="absolute left-[-3px] top-[17%] h-[68%] w-3 rounded-full bg-gradient-to-b from-[#f5dfb2] via-[#8b5b2d] to-[#e8c58b] opacity-70" />
            <div className="absolute right-0 top-[12%] h-[18%] w-[34%] rounded-l-[100%] bg-gradient-to-l from-[#5d3b1d]/55 to-transparent" />
          </motion.div>

          {/* Soft floral corners keep the frame ornamental without becoming a template-like wall. */}
          <div className="absolute left-0 top-0 h-[24vh] w-[16vw] min-w-[90px] bg-[radial-gradient(circle_at_15%_15%,rgba(105,116,65,.95)_0_35%,transparent_36%),radial-gradient(circle_at_0%_60%,rgba(76,91,45,.8)_0_35%,transparent_36%)] opacity-85" />
          <div className="absolute right-0 top-0 h-[24vh] w-[16vw] min-w-[90px] scale-x-[-1] bg-[radial-gradient(circle_at_15%_15%,rgba(105,116,65,.95)_0_35%,transparent_36%),radial-gradient(circle_at_0%_60%,rgba(76,91,45,.8)_0_35%,transparent_36%)] opacity-85" />

          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            >
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#f5dfb2]/85 bg-[#5f411f]/30 text-[8px] uppercase tracking-[0.32em] text-[#fff7e8] shadow-[0_8px_32px_rgba(63,39,18,0.2)] backdrop-blur-[2px] sm:h-[84px] sm:w-[84px]">
                <span className="-mr-[-0.32em]">Open</span>
              </div>
              <p className="mt-4 text-[8px] uppercase tracking-[0.4em] text-[#fff4dc]/80">Tap anywhere to open</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
