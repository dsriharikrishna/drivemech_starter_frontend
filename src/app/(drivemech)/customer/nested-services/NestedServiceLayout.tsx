'use client';

/**
 * NestedServicesLayout Component
 * 
 * This component demonstrates advanced Redux integration for nested/hierarchical services:
 * 1. serviceSlice - Managing parent and nested service selections
 * 2. cartSlice - Displaying vehicle information
 * 
 * Redux Slices Used:
 * - service: Tracks nested service selections, maintains parent-child relationships
 * - car: Displays current vehicle in cart sidebar
 * 
 * Key Features:
 * - Hierarchical service selection (parent -> nested)
 * - Automatic parent service selection when nested service is selected
 * - Separate search for nested services
 * - Maintains service relationships in Redux state
 */

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
  const parentService = services.find(s => s.id === serviceId);

  // Convert nested services to Service format for ServiceCard component
  // This allows us to reuse the same ServiceCard component
  const nestedServicesAsServiceCards = parentService?.nestedServices?.map(ns => ({
    id: ns.id,
    name: ns.name,
    icon: parentService.icon,
    hasNested: false,
    description: ns.description,
    price: ns.price
  })) || [];

  // Filter nested services based on search query from Redux
  const filteredNestedServices = nestedServicesAsServiceCards.filter(ns =>
    ns.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ns.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ============================================================
  // EVENT HANDLERS
  // ============================================================

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
   * This action:
   * 1. Adds/removes the nested service from selectedNestedServices
   * 2. Automatically adds parent service to selectedServices if not present
   * 3. Removes parent service if no nested services remain selected
   * 4. Updates nestedServiceParent to track the current parent
   * 
   * @param nestedServiceId - ID of the nested service to toggle
   */
  const handleToggleNestedService = (nestedServiceId: string) => {
    if (parentService) {
      dispatch(toggleNestedService({
        serviceId: parentService.id,
        nestedServiceId
      }));
    }
  };

  /**
   * Update nested service search query in Redux
   * 
   * Redux Action: setNestedSearchQuery(query)
   * 
   * @param value - Search query string
   */
  const handleSearchChange = (value: string) => {
    dispatch(setNestedSearchQuery(value));
  };

  // ============================================================
  // ERROR HANDLING
  // ============================================================

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
            {/* 
              ServiceHeader Component
              - Same as parent service page
              - Shows vehicle info and allows searching
            */}
            <ServiceHeader />

            {/* Service Category Tag */}
            <div className="mb-4 flex flex-col gap-1">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {parentService.name} repairs, Installations & Inspections
              </div>
            </div>

            {/* Add More Services Button (Top) */}
            <div className="flex justify-end mt-2">
              <Button
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl font-medium text-base transition-colors duration-200 
                         bg-orange-500 text-white cursor"
              >
                Add More Services
              </Button>
            </div>

            {/* 
              Nested Service Search Bar
              - Uses Redux state (service.nestedSearchQuery)
              - Dispatches setNestedSearchQuery() on change
              - Separate from main service search
            */}
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

            {/* 
              Nested Services Grid
              - Displays filtered nested services
              - Each card can be toggled
              - Uses: dispatch(toggleNestedService({serviceId, nestedServiceId}))
              - Updates: service.selectedNestedServices array
              - Automatically manages parent service selection
            */}
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

            {/* Additional Notes for Nested Services */}
            <div className='bg-white p-4 rounded-2xl'>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Can't find your service? Let us know!
              </label>
              {/* 
                TODO: Sync with Redux
                Add onChange to dispatch action for nested service notes
              */}
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
            {/* 
              CartSidebar Component
              - Shows all selected services (parent + nested)
              - Displays vehicle information
              - Allows removing services
              - Shows total count
            */}
            <CartSidebar
              services={services}
            />
          </RightLayout>
        </div>
      </main>
    </FormProvider>
  );
}

/* 
=============================================================================
NESTED SERVICE REDUX INTEGRATION GUIDE
=============================================================================

HIERARCHICAL SERVICE SELECTION:
-------------------------------
When a nested service is selected:
1. The nested service ID is added to selectedNestedServices[]
2. The parent service ID is automatically added to selectedServices[]
3. The nestedServiceParent is set to the parent service ID

When a nested service is deselected:
1. The nested service ID is removed from selectedNestedServices[]
2. If no other nested services remain for that parent, parent is removed
3. nestedServiceParent is updated accordingly

Example Flow:
-------------
User selects "AC Repair" (parent service)
→ selectedServices: ['ac']

User navigates to AC nested services
User selects "AC Gas Refill" (nested service)
→ selectedServices: ['ac']  // Already selected
→ selectedNestedServices: ['ac-1']
→ nestedServiceParent: 'ac'

User selects "AC Filter Replacement"
→ selectedServices: ['ac']
→ selectedNestedServices: ['ac-1', 'ac-2']
→ nestedServiceParent: 'ac'

User deselects "AC Gas Refill"
→ selectedServices: ['ac']  // Still has ac-2
→ selectedNestedServices: ['ac-2']
→ nestedServiceParent: 'ac'

User deselects "AC Filter Replacement"
→ selectedServices: []  // No nested services left
→ selectedNestedServices: []
→ nestedServiceParent: null

=============================================================================

REDUX ACTIONS FOR NESTED SERVICES:
-----------------------------------

1. toggleNestedService({serviceId, nestedServiceId})
   - Toggles nested service selection
   - Manages parent service automatically
   - Updates nestedServiceParent

2. setNestedSearchQuery(query)
   - Updates search for nested services only
   - Separate from main service search

3. clearServices()
   - Clears both parent and nested selections
   - Resets nestedServiceParent to null

=============================================================================

CART SIDEBAR INTEGRATION:
-------------------------
The CartSidebar component displays:
- All selected parent services
- All selected nested services (grouped under parent)
- Current vehicle information
- Total service count
- Remove buttons for each service

It reads from:
- service.selectedServices (parent services)
- service.selectedNestedServices (nested services)
- car.currentVehicle (vehicle info)

=============================================================================
*/
