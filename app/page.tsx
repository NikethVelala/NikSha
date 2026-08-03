import Hero from "@/components/Hero/Hero";
import Welcome from "@/components/Welcome/Welcome";
import Story from "@/components/Story/Story";
import Celebration from "@/components/Celebration/Celebration";
import Gallery from "@/components/Gallery/Gallery";
import Timeline from "@/components/Timeline/Timeline";
import Venue from "@/components/Venue/Venue";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Story />
      <Celebration />
      <Timeline />
      <Venue />
      <Gallery />
    </>
  );
}