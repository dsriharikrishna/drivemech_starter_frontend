"use client";

import React, { useState } from "react";
import PartnerHeroSection from "./PartnerHeroSection";
import { PartnerFleetSection } from "./PartnerFleetSection";
import { PartnerBenefitsSection } from "./PartnerBenefitsSection";
import { PartnerApplicationForm } from "./PartnerApplicationForm";
import PartnerSuccessPage from "./PartnerSuccessPage";
import { RegisterFormData } from "@/schemas/partner.schemas";


export default function PartnerPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<RegisterFormData | null>(null);

  if (isSubmitted) {
    return <PartnerSuccessPage data={data!} />;
  }

  return (
    <div className="flex flex-col w-full">

      {/* HERO SECTION */}
      <PartnerHeroSection />

      {/* OUR PROFESSIONAL FLEET */}
      <PartnerFleetSection />

      {/* BENEFITS SECTION */}
      <PartnerBenefitsSection />

      {/* Insurance Banner section to do */}

      {/* APPLICATION FORM */}
      <PartnerApplicationForm
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        data={data} setData={setData}
      />

    </div>
  );
}
