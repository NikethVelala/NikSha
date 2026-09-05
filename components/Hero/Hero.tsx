"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { wedding } from "@/data/wedding";
import FloralDivider from "@/components/common/FloralDivider";

export default function Hero() {
  const bride = wedding.couple.bride;
  const groom = wedding.couple.groom;
  const weddingDate = wedding.ceremony.date;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-stone-900">
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl md:hidden"
      />

      <img
        src="/images/hero.jpg"
        alt="Niketh and Sirisha"
        className="absolute inset-0 h-full w-full object-contain md:object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.18)_100%)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 text-xs uppercase tracking-[0.55em] text-white/75"
        >
          The Wedding of
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 1 }}
          className="mb-7 font-heading text-2xl italic text-white/85 md:text-3xl"
        >
          {wedding.couple.monogram}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="font-heading text-6xl font-medium leading-[0.9] tracking-wide sm:text-7xl md:text-9xl"
        >
          {groom}
        </motion.h1>

        <FloralDivider className="my-7" />

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
          className="font-heading text-6xl font-medium leading-[0.9] tracking-wide sm:text-7xl md:text-9xl"
        >
          {bride}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 text-sm uppercase tracking-[0.35em] text-white/85 md:text-base"
        >
          {weddingDate}
        </motion.p>

        <motion.a
          href="#welcome"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("welcome")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1 }}
          className="mt-12 inline-flex items-center gap-3 border border-white/55 px-7 py-3.5 text-xs uppercase tracking-[0.3em] backdrop-blur-sm transition duration-500 hover:bg-white hover:text-stone-900"
        >
          Begin the Journey
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </section>
  );
}
