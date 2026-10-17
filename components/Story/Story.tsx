"use client";

import Image from "next/image";
import styles from "./Story.module.css";
import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import MugguOrnament from "@/components/common/MugguOrnament";
import usePageReducedMotion from "@/components/common/usePageReducedMotion";
import StoryExperienceEntry from "@/components/StoryExperience/StoryExperienceEntry";

const chapters = [
  {
    title: "The Unspoken Hello",
    eyebrow: "School days",
    copy: "It began in a classroom, long before either of us knew how much this connection would mean.",
    photos: ["01-school-days"],
    note: "School group photograph · selective colour",
  },
  {
    title: "The Years Between",
    eyebrow: "Still connected",
    copy: "Life carried us into different seasons. Through the years, the friendship remained.",
    photos: ["02-years-between"],
    note: "Beach friends photograph · selective colour",
  },
  {
    title: "Ten Became Four",
    eyebrow: "A smaller circle",
    copy: "From a larger group of friends, four of us kept finding our way back to one another—even through a screen.",
    photos: ["03-ten-became-four"],
    note: "Four-person video call · black and white",
  },
  {
    title: "A Little Hyderabad Magic",
    eyebrow: "Moments together",
    copy: "Hyderabad gave us days to remember: a visit to Charminar, laughter at Wonderla, and a quieter moment together on the water.",
    photos: ["04a-charminar", "04b-wonderla", "04c-kayaking"],
    note: "Charminar → Wonderla → kayaking · selective colour",
  },
  {
    title: "The Hardest Goodbye",
    eyebrow: "Two cities · one connection",
    copy: "Then came the distance. Sirisha returned to Punjab while Niketh stayed in Hyderabad. We were still friends, with feelings we had not yet put into words.",
    photos: [],
    note: "",
  },
  {
    title: "More Than Friends, Not Yet Forever",
    eyebrow: "The feelings we finally shared",
    copy: "When we finally told each other how we felt, a new part of our story began. Before the proposal, there were little moments that made this new beginning our own.",
    photos: ["06a-mirror", "06b-forest-road", "06c-stadium"],
    note: "Mirror selfie → forest-road selfie → stadium selfie · full colour",
  },
  {
    title: "The Proposal",
    eyebrow: "A question for forever",
    copy: "And then came the question that changed everything.",
    photos: ["proposal"],
    note: "",
  },
];

type Photograph = { src: string; width: number; height: number; alt: string; caption: string };
const photographs: Record<string, Photograph> = {
  "01-school-days": { src: "/images/story/01-school-days.webp", width: 1600, height: 1154, alt: "School friends together, with Niketh and Sirisha highlighted in colour", caption: "A familiar face. An unwritten story." },
  "02-years-between": { src: "/images/story/02-years-between.webp", width: 1280, height: 853, alt: "Niketh and Sirisha with friends on the beach, selectively in colour", caption: "Different paths. A connection that stayed." },
  "03-ten-became-four": { src: "/images/story/03-ten-became-four.webp", width: 720, height: 1560, alt: "Four friends keeping in touch on a video call, in black and white", caption: "Four screens. One little circle." },
  "04a-charminar": { src: "/images/story/04a-charminar.webp", width: 1600, height: 2133, alt: "Niketh, Sirisha and friends in front of Charminar", caption: "01 · Charminar" },
  "04b-wonderla": { src: "/images/story/04b-wonderla.webp", width: 1467, height: 2200, alt: "Niketh and Sirisha with friends on the Wonderla amusement ride", caption: "02 · Wonderla" },
  "04c-kayaking": { src: "/images/story/04c-kayaking.webp", width: 1052, height: 780, alt: "Sirisha and Niketh taking a selfie while kayaking", caption: "03 · A little closer, on the water" },
  "06a-mirror": { src: "/images/story/06a-mirror.webp", width: 1237, height: 2200, alt: "Niketh and Sirisha together in a full-colour mirror selfie", caption: "The everyday" },
  "06b-forest-road": { src: "/images/story/06b-forest-road.webp", width: 1600, height: 2133, alt: "Sirisha and Niketh taking a selfie on a forest road", caption: "The little adventures" },
  "06c-stadium": { src: "/images/story/06c-stadium.webp", width: 1600, height: 2133, alt: "Niketh and Sirisha smiling together at the stadium", caption: "The joy of us" },
  proposal: { src: "/images/optimized/story-1080.webp", width: 1080, height: 1620, alt: "Niketh on one knee proposing to Sirisha beneath a floral arch", caption: "A question. A promise. A lifetime." },
};

