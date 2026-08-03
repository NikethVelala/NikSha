"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export default function Gallery() {
  return (
    <Section id="gallery">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <p className="text-center text-xs uppercase tracking-[0.35em] text-stone-500">
          Our Journey
        </p>

        <h2 className="mt-4 text-center font-heading text-5xl text-stone-900">
          {wedding.gallery.title}
        </h2>

        <p className="mx-auto mt-8 mb-16 max-w-2xl text-center text-lg leading-8 text-stone-600">
          {wedding.gallery.subtitle}
        </p>

        <div className="space-y-12">

          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[500px] overflow-hidden rounded-[2rem] shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <Image
                src={wedding.gallery.images[0].src}
                alt="Memory 1"
                fill
                sizes="100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <p className="mt-4 text-center italic text-stone-500">
              {wedding.gallery.images[0].caption}
            </p>
          </motion.div>

          {/* Two Images */}
          <div className="grid gap-8 md:grid-cols-2">

            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="relative h-[380px] overflow-hidden rounded-[2rem] shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <Image
                    src={wedding.gallery.images[i].src}
                    alt={`Memory ${i + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <p className="mt-4 text-center italic text-stone-500">
                  {wedding.gallery.images[i].caption}
                </p>
              </motion.div>
            ))}

          </div>

          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[500px] overflow-hidden rounded-[2rem] shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <Image
                src={wedding.gallery.images[3].src}
                alt="Memory 4"
                fill
                sizes="100vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <p className="mt-4 text-center italic text-stone-500">
              {wedding.gallery.images[3].caption}
            </p>
          </motion.div>

          {/* Last Two */}
          <div className="grid gap-8 md:grid-cols-2">

            {[4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (i - 3) * 0.1 }}
              >
                <div className="relative h-[380px] overflow-hidden rounded-[2rem] shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <Image
                    src={wedding.gallery.images[i].src}
                    alt={`Memory ${i + 1}`}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <p className="mt-4 text-center italic text-stone-500">
                  {wedding.gallery.images[i].caption}
                </p>
              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </Section>
  );
}