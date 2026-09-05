"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const bells = [
  { left: "14%", delay: 0, height: "72px" },
  { left: "30%", delay: 0.35, height: "92px" },
  { left: "46%", delay: 0.15, height: "70px" },
  { left: "62%", delay: 0.45, height: "94px" },
  { left: "78%", delay: 0.2, height: "72px" },
];

const garlandDots = Array.from({ length: 38 });

export default function Hero() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      requestAnimationFrame(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 2300);
    return () => window.clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#3b2415] text-white"
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invitation"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
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
      <div className="absolute inset-0 bg-[#2a170b]/35" />

      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
          {/* Full-width floral canopy: the reference has a dense jasmine ceiling rather than a simple bar. */}
          <motion.div
            animate={opening ? { y: "-108%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-[18vh] min-h-[108px]"
          >
            <div className="absolute inset-x-0 top-0 h-[58px] bg-gradient-to-b from-[#5d371b] via-[#b47739] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#fff2d0] via-[#d6a15d] to-transparent opacity-90 blur-[1px]" />
            <div className="absolute inset-x-0 top-1 flex justify-between px-1 sm:px-2">
              {garlandDots.map((_, index) => (
                <span
                  key={index}
                  className="relative h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-[#fffaf0] via-[#f4d7a0] to-[#c58d4a] shadow-[0_2px_7px_rgba(255,235,185,.65)] sm:h-7 sm:w-7"
                  style={{ marginTop: `${(index % 5) * 5}px` }}
                >
                  <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#fff5dc]" />
                </span>
              ))}
            </div>
            <div className="absolute inset-x-0 top-[50px] flex justify-around">
              {bells.map((bell, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{ height: bell.height }}
                  animate={{ y: [-2, 2, -2], rotate: [-1, 1, -1] }}
                  transition={{ duration: 4 + index * 0.25, delay: bell.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-8 w-px bg-gradient-to-b from-[#e7c886] to-[#8a561f]" />
                  <div className="h-6 w-5 rounded-b-[55%] border border-[#e4bd70] bg-gradient-to-b from-[#e3bd6e] via-[#9a6529] to-[#57320f] shadow-[0_3px_8px_rgba(50,25,7,.35)] sm:h-8 sm:w-7" />
                  <div className="h-1.5 w-6 rounded-full bg-[#5c3714] shadow-[0_2px_4px_rgba(0,0,0,.3)] sm:w-8" />
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#e4bd70]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deep centre curtain. It stays completely straight at the middle, with a single fine seam. */}
          <motion.div
            animate={opening ? { x: "-103%" } : { x: 0 }}
            transition={{ duration: 2.15, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden"
            style={{
              background: "linear-gradient(90deg,#9b6631 0%,#d6a15c 7%,#f5d7a1 13%,#b77c3e 20%,#e9c78f 28%,#b47738 36%,#f7dfad 44%,#c18a49 51%,#f1d09a 59%,#a66e35 68%,#edc98f 77%,#b5793a 86%,#e9c48a 94%,#8d592b 100%)",
              boxShadow: "inset -34px 0 62px rgba(66,35,10,.38), 18px 0 48px rgba(49,26,8,.24)",
            }}
          >
            <div className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(88deg,transparent_0%,rgba(255,246,219,.42)_5%,rgba(95,53,17,.2)_10%,transparent_17%)]" />
            <div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,transparent_0_72px,rgba(255,244,211,.16)_74px,transparent_78px)]" />
            <div className="absolute inset-y-0 right-0 w-px bg-[#f9e5bd]/80" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "103%" } : { x: 0 }}
            transition={{ duration: 2.15, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden"
            style={{
              background: "linear-gradient(90deg,#8d592b 0%,#e9c48a 6%,#b5793a 14%,#edc98f 23%,#a66e35 32%,#f1d09a 41%,#c18a49 50%,#f7dfad 58%,#b47738 66%,#e9c78f 74%,#b77c3e 82%,#f5d7a1 89%,#d6a15c 95%,#9b6631 100%)",
              boxShadow: "inset 34px 0 62px rgba(66,35,10,.38), -18px 0 48px rgba(49,26,8,.24)",
            }}
          >
            <div className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(92deg,transparent_0%,rgba(255,246,219,.42)_5%,rgba(95,53,17,.2)_10%,transparent_17%)]" />
            <div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,transparent_0_72px,rgba(255,244,211,.16)_74px,transparent_78px)]" />
            <div className="absolute inset-y-0 left-0 w-px bg-[#f9e5bd]/80" />
          </motion.div>

          {/* Ornate side drapes: wide folded panels gathered at mid-height, like the reference. */}
          <motion.div
            animate={opening ? { x: "-105%" } : { x: 0 }}
            transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 z-20 w-[19%] min-w-[92px] origin-left overflow-hidden"
            style={{ background: "linear-gradient(105deg,#6e401c 0%,#d0a064 14%,#f7deb0 29%,#9d6834 43%,#eac68e 58%,#8a562a 72%,#f2d39f 87%,#7a481f 100%)", boxShadow: "inset -12px 0 25px rgba(53,27,8,.35), 14px 0 35px rgba(50,25,8,.24)" }}
          >
            <div className="absolute inset-0 [background:repeating-linear-gradient(100deg,transparent_0_22px,rgba(255,241,207,.22)_27px,rgba(82,42,12,.18)_40px,transparent_48px)]" />
            <div className="absolute bottom-[38%] left-0 h-4 w-full rotate-[-3deg] bg-gradient-to-r from-[#6d401b] via-[#e7bc78] to-[#71431f]" />
            <div className="absolute bottom-[34%] left-[5%] h-14 w-8 rounded-b-full bg-gradient-to-b from-[#d4a25b] via-[#95602b] to-[#5c3513] shadow-[0_5px_12px_rgba(50,25,8,.35)]" />
            <div className="absolute bottom-[29%] left-[9%] h-20 w-10 rounded-b-full border border-[#e2b96f]/60 bg-gradient-to-b from-[#c6924b] via-[#8a5525] to-[#55300f]" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "105%" } : { x: 0 }}
            transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 z-20 w-[19%] min-w-[92px] origin-right overflow-hidden"
            style={{ background: "linear-gradient(75deg,#7a481f 0%,#f2d39f 13%,#8a562a 28%,#eac68e 43%,#9d6834 57%,#f7deb0 72%,#d0a064 87%,#6e401c 100%)", boxShadow: "inset 12px 0 25px rgba(53,27,8,.35), -14px 0 35px rgba(50,25,8,.24)" }}
          >
            <div className="absolute inset-0 [background:repeating-linear-gradient(80deg,transparent_0_22px,rgba(255,241,207,.22)_27px,rgba(82,42,12,.18)_40px,transparent_48px)]" />
            <div className="absolute bottom-[38%] right-0 h-4 w-full rotate-[3deg] bg-gradient-to-r from-[#71431f] via-[#e7bc78] to-[#6d401b]" />
            <div className="absolute bottom-[34%] right-[5%] h-14 w-8 rounded-b-full bg-gradient-to-b from-[#d4a25b] via-[#95602b] to-[#5c3513] shadow-[0_5px_12px_rgba(50,25,8,.35)]" />
            <div className="absolute bottom-[29%] right-[9%] h-20 w-10 rounded-b-full border border-[#e2b96f]/60 bg-gradient-to-b from-[#c6924b] via-[#8a5525] to-[#55300f]" />
          </motion.div>

          {/* Jasmine + greenery frame the top corners and the outer edges. */}
          <div className="absolute left-0 top-0 z-30 h-[34vh] w-[16vw] min-w-[92px]">
            <div className="absolute -left-5 -top-4 h-32 w-32 rounded-full bg-[#50613a]/85 blur-[1px]" />
            <div className="absolute left-1 top-12 h-24 w-16 rounded-[55%] bg-[#354a2d]/90" />
            <div className="absolute left-4 top-5 h-7 w-7 rounded-full bg-[#fff8e9] shadow-[0_0_10px_rgba(255,239,194,.7)]" />
            <div className="absolute left-9 top-14 h-8 w-8 rounded-full bg-[#fff8e9] shadow-[0_0_10px_rgba(255,239,194,.7)]" />
            <div className="absolute left-2 top-24 h-6 w-6 rounded-full bg-[#fff8e9] shadow-[0_0_10px_rgba(255,239,194,.7)]" />
          </div>
          <div className="absolute right-0 top-0 z-30 h-[34vh] w-[16vw] min-w-[92px] scale-x-[-1]">
            <div className="absolute -left-5 -top-4 h-32 w-32 rounded-full bg-[#50613a]/85 blur-[1px]" />
            <div className="absolute left-1 top-12 h-24 w-16 rounded-[55%] bg-[#354a2d]/90" />
            <div className="absolute left-4 top-5 h-7 w-7 rounded-full bg-[#fff8e9] shadow-[0_0_10px_rgba(255,239,194,.7)]" />
            <div className="absolute left-9 top-14 h-8 w-8 rounded-full bg-[#fff8e9] shadow-[0_0_10px_rgba(255,239,194,.7)]" />
            <div className="absolute left-2 top-24 h-6 w-6 rounded-full bg-[#fff8e9] shadow-[0_0_10px_rgba(255,239,194,.7)]" />
          </div>

          {/* Exact-style centre seam and floral emblem above the opening control. */}
          <div className="absolute inset-y-[18%] left-1/2 z-40 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#5c3518]/80 to-transparent" />
          {!opening && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            >
              <div className="mb-2 text-[#fff3d7] text-sm">♧</div>
              <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#f7e2b7]/80 bg-[#6b451f]/10 text-[9px] uppercase tracking-[0.38em] text-[#fff5df] shadow-[0_0_0_1px_rgba(255,240,202,.08)] sm:h-[88px] sm:w-[88px]">
                Open
              </div>
              <p className="mt-5 text-[8px] uppercase tracking-[0.43em] text-[#fff1d5]/85">Tap anywhere to open</p>
            </motion.div>
          )}

          <div className="absolute bottom-4 left-5 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[#f3d7a2]/45 bg-[#2a1b11]/70 font-heading text-base text-[#fff2d3] shadow-lg sm:bottom-5 sm:left-5">
            N
          </div>
        </div>
      )}
    </section>
  );
}
