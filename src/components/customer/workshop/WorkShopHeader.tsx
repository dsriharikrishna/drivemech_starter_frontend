import { ArrowLeft, SlidersHorizontal, MapPin, ShoppingCart } from "lucide-react";

interface Props {
  title: string;
  location: string;
}

export default function WorkShopHeader({ title, location }: Props) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 mb-5">

      <div className="flex items-center justify-between">

        {/* Left — Back + Title + Location */}
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />

          <div className="leading-tight">
            <h1 className="text-base font-semibold">{title}</h1>

            <div className="flex items-center text-sm text-gray-500 mt-[2px]">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
              {location}
            </div>
          </div>
        </div>

        {/* Right — Filter + Notification */}
        <div className="flex items-center gap-5">
          <ShoppingCart className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>


      </div>

    </div>
  );
}
