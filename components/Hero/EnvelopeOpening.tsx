"use client";
import styles from "./EnvelopeOpening.module.css";
export default function EnvelopeOpening({ opening, onOpen, reducedMotion }: { opening: boolean; onOpen: () => void; reducedMotion: boolean }) {
 return <div className={styles.overlay} data-opening={opening} data-reduced={reducedMotion}>
   <div className={styles.paperGrain} aria-hidden="true"/>
   <div className={styles.edgeVignette} aria-hidden="true"/>
   <div className={styles.revealGlow} aria-hidden="true"/>
   <div className={styles.letterpress} aria-hidden="true"><span>THE WEDDING OF</span><strong>NIKETH <i>&amp;</i> SIRISHA</strong><span>18 NOVEMBER 2026</span></div>
   <div className={styles.envelope} aria-hidden="true">
     <div className={styles.back}/>
     <div className={styles.innerLight}/>
     <div className={styles.leftWing}><div className={styles.faceShade}/></div>
     <div className={styles.rightWing}><div className={styles.faceShade}/></div>
     <div className={styles.bottomWing}><div className={styles.faceShade}/></div>
     <div className={styles.flap}><div className={styles.flapReverse}/><div className={styles.faceShade}/></div>
     <div className={styles.foldShadow} aria-hidden="true"/>
     <div className={styles.goldTrace} aria-hidden="true"/>
     <div className={styles.seam} aria-hidden="true"/>
     <div className={styles.monogram}>N <span>✦</span> S</div>
   </div>
   <button type="button" className={styles.seal} onClick={onOpen} disabled={opening} tabIndex={opening ? -1 : 0} aria-label="Break the NikSha seal and open the wedding invitation"><span className={styles.sealInner}>NS</span><span className={styles.sealFracture} aria-hidden="true"/><span className={styles.sealHint}>TAP THE SEAL TO OPEN</span></button>
 </div>
}
