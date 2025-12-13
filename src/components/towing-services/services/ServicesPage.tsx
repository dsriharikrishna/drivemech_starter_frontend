"use client";

import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Emergency Towing",
    desc: "24/7 fast response towing for accidents, breakdowns, and emergencies",
    img: "/images/towing-services/services/EmergencyTowing.png",
    points: [
      "Accident recovery",
      "Breakdown towing",
      "24/7 availability",
      "Insurance Assistance",
    ],
  },
  {
    title: "Roadside Assistance",
    desc: "On-site repairs, tire changes, and mechanical support",
    img: "/images/towing-services/services/RoadsideAssistance.png",
    points: [
      "Tire Changes",
      "Minor Repairs",
      "Diagnostic Checks",
      "Professional Mechanics",
    ],
  },
  {
    title: "Emergency Fuel Delivery",
    desc: "Fast fuel delivery when you're stranded",
    img: "/images/towing-services/services/EmergencyFuelDelivery.png",
    points: ["All fuel types", "Quick delivery", "Fair pricing", "Convenient payment"],
  },
  {
    title: "Jump Start Service",
    desc: "Quick battery jump starts",
    img: "/images/towing-services/services/JumpStartService.png",
    points: [
      "Fast response",
      "Professional equipment",
      "Battery diagnostics",
      "Safety first",
    ],
  },
  {
    title: "Lockout Service",
    desc: "Locked out of your vehicle? We can help",
    img: "/images/towing-services/services/LockoutService.png",
    points: ["Non-destructive entry", "All vehicle types", "Quick service", "Licensed technicians"],
  },
  {
    title: "Long Distance Towing",
    desc: "Secure transport across long distances",
    img: "/images/towing-services/services/LongDistanceTowing.png",
    points: [
      "Interstate transport",
      "Flatbed options",
      "Secure loading",
      "GPS tracking",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* BADGE */}
        <div className="w-full flex justify-center mb-4">
          <span className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-sm">
            Complete Service Portfolio
          </span>
        </div>

        {/* PAGE HEADING */}
        <h2 className="text-center text-gray-heading text-3xl font-semibold">
          Professional Auto Services
        </h2>

        {/* SUBTEXT */}
        <p className="text-center text-gray-600 text-sm max-w-3xl mx-auto mt-3">
          We are India’s leading 24/7 roadside assistance and towing service provider with over 15 years of experience.
          Our mission is to provide fast, reliable, and professional towing services to drivers across the country.
          Comprehensive assistance when you need it most. Transparent pricing, expert service.
        </p>

        {/* GRID SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {services.map((s, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-0 overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-[180px] object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-gray-heading text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{s.desc}</p>

                {/* POINTS LIST */}
                <ul className="mt-3 space-y-2">
                  {s.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <Button
                  variant="gradient"
                  fullWidth
                  className="mt-5 h-[42px] text-sm"
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
