"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const drops = [
  { left: "8%", height: "16vh", delay: 0 },
  { left: "22%", height: "12vh", delay: 0.4 },
  { left: "37%", height: "18vh", delay: 0.2 },
  { left: "52%", height: "13vh", delay: 0.6 },
  { left: "67%", height: "17vh", delay: 0.3 },
  { left: "82%", height: "12vh", delay: 0.5 },
  { left: "94%", height: "16vh", delay: 0.1 },
];

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
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#211810] text-white"
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
      <Image src="/images/hero.jpg" alt={`${groom} and ${bride}`} fill priority sizes="100vw" className="object-cover object-[center_35%] sm:object-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

      {!opening && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="absolute inset-x-0 bottom-[9%] z-50 flex flex-col items-center text-center">
          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-white/80">An invitation to celebrate love</p>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-black/10 backdrop-blur-sm sm:h-[88px] sm:w-[88px]">
            <span className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-[0.28em]"><span>Open</span><ArrowDown className="h-4 w-4 text-[#f1d19a]" strokeWidth={1.1} /></span>
          </div>
          <p className="mt-4 text-[8px] uppercase tracking-[0.34em] text-white/65">Tap to begin</p>
        </motion.div>
      )}

      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
          <motion.div initial={{ y: 0, opacity: 1 }} animate={opening ? { y: "-105%", opacity: 0 } : { y: 0, opacity: 1 }} transition={{ duration: 1.9, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-x-0 top-0 h-[15vh] min-h-[82px]">
            <div className="absolute inset-x-0 top-0 h-7 bg-gradient-to-b from-[#6f4823] via-[#c28a49] to-transparent" />
            <div className="absolute inset-x-0 top-1 h-10 bg-gradient-to-b from-[#fff0ca]/90 via-[#d2a573]/70 to-transparent blur-sm" />
            <div className="absolute inset-x-0 top-0 flex justify-between px-[2%]">{Array.from({ length: 17 }).map((_, i) => <span key={i} className="h-5 w-5 rounded-full bg-[#fff8e9] shadow-[0_2px_8px_rgba(255,239,192,.55)] sm:h-7 sm:w-7" style={{ marginTop: `${(i % 3) * 5}px` }} />)}</div>
            <div className="absolute inset-x-0 top-8 flex justify-around">{drops.map((drop, i) => (
              <motion.div key={i} initial={{ y: -4 }} animate={{ y: [-4, 2, -4] }} transition={{ duration: 3.5 + i * .15, delay: drop.delay, repeat: Infinity }} className="relative flex flex-col items-center" style={{ height: drop.height }}>
                <div className="h-full w-px bg-gradient-to-b from-[#b38a50] via-[#e3c78e] to-[#805526]" />
                <div className="absolute top-0 flex gap-0.5 -translate-y-1/2"><i className="h-4 w-4 rounded-full bg-[#fff8e9]" /><i className="h-4 w-4 rounded-full bg-[#fff8e9]" /><i className="h-4 w-4 rounded-full bg-[#fff8e9]" /></div>
                <div className="absolute bottom-0 h-7 w-8 rounded-b-[55%] bg-gradient-to-b from-[#d1a65c] via-[#91652f] to-[#5b3c1c]" />
              </motion.div>
            ))}</div>
          </motion.div>

          <motion.div initial={{ x: 0 }} animate={opening ? { x: "-98%" } : { x: 0 }} transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-y-0 left-0 z-20 w-[54%] origin-left overflow-hidden rounded-r-[24%]" style={{ background: "linear-gradient(90deg,#6f4823 0%,#b77f42 7%,#f5dfad 16%,#956332 25%,#e8c58b 35%,#81552b 45%,#f8e3b6 56%,#a8743b 67%,#efd09a 78%,#8b5a2c 89%,#d4a766 100%)", boxShadow: "inset -40px 0 70px rgba(57,31,11,.42), 20px 0 55px rgba(55,32,13,.25)" }}>
            <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(96deg,transparent_0%,rgba(255,248,228,.5)_5%,rgba(76,44,17,.22)_11%,transparent_18%)]" />
            <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-[#6b431f] via-[#f5dca9] to-transparent opacity-80" />
            <div className="absolute left-[8%] top-[18%] h-[64%] w-[22%] rounded-r-full bg-gradient-to-r from-[#4a2c16]/50 to-transparent blur-sm" />
            <div className="absolute left-[11%] top-1/2 h-1 w-16 rounded-full bg-gradient-to-r from-[#7f5325] via-[#f1ce8d] to-[#7f5325]" />
            <div className="absolute left-[14%] top-[51%] h-5 w-5 rounded-full border border-[#f3d49b] bg-[#875b2b]" />
          </motion.div>

          <motion.div initial={{ x: 0 }} animate={opening ? { x: "98%" } : { x: 0 }} transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-y-0 right-0 z-20 w-[54%] origin-right overflow-hidden rounded-l-[24%]" style={{ background: "linear-gradient(90deg,#d4a766 0%,#8b5a2c 11%,#efd09a 22%,#a8743b 33%,#f8e3b6 44%,#81552b 55%,#e8c58b 65%,#956332 75%,#f5dfad 84%,#b77f42 93%,#6f4823 100%)", boxShadow: "inset 40px 0 70px rgba(57,31,11,.42), -20px 0 55px rgba(55,32,13,.25)" }}>
            <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(84deg,transparent_0%,rgba(255,248,228,.5)_5%,rgba(76,44,17,.22)_11%,transparent_18%)]" />
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-[#6b431f] via-[#f5dca9] to-transparent opacity-80" />
            <div className="absolute right-[8%] top-[18%] h-[64%] w-[22%] rounded-l-full bg-gradient-to-l from-[#4a2c16]/50 to-transparent blur-sm" />
            <div className="absolute right-[11%] top-1/2 h-1 w-16 rounded-full bg-gradient-to-r from-[#7f5325] via-[#f1ce8d] to-[#7f5325]" />
            <div className="absolute right-[14%] top-[51%] h-5 w-5 rounded-full border border-[#f3d49b] bg-[#875b2b]" />
          </motion.div>

          <div className="absolute inset-x-0 top-0 h-[24vh] bg-[radial-gradient(circle_at_0_0,rgba(63,81,42,.9)_0_18%,transparent_19%),radial-gradient(circle_at_8%_8%,rgba(255,247,228,.95)_0_4%,transparent_5%),radial-gradient(circle_at_92%_8%,rgba(255,247,228,.95)_0_4%,transparent_5%),radial-gradient(circle_at_100%_0,rgba(63,81,42,.9)_0_18%,transparent_19%)]" />

          {!opening && (
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .55 }} className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
              <div className="mb-3 text-[10px] uppercase tracking-[.45em] text-[#fff5df]/85">NikSha</div>
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-[#f5dfb2]/85 bg-[#5f411f]/25 text-[8px] uppercase tracking-[.32em] text-[#fff7e8] sm:h-[84px] sm:w-[84px]">Open</div>
              <p className="mt-4 text-[8px] uppercase tracking-[.4em] text-[#fff4dc]/80">Tap anywhere to open</p>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
