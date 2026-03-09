"use client";

import React from "react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    icon: string; // Changed from React.ReactNode to string
    description: string;
    features: string[];
  };
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
}

export default function SelectServiceCard({
  service,
  isSelected,
  onToggle,
}: ServiceCardProps) {
  return (
    <div
      onClick={() => onToggle(service.id)}
      className={`
        relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200
        ${
          isSelected
            ? "border-orange-500 bg-orange-50 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        }
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Icon */}
      <div className="mb-4">
        <img
          src={service.icon}
          alt={service.title}
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className={`text-xl font-bold mb-2 ${isSelected ? "text-orange-600" : "text-gray-900"}`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{service.description}</p>

      {/* Features List */}
      <ul className="space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span
              className={`mr-2 ${isSelected ? "text-orange-500" : "text-gray-400"}`}
            >
              •
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
