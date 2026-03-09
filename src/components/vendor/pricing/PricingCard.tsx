"use client";

import React from "react";
import { Check } from "lucide-react";

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: {
      monthly: number;
      yearly: number;
    };
    isPopular?: boolean;
    features: {
      category: string;
      items: string[];
    }[];
  };
  billingCycle: "monthly" | "yearly";
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billingCycle,
  isSelected,
  onSelect,
}) => {
  const price =
    billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  const isPopular = plan.isPopular;

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col ${
        isPopular
          ? "text-white scale-105 shadow-2xl"
          : isSelected
            ? "bg-white border-2 border-orange-500 shadow-lg"
            : "bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg"
      }`}
      style={
        isPopular
          ? { background: "linear-gradient(to bottom right, #D97642, #B85C2E)" }
          : undefined
      }
    >
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 right-6">
          <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3
          className={`text-2xl font-bold mb-2 ${isPopular ? "text-white" : "text-gray-900"}`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-sm ${isPopular ? "text-orange-100" : "text-gray-600"}`}
        >
          {plan.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-bold ${isPopular ? "text-white" : "text-gray-900"}`}
          >
            ${price}
          </span>
          <span
            className={`text-sm ${isPopular ? "text-orange-100" : "text-gray-500"}`}
          >
            /{billingCycle === "monthly" ? "mo" : "year"}
          </span>
        </div>
        <p
          className={`text-xs mt-1 ${isPopular ? "text-orange-100" : "text-gray-500"}`}
        >
          Billed {billingCycle === "monthly" ? "monthly" : "annually"}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-5 mb-6 flex-1">
        {plan.features.map((category, idx) => (
          <div key={idx}>
            <h4
              className={`text-sm font-semibold mb-3 ${isPopular ? "text-white" : "text-gray-900"}`}
            >
              {category.category}
            </h4>
            <ul className="space-y-2">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <Check
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      isPopular ? "text-white" : "text-orange-500"
                    }`}
                  />
                  <span
                    className={`text-sm ${isPopular ? "text-orange-50" : "text-gray-600"}`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onSelect(plan.id)}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
          isPopular
            ? "bg-white text-orange-600 hover:bg-orange-50 shadow-md"
            : "bg-gray-100 text-gray-900 hover:bg-orange-500 hover:text-white"
        }`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
