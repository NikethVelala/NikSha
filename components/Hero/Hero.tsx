"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const petals = [
  { left: "6%", delay: 0.2, duration: 6.8, drift: "18vw", rotate: 140, size: "w-3 h-2" },
  { left: "14%", delay: 1.8, duration: 7.5, drift: "-10vw", rotate: 220, size: "w-2.5 h-1.5" },
  { left: "23%", delay: 3.1, duration: 6.2, drift: "14vw", rotate: 80, size: "w-4 h-2" },
  { left: "34%", delay: 0.9, duration: 8.1, drift: "-12vw", rotate: 190, size: "w-2.5 h-1.5" },
  { left: "47%", delay: 2.4, duration: 7.1, drift: "9vw", rotate: 280, size: "w-3 h-2" },
  { left: "58%", delay: 4.2, duration: 6.7, drift: "-15vw", rotate: 120, size: "w-4 h-2" },
  { left: "69%", delay: 1.3, duration: 7.8, drift: "12vw", rotate: 250, size: "w-2.5 h-1.5" },
  { left: "79%", delay: 3.7, duration: 6.4, drift: "-9vw", rotate: 70, size: "w-3 h-2" },
  { left: "91%", delay: 0.6, duration: 7.4, drift: "-17vw", rotate: 210, size: "w-4 h-2" },
];

