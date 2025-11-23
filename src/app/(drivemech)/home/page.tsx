'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ServiceBelowHero from '@/components/car-service/ServiceBelowHero';
import BannerSection from '@/components/car-service/BannerSection';
import ContentSection1 from '@/components/car-service/ContentSection1';
import DriveMechSection from '@/components/car-service/DriveMechSection';
import SparePartsSection from '@/components/car-service/SparePartsSection';
import HowItWorks from '@/components/car-service/HowItWorks';
import KeyFeaturesSection from '@/components/car-service/KeyFeaturesSection';
import PlayStoreSection from '@/components/car-service/PlayStoreSection';

// Dynamically import components with no SSR to avoid hydration issues
const HeroSection = dynamic(() => import('@/components/car-service/HeroSection'), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/car-service/ServicesSection'), { ssr: false });
const CustomerGarageSection = dynamic(() => import('@/components/car-service/CustomerGarageSection'), { ssr: false });
const GarageFeaturesSection = dynamic(() => import('@/components/car-service/GarageFeaturesSection'), { ssr: false });
const InsurancePartnersSection = dynamic(() => import('@/components/car-service/InsurancePartnersSection'), { ssr: false });

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
          <div className="relative">
      <ContentSection1 />
      </div>
      <GarageFeaturesSection />
      <div className="relative">
        <BannerSection image="/images/CarRepair.png" />
      </div>
      <InsurancePartnersSection />
      <HowItWorks />
      <KeyFeaturesSection />
      <DriveMechSection />
      <div className="relative">
        <BannerSection image="/images/BikeMech.png" />
      </div>
      <SparePartsSection />
      <div className="relative">
        <PlayStoreSection />
      </div>
    </div>
  );
}
