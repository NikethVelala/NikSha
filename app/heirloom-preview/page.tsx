"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./heirloom.css";

export default function HeirloomPreview(){
 const [open,setOpen]=useState(false);
 const [reduced,setReduced]=useState(false);
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReduced(media.matches);update();media.addEventListener("change",update);return()=>media.removeEventListener("change",update)},[]);
 return <main className="heirloom" data-open={open} data-reduced={reduced}>
  <div className="heirloom-paper" aria-hidden="true"/>
  <div className="heirloom-sun" aria-hidden="true"/>
  <div className="heirloom-frame" aria-hidden="true"><span className="heirloom-corner a"/><span className="heirloom-corner b"/><span className="heirloom-corner c"/><span className="heirloom-corner d"/></div>
  <header className="heirloom-header"><span className="heirloom-wordmark">NIKSHA <i>✳</i></span><span className="heirloom-header-center">A CELEBRATION OF TWO FAMILIES</span><Link href="/">ORIGINAL WEBSITE ↗</Link></header>
  <div className="heirloom-scene">
    <div className="heirloom-decoration heirloom-decoration-left" aria-hidden="true"><svg viewBox="0 0 160 460"><path d="M78 0C25 72 155 102 78 175S25 300 78 460" fill="none" stroke="currentColor" strokeWidth="1.3"/>{[35,85,140,198,258,322,384].map((y,i)=><g key={y} transform={`translate(${78+Math.sin(i*1.7)*35},${y}) rotate(${i*34})`}><path d="M0 0C-26-24-33 4 0 0C28-24 35 4 0 0" fill="currentColor" opacity=".55"/><circle r="3" fill="#ad7a3d"/></g>)}</svg></div>
    <div className="heirloom-decoration heirloom-decoration-right" aria-hidden="true"><svg viewBox="0 0 160 460"><path d="M78 0C25 72 155 102 78 175S25 300 78 460" fill="none" stroke="currentColor" strokeWidth="1.3"/>{[35,85,140,198,258,322,384].map((y,i)=><g key={y} transform={`translate(${78+Math.sin(i*1.7)*35},${y}) rotate(${i*34})`}><path d="M0 0C-26-24-33 4 0 0C28-24 35 4 0 0" fill="currentColor" opacity=".55"/><circle r="3" fill="#ad7a3d"/></g>)}</svg></div>
    <div className="heirloom-medallion" aria-hidden="true"><svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="134"/><circle cx="150" cy="150" r="121"/><circle cx="150" cy="150" r="103" strokeDasharray="2 8"/><path d="M150 7v28M150 265v28M7 150h28M265 150h28M49 49l20 20M231 231l20 20M49 251l20-20M231 69l20-20"/><path d="M150 57l17 31 35-4-4 35 31 17-31 17 4 35-35-4-17 31-17-31-35 4 4-35-31-17 31-17-4-35 35 4Z" opacity=".38"/></svg><span>NS</span></div>
    <div className="heirloom-first"><p className="heirloom-overline">WITH THE BLESSINGS OF OUR FAMILIES</p><div className="heirloom-rule"><span/></div><h1><span>Niketh</span><em>&amp;</em><span>Sirisha</span></h1><p className="heirloom-script">Our forever begins with you.</p><p className="heirloom-date">18 NOVEMBER 2026</p></div>
    <div className="heirloom-second"><p className="heirloom-overline">THE WEDDING CELEBRATION</p><span className="heirloom-flourish">❦</span><h2>Niketh <em>&amp;</em> Sirisha</h2><p className="heirloom-script">Two hearts. Two families. One beautiful forever.</p><div className="heirloom-details"><span>WEDNESDAY, 18 NOVEMBER 2026</span><span>MUHURTHAM · 10:01 PM</span><span>SB SQUARE · RUSHIKONDA · VISAKHAPATNAM</span></div></div>
    <div className="heirloom-actions">{!open?<button type="button" onClick={()=>setOpen(true)}>REVEAL THE INVITATION <span>↗</span></button>:<><Link href="/">ENTER OUR WEDDING WEBSITE ↗</Link><button className="heirloom-replay" type="button" onClick={()=>setOpen(false)}>Replay</button></>}</div>
  </div>
  <footer className="heirloom-footer"><span>AN HEIRLOOM INVITATION</span><span>CRAFTED IN LIGHT & GOLD</span></footer>
 </main>
}
