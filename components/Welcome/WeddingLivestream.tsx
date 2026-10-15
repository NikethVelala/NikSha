"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { wedding, weddingLivestreamUrl } from "@/data/wedding";

const startsAt = Date.parse(wedding.livestream.startsAt);
const hasScheduledStartPassed = () => Date.now() >= startsAt;
const beforeHydration = () => false;

function subscribeToStart(onChange: () => void) {
  if (!weddingLivestreamUrl) return () => {};
  let timer: number | undefined;
  const update = () => {
    window.clearTimeout(timer);
    onChange();
    const remaining = startsAt - Date.now();
    // Long waits must stay below the browser's signed 32-bit timeout limit.
    if (remaining > 0) timer = window.setTimeout(update, Math.min(remaining, 2_147_483_647));
  };
  update();
  document.addEventListener("visibilitychange", update);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", update);
  };
}

export default function WeddingLivestream() {
  const startPassed = useSyncExternalStore(subscribeToStart, hasScheduledStartPassed, beforeHydration);

  return (
    <section aria-labelledby="wedding-livestream-title" className="relative my-7 border border-[#a8783f]/70 bg-[#183c2b] px-5 py-7 text-center text-[#fff8e9] sm:my-9 sm:px-8 sm:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-[5px] border border-[#d2a573]/25" />
      <p className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#f0d1ad]"><Play aria-hidden="true" size={14} strokeWidth={1.5} />Wedding livestream</p>
      <h2 id="wedding-livestream-title" className="mx-auto mt-3 max-w-md font-heading text-[1.9rem] leading-tight sm:text-4xl">
        Join Our Wedding, From Wherever You Are
      </h2>
      <p className="mx-auto mt-3 max-w-md font-heading text-lg leading-relaxed text-[#ece1cb]">
        For those celebrating with us from afar, we&apos;d love for you to be part of our special day.
      </p>
      <p className="mt-4 text-sm leading-6 text-[#fff8e9]">
        <time dateTime="2026-11-18">Wednesday, {wedding.ceremony.date}</time>
        <br />
        <time dateTime={wedding.livestream.startsAt}>Scheduled from 7:00 PM <abbr title="India Standard Time" className="no-underline">IST</abbr></time>
      </p>
      <div className="mt-5">
        {weddingLivestreamUrl ? (
          <>
            <a href={weddingLivestreamUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-full border border-[#f0d1ad] bg-[#fff8e9] px-4 py-4 text-sm font-semibold text-[#183c2b] hover:bg-[#f0d1ad] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d1ad]">
              <Play aria-hidden="true" size={18} fill="currentColor" strokeWidth={1} className="shrink-0" />
              {startPassed ? wedding.livestream.watchLabel : "View Scheduled Livestream"}
              <ArrowUpRight aria-hidden="true" size={16} className="shrink-0" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mt-3 text-xs leading-5 text-[#ece1cb]">{startPassed ? "Please open the stream for broadcast availability." : "Save the date and join us here."}<br />Opens in a new tab</p>
          </>
        ) : (
          <p className="mx-auto max-w-sm border-y border-[#d2a573]/40 py-4 text-sm font-medium text-[#f0d1ad]">Livestream link coming soon</p>
        )}
      </div>
    </section>
  );
}
