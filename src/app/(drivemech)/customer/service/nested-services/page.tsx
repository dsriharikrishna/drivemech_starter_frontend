'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceCard from '@/components/customer/service-section/ServiceCard';
import CartSidebar from '@/components/customer/service-section/CartSidebar';
import { services } from '@/components/data/services';
import { FormProvider, useForm } from 'react-hook-form';
import LeftLayout from '../LeftLayout';
import RightLayout from '../RightLayout';
import { RootState } from '@/store/store';
import { toggleNestedService, setNestedSearchQuery } from '@/store/slicers/serviceSlicer';

export default function NestedServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const serviceId = searchParams.get('service');
  
  const methods = useForm({
    defaultValues: {
      selectedServices: [],
      searchQuery: ''
    }
  });

  // Use Redux state instead of local state
  const selectedNestedServices = useSelector((state: RootState) => state.service.selectedNestedServices);
  const searchQuery = useSelector((state: RootState) => state.service.nestedSearchQuery);

  // Find the parent service
  const parentService = services.find(s => s.id === serviceId);
  
  // Convert nested services to Service format for ServiceCard component
  const nestedServicesAsServiceCards = parentService?.nestedServices?.map(ns => ({
    id: ns.id,
    name: ns.name,
    icon: parentService.icon,
    hasNested: false,
    description: ns.description,
    price: ns.price
  })) || [];

  // Filter nested services based on search
  const filteredNestedServices = nestedServicesAsServiceCards.filter(ns =>
    ns.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ns.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    router.back();
  };

  const handleToggleNestedService = (nestedServiceId: string) => {
    // Dispatch Redux action instead of local state
    if (parentService) {
      dispatch(toggleNestedService({ 
        serviceId: parentService.id, 
        nestedServiceId 
      }));
    }
  };

  const handleSearchChange = (value: string) => {
    dispatch(setNestedSearchQuery(value));
  };

  if (!parentService) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <button
            onClick={handleBack}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <main className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <LeftLayout>
            {/* Header - Same as parent */}
            <ServiceHeader />

            {/* Service Category Tag */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {parentService.name} repairs, Installations & Inspections
              </div>
            </div>

            {/* Search Bar - Use Redux state */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search nested services..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none 
                         focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 
                         placeholder-gray-400"
              />
            </div>

            {/* Services Grid - Use same ServiceCard component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNestedServices.map((nestedService) => (
                <ServiceCard 
                  key={nestedService.id} 
                  service={nestedService}
                  onToggle={() => handleToggleNestedService(nestedService.id)}
                  isSelected={selectedNestedServices.includes(nestedService.id)}
                />
              ))}
            </div>

            {/* Can't find / textarea */}
            <section className="mt-6">
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

            {/* Add More Services Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleBack}
                className="px-8 py-3.5 rounded-xl font-medium text-base transition-colors duration-200 
                         bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Add More Services
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