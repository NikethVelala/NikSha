"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./cinematic.css";
type Phase = "awaiting" | "unsealing" | "unfolding" | "arrived";
export default function CinematicInvitation() {
  const [phase,setPhase] = useState<Phase>("awaiting");
  const [reduce,setReduce] = useState(false);
  const [pointer,setPointer] = useState({x:50,y:45});
  const timers = useRef<number[]>([]);
  useEffect(()=>{const q=window.matchMedia("(prefers-reduced-motion: reduce)");const change=()=>setReduce(q.matches);change();q.addEventListener("change",change);return()=>q.removeEventListener("change",change)},[]);
  useEffect(()=>()=>timers.current.forEach(window.clearTimeout),[]);
  const enter=()=>{
    if(phase!=="awaiting")return;
    timers.current.forEach(window.clearTimeout);timers.current=[];
    if(reduce){setPhase("arrived");return}
    setPhase("unsealing");
    timers.current.push(window.setTimeout(()=>setPhase("unfolding"),850));
    timers.current.push(window.setTimeout(()=>setPhase("arrived"),2650));
  };
  const replay=()=>{timers.current.forEach(window.clearTimeout);timers.current=[];setPhase("awaiting")};
  return <main className="cin" data-phase={phase} data-reduce={reduce} style={{"--px":pointer.x+"%","--py":pointer.y+"%"} as React.CSSProperties} onPointerMove={e=>{if(e.pointerType==="mouse")setPointer({x:Math.round(e.clientX/window.innerWidth*100),y:Math.round(e.clientY/window.innerHeight*100)})}}>
    <div className="cin-ambient" aria-hidden="true"/><div className="cin-grain" aria-hidden="true"/>
    <div className="cin-borders" aria-hidden="true"><i/><i/><i/><i/></div>
    <header className="cin-header"><span className="cin-logo">N<span>✦</span>S</span><span className="cin-edition">THE WEDDING CELEBRATION · 2026</span><Link href="/">BACK TO ORIGINAL ↗</Link></header>
    <section className="cin-scene" aria-label="Interactive wedding invitation">
      <div className="cin-beam cin-beam-left" aria-hidden="true"/><div className="cin-beam cin-beam-right" aria-hidden="true"/>
      <div className="cin-lamp cin-lamp-left" aria-hidden="true"><span className="cin-fire"/><span className="cin-lamp-cup"/><span className="cin-lamp-post"/></div>
      <div className="cin-lamp cin-lamp-right" aria-hidden="true"><span className="cin-fire"/><span className="cin-lamp-cup"/><span className="cin-lamp-post"/></div>
      <p className="cin-overline">WITH LOVE AND THE BLESSINGS OF OUR FAMILIES</p>
      <div className="cin-stage">
        <div className="cin-card" aria-hidden={phase==="arrived"}>
          <div className="cin-card-back"><span>AN INVITATION TO FOREVER</span><span className="cin-card-back-ornament">❦</span></div>
          <div className="cin-card-face">
            <div className="cin-card-frame"/>
            <div className="cin-card-foil">N<span>✦</span>S</div>
            <p className="cin-card-title">A celebration of love</p>
            <span className="cin-card-rule"/>
            <p className="cin-card-date">18 · NOVEMBER · 2026</p>
            <span className="cin-card-corner cin-card-corner-a">✦</span><span className="cin-card-corner cin-card-corner-b">✦</span>
          </div>
          <div className="cin-seal"><span>❧</span></div>
        </div>
        <div className="cin-reveal" aria-live="polite">
          <div className="cin-reveal-aura"/>
          <p className="cin-reveal-eyebrow">TOGETHER WITH OUR FAMILIES</p>
          <span className="cin-reveal-flourish">❧</span>
          <h1>Niketh <em>&amp;</em> Sirisha</h1>
          <p className="cin-reveal-verse">A beautiful beginning to our forever.</p>
          <div className="cin-reveal-rule"/>
          <p className="cin-reveal-date">WEDNESDAY · 18 NOVEMBER 2026</p>
          <p className="cin-reveal-venue">SB SQUARE · RUSHIKONDA · VISAKHAPATNAM</p>
        </div>
      </div>
      <div className="cin-action">
        {phase==="awaiting"?<><p>AN INVITATION, PERSONALLY FOR YOU</p><button type="button" onClick={enter}>ENTER OUR CELEBRATION <span>↗</span></button></>:phase==="arrived"?<><p>WE CANNOT WAIT TO CELEBRATE WITH YOU</p><Link className="cin-continue" href="/">DISCOVER NIKSHA <span>↗</span></Link><button className="cin-replay" type="button" onClick={replay}>Replay experience</button></>:<p className="cin-transition-label">A MOMENT TO REMEMBER</p>}
      </div>
    </section>
    <footer className="cin-footer"><span>AN EXPERIMENTAL CINEMATIC ENTRANCE</span><span>LIGHT · PAPER · TIMELESS LOVE</span></footer>
  </main>
}
