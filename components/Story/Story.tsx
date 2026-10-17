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
    reflection: "Back then, we were simply two classmates, part of the same school-day memories. Nothing announced itself as the beginning of a love story. There was no grand moment, no promise of forever—only an ordinary hello that would mean something extraordinary one day.",
    closingLine: "Some beginnings are so quiet that you only recognise them when you look back.",
    photos: ["01-school-days"],
    note: "School group photograph · selective colour",
  },
  {
    title: "The Years Between",
    eyebrow: "Still connected",
    copy: "Life carried us into different seasons. Through the years, the friendship remained.",
    reflection: "School became a memory, and life took us in different directions. We weren't together for every milestone or every ordinary day. But somewhere between the passing years and the conversations that brought us back, the connection never quite disappeared.",
    closingLine: "Time changed so much around us. It never quite erased the thread between us.",
    photos: ["02-years-between"],
    note: "Beach friends photograph · selective colour",
  },
  {
    title: "Ten Became Four",
    eyebrow: "A smaller circle",
    copy: "From a larger group of friends, four of us kept finding our way back to one another—even through a screen.",
    reflection: "What had once been a bigger circle gradually became a smaller one. Ten friends became four, and the conversations continued across screens and changing routines. There was comfort in having people who still felt familiar, no matter how much life moved on.",
    closingLine: "Without realising it, we were becoming part of each other's everyday world again.",
    photos: ["03-ten-became-four"],
    note: "Four-person video call · full colour",
  },
  {
    title: "A Little Hyderabad Magic",
    eyebrow: "Moments together",
    copy: "Hyderabad gave us days to remember: a visit to Charminar, laughter at Wonderla, and a quieter moment together on the water.",
    reflection: "Some memories are made in the middle of a crowd. Others happen in the spaces between the noise. There was Charminar with friends, a day of adventure at Wonderla, and a moment together on the water. At the time, they were simply good days—days we were happy to share.",
    closingLine: "Only later would we understand how precious those seemingly ordinary moments had become.",
    photos: ["04a-charminar", "04b-wonderla", "04c-kayaking"],
    note: "Charminar in full colour → selective-colour Wonderla → kayaking in full colour",
  },
  {
    title: "The Hardest Goodbye",
    eyebrow: "Two cities · one connection",
    copy: "Then came the distance. Sirisha returned to Punjab while Niketh stayed in Hyderabad. We were still friends, with feelings we had not yet put into words.",
    reflection: "The city that held so many memories was no longer a place we could both be. Sirisha went back to Punjab; Niketh remained in Hyderabad. There was distance between two friends, and something deeper neither of us had confessed yet. We didn't have a name for what was changing.",
    closingLine: "Two places. Two lives moving forward. One connection that refused to feel far away.",
    photos: [],
    note: "",
  },
  {
    title: "More Than Friends, Not Yet Forever",
    eyebrow: "The feelings we finally shared",
    copy: "When we finally told each other how we felt, a new part of our story began. Before the proposal, there were little moments that made this new beginning our own.",
    reflection: "Eventually, the feelings we had kept unspoken found their words. Friendship had grown into something more, and for the first time, we could share that truth with each other. The months that followed weren't defined by a single grand gesture. They were filled with little moments, photographs, adventures, and the simple happiness of being us.",
    closingLine: "The love story hadn't suddenly begun. We had finally realised we were already living it.",
    photos: ["06a-mirror", "06b-forest-road", "06c-stadium"],
    note: "Mirror selfie → forest-road selfie → stadium selfie · full colour",
  },
  {
    title: "The Proposal",
    eyebrow: "A question for forever",
    copy: "And then came the question that changed everything.",
    reflection: "After all the years, all the conversations, the laughter, the distance, and the feelings we finally found the courage to share, there was one question left to ask. Not about where our story began, but about every chapter still waiting to be written.",
    closingLine: "From that first unspoken hello to a promise of forever.",
    photos: ["proposal"],
    note: "",
  },
];

