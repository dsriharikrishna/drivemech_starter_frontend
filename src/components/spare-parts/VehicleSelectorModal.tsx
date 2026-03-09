"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectVehicle,
  closeVehicleSelector,
} from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import type { Vehicle } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";

const VEHICLE_MAKES = [
  "Tata",
  "Maruti Suzuki",
  "Hyundai",
  "Mahindra",
  "Toyota",
  "Honda",
  "Kia",
  "Ford",
  "Renault",
  "Nissan",
  "Volkswagen",
  "Skoda",
  "BMW",
  "Mercedes-Benz",
  "Audi",
];

const VEHICLE_MODELS: Record<string, string[]> = {
  Tata: ["Nexon", "Harrier", "Safari", "Punch", "Altroz", "Tiago"],
  "Maruti Suzuki": ["Swift", "Baleno", "Brezza", "Ertiga", "Wagon R", "Alto"],
  Hyundai: ["Creta", "Venue", "i20", "Verna", "Elantra", "Tucson"],
  Mahindra: ["Scorpio", "XUV700", "Thar", "Bolero", "XUV300"],
  Toyota: ["Fortuner", "Innova", "Glanza", "Urban Cruiser", "Camry"],
};

const YEARS = Array.from({ length: 20 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

export default function VehicleSelectorModal() {
  const dispatch = useAppDispatch();
  const { ui } = useAppSelector((state) => state.spareParts);
  const isOpen = ui.isVehicleSelectorOpen;

  const [step, setStep] = useState<"make" | "model" | "year">("make");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleClose = () => {
    dispatch(closeVehicleSelector());
    // Reset state
    setTimeout(() => {
      setStep("make");
      setSelectedMake("");
      setSelectedModel("");
      setSelectedYear("");
    }, 300);
  };

  const handleMakeSelect = (make: string) => {
    setSelectedMake(make);
    setStep("model");
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setStep("year");
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);

    // Create vehicle object and dispatch
    const vehicle: Vehicle = {
      make: selectedMake,
      model: selectedModel,
      year: year,
    };

    dispatch(selectVehicle(vehicle));
    handleClose();
  };

  const handleBack = () => {
    if (step === "model") {
      setStep("make");
      setSelectedModel("");
    } else if (step === "year") {
      setStep("model");
      setSelectedYear("");
    }
  };

  if (!isOpen) return null;

  const models = VEHICLE_MODELS[selectedMake] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Select Your Vehicle
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {step === "make" && "Choose your vehicle make"}
              {step === "model" && `Select ${selectedMake} model`}
              {step === "year" && `Select ${selectedModel} year`}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gray-50">
          <div
            className={`flex-1 h-2 rounded-full ${step === "make" ? "bg-orange-500" : "bg-gray-300"}`}
          />
          <div
            className={`flex-1 h-2 rounded-full ${step === "model" ? "bg-orange-500" : "bg-gray-300"}`}
          />
          <div
            className={`flex-1 h-2 rounded-full ${step === "year" ? "bg-orange-500" : "bg-gray-300"}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {step === "make" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VEHICLE_MAKES.map((make) => (
                <button
                  key={make}
                  onClick={() => handleMakeSelect(make)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left font-medium text-gray-900"
                >
                  {make}
                </button>
              ))}
            </div>
          )}

          {step === "model" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left font-medium text-gray-900"
                >
                  {model}
                </button>
              ))}
            </div>
          )}

          {step === "year" && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className="p-3 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-center font-medium text-gray-900"
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "make" && (
          <div className="p-4 md:p-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
