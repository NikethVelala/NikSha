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
    }, 3400);

    return () => window.clearTimeout(timer);
  }, [isOpening]);

  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory">
      <Image src="/images/hero.jpg" alt={`${groom} and ${bride}`} fill priority sizes="100vw" className="object-cover object-[center_35%] sm:object-center" />
      <div className="absolute inset-0 bg-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/85" />

      <motion.div animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -16 : 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center">
        <div className="max-w-xl">
          <p className="text-[9px] uppercase tracking-[0.5em] text-champagne sm:text-[11px]">An invitation to celebrate love</p>
          <h1 className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]">
            {groom}<span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>{bride}
          </h1>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/80 sm:mt-10 sm:text-[10px]">
            <span>Wednesday</span><span className="h-1 w-1 rounded-full bg-champagne" /><span>Visakhapatnam</span>
          </div>
        </div>
      </motion.div>

      {!isOpening && (
        <motion.button type="button" onClick={openInvitation} initial={{ opacity: 0, y: 15, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} whileTap={{ scale: 0.95 }} className="group absolute bottom-[11%] left-1/2 z-30 flex h-[86px] w-[86px] -translate-x-1/2 items-center justify-center rounded-full border border-champagne/75 bg-charcoal/25 shadow-[0_8px_40px_rgba(0,0,0,0.22)] backdrop-blur-[3px] outline-none sm:h-[94px] sm:w-[94px]" aria-label="Open the invitation">
          <span className="absolute inset-1 rounded-full border border-ivory/20 transition-transform duration-700 group-hover:scale-[1.08]" />
          <span className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-[0.22em] text-ivory/95"><span>Open</span><ArrowUpRight className="h-4 w-4 text-champagne transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.2} /></span>
        </motion.button>
      )}

      <div className={`fixed inset-0 z-[60] overflow-hidden ${isOpening ? "pointer-events-none" : "cursor-pointer"}`} onClick={openInvitation} role="button" tabIndex={isOpening ? -1 : 0} aria-label="Open the wedding invitation" onKeyDown={(event) => { if (!isOpening && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openInvitation(); } }}>
        {/* The closed scene is intentionally a clean pair of stage drapes. There are no center handles or hardware competing with the seam. */}
        <motion.div initial={false} animate={{ y: isOpening ? "-108%" : "0%" }} transition={{ duration: 1.05, delay: isOpening ? 1.65 : 0, ease: [0.76, 0, 0.24, 1] }} className="absolute left-0 right-0 top-0 h-[18vh] min-h-[112px] origin-top" style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(226,183,139,0.18) 0%, transparent 44%), repeating-linear-gradient(90deg, #251415 0%, #54282b 5%, #351a1d 10%, #71393a 16%, #3b1d20 22%, #672f32 29%, #2b1719 36%, #71393a 43%, #351a1d 50%, #54282b 57%, #251415 64%, #5c2b2e 72%, #30191b 80%, #6b3335 88%, #251415 100%)", boxShadow: "0 16px 40px rgba(19, 8, 9, 0.38)" }}>
          <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-[#6f4936] via-[#c7a276] to-[#6f4936] opacity-80" />
          <div className="absolute inset-x-0 bottom-3 h-px bg-ivory/25" />
          <div className="absolute left-1/2 top-0 h-full w-[28vw] min-w-[180px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,235,205,0.13),transparent_68%)]" />
        </motion.div>

        <motion.div initial={false} animate={{ x: isOpening ? "-105%" : "0%", scaleX: isOpening ? 0.94 : 1 }} transition={{ duration: 1.95, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-y-0 left-0 w-[53%] origin-left" style={{ background: "radial-gradient(ellipse at 76% 42%, rgba(238,194,157,0.17), transparent 24%), repeating-linear-gradient(90deg, #211314 0%, #4b2326 6%, #7b4141 12%, #3a1b1e 18%, #683235 25%, #2a1719 32%, #7a3d3f 40%, #3a1c1f 48%, #6e3538 57%, #2b1719 66%, #74383b 75%, #3a1c1f 84%, #6b3235 92%, #211314 100%)", boxShadow: "24px 0 55px rgba(17, 7, 8, 0.42)" }}>
          <div className="absolute inset-0 bg-[linear-gradient(108deg,transparent_0%,rgba(255,232,203,0.12)_16%,transparent_27%,rgba(255,232,203,0.08)_44%,transparent_57%,rgba(255,232,203,0.14)_74%,transparent_88%)]" />
          <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-champagne/45 to-transparent" />
        </motion.div>

        <motion.div initial={false} animate={{ x: isOpening ? "105%" : "0%", scaleX: isOpening ? 0.94 : 1 }} transition={{ duration: 1.95, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-y-0 right-0 w-[53%] origin-right" style={{ background: "radial-gradient(ellipse at 24% 42%, rgba(238,194,157,0.17), transparent 24%), repeating-linear-gradient(90deg, #211314 0%, #6b3235 8%, #3a1c1f 16%, #74383b 25%, #2b1719 34%, #6e3538 43%, #3a1c1f 52%, #7a3d3f 60%, #2a1719 68%, #683235 76%, #3a1b1e 84%, #7b4141 91%, #4b2326 96%, #211314 100%)", boxShadow: "-24px 0 55px rgba(17, 7, 8, 0.42)" }}>
          <div className="absolute inset-0 bg-[linear-gradient(252deg,transparent_0%,rgba(255,232,203,0.12)_16%,transparent_27%,rgba(255,232,203,0.08)_44%,transparent_57%,rgba(255,232,203,0.14)_74%,transparent_88%)]" />
          <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-champagne/45 to-transparent" />
        </motion.div>

        {!isOpening && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="pointer-events-none absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center text-[8px] uppercase tracking-[0.38em] text-champagne/80 sm:bottom-[7.5%]">Tap anywhere to open</motion.div>}
      </div>

      {isOpening && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.8 }} className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -10] }} transition={{ duration: 1.35, delay: 0.05, times: [0, 0.22, 0.76, 1], ease: [0.22, 1, 0.36, 1] }} className="text-charcoal">
          <p className="text-[9px] uppercase tracking-[0.48em] text-[#9b7653]">The celebration begins</p>
          <p className="mt-5 font-heading text-4xl tracking-[-0.025em] sm:text-6xl">{groom} <span className="font-normal italic text-[#ae8b69]">&amp;</span> {bride}</p>
          <p className="mt-4 text-[9px] uppercase tracking-[0.36em] text-charcoal/60">18 November 2026 · Visakhapatnam</p>
        </motion.div>
      </motion.div>}
    </section>
  );
}
