"use client";

import usePageReducedMotion from "@/components/common/usePageReducedMotion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import styles from "./Countdown.module.css";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
const units = ["days", "hours", "minutes", "seconds"] as const;
const target = Date.parse(wedding.ceremony.dateTime);

function calculateTimeLeft(): TimeLeft {
  // Round up the remaining second so zero never appears before the ceremony.
  const seconds = Math.max(0, Math.ceil((target - Date.now()) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const reducedMotion = usePageReducedMotion();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const update = () => {
      window.clearTimeout(timer);
      if (document.hidden) return;
      const next = calculateTimeLeft();
      setTimeLeft((current) => current && units.every((unit) => current[unit] === next[unit]) ? current : next);
      // Re-read wall time each tick; do not accumulate interval drift or hidden time.
      if (Date.now() < target) timer = window.setTimeout(update, 1000 - Date.now() % 1000 + 5);
    };
    // Clock-dependent values are filled after hydration; the full layout is reserved.
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const complete = timeLeft !== null && units.every((unit) => timeLeft[unit] === 0);
  return (
    <motion.section
      id="wedding-countdown"
      aria-labelledby="wedding-countdown-title"
      initial={reducedMotion ? false : { opacity: 0, y: compact ? 14 : 20 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={compact ? "mx-auto mt-8 max-w-xl px-3 sm:mt-10" : "mx-auto mt-12 max-w-2xl sm:mt-16"}
    >
      <div className="border-y border-[#a8783f]/35 py-6 text-center sm:py-8">
        <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#76522d]">Until we say I do</p>
        <h2 id="wedding-countdown-title" className="mx-auto mt-2 max-w-sm font-heading text-[1.8rem] leading-tight text-[#292622] sm:text-4xl">Counting Down to Our Forever</h2>
        <div role="timer" aria-live="off" aria-atomic="true" aria-label="Time until our wedding ceremony" className="mt-5">
          <dl className="grid grid-cols-4 gap-1 sm:gap-3">
            {units.map((unit) => (
              <div key={unit} className={`min-w-0 rounded-sm border py-3 sm:py-4 ${unit === "seconds" ? "border-[#a8783f]/45 bg-[#e9d8b8]/55" : "border-transparent"}`}>
                <dt className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#65543c] sm:text-[10px] sm:tracking-[0.16em]">{unit}</dt>
                <dd className="mt-2 overflow-hidden font-sans text-[clamp(1.7rem,7.5vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-[#244232] tabular-nums">
                  <span key={unit === "seconds" ? timeLeft?.seconds ?? "pending" : unit} data-countdown-unit={unit} className={`block ${unit === "seconds" && timeLeft && !complete && !reducedMotion ? styles.tick : ""}`}>
                    {timeLeft ? String(timeLeft[unit]).padStart(2, "0") : "––"}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-4 font-heading text-lg italic leading-6 text-[#65543c]">{complete ? "Our forever has begun." : "Every second brings us closer."}</p>
      </div>
    </motion.section>
  );
}
