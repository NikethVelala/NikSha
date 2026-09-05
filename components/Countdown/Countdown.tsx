"use client";

import { useEffect, useState } from "react";
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

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

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

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="mt-16 border-y border-line py-12 sm:mt-20 sm:py-14">
      <p className="text-center text-[11px] uppercase tracking-[0.4em] text-muted">
        Until we say I do
      </p>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
        {units.map((unit) => (
          <div key={unit} className="px-4 py-5 text-center sm:py-2">
            <p className="font-heading text-4xl text-charcoal sm:text-5xl">
              {String(timeLeft[unit]).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted">
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
