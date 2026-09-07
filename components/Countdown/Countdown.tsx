"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function calculateTimeLeft(): TimeLeft {
  const difference = new Date(wedding.ceremony.dateTime).getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const secondaryUnits: Array<keyof Omit<TimeLeft, "days">> = ["hours", "minutes", "seconds"];

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 max-w-xl px-3 sm:mt-10"
      >
        <div className="relative overflow-hidden border-y border-[#a8783f]/25 py-5 sm:py-6">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-20 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c49a60]/10 blur-2xl" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 text-[#a8783f]/65 sm:gap-4">
              <span className="h-px w-10 bg-[#a8783f]/30 sm:w-16" />
              <span className="text-[8px]">✦</span>
              <span className="h-px w-10 bg-[#a8783f]/30 sm:w-16" />
            </div>
            <p className="mt-3 text-[8px] uppercase tracking-[0.4em] text-[#756957] sm:mt-4 sm:text-[9px] sm:tracking-[0.45em]">Until we say I do</p>
            <div className="mt-2 flex items-baseline justify-center gap-2 sm:mt-1 sm:gap-3">
              <span className="font-heading text-[3.4rem] leading-none text-[#292622] sm:text-6xl">{timeLeft.days}</span>
              <span className="font-heading text-lg italic text-[#8c6130] sm:text-xl">days</span>
            </div>
            <div className="mx-auto mt-4 grid max-w-sm grid-cols-3 border-t border-[#a8783f]/18 pt-3 sm:mt-5 sm:pt-4">
              {secondaryUnits.map((unit) => (
                <div key={unit} className="border-r border-[#a8783f]/18 last:border-r-0">
                  <p className="font-heading text-xl leading-none text-[#292622] sm:text-2xl">{String(timeLeft[unit]).padStart(2, "0")}</p>
                  <p className="mt-1 text-[7px] uppercase tracking-[0.22em] text-[#756957] sm:text-[8px]">{unit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      className="mt-12 border-t border-line pt-8 sm:mt-16 sm:pt-12"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.36em] text-rose sm:text-[11px] sm:tracking-[0.4em]">The days are counting down</p>
          <p className="mt-2 font-heading text-xl text-charcoal sm:mt-3 sm:text-3xl">Until we say I do</p>
        </div>
        <p className="font-heading text-base text-muted sm:text-lg">18 · 11 · 2026</p>
      </div>
      <div className="mt-6 border-y border-line sm:mt-8 sm:flex sm:items-end">
        <div className="px-1 py-6 sm:flex-1 sm:px-5 sm:py-8">
          <p className="font-heading text-[4.5rem] leading-none text-charcoal sm:text-8xl lg:text-9xl">{String(timeLeft.days).padStart(2, "0")}</p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-muted sm:mt-3 sm:text-[10px]">Days</p>
        </div>
        <div className="grid grid-cols-3 border-t border-line sm:flex sm:border-l sm:border-t-0">
          {secondaryUnits.map((unit) => (
            <div key={unit} className="border-r border-line px-3 py-5 last:border-r-0 sm:min-w-28 sm:px-6 sm:py-7">
              <p className="font-heading text-3xl leading-none text-charcoal sm:text-4xl">{String(timeLeft[unit]).padStart(2, "0")}</p>
              <p className="mt-2 text-[8px] uppercase tracking-[0.24em] text-muted sm:mt-3 sm:text-[9px] sm:tracking-[0.28em]">{unit}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
