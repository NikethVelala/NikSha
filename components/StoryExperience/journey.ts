import type { GardenChapter } from "./content";

export type Point = [number, number, number];
export type CameraMark = { position: Point; target: Point; approach: Point; departure: Point };

// Portrait destinations share a persistent world, but their staging is authored separately.
export const portraitPlaces = {
  school: [-2.8, 0.16, 3.4] as Point,
  friendship: [2.2, 0.1, -0.8] as Point,
  more: [-4.4, 0, -6] as Point,
};

export const desktopMarks: Record<GardenChapter, CameraMark> = {
  garden: { position: [0.4, 3.5, 15.5], target: [0, 3.1, -4], approach: [0, 3.5, 16], departure: [0, 3.3, 12] },
  "school-days": { position: [-5.8, 2.6, 5.4], target: [-4.5, 1.15, 1], approach: [-4.6, 2.9, 7], departure: [-3.8, 2.9, 6.4] },
  friendship: { position: [4.6, 2.8, 5.4], target: [3.45, 1.6, -0.5], approach: [2.2, 3, 7], departure: [2.6, 3, 4.7] },
  "something-more": { position: [-7.8, 2.5, -1], target: [-7.5, 1.4, -6], approach: [-4.3, 2.8, 1.6], departure: [-4.9, 2.8, 1] },
  finale: { position: [0, 4.2, 5.5], target: [0, 3.8, -6], approach: [0, 4, 6], departure: [0, 3.8, 5] },
};

export const mobileMarks: Record<GardenChapter, CameraMark> = {
  garden: { position: [0, 3, 12], target: [0, 1.7, 1], approach: [0, 3, 12.5], departure: [-0.3, 2.9, 10.5] },
  "school-days": { position: [-4.3, 2.35, 7.1], target: [-2.8, 1.1, 3.4], approach: [-2.6, 2.7, 9], departure: [-2.2, 2.5, 6.5] },
  friendship: { position: [1.8, 2.35, 4.3], target: [2.2, 1.55, -0.8], approach: [0.6, 2.5, 5.8], departure: [1.1, 2.5, 3.3] },
  "something-more": { position: [-3.4, 2.35, -0.9], target: [-4.4, 1.7, -6], approach: [-1.8, 2.6, 1.6], departure: [-2.1, 2.7, -1] },
  finale: { position: [0.65, 2.9, -2.4], target: [0.2, 2.5, -10], approach: [0.4, 3, -1.5], departure: [0.2, 2.8, -0.6] },
};

export const journeyDuration = (mobile: boolean) => mobile ? 1.55 : 2.05;
