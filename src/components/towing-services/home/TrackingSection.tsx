"use client";

import Button from "@/components/ui/Button";
import { MapPin, Clock, Bell } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-5 text-gray-700" />,
    title: "Live GPS Location",
    desc: "See your driver's exact location on the map",
  },
  {
    icon: <Clock className="w-5 text-gray-700" />,
    title: "Accurate ETA",
    desc: "AI-powered arrival predictions",
  },
  {
    icon: <Bell className="w-5 text-gray-700" />,
    title: "Status Updates",
    desc: "Automatic notifications at each step",
  },
];

export default function TrackingSection() {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* FLEX WRAPPER */}
        <div className="flex flex-col lg:flex-row gap-5 items-center lg:items-start">

          {/* LEFT IMAGE */}
          <div className="w-full lg:flex-1">
            <img
              src="/images/towing-services/home/TrackServiceRealTime.png"
              alt="Tracking"
              className="w-full h-[260px] rounded-xl object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:flex-3">

            {/* Label */}
            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs sm:text-sm inline-block mb-3 sm:mb-4">
              Live Tracking
            </span>

            {/* Heading */}
            <h2 className="text-gray-heading text-2xl sm:text-3xl font-semibold">
              Track Your Service in Real-Time
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
              Know exactly where your driver is with our advanced GPS tracking system.
              Get accurate ETAs and real-time updates.
            </p>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <span className="font-medium text-gray-800 text-sm sm:text-base">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <Button
              variant="gradient"
              rounded="md"
              className="mt-5 w-full sm:w-auto px-6 py-2"
            >
              Try Live Tracking
            </Button>

          </div>
        </div>

      </div>
    </section>
  );
}