type Photograph = { src: string; width: number; height: number; alt: string; caption: string };
const photographs: Record<string, Photograph> = {
  "01-school-days": { src: "/images/story/01-school-days.webp", width: 1600, height: 1154, alt: "School friends together, with Niketh and Sirisha highlighted in colour", caption: "A familiar face. An unwritten story." },
  "02-years-between": { src: "/images/story/02-years-between.webp", width: 1280, height: 853, alt: "Niketh and Sirisha with friends on the beach, selectively in colour", caption: "Different paths. A connection that stayed." },
  "03-ten-became-four": { src: "/images/story/03-ten-became-four.webp?v=2", width: 1050, height: 2048, alt: "Four friends keeping in touch on a video call", caption: "Four screens. One little circle." },
  "04a-charminar": { src: "/images/story/04a-charminar.webp?v=2", width: 1600, height: 2133, alt: "Niketh, Sirisha and friends in front of Charminar", caption: "01 · Charminar" },
  "04b-wonderla": { src: "/images/story/04b-wonderla.webp", width: 1467, height: 2200, alt: "Niketh and Sirisha with friends on the Wonderla amusement ride", caption: "02 · Wonderla" },
  "04c-kayaking": { src: "/images/story/04c-kayaking.webp?v=2", width: 1600, height: 2133, alt: "Niketh and Sirisha enjoying a kayaking outing", caption: "03 · A little closer, on the water" },
  "06a-mirror": { src: "/images/story/06a-mirror.webp", width: 1237, height: 2200, alt: "Niketh and Sirisha together in a full-colour mirror selfie", caption: "The everyday" },
  "06b-forest-road": { src: "/images/story/06b-forest-road.webp", width: 1600, height: 2133, alt: "Sirisha and Niketh taking a selfie on a forest road", caption: "The little adventures" },
  "06c-stadium": { src: "/images/story/06c-stadium.webp", width: 1600, height: 2133, alt: "Niketh and Sirisha smiling together at the stadium", caption: "The joy of us" },
  proposal: { src: "/images/optimized/story-2400.webp", width: 2400, height: 3600, alt: "Niketh on one knee proposing to Sirisha beneath a floral arch", caption: "A question. A promise. A lifetime." },
};

function StoryPhotograph({ name, compact = false, order = 0 }: { name: string; compact?: boolean; order?: number }) {
  const reducedMotion = usePageReducedMotion();
  const photo = photographs[name];
  return (
    <motion.figure initial={reducedMotion ? false : { opacity: 0, y: compact ? 12 : 0 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : order * 0.12 }}
      className={`${styles.photograph} ${name === "03-ten-became-four" ? styles.call : ""}`}>
      <div className={styles.frame}>
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
          sizes={name === "proposal" ? "(min-width: 1100px) 980px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 24px)" : compact ? "(min-width: 768px) 300px, 44vw" : "(min-width: 768px) 640px, calc(100vw - 40px)"}
          loading="lazy" className={styles.image} />
      </div>
      <figcaption>{photo.caption}</figcaption>
    </motion.figure>
  );
}

