import React from "react";
import { Truck, Clock, Shield, Tag } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    description: "For orders from $50",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    icon: Clock,
    title: "Support 24/7",
    description: "Call us anytime",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    icon: Shield,
    title: "100% Safety",
    description: "Only secure payments",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: 4,
    icon: Tag,
    title: "Hot Offers",
    description: "Discounts up to 90%",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

const SparePartsFeatures = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`${feature.bgColor} p-3 rounded-lg flex-shrink-0`}
                >
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SparePartsFeatures;
