import { SparePartsHero } from "@/components/spare-parts/home/SparePartsHero";
import SparePartsFeatures from "@/components/spare-parts/home/SparePartsFeatures";
import BestSellingProducts from "@/components/spare-parts/home/BestSellingProducts";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";
import SparePartsSection from "@/components/landing-page/SparePartsSection";
import PlayStoreSection from "@/components/landing-page/PlayStoreSection";
import CarBrandsSection from "@/components/spare-parts/home/CarBrandsSection";
import Footer from "@/components/Layout/Footer";

export const SparePartsLayout = () => {
  return (
    <div className="flex flex-col gap-2 bg-white">
      <SmoothLandingBox variant="fade" duration={0.8}>
        <SparePartsHero />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
        <CarBrandsSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
        <SparePartsSection showButton={true} />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
        <SparePartsFeatures />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.15} distance={30}>
        <BestSellingProducts />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-left" delay={0.15} distance={30}>
        <PlayStoreSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.15} distance={30}>
        <Footer />
      </SmoothLandingBox>
    </div>
  );
};
