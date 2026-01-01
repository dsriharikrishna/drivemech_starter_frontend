"use client";

import CustomCard from "@/components/ui/CustomCard";  // citation above
import Button from "@/components/ui/Button";

const services = [
  {
    title: "Emergency Towing",
    desc: "24/7 fast response towing for accidents, breakdowns, and emergencies.",
    img: "/images/towing-services/home/EmergencyTowing.png",
  },
  {
    title: "Roadside Assistance",
    desc: "On-site repairs, tire changes, and mechanical support.",
    img: "/images/towing-services/home/RoadsideAssistance.png",
  },
  {
    title: "Quick Service",
    desc: "Battery jump starts, fuel delivery, and tire changes.",
    img: "/images/towing-services/home/QuickService.png",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-gray-heading text-3xl font-semibold text-center">
          Comprehensive Auto Services
        </h2>

        {/* Sub text */}
        <p className="text-gray-600 text-sm text-center mt-2 mb-10">
          From emergency towing to roadside assistance, we've got you covered 24/7.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <CustomCard
              key={index}
              className="rounded-xl border border-gray-200 p-4 flex gap-4"
            >
              <img
                src={item.img}
                className="w-28 h-28 rounded-lg object-cover"
                alt={item.title}
              />

              <div className="flex-1">
                <h3 className="text-gray-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>

                <Button
                  variant="gradient"
                  fullWidth
                  className="mt-4"
                  rounded="lg"
                >
                  Learn More
                </Button>
              </div>
            </CustomCard>
          ))}
        </div>

      </div>
    </section>
  );
}
