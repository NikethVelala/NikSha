import type { GardenChapter } from "./content";

export type Point = [number, number, number];
export type CameraMark = { position: Point; target: Point; approach: Point; departure: Point };

// Portrait destinations share a persistent world, but their staging is authored separately.
export const portraitPlaces = {
  school: [-1.8, 0.16, 3.4] as Point,
  friendship: [1.8, 0.1, -0.8] as Point,
  more: [-2.3, 0, -5.2] as Point,
};

export const desktopMarks: Record<GardenChapter, CameraMark> = {
  garden: { position: [0.4, 3.5, 15.5], target: [0, 3.1, -4], approach: [0, 3.5, 16], departure: [0, 3.3, 12] },
  "school-days": { position: [-4.9, 3.1, 4.8], target: [-3.5, 1.2, -0.3], approach: [-3.4, 3.2, 7], departure: [-3, 3.2, 6.4] },
  friendship: { position: [4.6, 2.8, 5.4], target: [3.45, 1.6, -0.5], approach: [2.2, 3, 7], departure: [2.6, 3, 4.7] },
  "something-more": { position: [-3.2, 2.8, 1.4], target: [-3.1, 1.9, -5.6], approach: [-1.2, 3, 3.8], departure: [-1.8, 3.3, 3.4] },
  finale: { position: [0, 3.6, 11.8], target: [0, 3.1, -6], approach: [0, 3.8, 10], departure: [0, 3.4, 8] },
};

export const mobileMarks: Record<GardenChapter, CameraMark> = {
  garden: { position: [0, 3, 12], target: [0, 1.7, 1], approach: [0, 3, 12.5], departure: [-0.3, 2.9, 10.5] },
  "school-days": { position: [-2.2, 2.7, 7.6], target: [-1.8, 1.15, 3.4], approach: [-1.1, 2.9, 9], departure: [-1.3, 2.65, 6.8] },
  friendship: { position: [1.8, 2.4, 4.8], target: [1.8, 1.65, -0.8], approach: [0.6, 2.5, 5.8], departure: [1.1, 2.5, 3.3] },
  "something-more": { position: [-2.1, 2.5, 0.1], target: [-2.3, 1.9, -5.2], approach: [-0.8, 2.6, 1.8], departure: [-1.2, 2.8, -0.8] },
  finale: { position: [0.4, 3, -1.7], target: [0, 2.6, -10], approach: [0.2, 3.2, -1.1], departure: [0, 2.8, -0.2] },
};

export const journeyDuration = (mobile: boolean) => mobile ? 1.55 : 2.05;
