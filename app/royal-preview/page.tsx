"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./royal.css";

type Phase = "closed" | "opening" | "revealed";
const petals = Array.from({ length: 14 }, (_, i) => ({ x: `${(i * 37 + 13) % 100}%`, delay: `${(i % 7) * -.8}s`, duration: `${5 + (i % 5)}s` }));
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
      <div className="royal-light-rays" aria-hidden="true" />
      <div className="royal-petals" aria-hidden="true">{petals.map((p, i) => <span key={i} style={{ left: p.x, animationDelay: p.delay, animationDuration: p.duration }} />)}</div>
      <div className="royal-arch" aria-hidden="true"><div className="royal-arch-inner" /><div className="royal-arch-ornament">❧</div></div>
      <div className="royal-lamp royal-lamp-left" aria-hidden="true"><div className="royal-flame" /><div className="royal-wick" /><div className="royal-bowl" /><div className="royal-stem" /><div className="royal-base" /></div>
      <div className="royal-lamp royal-lamp-right" aria-hidden="true"><div className="royal-flame" /><div className="royal-wick" /><div className="royal-bowl" /><div className="royal-stem" /><div className="royal-base" /></div>
      <header className="royal-top"><span>NIKSHA · AN INVITATION</span><Link href="/" aria-label="Return to existing wedding website">Existing website ↗</Link></header>
      <div className="royal-stage">
        <p className="royal-prelude"><span className="royal-prelude-line" />With the blessings of our families<span className="royal-prelude-line" /></p>
        <p className="royal-kicker">A CELEBRATION OF LOVE & TRADITION</p>
        <div className="royal-perspective">
          <div className="royal-envelope">
            <div className="royal-envelope-glint" aria-hidden="true" />
            <div className="royal-envelope-back" />
            <div className="royal-letter">
              <div className="royal-letter-inner">
                <span className="royal-small">Together with our families</span>
                <span className="royal-ornament" aria-hidden="true">❧</span>
                <span className="royal-invitation-label">THE WEDDING OF</span>
                <h1>Niketh <em>&amp;</em> Sirisha</h1>
                <p>Joyfully invite you to celebrate our wedding</p>
                <div className="royal-divider" />
                <span className="royal-muhurtham">MUHURTHAM · 10:01 PM</span>
                <strong>18 November 2026</strong>
                <span className="royal-place">SB Square · Rushikonda · Visakhapatnam</span>
              </div>
            </div>
            <div className="royal-envelope-front" />
            <div className="royal-flap" />
            <div className="royal-seal" aria-hidden="true"><span>NS</span></div>
            <div className="royal-seal-orbit" aria-hidden="true" />
          </div>
        </div>
        <div className="royal-actions">
          {phase === "closed" ? <div className="royal-invite-action"><p className="royal-action-caption">A PERSONAL INVITATION AWAITS YOU</p><button className="royal-button" type="button" onClick={open}>Unseal our invitation <span aria-hidden="true">✦</span></button></div> :
            phase === "opening" ? <p role="status" className="royal-hint">A beautiful beginning unfolds…</p> :
            <div className="royal-final"><p>We cannot wait to celebrate with you.</p><Link className="royal-button" href="/">Enter the NikSha website <span aria-hidden="true">↗</span></Link><button type="button" className="royal-replay" onClick={() => setPhase("closed")}>Replay opening</button></div>}
        </div>
      </div>
      <div className="royal-corner royal-corner-tl" aria-hidden="true" /><div className="royal-corner royal-corner-tr" aria-hidden="true" /><div className="royal-corner royal-corner-bl" aria-hidden="true" /><div className="royal-corner royal-corner-br" aria-hidden="true" />
      <footer className="royal-bottom"><span>ROYAL INVITATION · INTERACTIVE PROTOTYPE</span><span>Ivory · Antique Gold · Light</span></footer>
    </main>
  );
}
