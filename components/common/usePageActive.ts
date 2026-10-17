"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let stop: (() => void) | undefined;
const snapshot = () => !document.hidden
  && document.body.style.position !== "fixed"
  && document.body.style.overflow !== "hidden"
  && document.documentElement.style.overflow !== "hidden";
const serverSnapshot = () => false;

function subscribe(notify: () => void) {
  listeners.add(notify);
  if (listeners.size === 1) {
    const update = () => listeners.forEach((listener) => listener());
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    document.addEventListener("visibilitychange", update);
    stop = () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }
  return () => {
    listeners.delete(notify);
    if (!listeners.size) { stop?.(); stop = undefined; }
  };
}

/** One shared subscription pauses page decoration behind locks and in hidden tabs. */
export default function usePageActive() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
