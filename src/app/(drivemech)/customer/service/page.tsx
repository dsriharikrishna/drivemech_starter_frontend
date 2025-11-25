'use client';

import React, { useState } from 'react';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceList from '@/components/customer/service-section/ServiceList';
import CartSidebar from '@/components/customer/service-section/CartSidebar';
import { services } from '@/components/data/services';
import { VehicleInfo } from '@/components/customer/service-section/CartSidebar';

export default function ServicePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const vehicleInfo: VehicleInfo = {
    registration: 'ABC 1234 D',
    make: 'Toyota',
    model: 'Hilux',
    year: 2021,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '2.5 Liters',
    drive: 'Hybrid AWD-i'
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <LeftLayout>
          {/* Header */}
          <ServiceHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Services Grid */}
          <ServiceList
            services={filteredServices}
            selectedServices={selectedServices}
            onToggle={toggleService}
          />

          {/* Can't find / textarea */}
          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Can't find what you are looking for?
            </h3>

            <textarea
              placeholder="Describe your issue"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none 
                               focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[120px]
                               text-gray-700 placeholder-gray-400 resize-none"
            />
          </section>

          {/* Next */}
          <div className="flex justify-end">
            <button
              disabled={selectedServices.length === 0}
              className={`px-8 py-3.5 rounded-xl font-medium text-base transition-colors duration-200 ${selectedServices.length > 0
                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        </LeftLayout>

      <RightLayout>
        <CartSidebar
          vehicleInfo={vehicleInfo}
          services={services}
          selectedServices={selectedServices}
          onToggleService={toggleService}
        />
      </RightLayout>
      </div>
    </main >
  );
}