"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const curtainImage = "/images/curtain-reference-800.jpg";
const FOLD_COUNT = 8;

function CurtainHalf({ side, opening }: { side: "left" | "right"; opening: boolean }) {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-1/2 overflow-hidden`}
      style={{ perspective: "1400px" }}
    >
      {Array.from({ length: FOLD_COUNT }, (_, index) => {
        const sourceIndex = isLeft ? index : FOLD_COUNT + index;
        const distanceFromCenter = isLeft ? FOLD_COUNT - index : index + 1;
        const direction = isLeft ? -1 : 1;
        const travel = 5 + distanceFromCenter * 2.7;
        const rotation = direction * (2 + distanceFromCenter * 0.8);

        return (
          <motion.div
            key={`${side}-${index}`}
            initial={{ x: 0, rotateY: 0, scaleX: 1 }}
            animate={
              opening
                ? {
                    x: `${direction * travel}vw`,
                    rotateY: rotation,
                    scaleX: 0.96,
                  }
                : { x: 0, rotateY: 0, scaleX: 1 }
            }
            transition={{
              duration: 2.8,
              delay: index * 0.035,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-y-0 overflow-hidden will-change-transform"
            style={{
              left: `${index * 12.5}%`,
              width: "12.5%",
              transformOrigin: isLeft ? "right center" : "left center",
              transformStyle: "preserve-3d",
              zIndex: FOLD_COUNT - index,
            }}
          >
            <img
              src={curtainImage}
              alt=""
              draggable={false}
              className="absolute inset-y-0 h-full max-w-none select-none object-fill"
              style={{
                width: "1600%",
                left: `${-sourceIndex * 100}%`,
              }}
            />
            <div
              className={`pointer-events-none absolute inset-y-0 w-1/2 ${
                isLeft ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"
              } from-black/20 to-transparent`}
            />
          </motion.div>
        );
      })}
    </div>
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
    }, 3000);
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
