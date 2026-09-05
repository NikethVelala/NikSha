"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const petals = [
  { left: "7%", delay: 0, duration: 7.5, drift: 34, size: 10 },
  { left: "15%", delay: 2.4, duration: 9, drift: -24, size: 8 },
  { left: "24%", delay: 1.2, duration: 8.2, drift: 42, size: 7 },
  { left: "34%", delay: 4.2, duration: 10, drift: -36, size: 11 },
  { left: "43%", delay: 0.8, duration: 8.7, drift: 28, size: 8 },
  { left: "53%", delay: 3.1, duration: 9.6, drift: -32, size: 9 },
  { left: "63%", delay: 1.7, duration: 8.4, drift: 38, size: 7 },
  { left: "72%", delay: 4.8, duration: 10.5, drift: -28, size: 10 },
  { left: "81%", delay: 2.1, duration: 8.8, drift: 30, size: 8 },
  { left: "91%", delay: 0.4, duration: 9.8, drift: -42, size: 11 },
];

function FlowerCluster({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-8 w-8 ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#fff8e9] shadow-[0_1px_4px_rgba(92,62,27,0.12)]" />
      <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-[#fff8e9]" />
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#fff8e9]" />
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e6c77f]" />
    </div>
  );
}

function JasmineString({ left, delay }: { left: string; delay: number }) {
  return (
    <motion.div
      initial={{ rotate: -2 }}
      animate={{ rotate: 2 }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="absolute top-0 hidden sm:block"
      style={{ left }}
      aria-hidden="true"
    >
      <div className="mx-auto h-9 w-px bg-[#b28a4c]/55" />
      <div className="flex -translate-x-1/2 gap-1">
        <FlowerCluster />
        <FlowerCluster className="-ml-5 mt-5" />
      </div>
      <div className="mx-auto mt-1 h-5 w-px bg-[#b28a4c]/45" />
      <div className="mx-auto h-3 w-5 rounded-b-full border border-[#9c7436]/70 bg-[#b48743] shadow-[0_3px_8px_rgba(70,42,13,0.2)]" />
      <div className="mx-auto h-2 w-2 rounded-full bg-[#e4bd6d]" />
    </motion.div>
  );
}

export default function Hero() {
  const [isOpening, setIsOpening] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!isOpening) return;

    const timer = window.setTimeout(() => {
      document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 3400);

    return () => window.clearTimeout(timer);
  }, [isOpening]);

  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#f1e2c5] text-charcoal">
      <Image
        src="/images/hero.jpg"
        alt={`${groom} and ${bride}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-center"
      />

      <div className="absolute inset-0 bg-[#f7e9cc]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#6e4c26]/25 via-[#f5e4c2]/12 to-[#5d3c1e]/45" />

      <motion.div
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -16 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center"
      >
        <div className="max-w-xl">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/90 sm:text-[11px]">An invitation to celebrate love</p>
          <h1 className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] text-white drop-shadow-[0_2px_18px_rgba(46,28,11,0.35)] sm:text-8xl lg:text-[9.5rem]">
            {groom}
            <span className="my-3 block text-2xl font-normal italic tracking-normal text-[#f2d49c] sm:my-4 sm:text-4xl">&amp;</span>
            {bride}
          </h1>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/85 sm:mt-10 sm:text-[10px]">
            <span>Wednesday</span>
            <span className="h-1 w-1 rounded-full bg-[#e9c47c]" />
            <span>Visakhapatnam</span>
          </div>
        </div>
      </motion.div>

      {!isOpening && (
        <motion.button
          type="button"
          onClick={openInvitation}
          initial={{ opacity: 0, y: 15, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="group absolute bottom-[11%] left-1/2 z-30 flex h-[82px] w-[82px] -translate-x-1/2 items-center justify-center rounded-full border border-[#d8b36e]/90 bg-[#f4e5c7]/20 text-[#fffaf0] shadow-[0_8px_40px_rgba(63,38,12,0.18)] backdrop-blur-[2px] outline-none sm:h-[92px] sm:w-[92px]"
          aria-label="Open the invitation"
        >
          <span className="absolute inset-1 rounded-full border border-white/35 transition-transform duration-700 group-hover:scale-[1.08]" />
          <span className="flex flex-col items-center gap-0.5 text-[8px] uppercase tracking-[0.28em]">
            <span>Open</span>
            <ChevronDown className="h-4 w-4 text-[#f1ce8e] transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.2} />
          </span>
        </motion.button>
      )}

      <div
        className={`fixed inset-0 z-[60] overflow-hidden ${isOpening ? "pointer-events-none" : "cursor-pointer"}`}
        onClick={openInvitation}
        role="button"
        tabIndex={isOpening ? -1 : 0}
        aria-label="Open the wedding invitation"
        onKeyDown={(event) => {
          if (!isOpening && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openInvitation();
          }
        }}
      >
        {/* Grand stage treatment: the center stays softly translucent so the hero never disappears behind a dead opaque wall. */}
        <motion.div
          initial={false}
          animate={{ y: isOpening ? "-115%" : "0%" }}
          transition={{ duration: 1.1, delay: isOpening ? 1.75 : 0, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-[15vh] min-h-[104px] origin-top"
          style={{
            background: "linear-gradient(180deg, rgba(103,70,30,0.88), rgba(211,171,99,0.82) 35%, rgba(249,230,192,0.82) 72%, rgba(133,91,38,0.55))",
            boxShadow: "0 16px 40px rgba(74,46,15,0.25)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#8d6330] via-[#e4c17d] to-[#8d6330]" />
          <div className="absolute inset-x-0 bottom-2 h-px bg-white/45" />
          <div className="absolute inset-x-0 top-1 h-4 bg-[radial-gradient(ellipse_at_center,rgba(255,248,226,0.55),transparent_70%)]" />
        </motion.div>

        {["6%", "18%", "30%", "42%", "54%", "66%", "78%", "90%"].map((left, index) => (
          <JasmineString key={left} left={left} delay={index * 0.12} />
        ))}

        {/* Left decorative side drape: deeper, gathered and framed rather than a flat half-screen panel. */}
        <motion.div
          initial={false}
          animate={{ x: isOpening ? "-112%" : "0%", scaleX: isOpening ? 0.92 : 1 }}
          transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-y-0 left-0 w-[32%] min-w-[145px] origin-left"
          style={{
            clipPath: "polygon(0 0, 100% 0, 82% 9%, 74% 20%, 78% 36%, 70% 52%, 77% 70%, 67% 86%, 74% 100%, 0 100%)",
            background: "linear-gradient(105deg, #7c572f 0%, #c39a5d 13%, #f1dcae 22%, #a77b42 33%, #e7c88d 44%, #8a6032 57%, #d8b776 68%, #8a6033 80%, #e7c98e 91%, #704b28 100%)",
            boxShadow: "18px 0 48px rgba(67,40,12,0.3)",
          }}
        >
          <div className="absolute inset-y-0 right-[7%] w-[22%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-0 right-[17%] w-px bg-[#8b6330]/55" />
          <div className="absolute left-0 top-0 h-full w-4 bg-[#6f4924]/35" />
        </motion.div>

        {/* Right decorative side drape mirrors the left to keep the composition ceremonial and symmetrical. */}
        <motion.div
          initial={false}
          animate={{ x: isOpening ? "112%" : "0%", scaleX: isOpening ? 0.92 : 1 }}
          transition={{ duration: 2.05, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-y-0 right-0 w-[32%] min-w-[145px] origin-right"
          style={{
            clipPath: "polygon(0 9%, 0 0, 100% 0, 100% 100%, 26% 100%, 33% 86%, 23% 70%, 30% 52%, 22% 36%, 26% 20%, 18% 9%)",
            background: "linear-gradient(255deg, #7c572f 0%, #c39a5d 13%, #f1dcae 22%, #a77b42 33%, #e7c88d 44%, #8a6032 57%, #d8b776 68%, #8a6033 80%, #e7c98e 91%, #704b28 100%)",
            boxShadow: "-18px 0 48px rgba(67,40,12,0.3)",
          }}
        >
          <div className="absolute inset-y-0 left-[7%] w-[22%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-0 left-[17%] w-px bg-[#8b6330]/55" />
          <div className="absolute right-0 top-0 h-full w-4 bg-[#6f4924]/35" />
        </motion.div>

        {/* Sheer center curtain: translucent folds give the reference-like stage feel without completely hiding the photo. */}
        <motion.div
          initial={false}
          animate={{ scaleX: isOpening ? 0 : 1, opacity: isOpening ? 0 : 0.93 }}
          transition={{ duration: 1.95, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-y-[9%] left-[14%] right-[14%] origin-center"
          style={{
            background: "repeating-linear-gradient(90deg, rgba(247,227,190,0.82) 0%, rgba(255,245,220,0.9) 7%, rgba(190,145,80,0.45) 13%, rgba(255,243,213,0.88) 20%, rgba(194,151,91,0.42) 27%, rgba(255,245,221,0.9) 34%, rgba(188,143,79,0.44) 41%, rgba(255,244,217,0.88) 49%, rgba(190,145,82,0.42) 56%, rgba(255,245,221,0.9) 64%, rgba(190,145,82,0.43) 72%, rgba(255,244,216,0.9) 80%, rgba(186,141,77,0.42) 88%, rgba(250,232,198,0.84) 100%)",
            boxShadow: "inset 0 0 90px rgba(113,72,26,0.16), 0 0 50px rgba(255,244,213,0.2)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,250,235,0.32),transparent_58%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[#9f7339]/40" />
        </motion.div>

        {/* Floral canopy and greenery frame the top corners without becoming a flat illustrated border. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[13vh] min-h-[92px]" aria-hidden="true">
          <div className="absolute left-0 top-0 h-20 w-40 rounded-br-[90px] bg-[radial-gradient(circle_at_25%_25%,#fffaf0_0_6%,transparent_7%),radial-gradient(circle_at_40%_35%,#f5e5b7_0_9%,transparent_10%),radial-gradient(circle_at_60%_22%,#fffaf0_0_7%,transparent_8%),radial-gradient(circle_at_48%_58%,#d4c994_0_18%,transparent_19%),linear-gradient(135deg,#4e633d,#9a9c62)] opacity-90" />
          <div className="absolute right-0 top-0 h-20 w-40 rounded-bl-[90px] bg-[radial-gradient(circle_at_75%_25%,#fffaf0_0_6%,transparent_7%),radial-gradient(circle_at_60%_35%,#f5e5b7_0_9%,transparent_10%),radial-gradient(circle_at_40%_22%,#fffaf0_0_7%,transparent_8%),radial-gradient(circle_at_52%_58%,#d4c994_0_18%,transparent_19%),linear-gradient(225deg,#4e633d,#9a9c62)] opacity-90" />
          <div className="absolute left-0 right-0 top-0 h-5 bg-[radial-gradient(ellipse_at_center,rgba(255,247,224,0.92),transparent_62%)]" />
        </div>

        {/* Petals are intentionally independent of the curtain so the scene feels alive from the first frame. */}
        <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden="true">
          {petals.map((petal, index) => (
            <motion.span
              key={index}
              initial={{ x: 0, y: "-12vh", opacity: 0, rotate: 0 }}
              animate={{ x: [0, petal.drift, petal.drift * -0.45, petal.drift * 0.7], y: ["-12vh", "35vh", "72vh", "118vh"], opacity: [0, 0.85, 0.7, 0], rotate: [0, 70, 170, 280] }}
              transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 rounded-[70%_35%_65%_30%] bg-[#fff5d9] shadow-[0_1px_5px_rgba(90,58,18,0.16)]"
              style={{ left: petal.left, width: petal.size, height: petal.size * 0.58 }}
            />
          ))}
        </div>

        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-[7%] left-1/2 z-10 -translate-x-1/2 text-center text-[8px] uppercase tracking-[0.38em] text-[#fff7e5]/90 sm:bottom-[7.5%]"
          >
            Tap anywhere to open
          </motion.div>
        )}
      </div>

      {isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -10] }}
            transition={{ duration: 1.35, delay: 0.05, times: [0, 0.22, 0.76, 1], ease: [0.22, 1, 0.36, 1] }}
            className="text-charcoal"
          >
            <p className="text-[9px] uppercase tracking-[0.48em] text-[#9b7653]">The celebration begins</p>
            <p className="mt-5 font-heading text-4xl tracking-[-0.025em] sm:text-6xl">{groom} <span className="font-normal italic text-[#ae8b69]">&amp;</span> {bride}</p>
            <p className="mt-4 text-[9px] uppercase tracking-[0.36em] text-charcoal/60">18 November 2026 · Visakhapatnam</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
