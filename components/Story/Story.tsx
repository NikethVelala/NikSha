"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MugguOrnament from "@/components/common/MugguOrnament";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";
import StoryExperienceEntry from "@/components/StoryExperience/StoryExperienceEntry";

const chapters = [
  { number: "01", title: "School Days", eyebrow: "Where it began" },
  { number: "02", title: "A Friendship", eyebrow: "What grew between us" },
  { number: "03", title: "Something More", eyebrow: "When friendship became love" },
];

function ChapterMarker({ number, title, eyebrow, active }: (typeof chapters)[number] & { active: boolean }) {
  return (
    <div className="flex items-center gap-5 sm:gap-7">
      <span className={`font-heading text-5xl leading-none transition-colors duration-500 sm:text-6xl ${active ? "text-champagne" : "text-champagne/45"}`}>{number}</span>
      <span className={`h-px transition-all duration-500 sm:w-16 ${active ? "w-14 bg-champagne" : "w-10 bg-champagne/30"}`} />
      <div>
        <p className={`text-[9px] uppercase tracking-[0.32em] transition-colors duration-500 sm:text-[10px] ${active ? "text-rose" : "text-rose/55"}`}>{eyebrow}</p>
        <p className={`mt-1 font-heading text-2xl transition-colors duration-500 sm:text-3xl ${active ? "text-charcoal" : "text-charcoal/55"}`}>{title}</p>
      </div>
    </div>
  );
}

export default function Story() {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const articles = Array.from(document.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    if (!articles.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const index = visible[0]?.target.getAttribute("data-story-chapter");
        if (index !== null && index !== undefined) setActiveChapter(Number(index));
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0.12, 0.35, 0.6] },
    );

    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="story" className="coastal-story relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: "easeOut" }} className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-rose sm:text-xs">Chapter II · Our Story</p>
          <h2 className="mt-6 font-heading text-6xl leading-[0.9] text-charcoal sm:text-8xl">{wedding.story.title}</h2>
          <p className="mx-auto mt-8 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/65 sm:mt-10 sm:text-3xl">{wedding.story.intro}</p>
          <div className="mx-auto mt-8 flex h-14 w-44 items-center justify-center text-champagne"><MugguOrnament variant="divider" className="h-8 w-36" /></div>
        </motion.header>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative mt-10 sm:mt-16">
          <div className="relative overflow-hidden border-y border-champagne/45 bg-paper p-1 sm:p-2">
            <motion.img src="/images/story.jpg" alt="Niketh and Sirisha through the years" whileHover={{ scale: 1.015 }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-auto w-full object-contain" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.35em] text-ivory/80 sm:bottom-7 sm:left-7">From then · to now</p>
          </div>
        </motion.div>

        <div className="relative mt-16 sm:mt-28">
          <div className="absolute bottom-0 left-[25px] top-0 hidden w-px bg-champagne/30 md:block" />
          <div className="space-y-14 sm:space-y-24">
            {wedding.story.paragraphs.map((paragraph, index) => {
              const chapter = chapters[index];
              const active = activeChapter === index;
              return (
                <motion.article key={index} data-story-chapter={index} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative md:grid md:grid-cols-[280px_1fr] md:gap-14">
                  <div className="relative z-10 bg-ivory pb-5 md:pb-0 md:pt-1"><ChapterMarker {...chapter} active={active} /></div>
                  <div className={`max-w-2xl border-l pl-6 transition-colors duration-500 sm:pl-10 md:border-l-0 md:pl-0 ${active ? "border-champagne" : "border-champagne/35"}`}>
                    <p className={`font-heading text-xl leading-[1.65] transition-colors duration-500 sm:text-3xl sm:leading-[1.55] ${active ? "text-charcoal" : "text-charcoal/65"}`}>{paragraph}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1 }} className="mt-20 border-t border-champagne/30 pt-10 text-center sm:mt-32 sm:pt-16">
          <p className="text-[9px] uppercase tracking-[0.45em] text-rose">And now</p>
          <p className="mx-auto mt-5 max-w-2xl font-heading text-4xl leading-tight text-charcoal sm:text-5xl">The next chapter is the one we get to write together.</p>
          <div aria-hidden="true" className="mx-auto mt-7 h-px w-20 bg-champagne/60" />
        </motion.div>

        <StoryExperienceEntry />
      </div>
    </Section>
  );
}
