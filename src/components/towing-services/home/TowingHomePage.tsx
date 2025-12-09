import React from "react";
import TowingHeroSection from "./TowingHeroSection";
import ServicesSection from "./ServicesSection";
import TrackingSection from "./TrackingSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import AboutSection from "./AboutSection";
import PlayStoreSection from "@/components/car-service/PlayStoreSection";

const TowingHomePage = () => {
  return (
    <div className="flex flex-col w-full gap-4">

      {/* Full-width hero */}
      <TowingHeroSection />

      <div className="max-w-7xl mx-auto w-full px-4">
        <AboutSection />
      </div>

      {/* SECTION WRAPPERS */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <ServicesSection />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4">
        <TrackingSection />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4">
        <WhyChooseUsSection />
      </div>
      <div className="max-w-7xl mx-auto w-full px-4">
        <PlayStoreSection />
      </div>

    </div>
  );
};

export default TowingHomePage;
