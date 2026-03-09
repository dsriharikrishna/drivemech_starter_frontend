"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Disc3,
  Wrench,
  Settings,
} from "lucide-react";

import { servicesData, Service, SubService } from "./workshopData";

interface ServiceSelectorProps {
  selectedServices: string[];
  selectedSubServices: string[];
  onServiceToggle: (serviceId: string) => void;
  onSubServiceToggle: (subServiceId: string) => void;
  onSelectAll: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedServices,
  selectedSubServices,
  onServiceToggle,
  onSubServiceToggle,
  onSelectAll,
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services = servicesData;

  const handleServiceClick = (service: Service) => {
    if (service.hasSubServices) {
      setExpandedService(service.id);
    } else {
      onServiceToggle(service.id);
    }
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.includes(serviceId);
  };

  const isSubServiceSelected = (subServiceId: string) => {
    return selectedSubServices.includes(subServiceId);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {expandedService ? (
            <>
              <button
                type="button"
                onClick={() => setExpandedService(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronRight size={20} className="rotate-180" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="h-4 w-px bg-gray-300 mx-2" />
            </>
          ) : (
            <Wrench size={20} className="text-gray-600" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {expandedService
                ? `Sub Services for ${services.find((s) => s.id === expandedService)?.name}`
                : "Select services you provide"}
            </p>
            <p className="text-xs text-gray-500">
              Choose the services your workshop provides
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSelectAll}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium border border-orange-600 px-2 py-1 rounded cursor-pointer"
        >
          Select All
        </button>
      </div>

      {/* Services Grid - Conditional rendering */}
      {!expandedService ? (
        /* Main Services Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceClick(service)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                isServiceSelected(service.id)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`${isServiceSelected(service.id) ? "text-orange-500" : "text-gray-600"}`}
                >
                  {service.icon}
                </div>
                <span
                  className={`text-sm font-medium ${isServiceSelected(service.id) ? "text-gray-900" : "text-gray-700"}`}
                >
                  {service.name}
                </span>
              </div>
              {service.hasSubServices && (
                <div className="text-gray-400">
                  <ChevronRight size={18} />
                </div>
              )}
              {!service.hasSubServices && isServiceSelected(service.id) && (
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        /* Sub-Services Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services
            .find((s) => s.id === expandedService)
            ?.subServices?.map((subService) => (
              <button
                key={subService.id}
                type="button"
                onClick={() => onSubServiceToggle(subService.id)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isSubServiceSelected(subService.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${
                      isSubServiceSelected(subService.id)
                        ? "text-blue-500"
                        : "text-gray-600"
                    }`}
                  >
                    <Settings size={20} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isSubServiceSelected(subService.id)
                        ? "text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {subService.name}
                  </span>
                </div>
                {isSubServiceSelected(subService.id) && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
