"use client";

import usePageReducedMotion from "@/components/common/usePageReducedMotion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import styles from "./Hero.module.css";
import EnvelopeOpening from "./EnvelopeOpening";

export default function Hero() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reveal, setReveal] = useState(false);
  const reducedMotion = usePageReducedMotion();
  const openingReducedMotion = useRef(false);
  const portraitRef = useRef<HTMLImageElement>(null);

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
    // Keep this visit's timers stable if the OS preference changes mid-opening.
    const reducedMotion = openingReducedMotion.current;
    let hasScrolled = window.scrollY > 0;
    let scrollFrame = 0;
    let autoScrollTimer = 0;
    const photo = portraitRef.current;
    const cancelAutoScroll = () => {
      hasScrolled = true;
      window.clearTimeout(autoScrollTimer);
      window.cancelAnimationFrame(scrollFrame);
      photo?.removeEventListener("load", onPhotoLoaded);
    };
    const handoff = () => {
      scrollFrame = requestAnimationFrame(() => {
        window.removeEventListener("scroll", cancelAutoScroll);
        if (!hasScrolled && window.scrollY === 0) {
          document.getElementById("welcome")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        }
      });
    };
    const onPhotoLoaded = () => {
      if (!hasScrolled) autoScrollTimer = window.setTimeout(handoff, 2000);
    };
    // Once a guest starts exploring, the timed handoff must not move them back.
    window.addEventListener("scroll", cancelAutoScroll, { passive: true, once: true });
    window.dispatchEvent(new CustomEvent("niksha-curtain-open")); // Preserve existing listeners during the envelope transition.
    const revealTimer = window.setTimeout(() => setReveal(true), reducedMotion ? 50 : 1100);
    const finishTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      if (hasScrolled) return;
      // Reduced motion used to skip the portrait in the same frame as curtain removal.
      // A slow photo also gets time to appear before any automatic handoff.
      if (photo?.complete && photo.naturalWidth > 0) {
        autoScrollTimer = window.setTimeout(handoff, reducedMotion ? 2000 : 0);
      } else {
        photo?.addEventListener("load", onPhotoLoaded, { once: true });
      }
    }, reducedMotion ? 150 : 3400);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
      window.clearTimeout(autoScrollTimer);
      photo?.removeEventListener("load", onPhotoLoaded);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", cancelAutoScroll);
    };
  }, [opening]);

  const open = () => {
    if (!opening) { openingReducedMotion.current = reducedMotion; setOpening(true); }
  };

  return (
    <section className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#2d160b] text-white">
      <div className="absolute inset-0 bg-[#2d160b]" />
      <div className={`${styles.composition} absolute inset-0 overflow-hidden`}>
        <motion.div animate={opening ? { scale: 1.06, opacity: 1 } : { scale: 1, opacity: 0.12 }} transition={{ duration: reducedMotion ? 0.35 : 3.5, ease: [0.76, 0, 0.24, 1] }} className={`${styles.photograph} absolute inset-0`}>
          <Image ref={portraitRef} id="welcome-portrait" src="/images/optimized/hero.webp" alt="Niketh and Sirisha exchanging rings at their engagement" fill sizes="100vw" unoptimized preload className="object-cover max-md:object-contain" />
        </motion.div>
        <div className={`${styles.veil} absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(246,213,164,0.2),transparent_32%),linear-gradient(180deg,rgba(20,8,3,0.2),rgba(20,8,3,0.5))]`} />

        <motion.div className={`${styles.copy} absolute inset-0 z-10 flex items-center justify-center px-6 text-center`} initial={false} animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: reducedMotion ? 0.25 : 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="max-w-4xl">
            <motion.p className="text-[10px] uppercase tracking-[0.48em] text-champagne-light sm:text-xs" animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: reducedMotion ? 0.2 : 0.8 }}>Together Forever</motion.p>
            <motion.div className="mx-auto mt-5 flex items-center justify-center gap-3" animate={reveal ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.2 }} transition={{ duration: reducedMotion ? 0.2 : 0.9, delay: reducedMotion ? 0 : 0.12 }}><span className="h-px w-12 bg-champagne-light/55 sm:w-20" /><span className="text-[9px] text-champagne-light">✦</span><span className="h-px w-12 bg-champagne-light/55 sm:w-20" /></motion.div>
            <motion.h1 className="mt-6 font-heading text-6xl leading-[0.9] text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.42)] sm:text-8xl lg:text-[9.5rem]" animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }} transition={{ duration: reducedMotion ? 0.25 : 1.2, delay: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}>{wedding.couple.groom} <span className="text-champagne-light">&amp;</span> {wedding.couple.bride}</motion.h1>
            <motion.p className="mt-6 font-heading text-lg italic text-white/85 sm:text-2xl" animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: reducedMotion ? 0.2 : 0.9, delay: reducedMotion ? 0 : 0.3 }}>A beautiful beginning to our forever.</motion.p>
          </div>
        </motion.div>
      </div>

      {visible && <EnvelopeOpening opening={opening} onOpen={open} reducedMotion={reducedMotion} />}
      <div className="sr-only">{wedding.couple.groom} &amp; {wedding.couple.bride}. Tap the wax seal to open the wedding invitation.</div>
    </section>
  );
}
