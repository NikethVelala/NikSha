"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const curtainImage = "/images/curtain-hq.webp";

function CurtainHalf({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-1/2 overflow-hidden will-change-transform`}
      style={{ perspective: "1800px", transformStyle: "preserve-3d", transformOrigin: isLeft ? "right center" : "left center" }}
      animate={opening ? {
        x: isLeft ? "-102%" : "102%",
        scaleX: 0.78,
        rotateY: isLeft ? -12 : 12,
        skewY: isLeft ? -0.8 : 0.8,
      } : {
        x: [0, isLeft ? "0.22%" : "-0.22%", isLeft ? "-0.12%" : "0.12%", 0],
        scaleX: [1, 0.998, 1.002, 1],
        rotateY: [0, isLeft ? -0.5 : 0.5, isLeft ? 0.35 : -0.35, 0],
        skewY: [0, isLeft ? -0.15 : 0.15, isLeft ? 0.1 : -0.1, 0],
      }}
      transition={opening ? { duration: 3.15, ease: [0.65, 0, 0.2, 1] } : { duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
    >
      <motion.img
        src={curtainImage}
        alt=""
        draggable={false}
        className="absolute inset-y-0 max-w-none select-none object-fill"
        style={{ width: "200%", left: isLeft ? "0" : "-100%" }}
        animate={opening ? { scale: 1.025, x: isLeft ? "-1.5%" : "1.5%" } : { scale: [1, 1.006, 1], x: [0, isLeft ? "0.3%" : "-0.3%", 0] }}
        transition={opening ? { duration: 3.15, ease: [0.65, 0, 0.2, 1] } : { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      requestAnimationFrame(() => document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }, 3450);
    return () => window.clearTimeout(timer);
  }, [opening]);

  const open = () => { if (!opening) setOpening(true); };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#4a2b16] text-white" onClick={open} role="button" tabIndex={0} aria-label="Open the wedding invitation" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }}>
      <div className="absolute inset-0 bg-[#4a2b16]" />
      <div className="absolute inset-0 overflow-hidden"><motion.div animate={opening ? { scale: 1.04, opacity: 1 } : { scale: 1, opacity: 0.18 }} transition={{ duration: 3.1, ease: [0.76, 0, 0.24, 1] }} className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center" /><div className="absolute inset-0 bg-[#241205]/35" /></div>
      {visible && <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true"><CurtainHalf side="left" opening={opening} /><CurtainHalf side="right" opening={opening} /></div>}
      <div className="sr-only">{wedding.couple.groom} &amp; {wedding.couple.bride}. Tap anywhere to open the wedding invitation.</div>
    </section>
  );
}
