"use client";

import { Zap, UserCheck, ShieldCheck, BadgeDollarSign } from "lucide-react";

const reasons = [
  {
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    title: "Quick Response Time",
    desc: "Average arrival time under 30 minutes for emergency calls",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-orange-500" />,
    title: "Professional & Certified",
    desc: "All drivers are trained, licensed, and background-checked",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
    title: "Safe Vehicle Handling",
    desc: "State-of-the-art equipment protects your vehicle during towing",
  },
  {
    icon: <BadgeDollarSign className="w-6 h-6 text-orange-500" />,
    title: "Transparent Pricing",
    desc: "No hidden fees — you get a quote before we start",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <h2 className="text-gray-heading text-3xl font-semibold text-center">
          Why Choose Us?
        </h2>

        {/* FLEX CARD WRAPPER */}
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-10">

          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex w-full md:w-[calc(25%-1rem)] gap-2 border border-gray-200 rounded-xl p-2"
            >
              {/* LEFT ICON BOX */}
              <div className="flex-[0.1] lg:flex-[0.2] bg-orange-50 p-2 rounded-lg flex items-center justify-center">
                {r.icon}
              </div>

              {/* RIGHT TEXT AREA */}
              <div className="flex-[0.75] lg:flex-[0.7] flex flex-col justify-center items-center">
                <h3 className="text-gray-heading text-md font-semibold">
                  {r.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mt-1">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
