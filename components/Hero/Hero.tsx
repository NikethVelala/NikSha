"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const curtainImage = "/images/curtain-reference-800.jpg";

function CurtainHalf({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-1/2 overflow-hidden will-change-transform`}
      style={{
        perspective: "1600px",
        transformStyle: "preserve-3d",
        transformOrigin: isLeft ? "right center" : "left center",
      }}
      animate={
        opening
          ? {
              x: isLeft ? "-96%" : "96%",
              scaleX: 0.72,
              rotateY: isLeft ? -16 : 16,
              skewY: isLeft ? -1.2 : 1.2,
              borderRadius: isLeft ? "0 38% 38% 0" : "38% 0 0 38%",
            }
          : {
              x: [0, isLeft ? "0.18%" : "-0.18%", 0, isLeft ? "-0.12%" : "0.12%", 0],
              scaleX: [1, 0.996, 1.002, 0.997, 1],
              rotateY: [0, isLeft ? -0.7 : 0.7, 0, isLeft ? 0.55 : -0.55, 0],
              skewY: [0, isLeft ? -0.22 : 0.22, 0, isLeft ? 0.18 : -0.18, 0],
              borderRadius: "0",
            }
      }
      transition={
        opening
          ? { duration: 2.9, ease: [0.65, 0, 0.2, 1] }
          : { duration: 6.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
      }
    >
      <motion.img
        src={curtainImage}
        alt=""
        draggable={false}
        className="absolute inset-y-0 max-w-none select-none object-fill"
        style={{
          width: "200%",
          left: isLeft ? "0" : "-100%",
          filter: `url(#niksha-curtain-fabric-${side})`,
        }}
        animate={opening ? { scale: 1.03 } : { scale: [1, 1.008, 1] }}
        transition={
          opening
            ? { duration: 2.9, ease: [0.65, 0, 0.2, 1] }
            : { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
        }
      />

      <div
        className={`pointer-events-none absolute inset-y-0 w-[18%] ${
          isLeft ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"
        } from-black/25 via-black/7 to-transparent`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 w-[12%] ${
          isLeft ? "right-[9%]" : "left-[9%]"
        } bg-gradient-to-r from-white/10 via-transparent to-black/10 mix-blend-soft-light`}
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
      requestAnimationFrame(() => {
        document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [opening]);

  const open = () => {
    if (!opening) setOpening(true);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#4a2b16] text-white"
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invitation"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      }}
    >
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        <defs>
          <filter id="niksha-curtain-fabric-left" x="-8%" y="-4%" width="116%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.055" numOctaves="2" seed="11" result="noise">
              <animate attributeName="baseFrequency" values="0.018 0.055;0.021 0.061;0.018 0.055" dur="7s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="niksha-curtain-fabric-right" x="-8%" y="-4%" width="116%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.055" numOctaves="2" seed="23" result="noise">
              <animate attributeName="baseFrequency" values="0.018 0.055;0.021 0.061;0.018 0.055" dur="7.5s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-[#4a2b16]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={opening ? { scale: 1.04, opacity: 1 } : { scale: 1, opacity: 0.18 }}
          transition={{ duration: 2.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-[#241205]/35" />
      </div>

      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
          <CurtainHalf side="left" opening={opening} />
          <CurtainHalf side="right" opening={opening} />
        </div>
      )}

      <div className="sr-only">
        {wedding.couple.groom} &amp; {wedding.couple.bride}. Tap anywhere to open the wedding invitation.
      </div>
    </section>
  );
}
