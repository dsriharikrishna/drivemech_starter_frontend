"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowLeft, User } from "lucide-react";
import {
  ENGINE_PARTS_DATA,
  SPARE_PARTS_SIDEBAR_CATEGORIES,
} from "@/constants/spare-parts-detail.constants";
import { Info } from "phosphor-react";
import Breadcrumbs from "@/components/spare-parts/Breadcrumbs";
import VehicleSelectorModal from "@/components/spare-parts/VehicleSelectorModal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { openVehicleSelector } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";

const SparePartsDetailLayout = () => {
  const dispatch = useAppDispatch();
  const { vehicle } = useAppSelector((state) => state.spareParts);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "electrical-components": true,
    "engine-lubrication": true,
    "engine-control-components": false,
    "accessory-drive-components": false,
    "cylinder-heads": false,
    "exhaust-gas-recirculation": false,
    "filters-associated": false,
    "crankcase-ventilation": false,
    "engine-blocks": false,
  });

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Spare Parts", href: "/spare-parts" },
    { name: "Engine Parts", href: "/spare-parts/detail-page" },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleSelectVehicle = () => {
    dispatch(openVehicleSelector());
  };

  return (
    <>
      <VehicleSelectorModal />
      <Breadcrumbs items={breadcrumbs} />

      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Categories */}
            <aside className="w-full lg:w-32 flex-shrink-0">
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 lg:sticky lg:top-20">
                {SPARE_PARTS_SIDEBAR_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={category.href}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg bg-white transition-all ${
                      category.id === "engine-parts"
                        ? "border-2 border-orange-500"
                        : "border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {/* Placeholder for category image */}
                      <div className="w-14 h-14 bg-gray-300 rounded"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-800 text-center">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col gap-4">
              {/* Vehicle Selection Banner */}
              <div
                className={`${vehicle ? "bg-green-50 border-green-200" : "bg-blue-600"} border rounded-lg py-3`}
              >
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Info
                      className={`w-5 h-5 ${vehicle ? "text-green-600" : "text-white"}`}
                      weight={vehicle ? "fill" : "regular"}
                    />
                    <span
                      className={`text-sm ${vehicle ? "text-green-800 font-medium" : "text-white"}`}
                    >
                      {vehicle
                        ? `Showing parts for ${vehicle.make} ${vehicle.model} (${vehicle.year})`
                        : "Please select your vehicle to check if this part fits."}
                    </span>
                  </div>
                  <button
                    onClick={handleSelectVehicle}
                    className={`${vehicle ? "bg-green-600 text-white hover:bg-green-700" : "bg-white text-blue-600 hover:bg-gray-100"} px-4 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap`}
                  >
                    {vehicle ? "Change Vehicle" : "Select Vehicle"}
                  </button>
                </div>
              </div>
              {/* Page Header with Back Button */}
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href="/spare-parts"
                  className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Engine thumbnail */}
                    <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {ENGINE_PARTS_DATA.name}
                  </h1>
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-4">
                {ENGINE_PARTS_DATA.subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(subcategory.id)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-sm font-semibold text-gray-900">
                        {subcategory.name}
                      </span>
                      {expandedSections[subcategory.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>

                    {/* Section Content */}
                    {expandedSections[subcategory.id] && (
                      <div className="px-4 pb-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {subcategory.items.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
                            >
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100">
                                <User className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                              </div>
                              <span className="text-xs text-gray-700 group-hover:text-blue-600 line-clamp-2">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SparePartsDetailLayout;
