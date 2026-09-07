import Navigation from "@/components/Navigation/Navigation";
import PetalFall from "@/components/PetalFall/PetalFall";
import Hero from "@/components/Hero/Hero";
import Welcome from "@/components/Welcome/Welcome";
import Story from "@/components/Story/Story";
import Gallery from "@/components/Gallery/Gallery";
import Footer from "@/components/Footer/Footer";
import LuxuryInteractions from "@/components/LuxuryInteractions/LuxuryInteractions";

export default function Home() {
  return (
    <>
      <div id="top" />
      <LuxuryInteractions />
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
