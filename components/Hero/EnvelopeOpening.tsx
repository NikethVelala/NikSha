"use client";
import styles from "./EnvelopeOpening.module.css";
export default function EnvelopeOpening({ opening, onOpen, reducedMotion }: { opening: boolean; onOpen: () => void; reducedMotion: boolean }) {
 return <div className={styles.overlay} data-opening={opening} data-reduced={reducedMotion}>
   <div className={styles.paperGrain} aria-hidden="true"/>
   <div className={styles.envelope} aria-hidden="true">
     <div className={styles.back}/>
     <div className={styles.innerLight}/>
     <div className={styles.leftWing}/>
     <div className={styles.rightWing}/>
     <div className={styles.bottomWing}/>
     <div className={styles.flap}/>
     <div className={styles.monogram}>N <span>✦</span> S</div>
   </div>
   {!opening && <button type="button" className={styles.seal} onClick={onOpen} aria-label="Break the NikSha seal and open the wedding invitation"><span className={styles.sealInner}>NS</span><span className={styles.sealHint}>TAP THE SEAL TO OPEN</span></button>}
 </div>
}
