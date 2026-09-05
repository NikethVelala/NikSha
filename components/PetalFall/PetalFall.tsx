"use client";

import { motion } from "framer-motion";

const petals = [
  { left: "3%", delay: 0, duration: 15, drift: 52, rotate: 24, size: 9 },
  { left: "9%", delay: 4.5, duration: 18, drift: -38, rotate: -18, size: 12 },
  { left: "16%", delay: 2, duration: 14, drift: 46, rotate: 40, size: 8 },
  { left: "23%", delay: 8, duration: 20, drift: -58, rotate: -35, size: 10 },
  { left: "31%", delay: 5, duration: 16, drift: 34, rotate: 18, size: 11 },
  { left: "39%", delay: 11, duration: 19, drift: -44, rotate: -28, size: 8 },
  { left: "47%", delay: 1.5, duration: 17, drift: 62, rotate: 48, size: 10 },
  { left: "55%", delay: 7, duration: 21, drift: -34, rotate: -12, size: 9 },
  { left: "63%", delay: 3.5, duration: 15.5, drift: 48, rotate: 32, size: 12 },
  { left: "70%", delay: 9, duration: 18.5, drift: -56, rotate: -42, size: 8 },
  { left: "77%", delay: 0.5, duration: 16.5, drift: 38, rotate: 22, size: 10 },
  { left: "84%", delay: 6, duration: 20.5, drift: -46, rotate: -26, size: 11 },
  { left: "91%", delay: 10, duration: 17.5, drift: 54, rotate: 36, size: 9 },
  { left: "97%", delay: 2.5, duration: 19, drift: -30, rotate: -16, size: 8 },
];

export default function PetalFall() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          initial={{ x: 0, y: "-12vh", opacity: 0, rotate: petal.rotate, scale: 0.8 }}
          animate={{
            x: [0, petal.drift, petal.drift * -0.55, petal.drift * 0.8, 0],
            y: ["-12vh", "22vh", "52vh", "82vh", "116vh"],
            opacity: [0, 0.68, 0.72, 0.52, 0],
            rotate: [petal.rotate, petal.rotate + 100, petal.rotate + 210, petal.rotate + 310, petal.rotate + 420],
            scale: [0.8, 1, 0.92, 1.04, 0.8],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="niksha-petal absolute top-0 rounded-[70%_30%_65%_35%] bg-[#fff1d6]/75 shadow-[0_2px_12px_rgba(120,78,28,0.12)]"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 0.62,
          }}
        />
      ))}
    </div>
  );
}
