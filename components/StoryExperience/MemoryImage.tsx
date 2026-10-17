"use client";
import Image, { getImageProps } from "next/image";
import { useEffect, useState } from "react";
import type { GardenMoment } from "./content";

export type MemoryPhoto = Pick<GardenMoment, "image" | "imageAlt" | "imageWidth" | "imageHeight">;

/** Bounded image derivatives shared by preload and display. */
export function memoryImageSource(moment: MemoryPhoto, large = false) {
  if (large) return moment.image; // The supplied WebP is already optimized; keep its full detail.
  return getImageProps({ src: moment.image, alt: moment.imageAlt, width: 640, height: Math.round(640 * moment.imageHeight / moment.imageWidth), quality: 75 }).props.src;
}
export function preloadMemory(moment: MemoryPhoto, large = false) {
  const image = new window.Image();
  image.decoding = "async";
  image.src = memoryImageSource(moment, large);
}
export default function MemoryImage({ moment, large = false, onZoom }: { moment: MemoryPhoto; large?: boolean; onZoom?: (photo: MemoryPhoto, origin: HTMLButtonElement) => void }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("error"), 12000);
    return () => window.clearTimeout(timer);
  }, [status]);
  return <figure className="story-photo" aria-label={moment.imageAlt} data-image-state={status}>
    {status !== "error" && <Image unoptimized src={memoryImageSource(moment, large)} alt={moment.imageAlt} width={moment.imageWidth} height={moment.imageHeight} loading="eager" onLoad={() => setStatus("ready")} onError={() => setStatus("error")} className={status === "ready" ? "is-ready" : ""} />}
    {status === "ready" && onZoom && <button type="button" className="story-photo-open" aria-label={`View full photograph: ${moment.imageAlt}`} onClick={(event) => onZoom(moment, event.currentTarget)}><span>View full photo ↗</span></button>}
    {status !== "ready" && <figcaption role="status"><span aria-hidden="true">✧</span>{status === "loading" ? "Opening a memory…" : "Photograph unavailable"}</figcaption>}
  </figure>;
}
