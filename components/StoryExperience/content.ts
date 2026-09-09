import { wedding } from "@/data/wedding";

export type GardenMomentId = "school-days" | "friendship" | "something-more";
export type GardenChapter = "garden" | GardenMomentId | "finale";

export type GardenMoment = {
  id: GardenMomentId;
  number: string;
  eyebrow: string;
  title: string;
  story: string;
  image: string;
  imageAlt: string;
};

/**
 * This is deliberately kept separate from the scene. Future bespoke art can
 * replace the image paths without changing the camera choreography or world.
 */
export const gardenMoments: GardenMoment[] = [
  {
    id: "school-days",
    number: "I",
    eyebrow: "Where it began",
    title: "School Days",
    story: wedding.story.paragraphs[0],
    image: wedding.gallery.images[0].src,
    imageAlt: "Niketh and Sirisha at the beginning of their journey",
  },
  {
    id: "friendship",
    number: "II",
    eyebrow: "What grew between us",
    title: "A Friendship",
    story: wedding.story.paragraphs[1],
    image: wedding.gallery.images[2].src,
    imageAlt: "Niketh and Sirisha together",
  },
  {
    id: "something-more",
    number: "III",
    eyebrow: "When friendship became love",
    title: "Something More",
    story: wedding.story.paragraphs[2],
    image: wedding.gallery.images[5].src,
    imageAlt: "Niketh and Sirisha as their forever begins",
  },
];
