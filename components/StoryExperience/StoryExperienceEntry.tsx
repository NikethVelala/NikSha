"use client";

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
      <div ref={entryRef} className={styles.entrance}>
        <p className={styles.bridge}>We had chosen each other.<br />Now, our families became part of our forever.</p>
        <div className={styles.invitation}>
          <GardenEntranceArtwork />
          <div className={styles.copy}>
            <div aria-hidden="true" className={styles.ornament}><MugguOrnament className="h-4 w-6" /></div>
            <p className={styles.eyebrow}>The Garden of Becoming</p>
            <h3 className={styles.title}>The Road to <span>Our Wedding</span></h3>
            <p className={styles.description}>Two families. Three celebrations.<br />A beautiful beginning to forever.</p>
            <button ref={triggerRef} type="button" onClick={() => setProfile(getGardenProfile())} className={styles.button}>
              Enter Our Garden <ArrowRight className="h-4 w-4" strokeWidth={1.3} />
            </button>
            <p className={styles.note}>Explore our celebrations · Return at any time</p>
          </div>
        </div>
      </div>

      {profile && <CinematicStoryExperience profile={profile} onExit={close} onContinue={continueInvitation} />}
    </>
  );
}
