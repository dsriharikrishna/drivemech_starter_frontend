import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface Props {
  name: string;
  time: string;
  review: string;
  rating: number;
}

export default function ReviewItem({ name, time, review, rating }: Props) {
  return (
    <div className="py-4 border-b last:border-b-0 border-gray-200">
      
      {/* Top Row */}
      <div className="flex items-center justify-between">
        
        {/* Left block (avatar + name + stars + time) */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/user.png"
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />

          <div>
            {/* Name */}
            <h4 className="font-semibold text-lg text-[#1A2B4C] leading-none">
              {name}
            </h4>

            {/* Stars + time */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-yellow-500 text-lg leading-none">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </div>

              <span className="text-md text-gray-500">{time}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <MoreVertical className="w-5 h-5 text-gray-700" />
      </div>

      {/* Review text */}
      <p className="text-sm text-[#606B80] mt-4 leading-relaxed">
        {review}
      </p>
    </div>
  );
}
