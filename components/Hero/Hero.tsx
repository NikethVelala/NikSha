"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { wedding } from "@/data/wedding";

export default function Hero() {
const bride = wedding.couple.bride;
const groom = wedding.couple.groom;
const weddingDate = wedding.ceremony.date;
  return (
<section className="relative h-screen w-full overflow-hidden">

  <img
  src="/images/hero.jpg"
  alt="Niketh and Sirisha"
  className="absolute inset-0 h-full w-full object-cover"
/>

  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/60" />

  <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-6 uppercase tracking-[0.5em] text-sm"
    >
      {wedding.couple.monogram}
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="font-heading text-6xl md:text-8xl font-medium tracking-wide"
    >
      {groom}
    </motion.h1>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="my-4 text-2xl"
    >
      ♥
    </motion.div>

    <motion.h1
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="font-heading text-6xl md:text-8xl font-medium tracking-wide"
>
  {bride}
</motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-10 text-sm uppercase tracking-[0.35em]"
    >
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-4 text-xl"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/60 px-8 py-4 uppercase tracking-[0.3em] backdrop-blur-md transition hover:bg-white hover:text-black"
    >
      Begin the Journey

      <ArrowDown className="h-4 w-4" />
    </motion.a>

  </div>

</section>
  );
}
