"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const petals = [
  { left: "2%", delay: 0, duration: 16, drift: 52, rotate: 24, size: 10, tone: "#a9152e", depth: "far" },
  { left: "8%", delay: 4.5, duration: 19, drift: -38, rotate: -18, size: 13, tone: "#b31932", depth: "mid" },
  { left: "14%", delay: 2, duration: 14, drift: 46, rotate: 40, size: 8, tone: "#8f1027", depth: "far" },
  { left: "20%", delay: 8, duration: 21, drift: -58, rotate: -35, size: 11, tone: "#c0213a", depth: "mid" },
  { left: "27%", delay: 5, duration: 17, drift: 34, rotate: 18, size: 12, tone: "#9f1730", depth: "mid" },
  { left: "34%", delay: 11, duration: 20, drift: -44, rotate: -28, size: 9, tone: "#a9152e", depth: "far" },
  { left: "41%", delay: 1.5, duration: 18, drift: 62, rotate: 48, size: 11, tone: "#c0213a", depth: "mid" },
  { left: "48%", delay: 7, duration: 22, drift: -34, rotate: -12, size: 9, tone: "#8f1027", depth: "far" },
  { left: "55%", delay: 3.5, duration: 16, drift: 48, rotate: 32, size: 13, tone: "#b31932", depth: "mid" },
  { left: "62%", delay: 9, duration: 19, drift: -56, rotate: -42, size: 9, tone: "#9f1730", depth: "far" },
  { left: "69%", delay: 0.5, duration: 17, drift: 38, rotate: 22, size: 11, tone: "#c0213a", depth: "mid" },
  { left: "76%", delay: 6, duration: 21, drift: -46, rotate: -26, size: 12, tone: "#a9152e", depth: "mid" },
  { left: "83%", delay: 10, duration: 18, drift: 54, rotate: 36, size: 10, tone: "#8f1027", depth: "far" },
  { left: "89%", delay: 2.5, duration: 20, drift: -30, rotate: -16, size: 9, tone: "#b31932", depth: "far" },
  { left: "95%", delay: 12, duration: 23, drift: 42, rotate: 54, size: 15, tone: "#c0213a", depth: "near" },
  { left: "17%", delay: 13, duration: 24, drift: -72, rotate: -52, size: 17, tone: "#a9152e", depth: "near" },
  { left: "72%", delay: 14, duration: 25, drift: 66, rotate: 66, size: 16, tone: "#b31932", depth: "near" },
  { left: "93%", delay: 16, duration: 27, drift: -78, rotate: -70, size: 18, tone: "#9f1730", depth: "near" },
];

export default function PetalFall() {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpening(true);
    window.addEventListener("niksha-curtain-open", handleOpen);
    return () => window.removeEventListener("niksha-curtain-open", handleOpen);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          initial={{ x: 0, y: "-12vh", opacity: 0, rotate: petal.rotate, scale: 0.78 }}
          animate={{
            x: [0, petal.drift, petal.drift * -0.55, petal.drift * 0.8, 0],
            y: ["-12vh", "22vh", "52vh", "82vh", "116vh"],
            opacity: [
              0,
              opening ? (petal.depth === "near" ? 0.82 : 0.68) : 0.22,
              opening ? (petal.depth === "near" ? 0.92 : 0.78) : 0.26,
              opening ? 0.62 : 0.2,
              0,
            ],
            rotate: [petal.rotate, petal.rotate + 100, petal.rotate + 210, petal.rotate + 310, petal.rotate + 420],
            scale: [0.78, 1, 0.92, 1.04, 0.8],
          }}
          transition={{
            duration: petal.duration,
            delay: opening ? petal.delay * 0.18 : petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`niksha-petal absolute top-0 rounded-[70%_30%_65%_35%] shadow-[0_3px_14px_rgba(72,8,18,0.32)] ${petal.depth === "near" ? "blur-[0.4px]" : ""}`}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 0.62,
            background: petal.tone,
          }}
        />
      ))}
    </div>
  );
}
