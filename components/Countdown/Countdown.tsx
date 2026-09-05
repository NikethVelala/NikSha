"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft {
  const weddingDate = new Date(wedding.ceremony.dateTime).getTime();
  const difference = weddingDate - Date.now();

  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const units: Array<keyof TimeLeft> = ["days", "hours", "minutes", "seconds"];

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
      className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-rose">The days are counting down</p>
          <p className="mt-3 font-heading text-2xl text-charcoal sm:text-3xl">Until we say I do</p>
        </div>
        <p className="font-heading text-lg text-muted">18 · 11 · 2026</p>
      </div>

      <div className="mt-8 grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {units.map((unit, index) => (
          <motion.div
            key={unit}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="border-b border-line px-4 py-6 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:py-7 sm:last:border-r-0"
          >
            <p className="font-heading text-4xl leading-none text-charcoal sm:text-5xl">
              {String(timeLeft[unit]).padStart(2, "0")}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted">{unit}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
