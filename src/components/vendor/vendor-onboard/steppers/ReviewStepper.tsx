"use client";

import React, { useCallback, useState } from "react";
import WorkshopReviewSection from "./review/WorkshopReviewSection";
import SparePartsReviewSection from "./review/SparePartsReviewSection";
import TowingReviewSection from "./review/TowingReviewSection";

const ReviewStepper: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    workshop: true,
    spareParts: true,
    towing: true,
  });

  const toggleSection = useCallback(
    (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    [expandedSections]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Review Your Registration
      </h2>

      {/* Workshop Section */}
      <WorkshopReviewSection
        isExpanded={expandedSections.workshop}
        onToggle={() => toggleSection("workshop")}
      />

      {/* Spare Parts Section */}
      <SparePartsReviewSection
        isExpanded={expandedSections.spareParts}
        onToggle={() => toggleSection("spareParts")}
      />

      {/* Towing Services Section */}
      <TowingReviewSection
        isExpanded={expandedSections.towing}
        onToggle={() => toggleSection("towing")}
      />
    </div>
  );
};

export default ReviewStepper;
