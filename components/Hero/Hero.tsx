"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export default function Hero() {
  const [stage, setStage] = useState<"cover" | "opening" | "entered">("cover");
  const [showInvitation, setShowInvitation] = useState(false);
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  useEffect(() => {
    if (!showInvitation) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showInvitation]);

  const enterCelebration = () => {
    setStage("opening");
    window.setTimeout(() => setStage("entered"), 1100);
  };

  const enterInvitation = () => {
    setShowInvitation(false);
    window.setTimeout(() => document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth" }), 80);
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
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/10 to-charcoal/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(20,20,18,0.34)_100%)]" />

      <div className="absolute left-5 top-5 z-20 text-[8px] uppercase tracking-[0.34em] text-ivory/65 sm:left-8 sm:top-8 sm:text-[9px]">
        A celebration of love
      </div>
      <div className="absolute right-5 top-5 z-20 text-right text-[8px] uppercase tracking-[0.28em] text-ivory/65 sm:right-8 sm:top-8 sm:text-[9px]">
        18 · 11 · 2026
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: stage === "entered" ? 0 : 1, y: stage === "entered" ? -20 : 0 }}
        transition={{ duration: 0.65 }}
        className="absolute inset-x-0 bottom-5 z-20 flex justify-center sm:bottom-8"
      >
        <span className="h-px w-12 bg-champagne/60 sm:w-20" />
        <span className="mx-3 font-heading text-sm italic text-champagne">NikSha</span>
        <span className="h-px w-12 bg-champagne/60 sm:w-20" />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9 }}
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

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.9 }}
                className="mx-auto my-7 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/60 bg-charcoal/25 backdrop-blur-[2px] sm:my-8 sm:h-16 sm:w-16"
              >
                <span className="font-heading text-2xl italic text-champagne sm:text-3xl">N</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="font-heading text-[4.5rem] leading-[0.78] tracking-[-0.045em] sm:text-8xl lg:text-[9.5rem]"
              >
                {groom}
                <span className="my-3 block text-2xl font-normal italic tracking-normal text-champagne sm:my-4 sm:text-4xl">&amp;</span>
                {bride}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-ivory/75 sm:mt-10 sm:text-[10px]"
              >
                <span>Wednesday</span>
                <span className="h-1 w-1 rounded-full bg-champagne" />
                <span>Visakhapatnam</span>
              </motion.div>

              <motion.button
                type="button"
                onClick={enterCelebration}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.8 }}
                className="group mt-10 inline-flex min-h-12 items-center gap-4 border border-champagne/55 bg-charcoal/20 px-6 py-3 text-[9px] uppercase tracking-[0.3em] backdrop-blur-sm transition-colors hover:bg-champagne hover:text-charcoal sm:mt-12 sm:px-8 sm:text-[10px]"
              >
                Enter the celebration
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.2} />
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
            className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative flex h-64 w-[min(86vw,360px)] items-center justify-center border border-champagne/45 bg-paper/95 px-8 text-charcoal shadow-2xl sm:h-72"
            >
              <div className="absolute inset-3 border border-charcoal/10" />
              <div>
                <p className="text-[8px] uppercase tracking-[0.42em] text-rose">With our families</p>
                <div className="mx-auto my-5 h-px w-12 bg-champagne" />
                <p className="font-heading text-3xl leading-tight sm:text-4xl">Two lives.<br />One beautiful beginning.</p>
                <p className="mt-5 text-[8px] uppercase tracking-[0.28em] text-muted">Niketh &amp; Sirisha</p>
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -18 }}
                animate={{ scale: 1, rotate: -8 }}
                transition={{ delay: 0.35, duration: 0.5, type: "spring" }}
                className="absolute -right-5 -top-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/80 bg-rose text-ivory shadow-lg sm:-right-6 sm:-top-6 sm:h-14 sm:w-14"
              >
                <span className="font-heading text-xl italic">N</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {stage === "entered" && (
          <motion.div
            key="entered"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex min-h-[100svh] items-end justify-center px-6 pb-20 text-center sm:pb-24"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.42em] text-champagne sm:text-[10px]">The celebration begins</p>
              <h2 className="mt-4 font-heading text-4xl sm:text-6xl">Come celebrate with us.</h2>
              <button
                type="button"
                onClick={() => setShowInvitation(true)}
                className="mt-7 inline-flex min-h-12 items-center gap-3 border-b border-ivory/50 pb-2 text-[9px] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-champagne hover:text-champagne sm:text-[10px]"
              >
                Open invitation
                <ArrowRight className="h-4 w-4" strokeWidth={1.2} />
              </button>
              <a href="#welcome" className="mx-auto mt-7 flex w-fit flex-col items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-ivory/55">
                Begin
                <ChevronDown className="h-4 w-4 animate-pulse" strokeWidth={1.1} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-charcoal/95 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative my-auto w-full max-w-lg border border-champagne/40 bg-paper px-6 py-11 text-center text-charcoal shadow-2xl sm:px-12 sm:py-16"
            >
              <button
                type="button"
                onClick={() => setShowInvitation(false)}
                className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-charcoal sm:right-5 sm:top-5"
                aria-label="Close invitation"
              >
                <X className="h-5 w-5" strokeWidth={1.3} />
              </button>
              <p className="text-[9px] uppercase tracking-[0.42em] text-rose sm:text-[10px]">With our families</p>
              <div className="mx-auto mt-5 h-px w-14 bg-champagne" />
              <p className="mt-7 font-heading text-[1.8rem] leading-relaxed sm:mt-8 sm:text-4xl">We invite you to celebrate the beginning of our forever.</p>
              <p className="mt-7 font-heading text-4xl sm:mt-8 sm:text-5xl">{groom} <span className="text-rose">&amp;</span> {bride}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-muted sm:mt-5 sm:text-xs">18 November 2026 · Visakhapatnam</p>
              <button
                type="button"
                onClick={enterInvitation}
                className="mt-9 inline-flex min-h-12 items-center gap-3 border-b border-charcoal/30 pb-2 text-[9px] uppercase tracking-[0.24em] text-charcoal transition-colors hover:border-rose hover:text-rose sm:mt-10 sm:text-[10px]"
              >
                Enter the invitation
                <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
