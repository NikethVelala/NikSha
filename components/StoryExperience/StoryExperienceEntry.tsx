"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import CinematicStoryExperience from "./CinematicStoryExperience";
import { getGardenProfile, type GardenProfile } from "./runtime";

export default function StoryExperienceEntry() {
  const [profile, setProfile] = useState<GardenProfile | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setProfile(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  const continueInvitation = () => {
    setProfile(null);
    window.requestAnimationFrame(() => {
      const section = document.getElementById("evening");
      section?.setAttribute("tabindex", "-1");
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({ behavior: profile?.reducedMotion ? "instant" : "smooth", block: "start" });
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-12 max-w-3xl overflow-hidden border border-champagne/35 bg-[#183629] px-6 py-8 text-center shadow-[0_24px_64px_rgba(30,50,38,0.14)] sm:mt-16 sm:px-12 sm:py-11"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,201,144,0.2),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_44%,rgba(210,165,115,0.1))]" />
        <div aria-hidden="true" className="absolute inset-[6px] border border-champagne/20" />
        <div className="relative">
          <div aria-hidden="true" className="mx-auto flex items-center justify-center gap-3 text-champagne/80"><span className="h-px w-10 bg-champagne/45" /><Sparkles className="h-3.5 w-3.5" strokeWidth={1.3} /><span className="h-px w-10 bg-champagne/45" /></div>
          <p className="mt-5 text-[9px] uppercase tracking-[0.4em] text-champagne/80">An optional cinematic interlude</p>
          <h3 className="mt-3 font-heading text-4xl leading-none text-[#fff8e9] sm:text-5xl">Step Into <span className="italic text-champagne">Our Story</span></h3>
          <p className="mx-auto mt-4 max-w-lg font-heading text-lg italic leading-relaxed text-[#fff8e9]/70 sm:text-xl">A flower-lit garden, three memories, and a little more of the journey that brought us here.</p>
          <button ref={triggerRef} type="button" onClick={() => setProfile(getGardenProfile())} className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-champagne/70 bg-[#f8f4ee] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#244232] transition-all hover:-translate-y-0.5 hover:bg-[#fffaf1] hover:shadow-[0_12px_30px_rgba(5,18,11,0.28)] sm:min-h-14 sm:px-8">
            Enter the garden <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.3} />
          </button>
          <p className="mt-4 text-[8px] uppercase tracking-[0.28em] text-[#fff8e9]/45">Optional · You can return at any time</p>
        </div>
      </motion.div>

      {profile && <CinematicStoryExperience profile={profile} onExit={close} onContinue={continueInvitation} />}
    </>
  );
}
