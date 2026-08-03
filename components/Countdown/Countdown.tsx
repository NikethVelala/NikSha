"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Countdown() {

  const calculateTimeLeft = () => {

const weddingDate = new Date(2026, 10, 18, 10, 30, 0);


const difference = weddingDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  // Tell React we're now running in the browser
  setMounted(true);

  // Set the initial countdown
  setTimeLeft(calculateTimeLeft());

  // Update every second
  const interval = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(interval);
}, []);

if (!mounted) {
  return null;
}

  return (
    <div className="mt-16 border-y border-stone-200 py-12">

      <p className="text-sm uppercase tracking-[0.35em] text-stone-500">
        Countdown
      </p>

      <h2 className="mt-6 font-heading text-6xl text-stone-900">
        {timeLeft.days}
      </h2>

      <p className="mt-2 text-lg text-stone-500">
        Days Remaining
      </p>

      <div className="mt-10 flex justify-center gap-8">

        <div className="text-center">
          <p className="font-heading text-4xl">
            {timeLeft.hours}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Hours
          </p>
        </div>

        <div className="text-center">
          <p className="font-heading text-4xl">
            {timeLeft.minutes}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Minutes
          </p>
        </div>

        <div className="text-center">
          <p className="font-heading text-4xl">
            {timeLeft.seconds}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Seconds
          </p>
        </div>

      </div>

    </div>
  );
}