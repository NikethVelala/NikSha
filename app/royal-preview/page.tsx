"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./royal.css";

type Phase = "closed" | "opening" | "revealed";
export default function RoyalInvitationPrototype() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update(); mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (phase !== "opening") return;
    const timer = window.setTimeout(() => setPhase("revealed"), reduce ? 100 : 1750);
    return () => window.clearTimeout(timer);
  }, [phase, reduce]);
  const open = () => setPhase(p => p === "closed" ? "opening" : p);
  return (
    <main className="royal" data-phase={phase} data-reduce={reduce}>
      <div className="royal-grain" aria-hidden="true" />
      <div className="royal-aura" aria-hidden="true" />
      <div className="royal-lamp royal-lamp-left" aria-hidden="true"><div className="royal-flame" /><div className="royal-wick" /><div className="royal-bowl" /><div className="royal-stem" /><div className="royal-base" /></div>
      <div className="royal-lamp royal-lamp-right" aria-hidden="true"><div className="royal-flame" /><div className="royal-wick" /><div className="royal-bowl" /><div className="royal-stem" /><div className="royal-base" /></div>
      <header className="royal-top"><span>NIKSHA · AN INVITATION</span><Link href="/" aria-label="Return to existing wedding website">Existing website ↗</Link></header>
      <div className="royal-stage">
        <p className="royal-prelude">With the blessings of our families</p>
        <div className="royal-perspective">
          <div className="royal-envelope">
            <div className="royal-envelope-back" />
            <div className="royal-letter">
              <div className="royal-letter-inner">
                <span className="royal-small">Together with our families</span>
                <span className="royal-ornament" aria-hidden="true">❧</span>
                <h1>Niketh <em>&amp;</em> Sirisha</h1>
                <p>Joyfully invite you to celebrate our wedding</p>
                <div className="royal-divider" />
                <strong>18 November 2026</strong>
                <span className="royal-place">SB Square · Rushikonda · Visakhapatnam</span>
              </div>
            </div>
            <div className="royal-envelope-front" />
            <div className="royal-flap" />
            <div className="royal-seal" aria-hidden="true"><span>NS</span></div>
          </div>
        </div>
        <div className="royal-actions">
          {phase === "closed" ? <button className="royal-button" type="button" onClick={open}>Open our invitation <span aria-hidden="true">↗</span></button> :
            phase === "opening" ? <p role="status" className="royal-hint">A beautiful beginning unfolds…</p> :
            <div className="royal-final"><p>We cannot wait to celebrate with you.</p><Link className="royal-button" href="/">Enter the NikSha website <span aria-hidden="true">↗</span></Link><button type="button" className="royal-replay" onClick={() => setPhase("closed")}>Replay opening</button></div>}
        </div>
      </div>
      <footer className="royal-bottom"><span>ROYAL INVITATION · INTERACTIVE PROTOTYPE</span><span>Ivory · Antique Gold · Light</span></footer>
    </main>
  );
}
