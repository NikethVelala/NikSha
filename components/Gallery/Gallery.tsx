"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Gallery() {
  const images = wedding.gallery.images;

  return (
    <Section id="gallery" className="relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-rose">Chapter VI</p>
          <div className="mt-5 h-px w-16 bg-champagne" />
          <h2 className="mt-6 font-heading text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
            {wedding.gallery.title}
          </h2>
          <p className="mt-7 max-w-2xl font-heading text-2xl leading-relaxed text-charcoal/75 sm:text-3xl">
            {wedding.gallery.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16 lg:mt-20">
          <GalleryImage image={images[0]} index={0} className="md:col-span-8" aspect="wide" />
          <GalleryImage image={images[1]} index={1} className="md:col-span-4 md:mt-20" aspect="portrait" />
          <GalleryImage image={images[2]} index={2} className="md:col-span-5" aspect="portrait" />
          <GalleryImage image={images[3]} index={3} className="md:col-span-7 md:mt-24" aspect="wide" />
          <GalleryImage image={images[4]} index={4} className="md:col-span-7" aspect="wide" />
          <GalleryImage image={images[5]} index={5} className="md:col-span-5 md:mt-20" aspect="portrait" />
        </div>
      </div>
    </Section>
  );
}

type GalleryImageProps = {
  image: (typeof wedding.gallery.images)[number];
  index: number;
  className?: string;
  aspect: "wide" | "portrait";
};

function GalleryImage({ image, index, className = "", aspect }: GalleryImageProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: (index % 2) * 0.08 }}
      className={className}
    >
      <div
        className={`group relative overflow-hidden rounded-[1.25rem] bg-stone-100 shadow-sm ${
          aspect === "wide" ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={image.src}
          alt={`Niketh and Sirisha memory ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-contain transition duration-1000 ease-out group-hover:scale-[1.03] md:object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <figcaption className="mt-4 max-w-md font-heading text-xl leading-snug text-charcoal/70 sm:text-2xl">
        {image.caption}
      </figcaption>
    </motion.figure>
  );
}
