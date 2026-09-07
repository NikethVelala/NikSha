"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const curtainImage = "/images/curtain-reference.webp";

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
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#4a2b16] text-white"
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
      <div className="absolute inset-0 bg-[#4a2b16]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={opening ? { scale: 1.04, opacity: 1 } : { scale: 1, opacity: 0.18 }}
          transition={{ duration: 2.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-[#241205]/35" />
      </div>

      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
          <motion.div
            animate={opening ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 2.75, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#d4a66d] will-change-transform"
          >
            <img
              src={curtainImage}
              alt=""
              draggable={false}
              className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none select-none object-fill"
            />
          </motion.div>

          <motion.div
            animate={opening ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 2.75, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#d4a66d] will-change-transform"
          >
            <img
              src={curtainImage}
              alt=""
              draggable={false}
              className="absolute inset-y-0 h-full w-[200%] max-w-none select-none object-fill"
              style={{ left: "-100%" }}
            />
          </motion.div>
        </div>
      )}

      <div className="sr-only">
        {wedding.couple.groom} &amp; {wedding.couple.bride}. Tap anywhere to open the wedding invitation.
      </div>
    </section>
  );
}
