"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const curtainImage = "/images/curtain-clean.png";
const curtainMobileImage = "/images/curtain-mobile.png";

function CurtainHalf({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} h-[100dvh] w-1/2 overflow-hidden will-change-transform`}
      style={{ perspective: "1800px", transformStyle: "preserve-3d", transformOrigin: isLeft ? "right center" : "left center" }}
      animate={opening ? { x: isLeft ? "-103%" : "103%", scaleX: 0.72, rotateY: isLeft ? -14 : 14, skewY: isLeft ? -1.2 : 1.2, opacity: 0.98 } : { x: [0, isLeft ? "0.22%" : "-0.22%", isLeft ? "-0.12%" : "0.12%", 0], scaleX: [1, 0.998, 1.002, 1], rotateY: [0, isLeft ? -0.5 : 0.5, isLeft ? 0.35 : -0.35, 0], skewY: [0, isLeft ? -0.15 : 0.15, isLeft ? 0.1 : -0.1, 0], opacity: 1 }}
      transition={opening ? { duration: 3.1, ease: [0.65, 0, 0.2, 1] } : { duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={curtainMobileImage} />
        <motion.img src={curtainImage} alt="" draggable={false} className="absolute left-0 top-0 h-[100dvh] w-[100vw] max-w-none select-none object-fill" style={{ left: isLeft ? "0" : "-50vw" }} animate={opening ? { scale: 1.045, x: isLeft ? "-1.8%" : "1.8%" } : { scale: [1, 1.006, 1], x: [0, isLeft ? "0.3%" : "-0.3%", 0] }} transition={opening ? { duration: 3.1, ease: [0.65, 0, 0.2, 1] } : { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }} />
      </picture>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 w-24 opacity-70 blur-xl ${isLeft ? "right-[-2rem] bg-gradient-to-l" : "left-[-2rem] bg-gradient-to-r"} from-black/45 via-black/15 to-transparent`} />
    </motion.div>
  );
}

function Tieback({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";
  return (
    <motion.div aria-hidden="true" className={`pointer-events-none absolute top-[57%] z-[108] hidden h-16 w-12 sm:block ${isLeft ? "left-[calc(50%-3rem)]" : "right-[calc(50%-3rem)]"}`} animate={opening ? { x: isLeft ? "-24vw" : "24vw", opacity: 0 } : { x: 0, opacity: 1 }} transition={{ duration: 3.05, delay: 0.05, ease: [0.65, 0, 0.2, 1] }}>
      <div className={`absolute top-1/2 h-px w-12 ${isLeft ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#f1d09f]/0 via-[#d2a15d] to-[#8b5a25]/40`} />
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#f0d1ad]/80 bg-[#8a5425] shadow-[0_2px_12px_rgba(0,0,0,0.28)]" />
      <div className="absolute left-1/2 top-[calc(50%+10px)] h-7 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#e8c184] to-[#7d4f1b]" />
    </motion.div>
  );
}

export default function Hero() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);
  const reducedMotion = useReducedMotion();

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
    window.dispatchEvent(new CustomEvent("niksha-curtain-open"));
    const revealTimer = window.setTimeout(() => setReveal(true), reducedMotion ? 250 : 1900);
    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      requestAnimationFrame(() => document.getElementById("welcome")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }));
    }, reducedMotion ? 800 : 5000);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [opening, reducedMotion]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <section className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#2d160b] text-white" onClick={open} role="button" tabIndex={0} aria-label="Open the wedding invitation" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }}>
      <div className="absolute inset-0 bg-[#2d160b]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={opening ? { scale: 1.06, opacity: 1 } : { scale: 1, opacity: 0.12 }} transition={{ duration: reducedMotion ? 0.35 : 3.5, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(246,213,164,0.2),transparent_32%),linear-gradient(180deg,rgba(20,8,3,0.2),rgba(20,8,3,0.5))]" />

        <motion.div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center" initial={false} animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: reducedMotion ? 0.25 : 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="max-w-4xl">
            <motion.p className="text-[10px] uppercase tracking-[0.48em] text-champagne-light sm:text-xs" animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: reducedMotion ? 0.2 : 0.8 }}>Together Forever</motion.p>
            <motion.div className="mx-auto mt-5 flex items-center justify-center gap-3" animate={reveal ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }} transition={{ duration: reducedMotion ? 0.2 : 0.9, delay: reducedMotion ? 0 : 0.12 }}><span className="h-px w-12 bg-champagne-light/55 sm:w-20" /><span className="text-[9px] text-champagne-light">✦</span><span className="h-px w-12 bg-champagne-light/55 sm:w-20" /></motion.div>
            <motion.h1 className="mt-6 font-heading text-6xl leading-[0.9] text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.42)] sm:text-8xl lg:text-[9.5rem]" animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }} transition={{ duration: reducedMotion ? 0.25 : 1.2, delay: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}>{wedding.couple.groom} <span className="text-champagne-light">&amp;</span> {wedding.couple.bride}</motion.h1>
            <motion.p className="mt-6 font-heading text-lg italic text-white/85 sm:text-2xl" animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: reducedMotion ? 0.2 : 0.9, delay: reducedMotion ? 0 : 0.3 }}>A beautiful beginning to our forever.</motion.p>
          </div>
        </motion.div>
      </div>

      {visible && (
        <div className="pointer-events-auto fixed inset-0 z-[90] h-[100dvh] w-[100vw] overflow-hidden" aria-hidden="true">
          <CurtainHalf side="left" opening={opening} />
          <CurtainHalf side="right" opening={opening} />
          <Tieback side="left" opening={opening} />
          <Tieback side="right" opening={opening} />
          {!opening && (
            <motion.div className="pointer-events-none absolute inset-x-0 bottom-[9%] z-[115] flex justify-center px-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0.65, 1, 0.65], y: [10, 0, 10] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="rounded-full border border-[#f0d1ad]/65 bg-black/25 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-[3px]">Tap to Open</div>
            </motion.div>
          )}
          {opening && (
            <motion.div className="pointer-events-none absolute inset-0 z-[112] bg-[radial-gradient(circle_at_50%_50%,rgba(255,232,195,0.28),transparent_30%)]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: reducedMotion ? 0.4 : 2.6, ease: "easeOut" }} />
          )}
        </div>
      )}
      <div className="sr-only">{wedding.couple.groom} &amp; {wedding.couple.bride}. Tap anywhere to open the wedding invitation.</div>
    </section>
  );
}
