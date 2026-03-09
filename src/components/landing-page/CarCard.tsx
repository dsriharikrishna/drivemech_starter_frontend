"use client";
import Image from "next/image";
import { VehicleInfo } from "@/store/slices/cart/cartSlice";
import { CarIcon } from "../icons/DashboardIcons";
import { CarSimple } from "phosphor-react";

interface CarCardProps {
  vehicle: VehicleInfo;
  onChange?: () => void;
  className?: string;
}

export function CarCard({ vehicle, onChange, className = "" }: CarCardProps) {
  // Format vehicle details for display
  const vehicleDetails = `${vehicle.year} ${vehicle.fuelType} ${vehicle.transmission} ${vehicle.engine} ${vehicle.drive}`;

  return (
    <div className={`bg-white rounded-xl p-4 relative ${className}`}>
      {/* Header with registration and change button */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-700 font-medium text-base">
          {vehicle.registration}
        </span>
        {onChange && (
          <button
            onClick={onChange}
            className="rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 border-0 hover:shadow-sm transition-all duration-200 font-semibold px-5 py-1.5 cursor-pointer"
          >
            Change
          </button>
        )}
      </div>

      {/* Car image */}
      <div className="flex justify-center mb-2">
        <div className="relative w-32 h-24">
          {vehicle.image ? (
            <Image
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <CarSimple className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Vehicle name */}
      <div className="text-center mb-1">
        <h3 className="text-xl font-bold text-gray-900">
          {vehicle.make} {vehicle.model}
        </h3>
      </div>

      {/* Vehicle details */}
      <div className="text-center">
        <p className="text-sm text-gray-500 leading-relaxed">
          {vehicleDetails}
        </p>
      </div>
    </div>
  );
}
