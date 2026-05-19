import NavbarCladwise from "@/components/NavbarCladwise";
import HeroCladwise from "@/components/HeroCladwise";
import AboutCladwise from "@/components/AboutCladwise";
import MetricsGrid from "@/components/MetricsGrid";
import ProductGrid from "@/components/ProductGrid";
import MarqueeCladwise from "@/components/MarqueeCladwise";
import ServicesMatrix from "@/components/ServicesMatrix";
import FooterCladwise from "@/components/FooterCladwise";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <NavbarCladwise />
      <main>
        <HeroCladwise />
        <AboutCladwise />
        <MetricsGrid />
        <MarqueeCladwise />
        <ProductGrid />
        <ServicesMatrix />
      </main>
      <FooterCladwise />
    </>
  );
}
