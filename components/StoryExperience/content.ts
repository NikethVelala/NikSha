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
  imageWidth: number;
  imageHeight: number;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  secondaryImageWidth?: number;
  secondaryImageHeight?: number;
};

// The five original, unmodified user photographs belong at these paths.
// Keep the existing renderer's three memory IDs so its camera choreography
// and garden scene remain compatible.
export const gardenMoments: GardenMoment[] = [
  {
    id: "school-days",
    number: "I",
    eyebrow: "The families come together",
    title: "When Two Families Come Together",
    story: "A heartfelt beginning, marked by a simple gesture and the warmth of family. Some of life's most beautiful beginnings happen right at home.",
    image: "/images/garden/memories/family-welcome.webp",
    imageWidth: 720, imageHeight: 1280,
    imageAlt: "Niketh and Sirisha sharing a decorated fruit basket during a family visit",
  },
  {
    id: "friendship",
    number: "II",
    eyebrow: "Blessings, traditions and togetherness",
    title: "Blessings, Traditions & Togetherness",
    story: "Surrounded by loved ones, traditions and celebrations become memories to treasure. From the ceremony to a photograph together, these are the moments that make family feel like home.",
    image: "/images/garden/memories/family-ceremony.webp",
    imageWidth: 1238, imageHeight: 2200,
    imageAlt: "Family members gathered for a traditional ceremony",
    secondaryImage: "/images/garden/memories/family-together.webp",
    secondaryImageWidth: 720, secondaryImageHeight: 1280,
    secondaryImageAlt: "Family and friends smiling together beneath a colourful canopy",
  },
  {
    id: "something-more",
    number: "III",
    eyebrow: "Our engagement celebration",
    title: "A Promise to Forever",
    story: "A day filled with smiles, celebrations and a promise that brought our dreams a little closer to reality.",
    image: "/images/garden/memories/engagement.webp",
    imageWidth: 1467, imageHeight: 2200,
    imageAlt: "Niketh and Sirisha posing together with their engagement celebration photo frame",
  },
];

export const gardenFinale = {
  title: "Forever Begins Here",
  eyebrow: "Niketh & Sirisha",
  story: "Every beautiful beginning has led us here. Together, we look forward to the next chapter.",
  image: "/images/garden/memories/forever.webp",
  imageWidth: 854, imageHeight: 1280,
  imageAlt: "Niketh and Sirisha together in their pre-wedding photoshoot, in ivory and red traditional outfits",
};
