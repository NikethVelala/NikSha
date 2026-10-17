"use client";

import { useInView } from "framer-motion";
import usePageActive from "@/components/common/usePageActive";
import usePageReducedMotion from "@/components/common/usePageReducedMotion";
import beam from "@/components/common/GoldPerimeter.module.css";
import MugguOrnament from "@/components/common/MugguOrnament";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import GardenEntranceArtwork from "./GardenEntranceArtwork";
import styles from "./GardenEntrance.module.css";
import CinematicStoryExperience from "./CinematicStoryExperience";
import { getGardenProfile, type GardenProfile } from "./runtime";
import useGardenPreparation from "./useGardenPreparation";

export default function StoryExperienceEntry() {
  const [profile, setProfile] = useState<GardenProfile | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  useGardenPreparation(entryRef);
  const triggerVisible = useInView(triggerRef, { amount: 0.2 });
  const reducedMotion = usePageReducedMotion();
  const pageActive = usePageActive();

  const close = useCallback(() => {
    setProfile(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  const continueInvitation = () => {
    setProfile(null);
    window.requestAnimationFrame(() => {
      const section = document.getElementById("forever");
      if (section && window.location.hash !== "#forever") window.history.pushState(window.history.state, "", "#forever");
      section?.setAttribute("tabindex", "-1");
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({ behavior: profile?.reducedMotion ? "instant" : "smooth", block: "start" });
    });
  };

  return (
    <>
      <section id="garden-entry" aria-labelledby="garden-entry-title" className={styles.section}>
      <div ref={entryRef} className={styles.entrance}>
        <div aria-hidden="true" className={styles.sectionDivider}><MugguOrnament className="h-7 w-10" /></div>
        <p className={styles.sectionLabel}>The celebrations that followed</p>
        <p className={styles.bridge}>With our families beside us,<br />the celebrations began.</p>
        <div className={styles.invitation}>
          <GardenEntranceArtwork />
          <div className={styles.copy}>
            <div aria-hidden="true" className={styles.ornament}><MugguOrnament className="h-4 w-6" /></div>
            <p className={styles.eyebrow}>The Garden of Becoming</p>
            <h2 id="garden-entry-title" className={styles.title}>The Road to <span>Our Wedding</span></h2>
            <p className={styles.description}>Two families. Three celebrations.<br />A beautiful beginning to forever.</p>
            <button ref={triggerRef} data-sparkle-active={pageActive && triggerVisible && !profile && !reducedMotion} aria-haspopup="dialog" aria-expanded={Boolean(profile)} type="button" onClick={() => setProfile(getGardenProfile())} className={`${styles.button} ${beam.control}`}>
              <span aria-hidden="true" className={beam.sparkle} />
              Enter Our Garden <ArrowRight className="h-4 w-4" strokeWidth={1.3} />
            </button>
            <p className={styles.note}>Explore our celebrations · Return at any time</p>
          </div>
        </div>
      </div>
      </section>

      {profile && <CinematicStoryExperience profile={profile} onExit={close} onContinue={continueInvitation} />}
    </>
  );
}
