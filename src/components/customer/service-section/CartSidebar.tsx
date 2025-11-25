// components/customer/service-section/CartSidebar.tsx
'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Service } from '@/components/data/services';

export interface VehicleInfo {
  registration: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  engine: string;
  drive: string;
}

interface Props {
  vehicleInfo: VehicleInfo;
  services: Service[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onChangeVehicle?: () => void;
  className?: string;
}

export default function CartSidebar({
  vehicleInfo,
  services,
  selectedServices,
  onToggleService,
  onChangeVehicle,
  className = '',
}: Props) {
  const selectedDetails = selectedServices
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean) as Service[];

  return (
    <aside className={`w-full ${className}`}>
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100 lg:sticky lg:top-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{vehicleInfo.registration}</h2>
            <button
              type="button"
              onClick={onChangeVehicle}
              className="text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
            >
              Change
            </button>
          </div>

          <div className="relative h-32 bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <span className="text-4xl" aria-hidden>
                🚗
              </span>
            </div>
          </div>

          <h3 className="font-medium">{vehicleInfo.make} {vehicleInfo.model}</h3>
          <p className="text-sm text-gray-500">
            {vehicleInfo.year} • {vehicleInfo.fuelType} • {vehicleInfo.transmission}
          </p>
          <p className="text-sm text-gray-500">
            {vehicleInfo.engine} • {vehicleInfo.drive}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Your Cart ({selectedServices.length})</h3>
          </div>

          {selectedDetails.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-4 md:p-6 text-center">
              <p className="text-gray-500 text-sm">
                Your cart is empty. Please add a service to get a quote.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDetails.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl" aria-hidden>
                      {service.icon}
                    </div>
                    <span className="font-medium text-gray-900">{service.name}</span>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-100"
                    onClick={() => onToggleService(service.id)}
                    aria-label={`Remove ${service.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* optional summary row */}
              {selectedDetails.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span className="font-medium">Estimated Total</span>
                    <span className="font-semibold">—</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
