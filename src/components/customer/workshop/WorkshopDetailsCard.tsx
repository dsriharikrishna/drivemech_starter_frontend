'use client';

import Image from "next/image";
import { WorkshopDetailProps } from "@/types/workshops";
import { MapPin, Navigation, Star } from "lucide-react";

export default function WorkshopDetailsCard({
  logo,
  name,
  isOpen,
  closingTime,
  distance,
  driveTime,
  rating,
  reviews,
  categories,
  inspectionServices,
  moreInspectionCount,
  fixedPriceServices,
  moreFixedCount,
  fixedPriceCTA
}: WorkshopDetailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 w-full space-y-6">

      {/* Top Row (Name, Logo, Stats) */}
      <div className="flex gap-6">
        {/* Logo */}
        <div className="h-28 w-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={logo} alt={name} width={120} height={120} className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>

          {/* Status */}
          <p className="text-sm">
            <span className={`font-medium ${isOpen ? "text-green-600" : "text-red-500"}`}>
              {isOpen ? "Open" : "Closed"}
            </span>
            <span className="text-gray-600 ml-2">
              Closes {closingTime}
            </span>
          </p>

          {/* Distance / Time */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {distance}
            </div>
            <div className="flex items-center gap-1">
              <Navigation className="h-4 w-4 text-blue-500" />
              {driveTime}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center text-sm gap-1 text-gray-700">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-400">({reviews} Reviews)</span>
          </div>
        </div>

        {/* What we do */}
        <div className="hidden lg:flex flex-col gap-2 w-[200px]">
          <p className="text-sm font-medium text-gray-700">What we do</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 text-xs rounded-full bg-gray-100 border border-gray-200 text-gray-600"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body (Inspection + Fixed Price Sections) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Inspection Services */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <h3 className="font-semibold text-orange-700 mb-2">Services Requiring Inspection</h3>
          <p className="text-xs text-gray-600 mb-3">
            Pricing for these services is available at the workshop.
          </p>

          <ul className="space-y-1 text-sm text-gray-800">
            {inspectionServices.slice(0, 3).map((item, idx) => (
              <li key={idx}>
                {idx + 1}. {item}
              </li>
            ))}
          </ul>

          <p className="text-blue-600 text-sm mt-2 cursor-pointer">
            + {moreInspectionCount} more services
          </p>

          <button className="mt-4 px-5 py-2 bg-orange-500 text-white text-sm rounded-full shadow hover:bg-orange-600">
            Quote on Inspection
          </button>
        </div>

        {/* Fixed Price Services */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-semibold text-green-700 mb-2">Fixed Price Services</h3>
          <p className="text-xs text-gray-600 mb-3">
            These service have fixed prices
          </p>

          <ul className="space-y-1 text-sm text-gray-800">
            {fixedPriceServices.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{idx + 1}. {item.name}</span>
                <span className="font-medium">${item.price}</span>
              </li>
            ))}
          </ul>

          <p className="text-blue-600 text-sm mt-2 cursor-pointer">
            + {moreFixedCount} more services
          </p>

          <button className="mt-4 px-5 py-2 bg-green-600 text-white text-sm rounded-full shadow hover:bg-green-700">
            {fixedPriceCTA}
          </button>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="flex justify-end">
        <button className="px-10 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600">
          Book Now
        </button>
      </div>

    </div>
  );
}
