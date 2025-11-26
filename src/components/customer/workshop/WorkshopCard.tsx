'use client';

import Image from "next/image";
import { Star, MapPin, Navigation } from "lucide-react";
import { WorkshopCardProps } from "@/types/workshops";

export default function WorkshopCard({
  logo,
  name,
  rating,
  reviews,
  distance,
  driveTime,
  services,
  ctaType,
  offerText = "View Offers",
}: WorkshopCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-all w-[280px] flex-shrink-0">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
          <Image 
            src={logo} 
            alt={name} 
            width={64} 
            height={64} 
            className="object-cover"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-gray-900 font-semibold text-lg text-center mb-2">
        {name}
      </h3>

      {/* Rating */}
      <div className="flex justify-center items-center gap-1 text-sm text-gray-700 mb-3">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <span>{rating}</span>
        <span className="text-gray-400">({reviews})</span>
      </div>

      {/* Meta info */}
      <div className="flex justify-center items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-gray-400" />
          {distance}
        </div>
        <div className="flex items-center gap-1">
          <Navigation className="h-3 w-3 text-blue-500" />
          {driveTime}
        </div>
      </div>

      {/* Service Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {services.slice(0, 3).map((item: string, index: number) => (
          <span 
            key={index}
            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200"
          >
            {item}
          </span>
        ))}
        {services.length > 3 && (
          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            +{services.length - 3}
          </span>
        )}
      </div>

      {/* CTA */}
      <button 
        className={`
          w-full py-2 rounded-lg text-sm font-medium border transition-all
          ${ctaType === "book" 
            ? "border-orange-500 text-orange-500 hover:bg-orange-50" 
            : "border-orange-300 text-orange-400 hover:bg-orange-50"}
        `}
      >
        {offerText}
      </button>
    </div>
  );
}
