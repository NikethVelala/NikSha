"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const bells = [
  { left: "15%", delay: 0, height: "76px" },
  { left: "28%", delay: 0.55, height: "96px" },
  { left: "42%", delay: 0.2, height: "72px" },
  { left: "57%", delay: 0.75, height: "98px" },
  { left: "72%", delay: 0.35, height: "74px" },
  { left: "86%", delay: 0.9, height: "88px" },
];

const flowers = Array.from({ length: 48 }, (_, index) => ({
  left: `${(index / 47) * 100}%`,
  top: `${4 + (index % 5) * 5}px`,
  size: 12 + (index % 3) * 4,
  delay: (index % 9) * 0.08,
}));

const sideFlowers = Array.from({ length: 14 }, (_, index) => ({
  top: `${8 + index * 6}%`,
  left: `${4 + (index % 3) * 5}%`,
  size: 13 + (index % 3) * 3,
  delay: (index % 6) * 0.12,
}));

function JasmineFlower({ size, delay }: { size: number; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0.82, y: 0 }}
      animate={{ opacity: [0.82, 1, 0.82], y: [0, 2, 0] }}
      transition={{ duration: 3.8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className="relative block shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-[28%] rounded-full bg-[#d49a45] shadow-[0_1px_3px_rgba(102,54,12,.45)]" />
      <span className="absolute left-1/2 top-0 h-[58%] w-[38%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#fffdf3] to-[#f1d39d]" />
      <span className="absolute bottom-0 left-1/2 h-[58%] w-[38%] -translate-x-1/2 rotate-180 rounded-full bg-gradient-to-b from-[#fffdf3] to-[#f1d39d]" />
      <span className="absolute left-0 top-1/2 h-[38%] w-[58%] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#fffdf3] to-[#f1d39d]" />
      <span className="absolute right-0 top-1/2 h-[38%] w-[58%] -translate-y-1/2 rotate-180 rounded-full bg-gradient-to-r from-[#fffdf3] to-[#f1d39d]" />
    </motion.span>
  );
}

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
    }, 2550);
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,226,177,.08),rgba(48,23,8,.48)_72%)]" />

      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
          {/* Dense jasmine canopy: this is deliberately irregular and layered so it reads as real wedding florals rather than dots. */}
          <motion.div
            animate={opening ? { y: "-112%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 2.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 z-40 h-[20vh] min-h-[112px]"
          >
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#4b2b13] via-[#a86d32]/80 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#fff4d5] via-[#d7a25b]/90 to-transparent blur-[2px]" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between overflow-hidden px-[-4px]">
              {flowers.map((flower, index) => (
                <span key={index} className="relative shrink-0" style={{ marginTop: flower.top }}>
                  <JasmineFlower size={flower.size} delay={flower.delay} />
                </span>
              ))}
            </div>

            <div className="absolute inset-x-0 top-12 flex justify-around px-[7%] sm:top-14 sm:px-[8%]">
              {bells.map((bell, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{ height: bell.height }}
                  animate={{ y: [-2, 2, -2], rotate: [-1, 1, -1] }}
                  transition={{ duration: 4.5 + index * 0.22, delay: bell.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-9 w-px bg-gradient-to-b from-[#f5d68f] to-[#83501c]" />
                  <div className="relative h-7 w-6 rounded-b-[55%] border border-[#e8c477] bg-gradient-to-b from-[#efca76] via-[#a76c2a] to-[#57310d] shadow-[0_4px_9px_rgba(45,20,4,.42)] sm:h-9 sm:w-8">
                    <span className="absolute left-1/2 top-1 h-1 w-3 -translate-x-1/2 rounded-full bg-[#ffe1a0]/70" />
                  </div>
                  <div className="h-1.5 w-7 rounded-full bg-[#5b3411] shadow-[0_2px_4px_rgba(0,0,0,.35)] sm:w-9" />
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-[#e5bd6c]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Side foliage. It sits above the fabric and gives the opening the dense botanical frame from the reference. */}
          <motion.div
            animate={opening ? { x: "-108%", opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 2.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 z-50 w-[21%] min-w-[92px] overflow-hidden"
          >
            <div className="absolute -left-[12%] top-[2%] h-[32vh] w-[62%] rotate-[14deg] rounded-[60%] bg-[#30462a]/95 blur-[1px]" />
            <div className="absolute -left-[8%] top-[19%] h-[42vh] w-[48%] -rotate-[18deg] rounded-[60%] bg-[#425c31]/90" />
            <div className="absolute left-[7%] top-[6%] h-[22vh] w-[26%] rotate-[26deg] rounded-[60%] bg-[#617142]/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#274027]/30 via-transparent to-[#4a2b12]/10" />
            {sideFlowers.map((flower, index) => (
              <span key={index} className="absolute" style={{ top: flower.top, left: flower.left }}>
                <JasmineFlower size={flower.size} delay={flower.delay} />
              </span>
            ))}
            <div className="absolute bottom-[7%] left-[3%] h-28 w-8 rotate-[17deg] rounded-full bg-gradient-to-b from-[#d3a15b] via-[#94602b] to-[#55300f] shadow-[0_5px_14px_rgba(40,19,5,.5)]" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "108%", opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 2.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 z-50 w-[21%] min-w-[92px] scale-x-[-1] overflow-hidden"
          >
            <div className="absolute -left-[12%] top-[2%] h-[32vh] w-[62%] rotate-[14deg] rounded-[60%] bg-[#30462a]/95 blur-[1px]" />
            <div className="absolute -left-[8%] top-[19%] h-[42vh] w-[48%] -rotate-[18deg] rounded-[60%] bg-[#425c31]/90" />
            <div className="absolute left-[7%] top-[6%] h-[22vh] w-[26%] rotate-[26deg] rounded-[60%] bg-[#617142]/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#274027]/30 via-transparent to-[#4a2b12]/10" />
            {sideFlowers.map((flower, index) => (
              <span key={index} className="absolute" style={{ top: flower.top, left: flower.left }}>
                <JasmineFlower size={flower.size} delay={flower.delay} />
              </span>
            ))}
          </motion.div>

          {/* Rich gathered outer drapes. The broad folds, tie-backs and tassel silhouettes are the key change from the previous flat side panels. */}
          <motion.div
            animate={opening ? { x: "-112%" } : { x: 0 }}
            transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 z-30 w-[22%] min-w-[100px] overflow-hidden"
            style={{
              background: "linear-gradient(108deg,#62401f 0%,#c08b4f 11%,#f6dba9 25%,#a66e37 39%,#f1cf96 53%,#895729 67%,#efd09d 81%,#8a5526 100%)",
              boxShadow: "inset -16px 0 28px rgba(61,31,8,.42), 20px 0 48px rgba(49,24,7,.3)",
            }}
          >
            <div className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(102deg,transparent_0_24px,rgba(255,246,218,.3)_32px,rgba(87,45,13,.22)_47px,transparent_58px)]" />
            <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#4f2d10] via-[#e2b874] to-transparent opacity-80" />
            <div className="absolute bottom-[36%] left-0 h-5 w-[115%] rotate-[-2deg] bg-gradient-to-r from-[#6b3d16] via-[#e5b76d] to-[#6b3d16] shadow-[0_3px_6px_rgba(54,25,7,.35)]" />
            <div className="absolute bottom-[31%] left-[5%] h-7 w-16 rotate-[-3deg] rounded-full border border-[#f1d39a]/80 bg-gradient-to-b from-[#c9944e] via-[#8c5826] to-[#5a3211] shadow-[0_4px_12px_rgba(49,23,6,.4)]" />
            <div className="absolute bottom-[24%] left-[9%] h-24 w-12 rounded-b-[48%] bg-gradient-to-b from-[#d5a05a] via-[#93602c] to-[#53300f] shadow-[0_7px_16px_rgba(48,22,6,.48)]" />
            <div className="absolute bottom-[20%] left-[7%] h-10 w-16 rounded-b-[60%] bg-gradient-to-b from-[#e0b36d] via-[#9b632d] to-[#5b3412]" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "112%" } : { x: 0 }}
            transition={{ duration: 2.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 z-30 w-[22%] min-w-[100px] scale-x-[-1] overflow-hidden"
            style={{
              background: "linear-gradient(108deg,#62401f 0%,#c08b4f 11%,#f6dba9 25%,#a66e37 39%,#f1cf96 53%,#895729 67%,#efd09d 81%,#8a5526 100%)",
              boxShadow: "inset -16px 0 28px rgba(61,31,8,.42), 20px 0 48px rgba(49,24,7,.3)",
            }}
          >
            <div className="absolute inset-0 opacity-70 [background:repeating-linear-gradient(102deg,transparent_0_24px,rgba(255,246,218,.3)_32px,rgba(87,45,13,.22)_47px,transparent_58px)]" />
            <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#4f2d10] via-[#e2b874] to-transparent opacity-80" />
            <div className="absolute bottom-[36%] left-0 h-5 w-[115%] rotate-[-2deg] bg-gradient-to-r from-[#6b3d16] via-[#e5b76d] to-[#6b3d16] shadow-[0_3px_6px_rgba(54,25,7,.35)]" />
            <div className="absolute bottom-[31%] left-[5%] h-7 w-16 rotate-[-3deg] rounded-full border border-[#f1d39a]/80 bg-gradient-to-b from-[#c9944e] via-[#8c5826] to-[#5a3211] shadow-[0_4px_12px_rgba(49,23,6,.4)]" />
            <div className="absolute bottom-[24%] left-[9%] h-24 w-12 rounded-b-[48%] bg-gradient-to-b from-[#d5a05a] via-[#93602c] to-[#53300f] shadow-[0_7px_16px_rgba(48,22,6,.48)]" />
            <div className="absolute bottom-[20%] left-[7%] h-10 w-16 rounded-b-[60%] bg-gradient-to-b from-[#e0b36d] via-[#9b632d] to-[#5b3412]" />
          </motion.div>

          {/* The central curtain is lighter, patterned and narrower than the previous version. This creates the same stage proportion as the reference. */}
          <motion.div
            animate={opening ? { x: "-108%" } : { x: 0 }}
            transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-[16%] z-20 w-[34%] overflow-hidden"
            style={{
              background: "linear-gradient(90deg,#815126 0%,#c28a4d 7%,#f4d7a5 15%,#b5793d 24%,#f7dfb2 34%,#a96e34 44%,#f5d6a0 54%,#bc8246 65%,#f8dfb0 75%,#a36a33 85%,#f2d09a 94%,#805025 100%)",
              boxShadow: "inset -22px 0 38px rgba(69,34,9,.3), 12px 0 30px rgba(61,30,8,.2)",
            }}
          >
            <div className="absolute inset-0 opacity-80 [background:repeating-linear-gradient(88deg,transparent_0_34px,rgba(255,247,225,.24)_40px,rgba(100,54,17,.15)_58px,transparent_70px)]" />
            <div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,transparent_0_86px,rgba(255,246,218,.2)_88px,transparent_94px)]" />
            <div className="absolute inset-y-0 right-0 w-px bg-[#f8e2b8]/80" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "108%" } : { x: 0 }}
            transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-[16%] z-20 w-[34%] overflow-hidden"
            style={{
              background: "linear-gradient(90deg,#805025 0%,#f2d09a 6%,#a36a33 15%,#f8dfb0 25%,#bc8246 35%,#f5d6a0 46%,#a96e34 56%,#f7dfb2 66%,#b5793d 76%,#f4d7a5 85%,#c28a4d 94%,#815126 100%)",
              boxShadow: "inset 22px 0 38px rgba(69,34,9,.3), -12px 0 30px rgba(61,30,8,.2)",
            }}
          >
            <div className="absolute inset-0 opacity-80 [background:repeating-linear-gradient(92deg,transparent_0_34px,rgba(255,247,225,.24)_40px,rgba(100,54,17,.15)_58px,transparent_70px)]" />
            <div className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(90deg,transparent_0_86px,rgba(255,246,218,.2)_88px,transparent_94px)]" />
            <div className="absolute inset-y-0 left-0 w-px bg-[#f8e2b8]/80" />
          </motion.div>

          {/* Fine gold frame lines make the centre feel like a real stage rather than two rectangles. */}
          <div className="absolute inset-y-[13%] left-[16%] z-25 w-px bg-gradient-to-b from-transparent via-[#f5d8a4]/55 to-transparent" />
          <div className="absolute inset-y-[13%] right-[16%] z-25 w-px bg-gradient-to-b from-transparent via-[#f5d8a4]/55 to-transparent" />

          {/* Small floral medallion at the seam — no monogram, no N seal. */}
          {!opening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="absolute left-1/2 top-1/2 z-[60] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#f6dfb4]/70 bg-[#6c421b]/20 shadow-[0_0_18px_rgba(255,222,165,.15)]">
                <span className="text-[#fff3d4] text-sm">✽</span>
              </div>
              <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#f6dfb4]/75 bg-[#6d421b]/10 text-[9px] uppercase tracking-[0.42em] text-[#fff6df] shadow-[0_0_24px_rgba(255,224,172,.1)] sm:h-[88px] sm:w-[88px]">
                Open
              </div>
              <p className="mt-5 text-[8px] uppercase tracking-[0.42em] text-[#fff0d2]/90">Tap anywhere to open</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
