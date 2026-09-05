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

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

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
          <p className="font-heading text-[4.5rem] leading-none text-charcoal sm:text-8xl lg:text-9xl">
            {String(timeLeft.days).padStart(2, "0")}
          </p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-muted sm:mt-3 sm:text-[10px]">Days</p>
        </div>

        <div className="grid grid-cols-3 border-t border-line sm:flex sm:border-l sm:border-t-0">
          {secondaryUnits.map((unit) => (
            <div key={unit} className="border-r border-line px-3 py-5 last:border-r-0 sm:min-w-28 sm:px-6 sm:py-7">
              <p className="font-heading text-3xl leading-none text-charcoal sm:text-4xl">
                {String(timeLeft[unit]).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[8px] uppercase tracking-[0.24em] text-muted sm:mt-3 sm:text-[9px] sm:tracking-[0.28em]">{unit}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
