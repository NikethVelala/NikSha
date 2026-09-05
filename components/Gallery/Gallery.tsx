"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Gallery() {
  const images = wedding.gallery.images;
  const [selected, setSelected] = useState<number | null>(null);

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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  return (
    <Section id="gallery" className="relative overflow-hidden bg-paper pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-24"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter VI</p>
            <div className="mt-5 h-px w-16 bg-champagne" />
            <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
              {wedding.gallery.title}
            </h2>
          </div>
          <p className="max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/70 sm:text-3xl lg:pb-1">
            {wedding.gallery.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 space-y-14 sm:mt-20 sm:space-y-20">
          <GalleryImage image={images[0]} index={0} aspect="hero" onOpen={() => setSelected(0)} />

          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-x-10">
            <GalleryImage image={images[1]} index={1} className="md:col-span-4 md:mt-16" aspect="portrait" onOpen={() => setSelected(1)} />
            <GalleryImage image={images[2]} index={2} className="md:col-span-8" aspect="wide" onOpen={() => setSelected(2)} />
          </div>

          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-x-10">
            <GalleryImage image={images[3]} index={3} className="md:col-span-7" aspect="wide" onOpen={() => setSelected(3)} />
            <GalleryImage image={images[4]} index={4} className="md:col-span-5 md:mt-20" aspect="portrait" onOpen={() => setSelected(4)} />
          </div>

          <GalleryImage image={images[5]} index={5} className="md:ml-auto md:max-w-[72%]" aspect="wide" onOpen={() => setSelected(5)} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center font-heading text-2xl text-charcoal/65 sm:mt-20 sm:text-3xl"
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 px-4 py-6 backdrop-blur-md sm:px-8 sm:py-10"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-champagne hover:text-champagne sm:right-7 sm:top-7"
              aria-label="Close photo viewer"
            >
              <X className="h-5 w-5" strokeWidth={1.3} />
            </button>

            <button
              type="button"
              onClick={(event) => { event.stopPropagation(); previous(); }}
              className="absolute left-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory/75 transition-colors hover:border-champagne hover:text-champagne sm:left-7"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.2} />
            </button>

            <button
              type="button"
              onClick={(event) => { event.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/20 text-ivory/75 transition-colors hover:border-champagne hover:text-champagne sm:right-7"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.2} />
            </button>

            <motion.figure
              key={selected}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex max-h-full w-full max-w-5xl flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[68svh] w-full sm:h-[74svh]">
                <Image
                  src={images[selected].src}
                  alt={`Niketh and Sirisha memory ${selected + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-4 max-w-2xl text-center font-heading text-xl text-ivory/80 sm:text-2xl">
                {images[selected].caption}
              </figcaption>
              <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-ivory/40">
                {selected + 1} / {images.length}
              </p>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08 }}
      className={className}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        aria-label={`Open memory ${index + 1}`}
      >
        <div
          className={`relative overflow-hidden bg-stone-100 shadow-sm ${
            aspect === "hero"
              ? "aspect-[4/3] md:aspect-[16/8]"
              : aspect === "wide"
                ? "aspect-[4/3] md:aspect-[16/10]"
                : "aspect-[4/5]"
          }`}
        >
          <Image
            src={image.src}
            alt={`Niketh and Sirisha memory ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain transition duration-[1400ms] ease-out group-hover:scale-[1.025] md:object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="pointer-events-none absolute bottom-4 right-4 border border-ivory/50 bg-charcoal/20 px-3 py-2 text-[9px] uppercase tracking-[0.25em] text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
            View
          </span>
        </div>
      </button>
      <figcaption className="mt-4 max-w-lg font-heading text-xl leading-snug text-charcoal/70 sm:text-2xl">
        {image.caption}
      </figcaption>
    </motion.figure>
  );
}
