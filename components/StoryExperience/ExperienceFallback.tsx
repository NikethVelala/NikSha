import type { GardenChapter } from "./content";

/** Static depth composition. The shared DOM shell provides every chapter and control. */
export default function ExperienceFallback({ chapter }: { chapter: GardenChapter }) {
  return <div className="story-still" data-scene={chapter} aria-hidden="true">
    <div className="still-light" />
    <div className="still-pavilion"><i /><i /><i /></div>
    <div className="still-path" />
    <div className="still-wing still-wing-left" /><div className="still-wing still-wing-right" />
    <div className="still-lantern still-lantern-left" /><div className="still-lantern still-lantern-right" />
    {chapter === "school-days" && <div className="still-desk"><span /></div>}
    {chapter === "something-more" && <div className="still-promise" />}
  </div>;
}
