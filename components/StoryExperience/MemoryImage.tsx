"use client";
import Image, { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import type { GardenMoment } from "./content";

/** One bounded 640px image from Next's optimizer, shared by preload and display. */
export function memoryImageSource(moment: GardenMoment) {
  return getImageProps({ src: moment.image, alt: moment.imageAlt, width: 320, height: 427, quality: 75 }).props.src;
}
export function preloadMemory(moment: GardenMoment) {
  const image = new window.Image();
  image.decoding = "async";
  image.src = memoryImageSource(moment);
}
export default function MemoryImage({ moment }: { moment: GardenMoment }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("error"), 12000);
    return () => window.clearTimeout(timer);
  }, [status]);
  return <figure className="story-photo" aria-label={moment.imageAlt} data-image-state={status}>
    {status !== "error" && <Image unoptimized src={memoryImageSource(moment)} alt={moment.imageAlt} width={640} height={854} loading="eager" onLoad={() => setStatus("ready")} onError={() => setStatus("error")} className={status === "ready" ? "is-ready" : ""} />}
    {status !== "ready" && <figcaption role="status"><span aria-hidden="true">✧</span>{status === "loading" ? "Opening a memory…" : "Photograph unavailable"}</figcaption>}
  </figure>;
}
