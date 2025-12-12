'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/landing-page/HeroSection';
import ServiceBelowHero from '@/components/landing-page/ServiceBelowHero';
import ServicesSection from '@/components/landing-page/ServicesSection';
import CustomerGarageSection from '@/components/landing-page/CustomerGarageSection';
import BannerSection from '@/components/landing-page/BannerSection';
import ContentSection1 from '@/components/landing-page/ContentSection1';
import GarageFeaturesSection from '@/components/landing-page/GarageFeaturesSection';
import InsurancePartnersSection from '@/components/landing-page/InsurancePartnersSection';
import DriveMechSection from '@/components/landing-page/DriveMechSection';
import SparePartsSection from '@/components/landing-page/SparePartsSection';
import HowItWorks from '@/components/landing-page/HowItWorks';
import KeyFeaturesSection from '@/components/landing-page/KeyFeaturesSection';
import PlayStoreSection from '@/components/landing-page/PlayStoreSection';
import FindEverySpace from '@/components/landing-page/FindEverySpace';
import DeadBattery from '@/components/landing-page/DeadBattery';

export default function HomePage() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  return (
    <div className="flex flex-col">
      <HeroSection
        selectedMake={selectedMake}
        setSelectedMake={setSelectedMake}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <ServiceBelowHero />
      <ServicesSection />
      <CustomerGarageSection />
      <FindEverySpace />
      <div className="relative">
        <ContentSection1 />
      </div>
      <GarageFeaturesSection />
      <div className="relative">
        <BannerSection image="/images/CarRepair.png" />
      </div>
      <InsurancePartnersSection />
      <SparePartsSection />
      <HowItWorks />
      <KeyFeaturesSection />
      <DeadBattery />
      <DriveMechSection />
      <div className="relative">
        <PlayStoreSection />
      </div>
    </div>
  );
}

