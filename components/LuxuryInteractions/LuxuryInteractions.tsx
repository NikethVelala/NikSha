"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LuxuryInteractions() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.45 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/55 bg-champagne/5 mix-blend-multiply"
      style={{ x: springX, y: springY }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70" />
    </motion.div>
  );
}
