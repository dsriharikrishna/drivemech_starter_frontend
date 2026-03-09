"use client";

import React from "react";
import { Award, Shield, DollarSign, Bell } from "lucide-react";

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const defaultBenefits: Benefit[] = [
  {
    id: "1",
    title: "OEM-Grade Parts",
    description:
      "Original equipment manufacturer quality parts for lasting performance",
    icon: <Award className="w-8 h-8" />,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "2",
    title: "Verified Technicians",
    description: "Certified professionals with years of automotive expertise",
    icon: <Shield className="w-8 h-8" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "3",
    title: "Transparent Pricing",
    description: "No hidden charges, upfront quotes with detailed breakdowns",
    icon: <DollarSign className="w-8 h-8" />,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "4",
    title: "Real-Time Updates",
    description: "Live service tracking and instant notifications on progress",
    icon: <Bell className="w-8 h-8" />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

interface WhyChooseUsProps {
  benefits?: Benefit[];
}

export default function WhyChooseUs({
  benefits = defaultBenefits,
}: WhyChooseUsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Why Choose DriveMech?
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Experience the difference with our premium service standards
      </p>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className={`${benefit.bgColor} rounded-xl p-5 border border-gray-100`}
          >
            <div className={`${benefit.iconColor} mb-3`}>{benefit.icon}</div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">
              {benefit.title}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
