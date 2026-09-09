"use client";

import { useLayoutEffect, type RefObject } from "react";

const focusable = 'button:not([disabled]), a[href], [tabindex="0"]';

export function useStoryModal(root: RefObject<HTMLElement | null>, onExit: () => void) {
  useLayoutEffect(() => {
    const dialog = root.current;
    if (!dialog) return;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previous = { overflow: body.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width, htmlOverflow: html.style.overflow, scrollBehavior: html.style.scrollBehavior };
    const siblings = Array.from(body.children).filter((element): element is HTMLElement => element instanceof HTMLElement && element !== dialog);
    const inert = siblings.map((element) => element.inert);
    siblings.forEach((element) => { element.inert = true; });
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";
    html.style.scrollBehavior = "auto";
    dialog.querySelector<HTMLButtonElement>("[data-story-exit]")?.focus({ preventScroll: true });

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onExit(); return; }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(focusable)).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) dialog.querySelector<HTMLElement>(focusable)?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("focusin", containFocus);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("focusin", containFocus);
      siblings.forEach((element, index) => { element.inert = inert[index]; });
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      html.style.overflow = previous.htmlOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      html.style.scrollBehavior = previous.scrollBehavior;
    };
  }, [root, onExit]);
}
