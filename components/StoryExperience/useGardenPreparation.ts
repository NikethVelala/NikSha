"use client";

import { useEffect, type RefObject } from "react";
import { preload } from "react-dom";
import { gardenMoments } from "./content";
import { memoryImageSource } from "./MemoryImage";
import { reducedMotionQuery } from "./runtime";

let renderer: Promise<typeof import("./StoryGardenCanvas")> | undefined;

/** Share the code download with entry; importing never mounts a renderer. */
export function loadGardenRenderer() {
  return renderer ??= import("./StoryGardenCanvas").catch((error: unknown) => {
    renderer = undefined;
    throw error;
  });
}

const firstVisitImages = [
  "/images/garden/coastal-blue-hour.webp",
  "/images/garden/jasmine-branch.webp",
  gardenMoments[0].image,
];

/** Optional preparation only after the guest reaches the fully loaded Story. */
export default function useGardenPreparation(entry: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const target = entry.current;
    if (!target) return;
    const motion = window.matchMedia(reducedMotionQuery);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const hero = document.querySelector('section[aria-label="Open the wedding invitation"]');
    let visible = false;
    let started = false;
    let cancelIdle: (() => void) | undefined;

    const eligible = () => {
      return visible && !document.hidden && !motion.matches && !connection?.saveData
        && typeof WebGL2RenderingContext !== "undefined"
        && !hero?.querySelector(":scope > div.fixed")
        && document.body.style.overflow !== "hidden"
        && document.documentElement.style.overflow !== "hidden";
    };
    const prepare = () => {
      cancelIdle = undefined;
      if (started || !eligible()) return;
      started = true;
      // Resource hints reuse the exact CSS, texture and DOM-photo requests. Their
      // low priority keeps foreground browsing ahead of this optional experience.
      for (const href of [...firstVisitImages, memoryImageSource(gardenMoments[0])]) {
        preload(href, { as: "image", fetchPriority: "low" });
      }
      // A failed background import must not break the invitation or prevent retry
      // through the existing entry/error-boundary path.
      void loadGardenRenderer().catch(() => {});
    };
    const schedule = () => {
      if (started) return;
      if (!eligible()) { cancelIdle?.(); cancelIdle = undefined; return; }
      if (cancelIdle) return;
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(prepare);
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = globalThis.setTimeout(prepare, 200);
        cancelIdle = () => globalThis.clearTimeout(id);
      }
    };
    const intersection = new IntersectionObserver(([record]) => {
      visible = record.isIntersecting;
      schedule();
    }, { rootMargin: "600px 0px" });
    intersection.observe(target);
    const locks = new MutationObserver(schedule);
    locks.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    locks.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    if (hero) locks.observe(hero, { childList: true });
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelIdle?.();
      intersection.disconnect();
      locks.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, [entry]);
}
