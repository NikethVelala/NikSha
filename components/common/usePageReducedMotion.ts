"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};

// Unlike this installed Framer Motion version's hook, also follows live OS changes.
export default function usePageReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
