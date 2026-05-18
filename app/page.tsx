import CTAOverlay from "@/components/CTAOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Innovations from "@/components/Innovations";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CTAOverlay />
      <Navbar />
      <main>
        <div style={{ position: "relative", zIndex: 10 }}>
          <Hero />
        </div>
        <div style={{ position: "relative", zIndex: 5, marginTop: "-140vh" }}>
          <Services />
        </div>
        <Innovations />
        <Process />
        <Stats />
        <Projects />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
