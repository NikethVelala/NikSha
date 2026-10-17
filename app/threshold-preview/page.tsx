"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./threshold.css";

export default function ThresholdPreview(){
  const [entered,setEntered]=useState(false);
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{const m=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(m.matches);update();m.addEventListener("change",update);return()=>m.removeEventListener("change",update)},[]);
  return <main className="threshold" data-entered={entered} data-reduced={reduced}>
    <div className="threshold-grain" aria-hidden="true"/>
    <div className="threshold-ambient" aria-hidden="true"/>
    <div className="threshold-architecture" aria-hidden="true">
      <svg className="threshold-gateway" viewBox="0 0 900 1150" preserveAspectRatio="xMidYMax meet" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="archMetal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5d3e24"/><stop offset=".3" stopColor="#d2a66c"/><stop offset=".52" stopColor="#f3d9a4"/><stop offset=".8" stopColor="#a47442"/><stop offset="1" stopColor="#50351f"/></linearGradient>
          <radialGradient id="archGlow"><stop stopColor="#e5b96a" stopOpacity=".32"/><stop offset="1" stopColor="#e5b96a" stopOpacity="0"/></radialGradient>
        </defs>
        <ellipse cx="450" cy="540" rx="380" ry="520" fill="url(#archGlow)"/>
        <path d="M100 1150V430C100 195 255 48 450 48S800 195 800 430V1150" stroke="url(#archMetal)" strokeWidth="16"/>
        <path d="M125 1150V430C125 210 270 76 450 76S775 210 775 430V1150" stroke="#d5b078" strokeOpacity=".42" strokeWidth="2"/>
        <path d="M155 1150V430C155 236 280 107 450 107S745 236 745 430V1150" stroke="#b48951" strokeOpacity=".52" strokeWidth="3"/>
        <path d="M70 1150V430C70 165 245 18 450 18S830 165 830 430V1150" stroke="#8f683b" strokeOpacity=".36" strokeWidth="2"/>
        <path d="M450 48V13M432 29h36M450 12l-12 16 12 17 12-17-12-16Z" stroke="#e5bf7f" strokeWidth="2"/>
        {Array.from({length:13},(_,i)=><g key={i} transform={`translate(${90+i*60},1130)`}><path d="M0 0v-70m-12 35 12-20 12 20" stroke="#ac814f" strokeOpacity=".24" strokeWidth="2"/></g>)}
      </svg>
      <div className="threshold-door threshold-door-left"/><div className="threshold-door threshold-door-right"/>
      <div className="threshold-centerline"/>
    </div>
    <div className="threshold-light threshold-light-left" aria-hidden="true"/><div className="threshold-light threshold-light-right" aria-hidden="true"/>
    <header className="threshold-header"><span className="threshold-brand">N <span>✧</span> S</span><span>THE CELEBRATION OF A LIFETIME</span><Link href="/">ORIGINAL WEBSITE ↗</Link></header>
    <section className="threshold-content">
      <div className="threshold-intro">
        <p className="threshold-eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
        <div className="threshold-emblem" aria-hidden="true"><span>✦</span><svg viewBox="0 0 140 140"><circle cx="70" cy="70" r="57"/><circle cx="70" cy="70" r="48"/><path d="M70 5v20M70 115v20M5 70h20M115 70h20"/></svg></div>
        <h1 className="threshold-title"><span>Niketh</span><em>&amp;</em><span>Sirisha</span></h1>
        <p className="threshold-subtitle">Two hearts. One extraordinary beginning.</p>
        <div className="threshold-rule"><i/>✧<i/></div>
        <p className="threshold-date">18 NOVEMBER 2026</p>
      </div>
      <div className="threshold-arrival">
        <p className="threshold-arrival-overline">THE WEDDING OF</p>
        <h2>Niketh <em>&amp;</em> Sirisha</h2>
        <p className="threshold-arrival-copy">Together with our families, we joyfully invite you to celebrate our forever.</p>
        <p className="threshold-arrival-date">WEDNESDAY · 18 NOVEMBER 2026</p>
        <p className="threshold-arrival-venue">SB SQUARE · RUSHIKONDA · VISAKHAPATNAM</p>
      </div>
      <div className="threshold-actions">
        {!entered?<button type="button" onClick={()=>setEntered(true)}>STEP INTO OUR FOREVER <span aria-hidden="true">↗</span></button>:<><Link className="threshold-enter" href="/">EXPLORE OUR WEDDING <span aria-hidden="true">↗</span></Link><button className="threshold-replay" type="button" onClick={()=>setEntered(false)}>Replay the entrance</button></>}
      </div>
    </section>
    <div className="threshold-floor" aria-hidden="true"/>
    <footer className="threshold-footer"><span>AN IMMERSIVE INVITATION EXPERIMENT</span><span>LIGHT · ARCHITECTURE · FOREVER</span></footer>
  </main>
}
