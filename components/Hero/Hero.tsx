"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      requestAnimationFrame(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#6f4728] text-white"
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
      <div className="absolute inset-0 bg-[#5d3a22]" />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={opening ? { scale: 1.08, opacity: 0.22 } : { scale: 1, opacity: 0.38 }}
          transition={{ duration: 2.6, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-[#2d180b]/45" />
      </div>

      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
          <motion.div
            animate={opening ? { x: "-101%" } : { x: 0 }}
            transition={{ duration: 2.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-left bg-no-repeat"
              style={{ backgroundImage: "url('/images/curtain-reference.webp')", backgroundSize: "200% 100%" }}
            />
            <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-[#f7e3b9]/50 via-[#8f5b2b]/80 to-[#f7e3b9]/40" />
          </motion.div>

          <motion.div
            animate={opening ? { x: "101%" } : { x: 0 }}
            transition={{ duration: 2.35, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-right bg-no-repeat"
              style={{ backgroundImage: "url('/images/curtain-reference.webp')", backgroundSize: "200% 100%" }}
            />
            <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-[#f7e3b9]/50 via-[#8f5b2b]/80 to-[#f7e3b9]/40" />
          </motion.div>

          {!opening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            >
              <div className="mb-4 text-[#fff2d4] text-xl">✽</div>
              <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full border border-[#f8e3bc]/80 bg-black/10 text-[9px] uppercase tracking-[0.42em] text-[#fff7e7] backdrop-blur-[1px] sm:h-[88px] sm:w-[88px]">
                Open
              </div>
              <p className="mt-5 text-[8px] uppercase tracking-[0.42em] text-[#fff1d7]/90">Tap anywhere to open</p>
            </motion.div>
          )}
        </div>
      )}

      <div className="sr-only">
        {wedding.couple.groom} &amp; {wedding.couple.bride}
      </div>
    </section>
  );
}
