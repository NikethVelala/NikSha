"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Gallery() {
  const images = wedding.gallery.images;

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
          <GalleryImage image={images[0]} index={0} aspect="hero" />

          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-x-10">
            <GalleryImage image={images[1]} index={1} className="md:col-span-4 md:mt-16" aspect="portrait" />
            <GalleryImage image={images[2]} index={2} className="md:col-span-8" aspect="wide" />
          </div>

          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-x-10">
            <GalleryImage image={images[3]} index={3} className="md:col-span-7" aspect="wide" />
            <GalleryImage image={images[4]} index={4} className="md:col-span-5 md:mt-20" aspect="portrait" />
          </div>

          <GalleryImage image={images[5]} index={5} className="md:ml-auto md:max-w-[72%]" aspect="wide" />
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
    </Section>
  );
}

type GalleryImageProps = {
  image: (typeof wedding.gallery.images)[number];
  index: number;
  className?: string;
  aspect: "hero" | "wide" | "portrait";
};

function GalleryImage({ image, index, className = "", aspect }: GalleryImageProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08 }}
      className={className}
    >
      <div
        className={`group relative overflow-hidden bg-stone-100 shadow-sm ${
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <figcaption className="mt-4 max-w-lg font-heading text-xl leading-snug text-charcoal/70 sm:text-2xl">
        {image.caption}
      </figcaption>
    </motion.figure>
  );
}
