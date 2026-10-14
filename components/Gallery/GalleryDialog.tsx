"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Keep the native modal active through the lightbox's AnimatePresence exit. */
export default function GalleryDialog({ children, origin, onClose, onPrevious, onNext }: {
  children: ReactNode;
  origin: HTMLButtonElement | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    let navigating = false;
    const dismissForNavigation = () => {
      navigating = true;
      onClose();
    };
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    window.addEventListener("popstate", dismissForNavigation);
    window.addEventListener("hashchange", dismissForNavigation);
    return () => {
      window.removeEventListener("popstate", dismissForNavigation);
      window.removeEventListener("hashchange", dismissForNavigation);
      dialog.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      if (navigating) {
        // Native dialog focus restoration can interrupt an in-flight anchor scroll.
        // Finish at the current destination; CSS keeps reduced-motion scrolling instant.
        const destination = document.getElementById(window.location.hash.slice(1));
        if (destination) {
          destination.setAttribute("tabindex", "-1");
          destination.focus({ preventScroll: true });
          const hash = window.location.hash;
          requestAnimationFrame(() => {
            if (destination.isConnected && window.location.hash === hash) {
              destination.scrollIntoView({ behavior: "auto", block: "start" });
            }
          });
        }
      } else if (origin?.isConnected) {
        origin.focus({ preventScroll: true });
      }
    };
  }, [onClose, origin]);

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      aria-describedby="gallery-photo-caption"
      aria-modal="true"
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-inherit backdrop:bg-transparent"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          if (event.key === "ArrowLeft") onPrevious();
          else onNext();
        }
        if (event.key !== "Tab") return;
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])"))
          .filter((button) => button.getClientRects().length > 0);
        const first = buttons[0];
        const last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }}
    >
      {children}
    </dialog>
  );
}
