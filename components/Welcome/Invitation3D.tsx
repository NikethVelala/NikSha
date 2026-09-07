"use client";

import { useEffect, useRef } from "react";

export default function Invitation3D({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      frame = 0;
      const r = card.getBoundingClientRect();
      const d = (r.top + r.height / 2 - window.innerHeight / 2) / Math.max(window.innerHeight, 1);
      const tilt = Math.max(-1.8, Math.min(1.8, -d * 3));
      card.style.transform = `perspective(1400px) rotateX(${py * -1.5 + tilt}deg) rotateY(${px * 1.5}deg) translateY(${Math.max(0, 1 - Math.abs(d) * 1.5) * -3}px)`;
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      request();
    };
    const leave = () => { px = 0; py = 0; request(); };
    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="relative [perspective:1400px]"><div ref={cardRef} className="relative transform-gpu will-change-transform transition-transform duration-500 ease-out" style={{ transformStyle: "preserve-3d" }}><div aria-hidden="true" className="pointer-events-none absolute -inset-1 translate-y-2 bg-[#8c6130]/10 blur-[2px]" style={{ transform: "translateZ(-18px)" }} /><div aria-hidden="true" className="pointer-events-none absolute inset-0 border border-[#8c6130]/25 shadow-[0_22px_55px_rgba(55,42,28,0.16)]" style={{ transform: "translateZ(-7px)" }} /><div className="relative" style={{ transform: "translateZ(0)" }}>{children}</div></div></div>;
}
