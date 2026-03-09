"use client";

import React from "react";
import HeroSection from "@/components/landing-page/HeroSection";
import ServiceBelowHero from "@/components/landing-page/ServiceBelowHero";
import ServicesSection from "@/components/landing-page/ServicesSection";
import CustomerGarageSection from "@/components/landing-page/CustomerGarageSection";
import BannerSection from "@/components/landing-page/BannerSection";
import ContentSection1 from "@/components/landing-page/ContentSection1";
import GarageFeaturesSection from "@/components/landing-page/GarageFeaturesSection";
import InsurancePartnersSection from "@/components/landing-page/InsurancePartnersSection";
import DriveMechSection from "@/components/landing-page/DriveMechSection";
import SparePartsSection from "@/components/landing-page/SparePartsSection";
import HowItWorks from "@/components/landing-page/HowItWorks";
import KeyFeaturesSection from "@/components/landing-page/KeyFeaturesSection";
import PlayStoreSection from "@/components/landing-page/PlayStoreSection";
import FindEverySpace from "@/components/landing-page/FindEverySpace";
import DeadBattery from "@/components/landing-page/DeadBattery";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";

export default function LandingPageClient() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <SmoothLandingBox variant="fade" duration={1.0}>
        <HeroSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
        <ServiceBelowHero />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.15} distance={30}>
        <ServicesSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-right" delay={0.2} distance={30}>
        <CustomerGarageSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="fade" delay={0.1} distance={30}>
        <FindEverySpace />
      </SmoothLandingBox>
      <div className="relative">
        <SmoothLandingBox variant="slide-left" delay={0.15} distance={30}>
          <ContentSection1 />
        </SmoothLandingBox>
      </div>
      <SmoothLandingBox variant="slide-up" delay={0.2} distance={30}>
        <GarageFeaturesSection />
      </SmoothLandingBox>
      <div className="relative">
        <SmoothLandingBox
          variant="scale"
          delay={0.15}
          distance={30}
          duration={1.0}
        >
          <BannerSection image="/images/CarRepair.png" />
        </SmoothLandingBox>
      </div>
      <SmoothLandingBox variant="slide-up" delay={0.2} distance={30}>
        <InsurancePartnersSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-right" delay={0.15} distance={30}>
        <SparePartsSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.2} distance={30}>
        <HowItWorks />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-left" delay={0.15} distance={30}>
        <KeyFeaturesSection />
      </SmoothLandingBox>
      <SmoothLandingBox variant="fade" delay={0.1} distance={30}>
        <DeadBattery />
      </SmoothLandingBox>
      <SmoothLandingBox variant="slide-up" delay={0.15} distance={30}>
        <DriveMechSection />
      </SmoothLandingBox>
      <div className="relative">
        <SmoothLandingBox variant="bounce" duration={1.0} delay={0.1}>
          <PlayStoreSection />
        </SmoothLandingBox>
      </div>
    </div>
  );
}
