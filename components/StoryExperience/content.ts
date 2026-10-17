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
  secondaryImage?: string;
  secondaryImageAlt?: string;
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
    imageAlt: "Niketh and Sirisha sharing a decorated fruit basket during a family visit",
  },
  {
    id: "friendship",
    number: "II",
    eyebrow: "Blessings, traditions and togetherness",
    title: "Blessings, Traditions & Togetherness",
    story: "Surrounded by loved ones, traditions and celebrations become memories to treasure. From the ceremony to a photograph together, these are the moments that make family feel like home.",
    image: "/images/garden/memories/family-ceremony.webp",
    imageAlt: "Family members gathered for a traditional ceremony",
    secondaryImage: "/images/garden/memories/family-together.webp",
    secondaryImageAlt: "Family and friends smiling together beneath a colourful canopy",
  },
  {
    id: "something-more",
    number: "III",
    eyebrow: "Our engagement celebration",
    title: "A Promise to Forever",
    story: "A day filled with smiles, celebrations and a promise that brought our dreams a little closer to reality.",
    image: "/images/garden/memories/engagement.webp",
    imageAlt: "Niketh and Sirisha posing together with their engagement celebration photo frame",
  },
];

export const gardenFinale = {
  title: "Forever Begins Here",
  eyebrow: "Niketh & Sirisha",
  story: "Every beautiful beginning has led us here. Together, we look forward to the next chapter.",
  image: "/images/garden/memories/forever.webp",
  imageAlt: "Niketh and Sirisha together in their pre-wedding photoshoot, in ivory and red traditional outfits",
};
