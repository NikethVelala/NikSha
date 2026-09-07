"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const curtainImage = "/images/curtain-clean.png";
const curtainMobileImage = "/images/curtain-mobile.png";

function CurtainHalf({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} h-[100dvh] w-1/2 min-w-0 overflow-hidden will-change-transform`}
      style={{ perspective: "1800px", transformStyle: "preserve-3d", transformOrigin: isLeft ? "right center" : "left center" }}
      animate={opening ? { x: isLeft ? "-102%" : "102%", scaleX: 0.78, rotateY: isLeft ? -12 : 12, skewY: isLeft ? -0.8 : 0.8 } : { x: [0, isLeft ? "0.22%" : "-0.22%", isLeft ? "-0.12%" : "0.12%", 0], scaleX: [1, 0.998, 1.002, 1], rotateY: [0, isLeft ? -0.5 : 0.5, isLeft ? 0.35 : -0.35, 0], skewY: [0, isLeft ? -0.15 : 0.15, isLeft ? 0.1 : -0.1, 0] }}
      transition={opening ? { duration: 3.15, ease: [0.65, 0, 0.2, 1] } : { duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={curtainMobileImage} />
        <motion.img
          src={curtainImage}
          alt=""
          draggable={false}
          className="absolute left-0 top-0 h-[100dvh] w-[100vw] max-w-none select-none object-fill"
          style={{ left: isLeft ? "0" : "-50vw" }}
          animate={opening ? { scale: 1.025, x: isLeft ? "-1.5%" : "1.5%" } : { scale: [1, 1.006, 1], x: [0, isLeft ? "0.3%" : "-0.3%", 0] }}
          transition={opening ? { duration: 3.15, ease: [0.65, 0, 0.2, 1] } : { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
      </picture>
    </motion.div>
  );
}

export default function Hero() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (!opening && visible) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [opening, visible]);

  useEffect(() => {
    if (!opening) return;
    const revealTimer = window.setTimeout(() => setReveal(true), 2650);
    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      requestAnimationFrame(() => document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }, 5450);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [opening]);

  const open = () => { if (!opening) setOpening(true); };

  return (
    <section
      className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#4a2b16] text-white"
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
        <motion.div animate={opening ? { scale: 1.04, opacity: 1 } : { scale: 1, opacity: 0.18 }} transition={{ duration: 3.1, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#241205]/35" />

        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
          initial={false}
          animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-3xl">
            <motion.p
              className="text-[10px] uppercase tracking-[0.45em] text-champagne-light sm:text-xs"
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Together Forever
            </motion.p>
            <motion.h1
              className="mt-5 font-heading text-6xl leading-none text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.35)] sm:text-8xl lg:text-9xl"
              animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {wedding.couple.groom} <span className="text-champagne-light">&amp;</span> {wedding.couple.bride}
            </motion.h1>
            <motion.div
              className="mx-auto mt-6 h-px w-20 bg-champagne-light/75"
              animate={reveal ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }}
              transition={{ duration: 1, delay: 0.65 }}
            />
          </div>
        </motion.div>
      </div>

      {visible && (
        <div className="pointer-events-auto fixed inset-0 z-[90] h-[100dvh] w-[100vw] overflow-hidden" aria-hidden="true">
          <CurtainHalf side="left" opening={opening} />
          <CurtainHalf side="right" opening={opening} />
          {!opening && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-[10%] z-[100] flex justify-center px-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0.65, 1, 0.65], y: [8, 0, 8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-full border border-white/55 bg-black/20 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur-[2px]">
                Tap to Open
              </div>
            </motion.div>
          )}
        </div>
      )}
      <div className="sr-only">{wedding.couple.groom} &amp; {wedding.couple.bride}. Tap anywhere to open the wedding invitation.</div>
    </section>
  );
}
