'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceList from '@/components/customer/service-section/ServiceList';
import CartSidebar from '@/components/customer/service-section/CartSidebar';
import { services } from '@/components/data/services';
import { FormProvider, useForm } from 'react-hook-form';
import { RootState } from '@/store/store';

export default function ServicePage() {
  const methods = useForm({
    defaultValues: {
      selectedServices: [],
      searchQuery: ''
    }
  });

  // Use Redux state instead of local state
  const selectedServices = useSelector((state: RootState) => state.service.selectedServices);
  const searchQuery = useSelector((state: RootState) => state.service.searchQuery);

  // Filter services based on search query
  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FormProvider {...methods}>
      <main className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <LeftLayout>
            {/* Header */}
            <ServiceHeader />

            {/* Services Grid */}
            <ServiceList
              services={filteredServices}
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
                className={`px-8 py-3.5 rounded-xl font-medium text-base transition-colors duration-200 ${
                  selectedServices.length > 0
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
              services={services}
            />
          </RightLayout>
        </div>
      </main>
    </FormProvider>
  );
}