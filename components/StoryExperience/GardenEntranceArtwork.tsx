import Image from "next/image";
import { useId } from "react";
import styles from "./GardenEntrance.module.css";

/** A lightweight doorway into the existing garden; no second WebGL scene. */
export default function GardenEntranceArtwork() {
  const id = useId().replace(/:/g, "");
  return (
    <div className={styles.artwork} aria-hidden="true">
      <div className={styles.doorway}>
        <Image src="/images/garden/blue-hour.webp" alt="" fill sizes="(max-width: 767px) 280px, 340px" className={styles.gardenImage} />
        <div className={styles.mist} />
        <svg className={styles.path} viewBox="0 0 300 360" fill="none">
          <path d="M141 195C178 224 104 257 127 284C141 304 188 325 212 360H60C90 327 103 312 98 287C90 250 165 225 141 195Z" fill={`url(#${id}-path)`} />
          <path d="M141 195C178 224 104 257 127 284C141 304 188 325 212 360" stroke="#e3c28a" strokeOpacity=".4" />
          <defs><linearGradient id={`${id}-path`} x1="140" y1="195" x2="140" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#f3d6a4" stopOpacity=".1" /><stop offset="1" stopColor="#d1b37c" stopOpacity=".45" /></linearGradient></defs>
        </svg>
        <span className={styles.farLight} />
        {[0, 1, 2].map((n) => <span key={n} className={styles.petal} style={{ left: `${30 + n * 22}%`, animationDelay: `${n * -3}s` }} />)}
      </div>
      <svg className={styles.arch} viewBox="0 0 420 440" fill="none">
        <defs>
          <linearGradient id={`${id}-stone`} x1="40" y1="180" x2="380" y2="220" gradientUnits="userSpaceOnUse"><stop stopColor="#d6c9b1" /><stop offset=".15" stopColor="#fff9e9" /><stop offset=".5" stopColor="#ede1c8" /><stop offset=".85" stopColor="#fff9e9" /><stop offset="1" stopColor="#c5b494" /></linearGradient>
          <radialGradient id={`${id}-light`}><stop stopColor="#ffe7a7" stopOpacity=".8" /><stop offset="1" stopColor="#ecc16e" stopOpacity="0" /></radialGradient>
          <g id={`${id}-flower`}>
            {[0, 72, 144, 216, 288].map((angle) => <ellipse key={angle} cx="0" cy="-4" rx="2.6" ry="5.2" fill="#fff8df" transform={`rotate(${angle})`} />)}
            <circle r="1.8" fill="#c5a15d" />
          </g>
          <g id={`${id}-sprig`}>
            <path d="M0 46Q-6 18 6-12" stroke="#7c8a57" strokeWidth="1.6" />
            {[-1, 1].map((side) => <g key={side} transform={`scale(${side} 1)`}><ellipse cx="8" cy="6" rx="5" ry="12" fill="#465c3d" transform="rotate(38 8 6)" /><ellipse cx="7" cy="27" rx="5" ry="11" fill="#697c4b" transform="rotate(45 7 27)" /><use href={`#${id}-flower`} x="4" y="-6" /><use href={`#${id}-flower`} x="12" y="17" /></g>)}
          </g>
        </defs>
        {/* Layered ivory masonry and a fine antique-gold inner rim. */}
        <path d="M49 406V190C49 98 121 31 210 31S371 98 371 190V406H343V190C343 113 285 59 210 59S77 113 77 190V406Z" fill={`url(#${id}-stone)`} />
        <path d="M61 406V190C61 106 127 44 210 44S359 106 359 190V406M82 406V190C82 116 139 64 210 64S338 116 338 190V406" stroke="#b18d50" strokeWidth="1.3" />
        {[49, 343].map((x) => <g key={x}><path d={`M${x - 5} 392h38v16h-38zM${x - 3} 196h34v8h-34z`} fill="#e7d9bd" stroke="#b89b68" strokeWidth=".8" /><path d={`M${x + 9} 212v171M${x + 19} 212v171`} stroke="#c9b792" strokeWidth="1" /></g>)}
        {/* Jasmine follows the arch; hanging buds recall wedding garlands. */}
        {[[-2, 1], [422, -1]].map(([x, scale]) => <g key={x} transform={`translate(${x} 0) scale(${scale} 1)`}>
          <path d="M60 265Q30 170 83 107Q131 39 205 43" stroke="#516642" strokeWidth="5" />
          {[[53, 231, -12], [48, 187, 6], [59, 145, 18], [83, 109, 35], [116, 78, 48], [153, 55, 64], [190, 45, 80]].map(([sx, sy, angle], index) => <use key={index} href={`#${id}-sprig`} transform={`translate(${sx} ${sy}) rotate(${angle}) scale(1.1)`} />)}
          {[0, 1, 2].map((n) => <g key={n}><path d={`M${88 + n * 17} ${91 - n * 13}q-5 35 0 ${68 - n * 9}`} stroke="#a59b6f" strokeWidth="1" />{[0, 1, 2, 3, 4].map((bud) => <ellipse key={bud} cx={88 + n * 17} cy={103 - n * 13 + bud * 9} rx="2.8" ry="4" fill="#fff5d6" />)}</g>)}
        </g>)}
        {/* Lanterns and their pools of light lead into the garden. */}
        {[108, 312].map((x) => <g key={x}>
          <circle className={styles.lanternGlow} cx={x} cy="323" r="47" fill={`url(#${id}-light)`} />
          <path d={`M${x} 284v15m-11 4 11-6 11 6m-22 0h22v28h-22zM${x - 14} 333h28`} stroke="#bda16b" strokeWidth="1.4" />
          <path d={`M${x - 8} 305h16v24h-16z`} fill="#f6d99d" fillOpacity=".65" />
          <path d={`M${x} 307v22`} stroke="#fff1c3" strokeWidth="2" />
        </g>)}
        <path d="M34 411h352M54 418h312M83 425h254" stroke="#b79a64" strokeOpacity=".55" />
      </svg>
      <span className={styles.artworkCaption}>A new chapter awaits</span>
    </div>
  );
}