function DistanceScene() {
  const reducedMotion = usePageReducedMotion();
  return (
    <motion.div initial="quiet" whileInView="connected" viewport={{ once: true, amount: 0.45 }} className={styles.distance} role="img" aria-label="Two distant golden lights connect Hyderabad, where Niketh stayed, and Punjab, where Sirisha returned, before their feelings were confessed">
      <motion.div aria-hidden="true" className={styles.thread}
        variants={{ quiet: { clipPath: reducedMotion ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" }, connected: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={{ duration: reducedMotion ? 0 : 2, delay: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}>
      <svg viewBox="0 0 600 180" className={styles.threadDrawing}>
        <defs><linearGradient id="story-thread"><stop stopColor="#ba9259" stopOpacity=".3"/><stop offset=".5" stopColor="#e6c78e"/><stop offset="1" stopColor="#ba9259" stopOpacity=".3"/></linearGradient></defs>
        <path d="M65 130 C190 165 380 5 535 50" fill="none" stroke="url(#story-thread)" strokeWidth="1.3"/>
        <circle cx="65" cy="130" r="4" fill="#f3d59f"/><circle cx="535" cy="50" r="4" fill="#f3d59f"/>
      </svg>
      </motion.div>
      <motion.div variants={{ quiet: { opacity: reducedMotion ? 1 : 0 }, connected: { opacity: 1 } }} transition={{ duration: reducedMotion ? 0 : 1 }} className={styles.cityLeft}><span className={styles.light}/><span>Hyderabad</span><small>Niketh</small></motion.div>
      <motion.div variants={{ quiet: { opacity: reducedMotion ? 1 : 0 }, connected: { opacity: 1 } }} transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.25 }} className={styles.cityRight}><span className={styles.light}/><span>Punjab</span><small>Sirisha</small></motion.div>
      <motion.p variants={{ quiet: { opacity: reducedMotion ? 1 : 0 }, connected: { opacity: 1 } }} transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 1.1 }}>So much between us. So much still unsaid.</motion.p>
    </motion.div>
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
        <p className={styles.introCopy}>A story told in moments, memories, miles apart, and the beautiful things we almost missed.</p>
        <MugguOrnament variant="divider" className="mx-auto mt-6 h-8 w-36 text-champagne" />
      </motion.header>
      <div className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <article key={chapter.title} data-story-chapter={index} aria-labelledby={`story-title-${index}`} className={`${styles.chapter} ${index === 4 ? styles.separation : ""} ${index === 6 ? styles.finale : ""}`}>
            {index > 0 && <motion.div aria-hidden="true" className={styles.chapterBridge}
              initial={reducedMotion ? false : { opacity: 0, scaleY: 0.4 }} animate={reducedMotion ? { opacity: 1, scaleY: 1 } : undefined}
              whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 1.1 }}>
              <span/><i/><span/>
            </motion.div>}
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: index === 4 ? 0 : 18 }} animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reducedMotion ? 0 : index === 4 ? 1.2 : 0.75 }} className={styles.heading}>
              <div className={styles.marker}><span>{String(index + 1).padStart(2, "0")}</span><p className={styles.eyebrow}>{chapter.eyebrow}</p></div>
              <h3 id={`story-title-${index}`}>{chapter.title}</h3>
              <p className={styles.copy}>{chapter.copy}</p>
              <p className={styles.reflection}>{chapter.reflection}</p>
              <motion.p initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? { opacity: 1 } : undefined}
                whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.15 }} className={styles.closingLine}>{chapter.closingLine}</motion.p>
            </motion.div>
            {index === 4 ? <DistanceScene /> : (
              <motion.div data-proposal-reveal={index === 6 ? "true" : undefined}
                initial={reducedMotion ? false : index === 6 ? { opacity: 0, clipPath: "inset(8% 0 8% 0)", scale: 0.985 } : { opacity: 0 }}
                animate={reducedMotion ? { opacity: 1, clipPath: "inset(0% 0 0% 0)", scale: 1 } : undefined}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)", scale: 1 }} viewport={{ once: true, amount: index === 6 ? 0.18 : 0.08 }}
                transition={{ duration: reducedMotion ? 0 : index === 6 ? 1.5 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`${styles.composition} ${index === 3 ? styles.hyderabad : ""} ${index === 5 ? styles.together : ""}`}>
                {chapter.photos.map((name, i) => <StoryPhotograph key={name} name={name} order={i} compact={(index === 3 && i < 2) || index === 5} />)}
              </motion.div>
            )}
            {index === 6 && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reducedMotion ? 0 : 1.15, delay: reducedMotion ? 0 : 0.2 }} className={styles.yes}><p>And she said yes.</p><span>18 November 2026 · Our wedding</span></motion.div>}
          </article>
        ))}
      </div>
      <div className={styles.closing}><MugguOrnament variant="divider" className="mx-auto h-8 w-36 text-champagne"/><p>Our next chapter is written together.</p></div>
      <StoryExperienceEntry />
    </Section>
  );
}