function StoryPhotograph({ name, compact = false }: { name: string; compact?: boolean }) {
  const photo = photographs[name];
  return (
    <figure className={`${styles.photograph} ${name === "03-ten-became-four" ? styles.call : ""}`}>
      <div className={styles.frame}>
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
          sizes={compact ? "(min-width: 768px) 300px, 44vw" : "(min-width: 768px) 640px, calc(100vw - 40px)"}
          loading="lazy" className={styles.image} />
      </div>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

function DistanceScene() {
  return (
    <div className={styles.distance} role="img" aria-label="Two distant golden lights connect Hyderabad, where Niketh stayed, and Punjab, where Sirisha returned, before their feelings were confessed">
      <svg viewBox="0 0 600 180" aria-hidden="true" className={styles.thread}>
        <defs><linearGradient id="story-thread"><stop stopColor="#ba9259" stopOpacity=".3"/><stop offset=".5" stopColor="#e6c78e"/><stop offset="1" stopColor="#ba9259" stopOpacity=".3"/></linearGradient></defs>
        <path d="M65 130 C190 165 380 5 535 50" fill="none" stroke="url(#story-thread)" strokeWidth="1.3"/>
        <circle cx="65" cy="130" r="4" fill="#f3d59f"/><circle cx="535" cy="50" r="4" fill="#f3d59f"/>
      </svg>
      <div className={styles.cityLeft}><span className={styles.light}/><span>Hyderabad</span><small>Niketh</small></div>
      <div className={styles.cityRight}><span className={styles.light}/><span>Punjab</span><small>Sirisha</small></div>
      <p>So much between us. So much still unsaid.</p>
    </div>
  );
}

export default function Story() {
  const reducedMotion = usePageReducedMotion();
  return (
    <Section id="story" className={`coastal-story bg-ivory ${styles.story}`}>
      <motion.header initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.7 }} className={styles.intro}>
        <p className={styles.eyebrow}>Our story</p>
        <h2>Seven Chapters.<br/><em>One Forever.</em></h2>
        <p className={styles.introCopy}>Some stories begin long before we know they are love stories.</p>
        <MugguOrnament variant="divider" className="mx-auto mt-6 h-8 w-36 text-champagne" />
      </motion.header>
      <div className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <article key={chapter.title} data-story-chapter={index} aria-labelledby={`story-title-${index}`} className={`${styles.chapter} ${index === 4 ? styles.separation : ""} ${index === 6 ? styles.finale : ""}`}>
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reducedMotion ? 0 : 0.65 }} className={styles.heading}>
              <div className={styles.marker}><span>{String(index + 1).padStart(2, "0")}</span><p className={styles.eyebrow}>{chapter.eyebrow}</p></div>
              <h3 id={`story-title-${index}`}>{chapter.title}</h3>
              <p className={styles.copy}>{chapter.copy}</p>
            </motion.div>
            {index === 4 ? <DistanceScene /> : (
              <motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? { opacity: 1 } : undefined}
                whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reducedMotion ? 0 : 0.8 }}
                className={`${styles.composition} ${index === 3 ? styles.hyderabad : ""} ${index === 5 ? styles.together : ""}`}>
                {chapter.photos.map((name, i) => <StoryPhotograph key={name} name={name} compact={(index === 3 && i < 2) || index === 5} />)}
              </motion.div>
            )}
            {index === 6 && <div className={styles.yes}><p>And she said yes.</p><span>18 November 2026 · Our wedding</span></div>}
          </article>
        ))}
      </div>
      <div className={styles.closing}><MugguOrnament variant="divider" className="mx-auto h-8 w-36 text-champagne"/><p>Our next chapter is written together.</p></div>
      <StoryExperienceEntry />
    </Section>
  );
}
