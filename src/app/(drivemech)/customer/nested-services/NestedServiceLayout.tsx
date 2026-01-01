'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceCard from '@/components/customer/service-section/ServiceCard';
import CartSidebar from '@/components/customer/cart/CartSidebar';
import { services } from '../../../../data/services';
import { FormProvider, useForm } from 'react-hook-form';
import LeftLayout from '../../../../components/Layout/LeftLayout';
import RightLayout from '../../../../components/Layout/RightLayout';
import { toggleNestedService, setNestedSearchQuery } from '@/store/slices/services/serviceSlice';
import CommonTextArea from '@/components/forms/CommonTextArea';
import Button from '@/components/ui/Button';
import ScrollableTabs from '@/components/ui/ScrollableTabs';
import ServiceDetailCard from '@/components/customer/nested-services/ServiceDetailCard';

export default function NestedServicesLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // Get parent service ID from URL query params
  const serviceId = searchParams.get('service');

  const methods = useForm({
    defaultValues: {
      selectedServices: [],
      searchQuery: '',
      nestedAddtionalServiceNotes: ''
    }
  });

  // Track which nested service tab is active for filtering
  const [activeNestedTab, setActiveNestedTab] = React.useState<string>('');

  // ============================================================
  // REDUX STATE - Service Slice (Nested Services)
  // ============================================================

  // Reading nested service selections from Redux
  // This array contains IDs of all selected nested services
  // Example: ['ac-1', 'ac-2', 'battery-1']
  const selectedNestedServices = useAppSelector(state => state.service.selectedNestedServices);

  // Reading nested service search query from Redux
  // This is separate from the main service search query
  const searchQuery = useAppSelector(state => state.service.nestedSearchQuery);

  // Reading parent service info (optional, for reference)
  // const nestedServiceParent = useAppSelector(state => state.service.nestedServiceParent);

  // ============================================================
  // REDUX STATE - Cart Slice (Used in CartSidebar)
  // ============================================================
  // Vehicle information is displayed in CartSidebar
  // const currentVehicle = useAppSelector(state => state.car.currentVehicle);

  // ============================================================
  // SERVICE DATA PROCESSING
  // ============================================================

  // Find the parent service from the services data
  // Use activeNestedTab if set, otherwise use serviceId from URL
  const activeServiceId = activeNestedTab || serviceId || services?.[0]?.id;
  const parentService = services.find(s => s.id === activeServiceId);

  // Convert nested services to Service format for ServiceDetailCard component
  const nestedServicesAsServiceCards = parentService?.nestedServices?.map(ns => ({
    id: ns.id,
    name: ns.name,
    icon: parentService.icon,
    hasNested: false,
    description: ns.description,
    price: ns.price,
    badges: [
      { icon: '/svgs/nested-services/clock-icon.svg', label: 'Duration', value: 'Takes 4 hours' },
      { icon: '/svgs/nested-services/warranty-icon.svg', label: 'Warranty', value: '500 KMS or 1 Month' },
      { icon: '/svgs/nested-services/timer-icon.svg', label: 'Updates', value: 'Timely Updates' },
      { icon: '/svgs/nested-services/verified-icon.svg', label: 'Experts', value: 'Verified Experts' }
    ],
    features: [
      { id: '1', name: 'AC gas check', included: true },
      { id: '2', name: 'AC gas refilling', included: true },
      { id: '3', name: 'Condenser Cleaning', included: true },
      { id: '4', name: 'AC filter cleaning', included: true },
    ],
    includedServices: [
      'AC gas check',
      'AC filter cleaning',
      'AC vent sanitization',
      'AC gas refilling (up to standard capacity)',
      'Evaporator inspection',
      'Refrigerant leak check',
      'Condenser cleaning',
      'Cooling performance test',
      'Refrigerant leak check'
    ],
    notIncludedServices: [
      'AC compressor replacement',
      'AC condenser replacement',
      'Blower motor replacement',
      'Evaporator core replacement',
      'AC hose replacement',
      'Expansion valve replacement'
    ],
    totalFeatures: 15
  })) || [];

  // Filter nested services based on search query from Redux
  const filteredNestedServices = nestedServicesAsServiceCards.filter(ns =>
    ns.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ns.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Navigate back to main services page
   * Selected nested services are preserved in Redux
   */
  const handleBack = () => {
    router.back();
  };

  /**
   * Toggle nested service selection
   * 
   * Redux Action: toggleNestedService({serviceId, nestedServiceId})
   * 

  /**
   * Add service to cart
   * 
   * @param serviceId - ID of the service to add to cart
   */
  const handleAddToCart = (serviceId: string) => {
    if (parentService) {
      dispatch(toggleNestedService({
        serviceId: parentService.id,
        nestedServiceId: serviceId
      }));
    }
  };

  // If parent service not found, show error state
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

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <FormProvider {...methods}>
      <main className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <LeftLayout>

            <ServiceHeader />

            <ScrollableTabs
              tabs={services?.map(ns => ({
                id: ns.id,
                label: ns.name,
                icon: ns.icon
              })) || []}
              activeTab={activeServiceId}
              onTabChange={(tabId) => {
                setActiveNestedTab(tabId);
              }}
              variant="default"
              className="mb-4 w-full"
            />

            {filteredNestedServices.map((nestedService) => (
              <ServiceDetailCard
                key={nestedService.id}
                id={nestedService.id}
                title={nestedService.name}
                image={nestedService.icon}
                badges={nestedService.badges}
                features={nestedService.features}
                price={nestedService.price}
                totalFeatures={nestedService.totalFeatures}
                includedServices={nestedService.includedServices}
                notIncludedServices={nestedService.notIncludedServices}
                onAddToCart={handleAddToCart}
              />

            ))}


            {/* Additional Notes for Nested Services */}
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

            {/* Add More Services Button (Bottom) */}
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
      </main >
    </FormProvider >
  );
}
