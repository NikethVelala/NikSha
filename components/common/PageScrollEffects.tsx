"use client";

import { motion, scroll, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore, type ReactNode, type RefObject } from "react";

// Observe the existing scroll owners; never acquire or release their locks.
// One shared subscription covers the curtain, index, Garden and photo viewer.
const listeners = new Set<() => void>();
let stopObserving: (() => void) | undefined;

function pagePaused() {
  const body = document.body.style;
  const html = document.documentElement.style;
  return document.hidden || body.position === "fixed" || body.overflow === "hidden" || html.overflow === "hidden";
}

function pageState() {
  const size = window.matchMedia("(min-width: 768px)").matches ? "desktop"
    : window.matchMedia("(max-width: 380px)").matches ? "compact" : "mobile";
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduce" : "full";
  return `${pagePaused() ? "paused" : "active"}:${size}:${preference}`;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    const notify = () => listeners.forEach((callback) => callback());
    const observer = new MutationObserver(notify);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    const queries = [window.matchMedia("(min-width: 768px)"), window.matchMedia("(max-width: 380px)"), window.matchMedia("(prefers-reduced-motion: reduce)")];
    queries.forEach((query) => query.addEventListener("change", notify));
    document.addEventListener("visibilitychange", notify);
    stopObserving = () => {
      observer.disconnect();
      queries.forEach((query) => query.removeEventListener("change", notify));
      document.removeEventListener("visibilitychange", notify);
    };
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      stopObserving?.();
      stopObserving = undefined;
    }
  };
}

const serverState = () => "paused:mobile:pending";
type ScrollOffsets = NonNullable<Parameters<typeof scroll>[1]>["offset"];
const entryOffsets: ScrollOffsets = ["start 0.95", "start 0.7"];
const memoryOffsets: ScrollOffsets = ["end 0.8", "end 0.2"];
const foreverOffsets: ScrollOffsets = ["start end", "start 0.3"];

function usePageProgress(target: RefObject<HTMLElement | null>, offset: ScrollOffsets) {
  const state = useSyncExternalStore(subscribe, pageState, serverState);
  const initialReducedMotion = useReducedMotion();
  // The installed Motion hook captures the mount-time preference. The shared
  // media subscription also handles changes while this page remains open.
  const reducedMotion = state.endsWith(":pending") ? initialReducedMotion !== false : state.endsWith(":reduce");
  const progress = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion || state.startsWith("paused")) return;
    let stop: (() => void) | undefined;
    // Let the existing owner restore scroll/focus before measuring the page.
    const frame = requestAnimationFrame(() => {
      if (!target.current || pagePaused()) return;
      // This is useScroll's cancellable Framer Motion primitive. Detaching it
      // stops measurements while locked, rather than merely hiding updates.
      stop = scroll((value: number) => {
        if (!pagePaused()) progress.set(value);
      }, { target: target.current, offset });
    });
    return () => {
      cancelAnimationFrame(frame);
      stop?.();
    };
  }, [offset, progress, reducedMotion, state, target]);

  return { progress, reducedMotion, size: state.split(":")[1] };
}

export function GardenEntryAtmosphere({ target }: { target: RefObject<HTMLElement | null> }) {
  const { progress, reducedMotion, size } = usePageProgress(target, entryOffsets);
  const distance = size === "desktop" ? 12 : size === "compact" ? 6 : 8;
  const y = useTransform(progress, [0, 1], [-distance, 0]);
  const opacity = useTransform(progress, [0, 1], [0.75, 1]);

  return (
    <>
      <motion.div aria-hidden="true" data-scroll-effect="garden-glow" style={{ y: reducedMotion ? 0 : y, opacity: reducedMotion ? 1 : opacity }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,201,144,0.2),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_44%,rgba(210,165,115,0.1))]" />
      <motion.div aria-hidden="true" style={{ opacity: reducedMotion ? 1 : opacity }} className="pointer-events-none absolute inset-[6px] border border-champagne/20" />
    </>
  );
}

export function FinalMemoryRelease({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const { progress, reducedMotion, size } = usePageProgress(target, memoryOffsets);
  const scale = useTransform(progress, [0, 1], [1, size === "desktop" ? 0.98 : size === "compact" ? 1 : 0.99]);

  return (
    <div ref={target}>
      <motion.div data-scroll-effect="final-memory" style={{ scale: reducedMotion ? 1 : scale }}>
        {children}
      </motion.div>
    </div>
  );
}

export function ForeverAtmosphere({ target }: { target: RefObject<HTMLElement | null> }) {
  const { progress, reducedMotion, size } = usePageProgress(target, foreverOffsets);
  const distance = size === "desktop" ? 16 : size === "compact" ? 6 : 8;
  const y = useTransform(progress, [0, 1], [-distance, 0]);
  const opacity = useTransform(progress, [0, 1], [0.65, 1]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2">
      <motion.div data-scroll-effect="forever-halo" style={{ y: reducedMotion ? 0 : y, opacity: reducedMotion ? 1 : opacity }} className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(210,165,115,0.13),transparent_68%)]" />
    </div>
  );
}
