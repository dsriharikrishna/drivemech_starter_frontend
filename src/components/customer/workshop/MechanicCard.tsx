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
      className={`bg-white border shadow-sm rounded-2xl p-6 transition-all 
        ${isActive ? "border-orange-500 ring-2 ring-orange-200" : "border-gray-200"}
      `}
    >
      {/* ===================== MAIN FLEX LAYOUT ===================== */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ===================== LEFT SECTION (~35%) ===================== */}
        <div className="flex-[0.35] flex flex-col gap-4">
          {/* Logo and Header Info */}
          <div className="flex items-start gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3 shrink-0">
              <Image
                src={"/images/workshop/WorkshopGarage.png"}
                alt={name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>

              <div className="flex items-center gap-1.5">
                <span className="text-lg font-semibold">{ratings}</span>
                <Star size={14} className="fill-star text-star" />
                <span className="text-sm text-gray-400">({reviews} Reviews)</span>
              </div>

              <div className="flex items-start gap-1.5 mt-2 text-xs text-gray-500">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>Phase 2, NSL Colony, Hyderabad, Telangana 502032</span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">{distance}</span>
                <button className="flex items-center gap-1 text-blue-600 text-xs font-medium border border-blue-600 px-2.5 py-1 rounded-md hover:bg-blue-50 transition">
                  <Navigation size={12} />
                  Get Directions
                </button>
              </div>

              <div className="mt-1.5">
                <span className="text-green-600 font-medium text-xs">{status}</span>
              </div>
            </div>
          </div>

          {/* What we do */}
          <div>
            <h3 className="font-bold text-base text-gray-900 mb-3">What we do</h3>
            <div className="grid grid-cols-2 gap-3">
              {tags.map((tag) => {
                const iconPath = serviceIcons[tag] || "/images/workshop/PeriodicService.png";
                return (
                  <div
                    key={tag}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2"
                  >
                    <Image
                      src={iconPath}
                      alt={tag}
                      width={20}
                      height={20}
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
        <div className="flex-[0.65] grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Services Requiring Inspection */}
          <div className="bg-inspection border border-inspection rounded-xl p-4 flex flex-col">
            <h3 className="font-bold text-sm text-inspection">
              Services Requiring Inspection
            </h3>

            <p className="text-[11px] text-gray-600 mt-1 mb-3">
              Pricing for these services is available at the workshop.
            </p>

            <ul className="text-[13px] space-y-1.5 flex-1">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span>{i + 1}.</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {highlights.length > 3 && (
              <button className="text-blue-600 text-sm font-medium mt-2 text-left">
                + 3 more services
              </button>
            )}

            <div className="flex justify-end mt-4">
              <button className="bg-white border border-orange-500 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50 transition">
                Quote on Inspection
              </button>
            </div>
          </div>

          {/* Fixed Price Services */}
          <div className="bg-fixed-price border border-fixed-price rounded-xl p-4 flex flex-col">
            <h3 className="font-bold text-sm text-teal-900">Fixed Price Services</h3>

            <p className="text-[11px] text-gray-600 mt-1 mb-3">
              These services have fixed prices
            </p>

            <div className="text-[13px] space-y-1.5 flex-1">
              {services.map((s, i) => (
                <div key={i} className="flex justify-between text-gray-700">
                  <span>
                    {i + 1}. {s.title}
                  </span>
                  <span className="font-bold">{s.price}</span>
                </div>
              ))}
            </div>

            {services.length > 3 && (
              <button className="text-blue-600 text-sm font-medium mt-2 text-left">
                + 3 more services
              </button>
            )}

            <div className="flex justify-end mt-4">
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition">
                $ 4999/-
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== BOOK NOW BUTTON ===================== */}
      <div className="mt-6">
        <Button
          onClick={() => onBookNow(name, id)}
          variant="primary"
          className="w-full rounded-xl py-3.5 text-base font-bold"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
