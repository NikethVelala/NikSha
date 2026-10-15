// Run from website/: node scripts/optimize-page-images.mjs
// Uses Sharp already supplied by Next.js. Originals remain untouched.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function main() {
  const images = fileURLToPath(new URL("../public/images/", import.meta.url));
  const output = path.join(images, "optimized");
  await mkdir(output, { recursive: true });
  const jobs = [
    ["curtain-mobile.png", "curtain-mobile.webp"],
    ["curtain-clean.png", "curtain-desktop.webp"],
    ["hero.jpg", "hero.webp"],
    ...[640, 1080, 1600, 2400].map((width) => ["story.jpg", `story-${width}.webp`, width]),
  ];
  for (const [source, destination, width] of jobs) {
    // Rotate BEFORE resizing: story.jpg's EXIF orientation makes it 4000×6000.
    let image = sharp(path.join(images, source)).rotate();
    if (width) image = image.resize({ width, withoutEnlargement: true });
    const info = await image.webp({ quality: 92, effort: 6 }).toFile(path.join(output, destination));
    console.log(`${destination}: ${info.width}×${info.height}, ${info.size} bytes`);
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
