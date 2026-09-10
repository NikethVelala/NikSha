"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, ArrowLeft, ArrowRight, X } from "lucide-react";
import ExperienceFallback from "./ExperienceFallback";
import MemoryImage, { preloadMemory } from "./MemoryImage";
import { gardenMoments, type GardenChapter } from "./content";
import { portraitQuery, reducedMotionQuery, type GardenProfile } from "./runtime";
import { useStoryModal } from "./useStoryModal";
import "./experience.css";

// Only the renderer is lazy. The dialog, story and navigation never suspend.
const StoryGardenCanvas = dynamic(() => import("./StoryGardenCanvas"), { ssr: false, loading: () => null });
const subscribePortrait = (callback: () => void) => {
  const media = window.matchMedia(portraitQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getPortrait = () => window.matchMedia(portraitQuery).matches;

class RendererBoundary extends Component<{ children: ReactNode; onFailure: (reason: string) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure("renderer-error"); }
  render() { return this.state.failed ? null : this.props.children; }
}

type Props = { profile: GardenProfile; onExit: () => void; onContinue: () => void };
export default function CinematicStoryExperience({ profile, onExit, onContinue }: Props) {
  const [chapter, setChapter] = useState<GardenChapter>("garden");
  const [arrived, setArrived] = useState<GardenChapter>("garden");
  const arrive = useCallback((destination: GardenChapter) => setArrived(destination), []);
  const [mode, setMode] = useState<"loading" | "ready" | "fallback">(profile.webgl ? "loading" : "fallback");
  const [reason, setReason] = useState(profile.reducedMotion ? "reduced-motion" : "unsupported");
  const isMobile = useSyncExternalStore(subscribePortrait, getPortrait, () => profile.mobile);
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const previousChapter = useRef(chapter);
  useStoryModal(root, onExit);
  const fail = useCallback((cause: string) => {
    // Terminal for this visit: failed renderers are never automatically remounted.
    setReason(cause);
    setMode("fallback");
  }, []);
  const ready = useCallback(() => setMode((current) => current === "loading" ? "ready" : current), []);
  const activeMoment = gardenMoments.find((moment) => moment.id === chapter) ?? null;
  const index = gardenMoments.findIndex((moment) => moment.id === chapter);

  useEffect(() => {
    const next = chapter === "garden" ? gardenMoments[0] : chapter === "finale" ? undefined : gardenMoments[index + 1];
    if (next) preloadMemory(next);
  }, [chapter, index]);
  useEffect(() => {
    if (mode !== "loading") return;
    let timer: number | undefined;
    const arm = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => fail("initialization-timeout"), 12000);
    };
    arm();
    document.addEventListener("visibilitychange", arm);
    return () => { window.clearTimeout(timer); document.removeEventListener("visibilitychange", arm); };
  }, [mode, fail]);
  useEffect(() => {
    if (mode !== "ready" || arrived === chapter) return;
    // A stalled renderer must never hold the readable memory hostage. Hidden time is excluded.
    let timer: number | undefined;
    const arm = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => fail("travel-timeout"), 6000);
    };
    arm();
    document.addEventListener("visibilitychange", arm);
    return () => { window.clearTimeout(timer); document.removeEventListener("visibilitychange", arm); };
  }, [mode, arrived, chapter, fail]);
  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    const update = () => { if (media.matches) fail("reduced-motion"); };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [fail]);
  useLayoutEffect(() => {
    if (previousChapter.current === chapter) return;
    previousChapter.current = chapter;
    content.current?.scrollTo({ top: 0, behavior: "instant" });
    heading.current?.focus({ preventScroll: true });
  }, [chapter]);

  const next = () => setChapter(chapter === "garden" ? "school-days" : gardenMoments[index + 1]?.id ?? "finale");
  const previous = () => setChapter(chapter === "finale" ? "something-more" : gardenMoments[index - 1]?.id ?? "garden");
  const title = activeMoment?.title ?? (chapter === "finale" ? "Our forever is just beginning." : "The Garden of Becoming");
  return createPortal(
    <section ref={root} role="dialog" aria-modal="true" aria-labelledby="garden-title" className="story-experience" data-layout={isMobile ? "portrait" : "landscape"} data-chapter={chapter} data-journey={mode === "ready" && arrived !== chapter ? "travelling" : "arrived"} data-renderer={mode} data-fallback-reason={mode === "fallback" ? reason : undefined}>
      <header className="story-header">
        <div><p className="story-eyebrow">NikSha presents</p><p className="story-wordmark">A garden of becoming</p></div>
        <button data-story-exit type="button" onClick={onExit} className="story-exit" aria-label="Exit the garden and return to Our Story"><X size={16} strokeWidth={1.25} /><span>Exit</span></button>
      </header>
      <div className="story-body">
        <div className="story-stage" role="group" aria-label={`${title} garden composition`}>
          <ExperienceFallback chapter={chapter} />
          {mode !== "fallback" && <div className="story-canvas" aria-hidden="true"><RendererBoundary onFailure={fail}>
            <StoryGardenCanvas chapter={chapter} activeMoment={activeMoment} profile={profile} isMobile={isMobile} onReady={ready} onFailure={fail} onSelect={(moment) => setChapter(moment.id)} onArrive={arrive} />
          </RendererBoundary></div>}
          <div className="story-stage-shade" aria-hidden="true" />
          <div className="story-foreground" aria-hidden="true" />
          {mode === "loading" && <div className="story-loading" role="status"><span>Opening the garden…</span><button type="button" onClick={() => fail("visitor-choice")}>Read the story now</button></div>}
          <p className="story-stage-caption" aria-hidden="true">{activeMoment?.eyebrow ?? (chapter === "finale" ? "Together, into forever" : "Three memories. One beautiful beginning.")}</p>
        </div>
        <div ref={content} className="story-content" role="region" tabIndex={0} aria-label="Chapter content">
          <div className="story-content-inner" key={chapter}>
            <p className="story-eyebrow">{activeMoment ? `Chapter ${activeMoment.number} · ${activeMoment.eyebrow}` : chapter === "finale" ? "Forever" : "Step into our story"}</p>
            <h2 id="garden-title" ref={heading} tabIndex={-1}>{title}</h2>
            <div className="story-memory-detail">
            {activeMoment ? <MemoryImage key={activeMoment.id} moment={activeMoment} /> : <div className="story-rule" aria-hidden="true" />}
            {activeMoment && <p className="story-memory-caption">{chapter === "school-days" ? "From the pages of our beginning" : chapter === "friendship" ? "A memory held between two lights" : "Held close, among the jasmine"}</p>}
            <p className="story-copy">{activeMoment?.story ?? (chapter === "finale" ? "With grateful hearts, we begin the most beautiful chapter of our lives together." : "A flower-lit garden, three memories, and the journey that brought us here. Stay a little longer, and let us show you.")}</p>
            {chapter === "garden" && <button type="button" onClick={next} className="story-primary">Begin our story <ArrowRight size={16} /></button>}
            {chapter === "finale" && <button type="button" onClick={onContinue} className="story-primary">Continue to the celebration <ArrowDown size={16} /></button>}
            {mode === "fallback" && !["reduced-motion", "unsupported", "visitor-choice"].includes(reason) && <p role="status" className="story-status">The garden is resting. Your story continues here.</p>}
            </div>
          </div>
        </div>
      </div>
      <footer className="story-footer">
        <button type="button" onClick={previous} disabled={chapter === "garden"} className="story-step" aria-label="Previous chapter"><ArrowLeft size={16} /><span>Previous</span></button>
        <nav aria-label="Story chapters" className="story-chapters">
          {gardenMoments.map((moment) => <button key={moment.id} type="button" aria-current={chapter === moment.id ? "step" : undefined} onClick={() => setChapter(moment.id)} aria-label={moment.title}><span className="chapter-number">{moment.number}</span><span className="chapter-name">{moment.title}</span></button>)}
          <button type="button" aria-current={chapter === "finale" ? "step" : undefined} onClick={() => setChapter("finale")} aria-label="Forever"><span className="chapter-number">IV</span><span className="chapter-name">Forever</span></button>
        </nav>
        <button type="button" onClick={next} disabled={chapter === "finale"} className="story-step" aria-label="Next chapter"><span>Next</span><ArrowRight size={16} /></button>
      </footer>
    </section>, document.body,
  );
}
