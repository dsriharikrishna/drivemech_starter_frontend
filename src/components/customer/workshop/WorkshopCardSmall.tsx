'use client';

import Image from "next/image";
import { Workshop } from "@/types/workshops";
import { Star } from "lucide-react";

export default function WorkshopCardSmall({ workshop }: { workshop: Workshop }) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex gap-4 hover:shadow-md transition cursor-pointer">
      
      <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100">
        <Image src={workshop.logo} width={56} height={56} alt={workshop.name} />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{workshop.name}</h3>

        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          {workshop.rating}
          <span className="text-gray-400">({workshop.reviews})</span>
        </div>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {workshop.description}
        </p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {workshop.services.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-600 border border-gray-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="mt-3 px-4 py-2 border border-orange-500 text-orange-500 rounded-lg font-medium text-sm hover:bg-orange-50">
          Book Now
        </button>
      </div>

    </div>
  );
}
