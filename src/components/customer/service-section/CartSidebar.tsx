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
  const selectedList = selectedServices
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean) as Service[];

  return (
    <aside className={`w-full bg-gray-50 ${className}`}>
      <div className="space-y-4">

        {/* Vehicle Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[13px] font-medium text-gray-900">
              {vehicleInfo.registration}
            </span>

            <button
              type="button"
              onClick={onChangeVehicle}
              className="text-[11px] text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition"
            >
              Change
            </button>
          </div>

          <div className="flex justify-center mb-3">
            <div className="h-20 w-auto flex items-center justify-center">
              <span className="text-5xl">🚗</span>
            </div>
          </div>

          <h3 className="text-center font-semibold text-gray-900 text-sm">
            {vehicleInfo.make} {vehicleInfo.model}
          </h3>

          <p className="text-center text-xs text-gray-500 mt-1 leading-4">
            {vehicleInfo.year} {vehicleInfo.fuelType} {vehicleInfo.engine}{' '}
            {vehicleInfo.transmission} {vehicleInfo.drive}
          </p>
        </div>

        {/* Cart Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-gray-700" />
              </div>
              <span className="text-[15px] font-medium text-gray-900">
                Your Cart
              </span>
            </div>

            <span className="text-xs text-gray-500">
              ({selectedServices.length} items)
            </span>
          </div>

          {/* Empty cart state */}
          {selectedList.length === 0 ? (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-10 text-center">
              <p className="text-gray-700 text-sm font-medium mb-2">
                Your cart is empty.
              </p>
              <p className="text-gray-500 text-xs leading-5">
                Please add an service item to get a quote
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedList.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{service.icon}</div>
                    <span className="font-medium text-gray-900 text-sm">
                      {service.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleService(service.id)}
                    className="text-red-500 hover:text-red-600 text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