function FloralSprig({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-28 w-28 sm:h-40 sm:w-40`} aria-hidden="true">
      <div className={`absolute ${side === "left" ? "left-0" : "right-0"} top-0 h-full w-full ${side === "left" ? "rounded-br-[100%]" : "rounded-bl-[100%]"} bg-gradient-to-br from-[#31533b]/75 via-[#61744b]/30 to-transparent`} />
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-3 w-3 rounded-full border border-[#f7ead1]/70 bg-[#fff7e8] shadow-[0_1px_8px_rgba(255,244,214,0.45)] sm:h-4 sm:w-4"
          style={{
            top: `${8 + (index % 4) * 18}%`,
            [side === "left" ? "left" : "right"]: `${4 + Math.floor(index / 4) * 16}%`,
            transform: `rotate(${index * 17}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function HangingGarlands() {
  const garlands = ["12%", "28%", "50%", "72%", "88%"];
  return (
    <div className="absolute inset-x-0 top-0 z-20 h-32 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#8d663c] via-[#d7b77f] to-[#8d663c] shadow-[0_4px_18px_rgba(78,49,23,0.2)]" />
      {garlands.map((left, index) => (
        <div key={left} className="absolute top-1 flex flex-col items-center" style={{ left }}>
          <div className="h-7 w-px bg-[#9b7545]/70" />
          <div className="flex -space-x-1">
            {[0, 1, 2].map((flower) => (
              <span key={flower} className="h-3 w-3 rounded-full border border-[#ead4a7]/70 bg-[#fff8e8] shadow-[0_2px_6px_rgba(93,59,28,0.16)] sm:h-4 sm:w-4" />
            ))}
          </div>
          <div className="h-8 w-px bg-[#9b7545]/50" />
          <div className="relative h-6 w-7 rounded-b-full border-b-2 border-[#b18a4f] bg-gradient-to-b from-[#b9904e] to-[#68451f] shadow-[0_3px_7px_rgba(55,33,15,0.25)]">
            <span className="absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#d5ae6c]" />
          </div>
          {index % 2 === 0 && <div className="mt-1 h-4 w-px bg-[#9b7545]/45" />}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [isOpening, setIsOpening] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!isOpening) return;
    const timer = window.setTimeout(() => {
      document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [isOpening]);

  const openInvitation = () => {
    if (!isOpening) setIsOpening(true);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory">
      <Image src="/images/hero.jpg" alt={`${groom} and ${bride}`} fill priority sizes="100vw" className="object-cover object-[center_35%] sm:object-center" />
      <div className="absolute inset-0 bg-charcoal/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/80" />

      <motion.div animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -16 : 0 }} transition={{ duration: 0.55 }} className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center">
        <div className="max-w-xl">
          <p className="text-[9px] uppercase tracking-[0.5em] text-champagne sm:text-[11px]">An invitation to celebrate love</p>
          <h1 className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]">
            {groom}<span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>{bride}
          </h1>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/80 sm:mt-10 sm:text-[10px]"><span>Wednesday</span><span className="h-1 w-1 rounded-full bg-champagne" /><span>Visakhapatnam</span></div>
        </div>
      </motion.div>

      <div className={`fixed inset-0 z-[60] overflow-hidden ${isOpening ? "pointer-events-none" : "cursor-pointer"}`} onClick={openInvitation} role="button" tabIndex={isOpening ? -1 : 0} aria-label="Open the wedding invitation" onKeyDown={(event) => { if (!isOpening && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openInvitation(); } }}>
        <div className="absolute inset-0 bg-[#f2e4c9]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,250,232,0.92),rgba(236,215,179,0.35)_48%,rgba(121,83,43,0.18)_100%)]" />

        <FloralSprig side="left" />
        <FloralSprig side="right" />
        <HangingGarlands />

        <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-[#8d693f]/20 to-transparent" />

        {petals.map((petal, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: "-12vh", x: 0, rotate: petal.rotate }}
            animate={{ opacity: [0, 0.9, 0.75, 0], y: ["-12vh", "38vh", "76vh", "112vh"], x: [0, petal.drift, `calc(${petal.drift} * -0.35)`, petal.drift], rotate: petal.rotate + 260 }}
            transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
            className={`absolute top-0 z-40 ${petal.size} rounded-[70%_30%_70%_30%] bg-[#fff4dc]/85 shadow-[0_2px_10px_rgba(120,82,41,0.16)]`}
            style={{ left: petal.left }}
          />
        ))}

        <motion.div initial={false} animate={{ x: isOpening ? "-108%" : "0%" }} transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-y-0 left-0 z-30 w-[58%] origin-left" style={{ background: "linear-gradient(90deg,#9d7448 0%,#f0ddba 9%,#d2b17d 17%,#f7e8c9 28%,#b58a55 38%,#ead3aa 50%,#b28652 63%,#f2dfbd 74%,#b07f4c 86%,#f3dfbd 96%,#9a6d40 100%)", boxShadow: "20px 0 60px rgba(92,57,25,0.22)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(255,255,255,0.55),transparent_28%),repeating-linear-gradient(90deg,transparent 0%,rgba(111,72,32,0.13) 8%,transparent 16%,rgba(255,249,229,0.18) 25%,transparent 35%)]" />
          <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent via-[#fff1d2]/35 to-[#7e572f]/25" />
        </motion.div>

        <motion.div initial={false} animate={{ x: isOpening ? "108%" : "0%" }} transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-y-0 right-0 z-30 w-[58%] origin-right" style={{ background: "linear-gradient(90deg,#9a6d40 0%,#f3dfbd 10%,#b07f4c 24%,#f2dfbd 36%,#b28652 47%,#ead3aa 58%,#b58a55 68%,#f7e8c9 78%,#d2b17d 88%,#f0ddba 96%,#9d7448 100%)", boxShadow: "-20px 0 60px rgba(92,57,25,0.22)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(255,255,255,0.55),transparent_28%),repeating-linear-gradient(90deg,transparent 0%,rgba(111,72,32,0.13) 8%,transparent 16%,rgba(255,249,229,0.18) 25%,transparent 35%)]" />
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-l from-transparent via-[#fff1d2]/35 to-[#7e572f]/25" />
        </motion.div>

        <motion.div initial={false} animate={{ y: isOpening ? "-120%" : "0%" }} transition={{ duration: 1.2, delay: isOpening ? 1.65 : 0, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-x-0 top-0 z-50 h-[17vh] min-h-[105px] bg-[linear-gradient(180deg,#8e663c,#d7b77f_18%,#f1ddbb_43%,#c39b63_72%,#8c6339)] shadow-[0_18px_40px_rgba(75,45,20,0.25)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0%,rgba(93,55,24,0.14)_6%,rgba(255,248,225,0.16)_13%,transparent_20%)]" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#7d562f] via-[#e1c187] to-[#7d562f]" />
        </motion.div>

        <motion.div animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.94 : 1 }} transition={{ duration: 0.7 }} className="absolute inset-0 z-[70] flex items-center justify-center">
          <div className="mt-[34vh] flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#b48a54]/75 bg-[#f7ead1]/25 shadow-[0_5px_25px_rgba(89,56,25,0.12)] backdrop-blur-[2px] sm:h-20 sm:w-20">
              <div className="flex flex-col items-center gap-1 text-[#74512e]"><span className="text-[8px] uppercase tracking-[0.35em]">Open</span><ArrowDown className="h-4 w-4" strokeWidth={1.1} /></div>
            </div>
            <p className="text-[8px] uppercase tracking-[0.42em] text-[#765533]/80 sm:text-[9px]">Tap anywhere to open</p>
            <div className="mt-4 flex items-center gap-3 text-[#a47a47]/70"><span className="h-px w-12 bg-[#b58b58]/60" /><span className="text-[13px]">✦</span><span className="h-px w-12 bg-[#b58b58]/60" /></div>
          </div>
        </motion.div>
      </div>

      {isOpening && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.8 }} className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center px-8 text-center"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -10] }} transition={{ duration: 1.35, times: [0, 0.22, 0.76, 1], ease: [0.22, 1, 0.36, 1] }} className="text-charcoal"><p className="text-[9px] uppercase tracking-[0.48em] text-[#9b7653]">The celebration begins</p><p className="mt-5 font-heading text-4xl tracking-[-0.025em] sm:text-6xl">{groom} <span className="font-normal italic text-[#ae8b69]">&amp;</span> {bride}</p><p className="mt-4 text-[9px] uppercase tracking-[0.36em] text-charcoal/60">18 November 2026 · Visakhapatnam</p></motion.div></motion.div>}
    </section>
  );
}
