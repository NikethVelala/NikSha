"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [stage, setStage] = useState<"cover" | "opening" | "done">("cover");
  const [sealOpened, setSealOpened] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!sealOpened) return;

    const timer = window.setTimeout(() => {
      setStage("done");
      window.setTimeout(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
    }, 4300);

    return () => window.clearTimeout(timer);
  }, [sealOpened]);

  const openInvitation = () => {
    if (stage !== "cover") return;
    setStage("opening");
    window.setTimeout(() => setSealOpened(true), 900);
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
            exit={{ opacity: 0, scale: 1.025, filter: "blur(2px)" }}
            transition={{ duration: 1 }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center"
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 0.9 }}
                className="group mt-12 inline-flex min-h-12 items-center gap-3 border-0 bg-transparent px-2 py-3 text-[9px] uppercase tracking-[0.34em] text-ivory/90 outline-none sm:mt-14 sm:text-[10px]"
              >
                <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-champagne/65 after:transition-transform after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-0">
                  Open the invitation
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.2} />
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
            className="fixed inset-0 z-30 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#292620] px-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(205,175,138,0.18),transparent_45%)]" />

            <motion.div
              className="absolute inset-0 opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5 }}
              aria-hidden="true"
            >
              {Array.from({ length: 16 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute h-1.5 w-1 rounded-full bg-champagne/60"
                  style={{
                    left: `${8 + ((index * 17) % 84)}%`,
                    top: `${10 + ((index * 29) % 75)}%`,
                  }}
                  animate={{ y: [0, -18, 0], x: [0, index % 2 ? 8 : -8, 0], opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 3.5 + (index % 4) * 0.6, repeat: Infinity, delay: index * 0.13, ease: "easeInOut" }}
                />
              ))}
            </motion.div>

            <div className="relative z-10 w-[min(90vw,430px)] text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <p className="text-[9px] uppercase tracking-[0.46em] text-champagne/80">For you, with love</p>
                <p className="mt-3 font-heading text-2xl italic text-ivory/90 sm:text-3xl">Niketh &amp; Sirisha</p>
              </motion.div>

              <div className="relative mx-auto mt-8 h-[250px] w-full max-w-[370px] [perspective:1200px] sm:mt-10 sm:h-[280px] sm:max-w-[420px]">
                <motion.div
                  className="absolute left-1/2 top-[9%] z-[2] h-[78%] w-[84%] -translate-x-1/2 rounded-[3px] bg-[#f0e8db] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
                  initial={{ y: 0, rotateZ: 0 }}
                  animate={{ y: sealOpened ? 108 : 0, rotateZ: sealOpened ? -1.5 : 0 }}
                  transition={{ delay: 1.65, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-2.5 border border-[#a98c68]/35" />
                  <div className="absolute inset-5 border border-[#a98c68]/15" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-[7px] uppercase tracking-[0.4em] text-[#9a7b58]">With our families</p>
                    <p className="mt-4 font-heading text-2xl text-[#302b25]">We invite you</p>
                    <p className="mt-1 font-heading text-lg italic text-[#8e6d4c]">to celebrate with us</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-[9%] z-[5] h-[50%] w-[84%] -translate-x-1/2 origin-top bg-[#f6efe5] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: sealOpened ? -178 : 0 }}
                  transition={{ delay: 1.05, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                />

                <motion.div
                  className="absolute left-1/2 top-[43%] z-[7] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#873f3e] shadow-[0_12px_28px_rgba(0,0,0,0.3)] sm:h-[86px] sm:w-[86px]"
                  initial={{ scale: 1, rotate: -4 }}
                  animate={{
                    scale: sealOpened ? 1.28 : 1,
                    rotate: sealOpened ? 9 : -4,
                    opacity: sealOpened ? 0 : 1,
                  }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="absolute inset-[6px] rounded-full border border-[#d7bd98]/65" />
                  <span className="absolute left-1/2 top-[30%] h-6 w-px -translate-x-1/2 rotate-45 bg-[#d7bd98]/70" />
                  <span className="absolute left-1/2 top-[30%] h-6 w-px -translate-x-1/2 -rotate-45 bg-[#d7bd98]/70" />
                  <span className="absolute bottom-[27%] left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border border-[#d7bd98]/70" />
                </motion.div>

                <motion.div
                  className="pointer-events-none absolute left-1/2 top-[43%] z-[8] -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: sealOpened ? 0.9 : 0, scale: sealOpened ? 1.8 : 0.7 }}
                  transition={{ delay: 0.05, duration: 0.55 }}
                >
                  <span className="block h-24 w-24 rounded-full border border-champagne/50" />
                </motion.div>

                {Array.from({ length: 8 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="absolute z-[9] h-2 w-1.5 rounded-[50%_20%_50%_20%] bg-[#a85545]"
                    style={{ left: `${38 + (index % 4) * 7}%`, top: `${37 + Math.floor(index / 4) * 8}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={sealOpened ? { opacity: [0, 1, 0], scale: [0.4, 1, 0.7], x: [0, index % 2 ? 32 : -32], y: [0, -24 - index * 3] } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.05 + index * 0.02, duration: 0.8, ease: "easeOut" }}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: sealOpened ? 0 : 1, y: sealOpened ? 8 : 0 }}
                transition={{ duration: 0.5 }}
                className="mt-7 text-[8px] uppercase tracking-[0.4em] text-ivory/50"
              >
                Your invitation is on its way
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: sealOpened ? 1 : 0, y: sealOpened ? 0 : 12 }}
                transition={{ delay: 1.9, duration: 0.8 }}
                className="mt-8"
              >
                <p className="font-heading text-2xl italic text-champagne sm:text-3xl">With joy, we welcome you.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      )}
    </section>
  );
}
