"use client";

import { useSyncExternalStore } from "react";
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
    <section aria-labelledby="wedding-livestream-title" className="my-7 border-y border-[#a8783f]/30 bg-[#fcfaf4] px-5 py-6 text-center sm:my-9 sm:px-8 sm:py-7">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8c6130]">Wedding livestream</p>
      <h2 id="wedding-livestream-title" className="mx-auto mt-3 max-w-md font-heading text-[1.9rem] leading-tight text-[#292622] sm:text-4xl">
        Join Our Wedding, From Wherever You Are
      </h2>
      <p className="mx-auto mt-3 max-w-md font-heading text-lg leading-relaxed text-[#5e554c]">
        For those celebrating with us from afar, we&apos;d love for you to be part of our special day.
      </p>
      <p className="mt-4 text-sm leading-6 text-[#244232]">
        <time dateTime="2026-11-18">Wednesday, {wedding.ceremony.date}</time>
        <br />
        <time dateTime={wedding.livestream.startsAt}>From 7:00 PM <abbr title="India Standard Time" className="no-underline">IST</abbr></time>
      </p>
      <div className="mt-5">
        {weddingLivestreamUrl ? (
          <>
            <a href={weddingLivestreamUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b58a52] bg-[#174f3b] px-5 py-3 text-xs font-medium text-[#fbf5e8] hover:bg-[#123f30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c6130]">
              {startPassed ? wedding.livestream.watchLabel : "View Scheduled Livestream"}
              <span aria-hidden="true" className="ml-2">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mt-2 text-xs text-[#5e554c]">Opens in a new tab</p>
          </>
        ) : (
          <p className="text-sm italic text-[#5e554c]">Streaming link will be available soon.</p>
        )}
      </div>
    </section>
  );
}
