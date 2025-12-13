"use client";

import { City } from "@/constants/location.constants";

interface CityCardProps {
    city: City;
    onSelect?: (city: City) => void;
}

export default function CityCard({ city, onSelect }: CityCardProps) {
    return (
        <button
            onClick={() => onSelect?.(city)}
            className="
        flex items-center gap-4 p-4 
        bg-white border border-gray-200 rounded-xl
        hover:border-primary hover:shadow-md
        transition-all duration-200
        text-left w-full
      "
        >
            {/* City Icon */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
                <span className="text-2xl">{city.icon}</span>
            </div>

            {/* City Info */}
            <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{city.name}</h3>
                <p className="text-sm text-gray-500">
                    {city.verifiedGarages}+ Verified Garages
                </p>
            </div>
        </button>
    );
}
