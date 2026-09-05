"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

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
          {/* Warm champagne canopy inspired by South Indian jasmine-and-brass wedding decor. */}
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={isOpening ? { y: "-105%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-[15vh] min-h-[82px]"
          >
            <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#5d3c1e] via-[#c28a49] to-transparent opacity-90" />
            <div className="absolute inset-x-0 top-2 h-9 bg-gradient-to-b from-[#f5dfb1]/95 via-[#d2a573]/75 to-transparent blur-[1px]" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between px-[2%]">
              {Array.from({ length: 17 }).map((_, index) => (
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

          {/* Left champagne silk curtain. Its center edge is intentionally clean and smooth — no zig-zag seam. */}
          <motion.div
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpening ? { x: "-96%", scaleX: 0.98 } : { x: 0, scaleX: 1 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 z-20 w-[52%] origin-left overflow-hidden rounded-r-[18%]"
            style={{
              background: "linear-gradient(90deg,#6f4823 0%,#b47d3e 6%,#f2d5a0 14%,#9a6733 22%,#e9c48a 31%,#7f5429 40%,#f7dfad 49%,#a8733a 58%,#f0ce96 68%,#8b5a2b 78%,#f6dfad 88%,#b47d3e 96%,#704823 100%)",
              boxShadow: "inset -34px 0 58px rgba(66,37,12,0.38), 18px 0 55px rgba(55,32,13,0.24)",
            }}
          >
            <div className="absolute inset-0 opacity-55 [background:repeating-linear-gradient(95deg,transparent_0%,rgba(255,247,224,.55)_4%,rgba(88,53,22,.28)_10%,transparent_17%)]" />
            <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-[#5f3b1c] via-[#f4d69e] to-transparent opacity-80" />
            <div className="absolute inset-y-0 right-[2px] w-px bg-[#f8e4bd]/65" />

            {/* Gathered fabric shadow near the side tie-back. */}
            <div className="absolute left-[8%] top-[18%] h-[64%] w-[22%] rounded-r-[100%] bg-gradient-to-r from-[#4e3018]/55 via-[#8b5a2d]/15 to-transparent blur-[1px]" />
            <div className="absolute left-[11%] top-[52%] h-[2px] w-[17%] -rotate-3 bg-gradient-to-r from-[#8c5c25] via-[#f0cf91] to-[#8c5c25] opacity-90" />
            <div className="absolute left-[15%] top-[50.5%] h-4 w-4 rounded-full border border-[#f3d49b] bg-[#8d5d29] shadow-[0_2px_8px_rgba(56,31,11,.35)]" />
            <div className="absolute left-[13.2%] top-[53%] h-9 w-5 rounded-b-full bg-gradient-to-b from-[#c3914d] via-[#8d5d29] to-[#5c3b1c] shadow-[0_3px_8px_rgba(56,31,11,.3)]" />
          </motion.div>

          {/* Right champagne silk curtain, mirrored for a symmetrical stage reveal. */}
          <motion.div
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpening ? { x: "96%", scaleX: 0.98 } : { x: 0, scaleX: 1 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 z-20 w-[52%] origin-right overflow-hidden rounded-l-[18%]"
            style={{
              background: "linear-gradient(90deg,#704823 0%,#b47d3e 4%,#f6dfad 12%,#8b5a2b 22%,#f0ce96 32%,#a8733a 42%,#f7dfad 51%,#7f5429 60%,#e9c48a 69%,#9a6733 78%,#f2d5a0 86%,#b47d3e 94%,#6f4823 100%)",
              boxShadow: "inset 34px 0 58px rgba(66,37,12,0.38), -18px 0 55px rgba(55,32,13,0.24)",
            }}
          >
            <div className="absolute inset-0 opacity-55 [background:repeating-linear-gradient(85deg,transparent_0%,rgba(255,247,224,.55)_4%,rgba(88,53,22,.28)_10%,transparent_17%)]" />
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#5f3b1c] via-[#f4d69e] to-transparent opacity-80" />
            <div className="absolute inset-y-0 left-[2px] w-px bg-[#f8e4bd]/65" />
            <div className="absolute right-[8%] top-[18%] h-[64%] w-[22%] rounded-l-[100%] bg-gradient-to-l from-[#4e3018]/55 via-[#8b5a2d]/15 to-transparent blur-[1px]" />
            <div className="absolute right-[11%] top-[52%] h-[2px] w-[17%] rotate-3 bg-gradient-to-r from-[#8c5c25] via-[#f0cf91] to-[#8c5c25] opacity-90" />
            <div className="absolute right-[15%] top-[50.5%] h-4 w-4 rounded-full border border-[#f3d49b] bg-[#8d5d29] shadow-[0_2px_8px_rgba(56,31,11,.35)]" />
            <div className="absolute right-[13.2%] top-[53%] h-9 w-5 rounded-b-full bg-gradient-to-b from-[#c3914d] via-[#8d5d29] to-[#5c3b1c] shadow-[0_3px_8px_rgba(56,31,11,.3)]" />
          </motion.div>

          {/* Greenery and jasmine framing, kept to the edges so the curtain remains the hero. */
          <div className="absolute left-0 top-0 h-[28vh] w-[18vw] min-w-[110px] opacity-90">
            <div className="absolute left-[-6%] top-[8%] h-20 w-20 rounded-full bg-[#65703f]/90 blur-[1px]" />
            <div className="absolute left-[2%] top-[34%] h-24 w-32 rounded-[50%] bg-[#485d31]/80 blur-[1px]" />
            <div className="absolute left-[16%] top-[10%] h-3 w-3 rounded-full bg-[#fff7e8] shadow-[0_0_9px_rgba(255,244,210,.7)]" />
            <div className="absolute left-[7%] top-[22%] h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_0_9px_rgba(255,244,210,.7)]" />
            <div className="absolute left-[25%] top-[5%] h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_0_9px_rgba(255,244,210,.7)]" />
          </div>
          <div className="absolute right-0 top-0 h-[28vh] w-[18vw] min-w-[110px] scale-x-[-1] opacity-90">
            <div className="absolute left-[-6%] top-[8%] h-20 w-20 rounded-full bg-[#65703f]/90 blur-[1px]" />
            <div className="absolute left-[2%] top-[34%] h-24 w-32 rounded-[50%] bg-[#485d31]/80 blur-[1px]" />
            <div className="absolute left-[16%] top-[10%] h-3 w-3 rounded-full bg-[#fff7e8] shadow-[0_0_9px_rgba(255,244,210,.7)]" />
            <div className="absolute left-[7%] top-[22%] h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_0_9px_rgba(255,244,210,.7)]" />
            <div className="absolute left-[25%] top-[5%] h-4 w-4 rounded-full bg-[#fff7e8] shadow-[0_0_9px_rgba(255,244,210,.7)]" />
          </div>

          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            >
              <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.45em] text-[#fff5df]/80">NikSha</div>
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#f5dfb2]/85 bg-[#5f411f]/30 text-[8px] uppercase tracking-[0.32em] text-[#fff7e8] shadow-[0_8px_32px_rgba(63,39,18,0.2)] backdrop-blur-[2px] sm:h-[84px] sm:w-[84px]">
                <span>Open</span>
              </div>
              <p className="mt-4 text-[8px] uppercase tracking-[0.4em] text-[#fff4dc]/80">Tap anywhere to open</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
