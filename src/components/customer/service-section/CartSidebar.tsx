'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Service } from '@/components/data/services';
import { ShoppingCart } from 'lucide-react';
import { RootState } from '@/store/store';
import { toggleService } from '@/store/slicers/serviceSlicer';

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

export default function CartSidebar({ vehicleInfo, services }: { vehicleInfo: VehicleInfo; services: Service[] }) {
  const dispatch = useDispatch();
  const selectedServices = useSelector((state: RootState) => state.service.selectedServices);

  const selectedList = selectedServices
    .map((id: string) => services.find((s: Service) => s.id === id))
    .filter((service): service is Service => service !== undefined);

  return (
    <aside className="w-full lg:w-[330px] sticky top-4 space-y-4">

      {/* Vehicle Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        {/* same UI */}
      </div>

      {/* Cart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Your Cart</span>
          <span className="text-sm text-gray-500">({selectedServices.length} items)</span>
        </div>

        {selectedList.length === 0 ? (
          <div className="bg-gray-50 p-10 rounded-xl text-center border">
            <p className="font-medium text-gray-700">Your cart is empty.</p>
            <p className="text-xs text-gray-500 mt-1">Please add a service item to get a quote.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedList.map((s) => (
              <div key={s.id} className="flex justify-between bg-gray-50 p-3 rounded-xl border">
                <div className="flex items-center gap-2">
                  <div className="text-xl">{s.icon}</div>
                  <span className="font-medium text-sm">{s.name}</span>
                </div>

                <button
                  onClick={() => dispatch(toggleService(s.id))}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </aside>
  );
}
