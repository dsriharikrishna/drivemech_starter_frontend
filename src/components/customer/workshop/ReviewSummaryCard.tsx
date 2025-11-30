import CustomCard from "@/components/ui/CustomCard";
import { Star } from "lucide-react";

export default function ReviewSummaryCard() {
  const ratingData = [
    { stars: 5, width: "w-[92%]" },
    { stars: 4, width: "w-[75%]" },
    { stars: 3, width: "w-[55%]" },
    { stars: 2, width: "w-[35%]" },
    { stars: 1, width: "w-[18%]" },
  ];

  return (
    <CustomCard>
      <div className="rounded-2xl">
        
        {/* Heading */}
        <h3 className="text-lg font-semibold mb-4">Customer Review</h3>

        {/* Rating Row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            {/* Main rating */}
            <span className="text-4xl font-bold text-[#1A2B4C] leading-none">
              4.5
            </span>

            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" stroke="none" />
          </div>

          {/* Review count */}
          <div className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full">
            653 reviews
          </div>
        </div>

        {/* Rating bars */}
        <div className="space-y-3">
          {ratingData.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              
              {/* Stars + number */}
              <div className="flex items-center gap-1 w-8 text-sm text-gray-700">
                <span>{item.stars}</span>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" stroke="none" />
              </div>

              {/* Gradient bar */}
              <div className="flex-1 bg-gray-200 h-[8px] rounded-full">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 ${item.width}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomCard>
  );
}
