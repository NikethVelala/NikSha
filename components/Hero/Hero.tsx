"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [stage, setStage] = useState<"cover" | "opening" | "done">("cover");
  const [sealOpened, setSealOpened] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!sealOpened) return;

    const revealTimer = window.setTimeout(() => setCardRevealed(true), 1650);
    const finishTimer = window.setTimeout(() => {
      setStage("done");
      window.setTimeout(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }, 4800);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [sealOpened]);

  const openInvitation = () => {
    if (stage !== "cover") return;
    setStage("opening");
    window.setTimeout(() => setSealOpened(true), 950);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory">
      <Image
        src="/images/hero.jpg"
        alt={`${groom} and ${bride}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-center"
      />

      <div className="absolute inset-0 bg-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/10 to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_12%,rgba(20,20,18,0.42)_100%)]" />

      <AnimatePresence mode="wait">
        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
            transition={{ duration: 1 }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pb-8 text-center"
          >
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="text-[9px] uppercase tracking-[0.5em] text-champagne sm:text-[11px]"
              >
                An invitation to celebrate love
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]"
              >
                {groom}
                <span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>
                {bride}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/75 sm:mt-10 sm:text-[10px]"
              >
                <span>Wednesday</span>
                <span className="h-1 w-1 rounded-full bg-champagne" />
                <span>Visakhapatnam</span>
              </motion.div>

              <motion.button
                type="button"
                onClick={openInvitation}
                initial={{ opacity: 0, y: 18, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                aria-label="Open the invitation"
                className="group mt-10 flex flex-col items-center gap-3 mx-auto outline-none sm:mt-12"
              >
                <span className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full border border-champagne/70 bg-charcoal/20 shadow-[0_12px_35px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:border-champagne group-hover:bg-champagne/10 group-focus-visible:ring-2 group-focus-visible:ring-champagne/70 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-charcoal/50 sm:h-[74px] sm:w-[74px]">
                  <span className="absolute inset-[6px] rounded-full border border-champagne/20" />
                  <ArrowDown className="h-5 w-5 text-champagne transition-transform duration-500 group-hover:translate-y-1" strokeWidth={1.2} />
                </span>
                <span className="text-[8px] uppercase tracking-[0.38em] text-ivory/80 sm:text-[9px]">Open invitation</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === "opening" && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-30 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#24221e] px-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(205,175,138,0.16),transparent_48%)]" />

            <motion.div
              className="absolute inset-0 opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1.5 }}
              aria-hidden="true"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute h-1 w-1 rounded-full bg-champagne/50"
                  style={{ left: `${8 + ((index * 19) % 84)}%`, top: `${12 + ((index * 31) % 72)}%` }}
                  animate={{ y: [0, -12, 0], opacity: [0.15, 0.55, 0.15] }}
                  transition={{ duration: 4 + (index % 3) * 0.6, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }}
                />
              ))}
            </motion.div>

            <div className="relative z-10 w-[min(92vw,440px)]">
              <div className="relative mx-auto h-[370px] w-full max-w-[390px] [perspective:1400px] sm:h-[420px] sm:max-w-[430px]">
                {/* The invitation card starts completely hidden behind the closed envelope. */}
                <motion.div
                  className="absolute left-1/2 top-[19%] z-[2] h-[61%] w-[78%] -translate-x-1/2 bg-[#f5eee3] shadow-[0_22px_55px_rgba(0,0,0,0.34)]"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: cardRevealed ? -72 : 0, opacity: cardRevealed ? 1 : 0 }}
                  transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-[10px] border border-[#aa8a64]/35" />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 8 }}
                    transition={{ delay: 0.35, duration: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-[#332d27]"
                  >
                    <p className="text-[7px] uppercase tracking-[0.4em] text-[#9b7b5a]">With our families</p>
                    <div className="my-4 h-px w-10 bg-[#b79a76]/55" />
                    <p className="font-heading text-[1.65rem] leading-tight sm:text-3xl">We invite you</p>
                    <p className="mt-1 font-heading text-lg italic text-[#94704f] sm:text-xl">to celebrate with us</p>
                    <p className="mt-5 font-heading text-2xl sm:text-3xl">{groom} <span className="text-[#9b4f4d]">&amp;</span> {bride}</p>
                    <p className="mt-2 text-[7px] uppercase tracking-[0.26em] text-[#80766d]">18 November 2026 · Visakhapatnam</p>
                  </motion.div>
                </motion.div>

                {/* One continuous envelope body. The front pocket sits above the card and hides it until the flap opens. */}
                <motion.div
                  className="absolute left-1/2 bottom-[8%] z-[5] h-[57%] w-[88%] -translate-x-1/2 overflow-hidden rounded-[3px] bg-[#e9dfd0] shadow-[0_32px_75px_rgba(0,0,0,0.46)]"
                  initial={{ y: 0 }}
                  animate={{ y: sealOpened ? 12 : 0 }}
                  transition={{ delay: 2.05, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-[9px] border border-[#a88b6d]/30" />
                  <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[#e5dac9]" style={{ clipPath: "polygon(0 25%, 50% 70%, 100% 25%, 100% 100%, 0 100%)" }} />
                  <div className="absolute inset-x-0 bottom-0 h-[72%]" style={{ clipPath: "polygon(0 100%, 50% 32%, 100% 100%)", background: "#ded1be" }} />
                </motion.div>

                {/* Closed front flap. It is the only thing covering the envelope/card before the seal breaks. */}
                <motion.div
                  className="absolute left-1/2 top-[27%] z-[7] h-[51%] w-[88%] -translate-x-1/2 origin-top bg-[#f0e7da] shadow-[0_8px_18px_rgba(0,0,0,0.08)] [clip-path:polygon(0_0,100%_0,50%_88%)]"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: sealOpened ? -174 : 0 }}
                  transition={{ delay: 1.02, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                />

                {/* Wax seal: a tactile-looking ceremonial seal, then a subtle crack/ripple and disappearance. */}
                <motion.button
                  type="button"
                  aria-label="Opening invitation seal"
                  disabled
                  className="absolute left-1/2 top-[58%] z-[10] flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#8b403f] shadow-[0_10px_28px_rgba(0,0,0,0.32)] sm:h-[84px] sm:w-[84px]"
                  initial={{ scale: 1, rotate: -4, opacity: 1 }}
                  animate={{ scale: sealOpened ? 1.34 : 1, rotate: sealOpened ? 10 : -4, opacity: sealOpened ? 0 : 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="absolute inset-[5px] rounded-full border border-[#d8bc96]/70" />
                  <span className="font-heading text-xl italic tracking-wide text-[#f1e4d1]">N <span className="text-[#d8bc96]">&amp;</span> S</span>
                </motion.button>

                <motion.div
                  className="pointer-events-none absolute left-1/2 top-[58%] z-[11] h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8bc96]/70"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: sealOpened ? 1.7 : 0.7, opacity: sealOpened ? 0 : 0 }}
                  transition={{ duration: 0.7 }}
                />

                {/* Petal-like seal fragments give the opening a physical moment without looking like confetti. */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="pointer-events-none absolute left-1/2 top-[58%] z-[12] h-2 w-1.5 rounded-[60%_25%_60%_25%] bg-[#a8534d]"
                    initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                    animate={sealOpened ? { x: `${-50 + (index % 5) * (index % 2 ? 15 : -15)}%`, y: `${-50 - 16 - index * 2}%`, scale: [0.4, 1, 0.65], opacity: [0, 0.95, 0] } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.04 + index * 0.025, duration: 0.75, ease: "easeOut" }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: cardRevealed ? 1 : 0 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="mt-2 text-center"
              >
                <p className="font-heading text-2xl italic text-champagne sm:text-3xl">With joy, we welcome you.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" && <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />}
    </section>
  );
}
