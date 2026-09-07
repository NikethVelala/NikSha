"use client";

import { useEffect } from "react";

/**
 * Small mobile-only polish layer. It deliberately avoids intercepting gestures
 * so the invitation keeps native iOS/Android scrolling and touch behaviour.
 */
export default function MobileExperience() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("niksha-mobile-ready");
    return () => root.classList.remove("niksha-mobile-ready");
  }, []);

  return null;
}
