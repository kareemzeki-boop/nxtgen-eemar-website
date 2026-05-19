import PageLoader from "@/components/PageLoader";
import CTAOverlay from "@/components/CTAOverlay";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import MaterialsBridge from "@/components/MaterialsBridge";
import Services from "@/components/Services";
import Innovations from "@/components/Innovations";
import ProcessV2 from "@/components/ProcessV2";
import StatsV2 from "@/components/StatsV2";
import HorizontalProjects from "@/components/HorizontalProjects";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactV2 from "@/components/ContactV2";
import FooterV2 from "@/components/FooterV2";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CTAOverlay />
      <Navbar />
      <main>
        <HeroSlider />
        <MaterialsBridge />
        <Services />
        <Innovations />
        <ProcessV2 />
        <StatsV2 />
        <HorizontalProjects />
        <Testimonials />
        <Pricing />
        <FAQ />
        <ContactV2 />
      </main>
      <FooterV2 />
      <BackToTop />
    </>
  );
}
