"use client";

import React from "react";
import PartnerHeroSection from "./PartnerHeroSection";
import { PartnerFleetSection } from "./PartnerFleetSection";
import { PartnerBenefitsSection } from "./PartnerBenefitsSection";
import { PartnerApplicationForm } from "./PartnerApplicationForm";


export default function PartnerPage() {
  return (
    <div className="flex flex-col w-full">

      {/* HERO SECTION */}
      <PartnerHeroSection />

      {/* OUR PROFESSIONAL FLEET */}
      <PartnerFleetSection />

      {/* BENEFITS SECTION */}
      <PartnerBenefitsSection />

      {/* APPLICATION FORM */}
      <PartnerApplicationForm />

    </div>
  );
}
