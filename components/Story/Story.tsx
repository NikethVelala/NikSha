"use client";

import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import MugguOrnament from "@/components/common/MugguOrnament";
import usePageReducedMotion from "@/components/common/usePageReducedMotion";
import StoryExperienceEntry from "@/components/StoryExperience/StoryExperienceEntry";

// The nine curated historical photographs will be attached after their original
// files are supplied. Do not substitute generated or unrelated photographs.
const chapters = [
  {
    title: "The Unspoken Hello",
    eyebrow: "School days",
    copy: "It began in a classroom, long before either of us knew how much this connection would mean.",
    photos: [] as string[],
    note: "School group photograph · selective colour",
  },
  {
    title: "The Years Between",
    eyebrow: "Still connected",
    copy: "Life carried us into different seasons. Through the years, the friendship remained.",
    photos: [] as string[],
    note: "Beach friends photograph · selective colour",
  },
  {
    title: "Ten Became Four",
    eyebrow: "A smaller circle",
    copy: "From a larger group of friends, four of us kept finding our way back to one another—even through a screen.",
    photos: [] as string[],
    note: "Four-person video call · black and white",
  },
  {
    title: "A Little Hyderabad Magic",
    eyebrow: "Moments together",
    copy: "Hyderabad gave us days to remember: a visit to Charminar, laughter at Wonderla, and a quieter moment together on the water.",
    photos: [] as string[],
    note: "Charminar → Wonderla → kayaking · selective colour",
  },
  {
    title: "The Hardest Goodbye",
    eyebrow: "Two cities · one connection",
    copy: "Then came the distance. Sirisha returned to Punjab while Niketh stayed in Hyderabad. We were still friends, with feelings we had not yet put into words.",
    photos: [] as string[],
    note: "",
  },
  {
    title: "More Than Friends, Not Yet Forever",
    eyebrow: "The feelings we finally shared",
    copy: "When we finally told each other how we felt, a new part of our story began. Before the proposal, there was a whole year of little moments together.",
    photos: [] as string[],
    note: "Mirror selfie → forest-road selfie → stadium selfie · full colour",
  },
  {
    title: "The Proposal",
    eyebrow: "A question for forever",
    copy: "And then came the question that changed everything.",
    photos: ["/images/optimized/story-1080.webp"],
    note: "",
  },
];

export default function Story() {
  const reducedMotion = usePageReducedMotion();

  return (
    <Section id="story" className="coastal-story relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.85 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-rose">Our story</p>
          <h2 className="mt-5 font-heading text-5xl text-charcoal sm:text-7xl">Seven Chapters. One Forever.</h2>
          <p className="mx-auto mt-6 max-w-xl font-heading text-xl leading-relaxed text-charcoal/65 sm:text-2xl">
            Some stories begin long before we know they are love stories.
          </p>
          <div className="mx-auto mt-7 flex justify-center text-champagne">
            <MugguOrnament variant="divider" className="h-8 w-36" />
          </div>
        </motion.header>

        <div className="mx-auto mt-14 max-w-5xl space-y-16 sm:mt-24 sm:space-y-28">
          {chapters.map((chapter, index) => (
            <motion.article
              key={chapter.title}
              data-story-chapter={index}
              initial={reducedMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: reducedMotion ? 0 : 0.85 }}
              className={`relative border-t border-champagne/35 pt-8 sm:pt-12 ${index === 4 ? "py-14 sm:py-24" : ""}`}
            >
              {index === 4 && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#e4dfd5]/45 via-transparent to-[#e9dfce]/45" />
              )}
              <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:gap-10">
                <div>
                  <span className="font-heading text-6xl text-champagne/75">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-[9px] uppercase tracking-[0.28em] text-rose">{chapter.eyebrow}</p>
                </div>
                <div>
                  <h3 className="font-heading text-3xl leading-tight text-charcoal sm:text-5xl">{chapter.title}</h3>
                  <p className="mt-5 max-w-2xl font-heading text-xl leading-relaxed text-charcoal/70 sm:text-2xl">{chapter.copy}</p>
                  {index === 4 && (
                    <div className="mt-10 flex items-center justify-center gap-4 py-8 text-champagne sm:py-12">
                      <span className="h-px w-16 bg-champagne/50" />
                      <span className="h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(190,145,84,0.5)]" />
                      <span className="h-24 w-px bg-champagne/55" />
                      <span className="h-3 w-3 rounded-full bg-champagne shadow-[0_0_20px_rgba(190,145,84,0.5)]" />
                      <span className="h-px w-16 bg-champagne/50" />
                    </div>
                  )}
                  {chapter.photos.length > 0 && (
                    <div className="mt-9 grid gap-5">
                      {chapter.photos.map((src) => (
                        <figure key={src} className="overflow-hidden border border-champagne/30 bg-paper p-2 sm:p-3">
                          {/* Existing repository photograph, deliberately reserved for the finale. */}
                          <img src={src} alt="Niketh proposing to Sirisha" width={1080} height={1620} loading="lazy" decoding="async" className="mx-auto h-auto max-h-[80vh] w-auto max-w-full object-contain" />
                        </figure>
                      ))}
                    </div>
                  )}
                  {index === 6 && (
                    <div className="mt-9 text-center">
                      <p className="font-heading text-3xl italic text-charcoal sm:text-5xl">And she said yes.</p>
                      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-rose">18 November 2026 · Our wedding</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-2xl border-t border-champagne/30 pt-12 text-center">
          <p className="font-heading text-3xl text-charcoal sm:text-4xl">Our next chapter is written together.</p>
        </div>
        <StoryExperienceEntry />
      </div>
    </Section>
  );
}
