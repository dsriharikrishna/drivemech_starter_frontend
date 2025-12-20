import Button from "@/components/ui/Button";
import { Star, MapPin, Navigation } from "lucide-react";
import Image from "next/image";

interface ServiceItem {
  title: string;
  price: string;
}

interface Props {
  logo?: string;
  name: string;
  id: string;
  status: string;
  distance: string;
  ratings: string;
  reviews: string;
  tags: string[];
  highlights: string[];
  services: ServiceItem[];
  onBookNow: (name: string, id: string) => void;
  isActive?: boolean;
}

// Map service names to their corresponding icons
const serviceIcons: Record<string, string> = {
  "Periodic Service": "/images/workshop/PeriodicService.png",
  "AC Service": "/images/workshop/ACService.png",
  "Exterior Wash": "/images/workshop/ExteriorWash.png",
  "Interior Cleaning": "/images/workshop/InteriorCleaning.png",
  "Battery": "/images/workshop/Battery.png",
  "Radiator": "/images/workshop/Radiator.png",
  "Car Wash": "/images/workshop/CarWash.png",
  "Transmission": "/images/workshop/Transmission.png",
};

export default function MechanicCard({
  logo = "/images/workshop/WorkshopGarage.png",
  name,
  id,
  status,
  distance,
  ratings,
  reviews,
  tags,
  highlights,
  services,
  isActive,
  onBookNow,
}: Props) {
  return (
    <div
      className={`bg-white border shadow-sm rounded-2xl p-4 transition-all 
        ${isActive ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200"}
      `}
    >
      {/* ===================== MAIN FLEX LAYOUT ===================== */}
      <div className="flex flex-col lg:flex-row gap-3">

        {/* ===================== LEFT SECTION (~35%) ===================== */}
        <div className="flex-[0.45] flex flex-col gap-2">
          {/* Logo and Header Info */}
          <div className="flex items-start gap-3">
            <div className="bg-white border border-gray-200 rounded-xl shrink-0">
              <img
                src={"/images/workshop/WorkshopGarage.png"}
                alt={name.slice(0, 1)}
                className="object-contain rounded-xl w-28 h-32"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-1">{name}</h2>

              <div className="flex items-center gap-1">
                <span className="text-base font-semibold">{ratings}</span>
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">({reviews} Reviews)</span>
              </div>

              <div className="flex items-start gap-1 mt-1.5 text-xs text-gray-500">
                <MapPin size={12} className="mt-0.5 shrink-0" />
                <span>Phase 2, NSL Colony, Hyderabad, Telangana 502032</span>
              </div>

              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-gray-600">{distance}</span>
                <button className="flex items-center gap-1 text-blue-600 text-xs font-medium border border-blue-500 px-2 py-0.5 rounded-md hover:bg-blue-50 transition">
                  <Navigation size={10} />
                  Get Directions
                </button>
              </div>

              <div className="mt-1">
                <span className="text-green-600 font-medium text-xs">{status}</span>
              </div>
            </div>
          </div>

          {/* What we do */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-2">What we do</h3>
            <div className="grid grid-cols-2 gap-2">
              {tags.map((tag) => {
                const iconPath = serviceIcons[tag] || "/images/workshop/PeriodicService.png";
                return (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5"
                  >
                    <Image
                      src={iconPath}
                      alt={tag}
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                    <span className="text-xs text-gray-700">{tag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================== RIGHT SECTION (~65%) ===================== */}
        <div className="flex-[0.65] grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Services Requiring Inspection */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex flex-col">
            <h3 className="font-semibold text-sm text-orange-700">
              Services Requiring Inspection
            </h3>

            <p className="text-xs text-gray-600 mt-1 mb-2">
              Pricing for these services is available at the workshop.
            </p>

            <ul className="text-xs space-y-1 flex-1">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-1.5 text-gray-700">
                  <span>{i + 1}.</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {highlights.length > 3 && (
              <button className="text-blue-600 text-xs font-medium mt-1.5 text-left">
                + 3 more services
              </button>
            )}

            <div className="flex justify-end mt-3">
              <button className="bg-white border border-orange-500 text-orange-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-orange-50 transition">
                Quote on Inspection
              </button>
            </div>
          </div>

          {/* Fixed Price Services */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex flex-col">
            <h3 className="font-semibold text-sm text-teal-800">Fixed Price Services</h3>

            <p className="text-xs text-gray-600 mt-1 mb-2">
              These services have fixed prices
            </p>

            <div className="text-xs space-y-1 flex-1">
              {services.map((s, i) => (
                <div key={i} className="flex justify-between text-gray-700">
                  <span>
                    {i + 1}. {s.title}
                  </span>
                  <span className="font-semibold">{s.price}</span>
                </div>
              ))}
            </div>

            {services.length > 3 && (
              <button className="text-blue-600 text-xs font-medium mt-1.5 text-left">
                + 3 more services
              </button>
            )}

            <div className="flex justify-end mt-3">
              <button className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-700 transition">
                $ 4999/-
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== BOOK NOW BUTTON ===================== */}
      <div className="mt-4">
        <Button
          onClick={() => onBookNow(name, id)}
          variant="primary"
          className="w-full rounded-xl py-3 text-sm font-semibold"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
