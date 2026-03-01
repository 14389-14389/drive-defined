import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import ValueProps from "@/components/home/ValueProps";
import Testimonials from "@/components/home/Testimonials";
import BrandsStrip from "@/components/home/BrandsStrip";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedVehicles />
        <ValueProps />
        <Testimonials />
        <BrandsStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
