'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Service } from '../../../data/services';
import { ShoppingCart } from 'lucide-react';
import { RootState } from '@/store/store';
import { toggleService } from '@/store/slices/services/serviceSlice';
import { setCurrentVehicle } from '@/store/slices/cart/cartSlice';
import CarCard from '@/components/landing-page/CarCard';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function CartSidebar({ services }: { services: Service[] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedServices = useSelector((state: RootState) => state.service.selectedServices);
  const selectedNestedServices = useSelector((state: RootState) => state.service.selectedNestedServices);
  const currentVehicle = useSelector((state: RootState) => state.car.currentVehicle);

  const selectedList = selectedServices
    .map((id: string) => services.find((s: Service) => s.id === id))
    .filter((service): service is Service => service !== undefined);

  // Get nested service names for display
  const getNestedServiceNames = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service?.nestedServices) return [];

    return service.nestedServices
      .filter(ns => selectedNestedServices.includes(ns.id))
      .map(ns => ns.name);
  };

  const handleChangeVehicle = () => {
    // In a real app, this would open a vehicle selection modal
    // For now, we'll just show a placeholder action
  };

  return (
    <aside className="w-full lg:w-[330px] space-y-4">

      {/* Vehicle Card */}
      <CarCard
        vehicle={currentVehicle}
        onChange={handleChangeVehicle}
      />

      {/* Cart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Your Cart</span>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {selectedServices.length} items
          </span>
        </div>

        {selectedList.length === 0 ? (
          <div className="bg-gray-50 p-10 rounded-xl text-center border border-gray-200">
            <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-700">Your cart is empty.</p>
            <p className="text-xs text-gray-500 mt-1">Please add a service item to get a quote.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedList.map((s) => {
              const nestedServiceNames = getNestedServiceNames(s.id);
              return (
                <div key={s.id} className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        <div className="text-xl">{s.icon}</div>
                      </div>
                      <div>
                        <span className="font-medium text-sm text-gray-900">{s.name}</span>
                        {nestedServiceNames.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {nestedServiceNames.length} service{nestedServiceNames.length > 1 ? 's' : ''} selected
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(toggleService(s.id))}
                      className="text-red-500 hover:text-red-600 text-xs font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  {nestedServiceNames.length > 0 && (
                    <div className="ml-4 space-y-1">
                      {nestedServiceNames.map((name, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Services Together */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <span className="font-medium text-gray-900">Recommended Services Together</span>
          </div>
        </div>
        <div className="space-y-3">
          {selectedList.length > 0 ? (
            // Show services that complement selected services
            services
              .filter(service => !selectedServices.includes(service.id))
              .slice(0, 3)
              .map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                      <div className="text-lg">{service.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                  </div>
                  <button
                    onClick={() => dispatch(toggleService(service.id))}
                    className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    + Add to Cart
                  </button>
                </div>
              ))
          ) : (
            // Show popular services when nothing is selected
            services
              .filter(service => service.isPopular)
              .slice(0, 3)
              .map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                      <div className="text-lg">{service.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                  </div>
                  <button
                    onClick={() => dispatch(toggleService(service.id))}
                    className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    + Add to Cart
                  </button>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Next Button */}
      {selectedList.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <Button onClick={() => router.push("/customer/workshop")} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
            Next
          </Button>
        </div>
      )}

    </aside>
  );
}
