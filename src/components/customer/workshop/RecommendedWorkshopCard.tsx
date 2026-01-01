import { Bike, Star } from "lucide-react";
import React from "react";

interface RecommendedWorkshopCardProps {
  logo: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  driveTime: string;
  tags: string[];
  buttonText: string;
  onClick: () => void;
}

export default function RecommendedWorkshopCard({
  logo,
  name,
  rating,
  reviews,
  distance,
  driveTime,
  tags,
  buttonText,
  onClick,
}: RecommendedWorkshopCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-[250px]">

      {/* TOP SECTION */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img
          src={logo}
          className="w-12 h-12 object-contain rounded-md"
        />

        <div>
          <h3 className="font-semibold text-base">{name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold">{rating}</span>
            <Star size={12}color="#EFB100" fill="#EFB100" />            
            <span className="text-gray-500">({reviews})</span>
          </div>
        </div>
      </div>

      {/* DISTANCE */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
        <Bike size={16} />
        <span>{distance}</span>

        <span className="text-gray-400">•</span>

        <span className="flex items-center gap-1 text-blue-600">
          {driveTime}
          <img src="/images/workshop/direction-fill.png" alt="Drive Time" className="object-contain" />
        </span>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={onClick}
        className="mt-4 w-full border border-orange-500 text-orange-600 py-2 rounded-xl text-sm font-medium hover:bg-orange-50 transition"
      >
        {buttonText}
      </button>

    </div>
  );
}
