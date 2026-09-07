"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Gallery() {
  const images = wedding.gallery.images;
  const [selected, setSelected] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = () => setSelected(null);
  const previous = () => setSelected((value) => value === null ? null : (value - 1 + images.length) % images.length);
  const next = () => setSelected((value) => value === null ? null : (value + 1) % images.length);

  useEffect(() => {
    if (selected === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 50) return;
    if (distance < 0) next();
    else previous();
  };

  return (
    <Section id="gallery" className="relative overflow-hidden bg-paper pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-80 w-[80vw] -translate-x-1/2 bg-[radial-gradient(circle,rgba(210,165,115,0.11),transparent_68%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end lg:gap-24"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.38em] text-rose sm:text-xs">Chapter III</span>
              <span className="h-px w-12 bg-champagne/70" />
            </div>
            <h2 className="mt-5 font-heading text-6xl leading-[0.88] text-charcoal sm:text-7xl lg:text-[6.5rem]">
              {wedding.gallery.title}
            </h2>
            <p className="mt-5 max-w-sm text-[9px] uppercase tracking-[0.3em] text-charcoal/45">A collection of moments, kept forever</p>
          </div>
          <p className="max-w-2xl font-heading text-[1.5rem] leading-relaxed text-charcoal/70 sm:text-3xl lg:pb-1">
            {wedding.gallery.subtitle}
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-20 lg:mt-24">
          <GalleryImage image={images[0]} index={0} aspect="hero" onOpen={() => setSelected(0)} />

          <div className="mt-12 grid gap-12 md:mt-24 md:grid-cols-12 md:items-start md:gap-x-10">
            <GalleryImage image={images[1]} index={1} className="md:col-span-4 md:mt-20" aspect="portrait" onOpen={() => setSelected(1)} />
            <GalleryImage image={images[2]} index={2} className="md:col-span-8" aspect="wide" onOpen={() => setSelected(2)} />
          </div>

          <div className="mt-12 grid gap-12 md:mt-24 md:grid-cols-12 md:items-start md:gap-x-10">
            <GalleryImage image={images[3]} index={3} className="md:col-span-7" aspect="wide" onOpen={() => setSelected(3)} />
            <GalleryImage image={images[4]} index={4} className="md:col-span-5 md:mt-24" aspect="portrait" onOpen={() => setSelected(4)} />
          </div>

          <GalleryImage image={images[5]} index={5} className="mt-12 md:mt-24 md:ml-auto md:max-w-[70%]" aspect="wide" onOpen={() => setSelected(5)} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9 }}
          className="mt-16 flex items-center justify-center gap-4 sm:mt-24"
        >
          <span className="h-px w-12 bg-champagne/45 sm:w-20" />
          <span className="font-heading text-xl text-champagne">✦</span>
          <span className="h-px w-12 bg-champagne/45 sm:w-20" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-5 text-center font-heading text-xl italic text-charcoal/60 sm:text-3xl"
        >
          Every photograph holds a little piece of our journey.
        </motion.p>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171310]/96 px-3 py-4 backdrop-blur-xl sm:px-8 sm:py-10"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-5 border border-champagne/15 sm:inset-8" />
            <button type="button" onClick={closeLightbox} className="absolute right-3 top-3 z-10 inline-flex h-12 w-12 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-champagne hover:text-champagne sm:right-7 sm:top-7" aria-label="Close photo viewer">
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); previous(); }} className="absolute left-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory/75 transition-colors hover:border-champagne hover:text-champagne sm:inline-flex sm:left-7" aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.2} />
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); next(); }} className="absolute right-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory/75 transition-colors hover:border-champagne hover:text-champagne sm:inline-flex sm:right-7" aria-label="Next photo">
              <ChevronRight className="h-5 w-5" strokeWidth={1.2} />
            </button>

            <motion.figure
              key={selected}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-full w-full max-w-5xl touch-pan-y flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[70svh] w-full sm:h-[75svh]">
                <Image src={images[selected].src} alt={`Niketh and Sirisha memory ${selected + 1}`} fill sizes="100vw" className="object-contain" priority />
              </div>
              <div className="mt-3 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-champagne/70 sm:mt-4">
                <span>{String(selected + 1).padStart(2, "0")}</span><span className="h-px w-8 bg-champagne/35" /><span>{String(images.length).padStart(2, "0")}</span>
              </div>
              <figcaption className="mt-2 max-w-2xl px-8 text-center font-heading text-lg italic text-ivory/80 sm:mt-3 sm:px-0 sm:text-2xl">{images[selected].caption}</figcaption>
              <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-ivory/35 sm:hidden">Swipe to explore</p>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

type GalleryImageProps = {
  image: (typeof wedding.gallery.images)[number];
  index: number;
  className?: string;
  aspect: "hero" | "wide" | "portrait";
  onOpen: () => void;
};

function GalleryImage({ image, index, className = "", aspect, onOpen }: GalleryImageProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 42, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.95, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <button type="button" onClick={onOpen} className="group block w-full touch-manipulation text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-paper" aria-label={`Open memory ${index + 1}`}>
        <div className={`relative overflow-hidden bg-[#eee8df] shadow-[0_16px_45px_rgba(73,55,35,0.08)] ${aspect === "hero" ? "aspect-[4/3] md:aspect-[16/8]" : aspect === "wide" ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/5]"}`}>
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.035 }} transition={{ duration: 1.4, ease: "easeOut" }}>
            <Image src={image.src} alt={`Niketh and Sirisha memory ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 80vw" className="object-contain md:object-cover" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-3 border border-ivory/0 transition-colors duration-700 group-hover:border-ivory/45 sm:inset-5" />
          <span className="pointer-events-none absolute left-4 top-4 text-[9px] uppercase tracking-[0.28em] text-ivory/0 transition-all duration-500 group-hover:text-ivory/80 sm:left-6 sm:top-6">{String(index + 1).padStart(2, "0")}</span>
          <span className="pointer-events-none absolute bottom-4 right-4 translate-y-2 border border-ivory/50 bg-charcoal/20 px-3 py-2 text-[8px] uppercase tracking-[0.25em] text-ivory opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-6 sm:right-6">View Memory</span>
        </div>
      </button>
      <figcaption className="mt-3 flex gap-3 sm:mt-4">
        <span className="pt-1 text-[8px] font-medium tracking-[0.25em] text-champagne/80">{String(index + 1).padStart(2, "0")}</span>
        <span className="max-w-lg font-heading text-lg leading-snug text-charcoal/70 sm:text-2xl">{image.caption}</span>
      </figcaption>
    </motion.figure>
  );
}
