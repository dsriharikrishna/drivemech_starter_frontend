"use client";

import Image from "next/image";
import { City } from "@/constants/location.constants";

interface CityCardProps {
  city: City;
  onSelect?: (city: City) => void;
}

export default function CityCard({ city, onSelect }: CityCardProps) {
  const isImageIcon = city.icon.startsWith("/");

  return (
    <button
      onClick={() => onSelect?.(city)}
      className="
                flex flex-col p-4
                bg-white border border-gray-200 rounded-xl
                hover:border-orange-500 hover:shadow-md
                transition-all duration-200
                text-left w-full group
            "
    >
      {/* Header with Icon and City Name */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
        {/* City Icon */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
          {isImageIcon ? (
            <Image
              src={city.icon}
              alt={city.name}
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <span className="text-2xl">{city.icon}</span>
          )}
        </div>

        {/* City Info */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-0.5">
            {city.name}
          </h3>
          <p className="text-xs text-gray-500">
            {city.verifiedGarages}+ Verified Garages
          </p>
        </div>
      </div>

      {/* States List */}
      {city.states && city.states.length > 0 && (
        <div className="flex-1 max-h-24 overflow-y-auto mb-3">
          <div className="space-y-1">
            {city.states.map((state, idx) => (
              <p
                key={`${state}-${idx}`}
                className="text-xs text-gray-600 truncate"
              >
                • {state}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* State Count */}
      {city.states && city.states.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {city.states.length}{" "}
            {city.states.length === 1 ? "Region" : "Regions"}
          </p>
        </div>
      )}
    </button>
  );
}
