'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceCard from '@/components/customer/service-section/ServiceCard';
import CartSidebar from '@/components/customer/cart/CartSidebar';
import { services } from '../../../../data/services';
import { FormProvider, useForm } from 'react-hook-form';
import LeftLayout from '../../../../components/Layout/LeftLayout';
import RightLayout from '../../../../components/Layout/RightLayout';
import { RootState } from '@/store/store';
import { toggleNestedService, setNestedSearchQuery } from '@/store/slicers/serviceSlicer';
import CommonTextArea from '@/components/forms/CommonTextArea';
import Button from '@/components/ui/Button';

export default function NestedServicesLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const serviceId = searchParams.get('service');

  const methods = useForm({
    defaultValues: {
      selectedServices: [],
      searchQuery: '',
      nestedAddtionalServiceNotes: ''
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
          <Button
            onClick={handleBack}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Go Back
          </Button>
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
            <div className="mb-4 flex flex-col gap-1">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {parentService.name} repairs, Installations & Inspections
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <Button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl font-medium text-base transition-colors duration-200 
                         bg-orange-500 text-white cursor"
              >
                Add More Services
              </Button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-2 rounded-2xl">
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
            <div className='bg-white p-4 rounded-2xl'>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Can't find your service? Let us know!
              </label>
              <CommonTextArea
                label=""
                name='nestedAddtionalServiceNotes'
                placeholder="Can't find your service? Let us know!"
                className="w-full"
                rows={4}

              />
            </div>

            {/* Add More Services Button */}
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl font-medium text-base transition-colors duration-200 
                         bg-orange-500 text-white cursor"
              >
                Add More Services
              </Button>
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