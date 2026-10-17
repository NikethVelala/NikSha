export type GardenMomentId = "school-days" | "friendship" | "something-more";
export type GardenChapter = "garden" | GardenMomentId | "finale";

export type GardenMoment = {
  id: GardenMomentId;
  number: string;
  eyebrow: string;
  title: string;
  story: string;
  caption: string;
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
    eyebrow: "Two families, one happy beginning",
    title: "Pelli Choopulu",
    story: "During Pelli Choopulu, our parents and families came together for warm, happy conversations. Sirisha's family welcomed Niketh as their son-in-law, and Niketh's family embraced Sirisha as their daughter-in-law. It was a peaceful, heartfelt beginning—full of acceptance, blessings, and the happiness of knowing our families were with us.",
    caption: "A peaceful beginning, with our families' blessings",
    image: "/images/garden/memories/family-welcome.webp",
    imageWidth: 720, imageHeight: 1280,
    imageAlt: "Niketh and Sirisha sharing a decorated fruit basket during a family visit",
  },
  {
    id: "friendship",
    number: "II",
    eyebrow: "Pasupu Danchadam · The preparations begin",
    title: "Godhuma Rayi",
    story: "With family and friends gathered around, we celebrated Godhuma Rayi, also known as Pasupu Danchadam, by crushing turmeric sticks together. The occasion marked the official start of our wedding preparations. It was a joyful day of tradition, togetherness, and celebration, made even more special by everyone who joined us.",
    caption: "Turmeric, laughter, and the start of our wedding preparations",
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
    eyebrow: "A promise to forever",
    title: "Our Engagement",
    story: "Our engagement brought everyone together for a day of love, laughter, and celebration. We enjoyed every moment with our families and friends, making memories we will always treasure. It was a joyful celebration of our promise to each other—and all the beautiful days still to come.",
    caption: "A day of happy memories and a promise to forever",
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
