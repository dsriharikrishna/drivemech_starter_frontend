"use client";
import Image from "next/image";
import { VehicleInfo } from "@/store/slicers/carSlicer";

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
        <span className="text-gray-700 font-medium text-lg">
          {vehicle.registration}
        </span>
        {onChange && (
          <button
            onClick={onChange}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-xl font-medium transition-colors duration-200"
          >
            Change
          </button>
        )}
      </div>

      {/* Car image */}
      <div className="flex justify-center mb-2">
        <div className="relative w-32 h-24">
          <Image
            src="/images/services/CarService.png" 
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 192px"
          />
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

export default CarCard;
