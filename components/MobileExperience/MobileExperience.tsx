"use client";

import { useEffect } from "react";

/** Mobile-only polish: keep the invitation stable and comfortable on touch devices. */
export default function MobileExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previous = {
      rootOverscroll: root.style.overscrollBehaviorX,
      bodyOverscroll: body.style.overscrollBehaviorX,
    };

    root.style.overscrollBehaviorX = "none";
    body.style.overscrollBehaviorX = "none";

    return () => {
      root.style.overscrollBehaviorX = previous.rootOverscroll;
      body.style.overscrollBehaviorX = previous.bodyOverscroll;
    };
  }, []);

  return null;
}
