"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import type { MemoryPhoto } from "./MemoryImage";

/** The supplied photograph, independent of the 3D canvas's raster resolution. */
export default function GardenPhotoViewer({ photo, onClose }: { photo: MemoryPhoto; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => { close.current?.focus({ preventScroll: true }); }, []);
  const keyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); onClose(); }
    if (event.key === "Tab") { event.preventDefault(); event.stopPropagation(); close.current?.focus(); }
  };
  return <section role="dialog" aria-modal="true" aria-label="Full photograph" className="story-photo-viewer" onKeyDown={keyboard}>
    <header><p>Our wedding memories</p><button ref={close} type="button" aria-label="Close full photograph" onClick={onClose}><X size={20}/><span>Close photo</span></button></header>
    <figure>
      <Image unoptimized src={photo.image} alt={photo.imageAlt} width={photo.imageWidth} height={photo.imageHeight} loading="eager" className={status === "ready" ? "is-ready" : ""} onLoad={() => setStatus("ready")} onError={() => setStatus("error")} />
      {status !== "ready" && <p role="status">{status === "loading" ? "Opening photograph…" : "This photograph could not load. Please close it and try again."}</p>}
    </figure>
    <p className="story-photo-viewer-caption">{photo.imageAlt}</p>
  </section>;
}
