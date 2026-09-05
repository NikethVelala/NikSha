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
      }, 120);
    }, 2850);

    return () => window.clearTimeout(timer);
  }, [sealOpened]);

  const openInvitation = () => {
    if (stage !== "cover") return;
    setStage("opening");
    window.setTimeout(() => setSealOpened(true), 450);
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

      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/65 via-charcoal/15 to-charcoal/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(20,20,18,0.42)_100%)]" />

      <div className="absolute left-5 top-5 z-20 text-[8px] uppercase tracking-[0.34em] text-ivory/65 sm:left-8 sm:top-8 sm:text-[9px]">
        A celebration of love
      </div>
      <div className="absolute right-5 top-5 z-20 text-right text-[8px] uppercase tracking-[0.28em] text-ivory/65 sm:right-8 sm:top-8 sm:text-[9px]">
        18 · 11 · 2026
      </div>

      <AnimatePresence mode="wait">
        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center"
          >
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="text-[9px] uppercase tracking-[0.48em] text-champagne sm:text-[11px]"
              >
                An invitation to celebrate love
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-7 font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]"
              >
                {groom}
                <span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>
                {bride}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mx-auto mt-8 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/75 sm:mt-10 sm:text-[10px]"
              >
                <span>Wednesday</span>
                <span className="h-1 w-1 rounded-full bg-champagne" />
                <span>Visakhapatnam</span>
              </motion.div>

              <motion.button
                type="button"
                onClick={openInvitation}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.8 }}
                className="group mt-12 inline-flex min-h-12 items-center gap-4 border-0 bg-transparent px-2 py-3 text-[9px] uppercase tracking-[0.32em] text-ivory/90 outline-none transition-colors focus-visible:text-champagne sm:mt-14 sm:text-[10px]"
              >
                <span>Open the invitation</span>
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
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-30 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#25231f]/95 px-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,157,126,0.12),transparent_55%)]" />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[min(88vw,390px)]"
            >
              <div className="mb-7 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="text-[9px] uppercase tracking-[0.42em] text-champagne/80"
                >
                  A little something for you
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  className="mt-3 font-heading text-2xl italic text-ivory/90 sm:text-3xl"
                >
                  Niketh &amp; Sirisha
                </motion.p>
              </div>

              <div className="relative mx-auto h-[220px] w-full max-w-[350px] [perspective:1000px] sm:h-[250px] sm:max-w-[390px]">
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-[88%] rounded-[2px] bg-[#eee7dc] shadow-[0_30px_70px_rgba(0,0,0,0.38)]"
                  initial={{ y: 0 }}
                  animate={{ y: sealOpened ? 105 : 0 }}
                  transition={{ delay: 1.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-[9px] border border-[#b9a98f]/45" />
                  <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#e2d8c8]/75 to-transparent" />
                </motion.div>

                <motion.div
                  className="absolute left-0 top-[12%] h-[55%] w-full origin-top bg-[#f5eee4] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                  initial={{ rotateX: 0, zIndex: 4 }}
                  animate={{ rotateX: sealOpened ? -178 : 0, zIndex: sealOpened ? 1 : 4 }}
                  transition={{ delay: 0.95, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                />

                <motion.div
                  className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#9b4d4d] shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:h-[72px] sm:w-[72px]"
                  initial={{ scale: 1, rotate: -5, opacity: 1 }}
                  animate={{
                    scale: sealOpened ? 1.55 : 1,
                    rotate: sealOpened ? 18 : -5,
                    opacity: sealOpened ? 0 : 1,
                  }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  <span className="absolute inset-[5px] rounded-full border border-champagne/60" />
                  <span className="font-heading text-[18px] italic text-[#f4e8d8] sm:text-xl">N · S</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: sealOpened ? 0 : 1, y: sealOpened ? 10 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute -bottom-10 inset-x-0 text-center text-[8px] uppercase tracking-[0.34em] text-ivory/55"
                >
                  Opening your invitation
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: sealOpened ? 1 : 0, y: sealOpened ? 0 : 12 }}
                transition={{ delay: 1.85, duration: 0.6 }}
                className="mt-16 text-center"
              >
                <p className="text-[9px] uppercase tracking-[0.34em] text-champagne">The invitation awaits</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "done" && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      )}
    </section>
  );
}
