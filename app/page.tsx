import Navigation from "@/components/Navigation/Navigation";
import PetalFall from "@/components/PetalFall/PetalFall";
import Hero from "@/components/Hero/Hero";
import Welcome from "@/components/Welcome/Welcome";
import Story from "@/components/Story/Story";
import Gallery from "@/components/Gallery/Gallery";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Navigation />
      <Hero />
      <PetalFall />
      <Welcome />
      <Story />
      <Gallery />
      <Footer />
    </>
  );
}
