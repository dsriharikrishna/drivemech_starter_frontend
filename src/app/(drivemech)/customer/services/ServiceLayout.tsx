"use client"

/**
 * ServiceLayout Component
 * 
 * This component demonstrates the integration of:
 * 1. serviceSlice - For managing selected services and search
 * 2. cartSlice - For managing vehicle information
 * 
 * Redux Slices Used:
 * - service: Tracks selected services, search queries, and additional notes
 * - car: Displays current vehicle information in the cart sidebar
 */

import CartSidebar from '@/components/customer/cart/CartSidebar';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceList from '@/components/customer/service-section/ServiceList';
import LeftLayout from '@/components/Layout/LeftLayout';
import RightLayout from '@/components/Layout/RightLayout';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { services } from '../../../../data/services';
import { FormProvider, useForm } from 'react-hook-form';
import CommonTextArea from '@/components/forms/CommonTextArea';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export const ServicesLayout = () => {

    const methods = useForm({
        defaultValues: {
            selectedServices: [],
            searchQuery: '',
            addtionalNotes: ''
        }
    });

    const router = useRouter();
    const dispatch = useAppDispatch();

    // ============================================================
    // REDUX STATE - Service Slice
    // ============================================================
    // Reading selected services from Redux store
    // This state is managed by serviceSlice and persists across navigation
    const selectedServices = useAppSelector(state => state.service.selectedServices);

    // Reading search query from Redux store
    // Updated when user types in search box (handled in ServiceHeader component)
    const searchQuery = useAppSelector(state => state.service.searchQuery);

    // ============================================================
    // REDUX STATE - Cart Slice (Used in CartSidebar)
    // ============================================================
    // Current vehicle information is read from cart slice in CartSidebar component
    // Example: const currentVehicle = useAppSelector(state => state.car.currentVehicle);
    // This displays vehicle details like registration, make, model, etc.

    // ============================================================
    // SERVICE FILTERING
    // ============================================================
    // Filter services based on search query from Redux
    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ============================================================
    // NAVIGATION HANDLER
    // ============================================================
    // Navigate to workshop selection when user clicks Next
    // Selected services are already in Redux, so they persist
    const handleNext = () => {
        router.push("/customer/workshop");
    };

    return (
        <FormProvider {...methods}>
            <main className="max-w-7xl mx-auto p-4 md:p-6 ">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <LeftLayout>
                        {/* 
                            ServiceHeader Component
                            - Displays vehicle info from cart slice
                            - Provides search input that updates service.searchQuery
                            - Uses: useAppDispatch() to dispatch setSearchQuery()
                        */}
                        <ServiceHeader />

                        {/* 
                            ServiceList Component
                            - Displays filtered services
                            - Each service card can be toggled
                            - Uses: dispatch(toggleService(serviceId))
                            - Updates: service.selectedServices array
                        */}
                        <ServiceList
                            services={filteredServices}
                        />

                        {/* Additional Notes Section */}
                        <div className='bg-white p-4 rounded-2xl'>
                            <label className="block text-sm font-bold text-gray-800 mb-2">
                                Can't find your service? Let us know!
                            </label>
                            {/* 
                                This textarea value should be synced with Redux
                                TODO: Add onChange handler to dispatch action
                                Example: dispatch(setAdditionalNotes(value))
                            */}
                            <CommonTextArea
                                label=""
                                name='addtionalNotes'
                                placeholder="Can't find your service? Let us know!"
                                className="w-full"
                                rows={4}
                            />
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end">
                            {/* 
                                Button is disabled when no services selected
                                selectedServices comes from Redux service slice
                            */}
                            <Button
                                onClick={handleNext}
                                disabled={selectedServices.length === 0}
                                className={`px-8 py-3.5 rounded-xl font-medium text-base transition-colors duration-200 ${selectedServices.length > 0
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </Button>
                        </div>
                    </LeftLayout>

                    <RightLayout>
                        {/* 
                            CartSidebar Component
                            - Displays selected services from service.selectedServices
                            - Displays vehicle info from car.currentVehicle
                            - Allows changing vehicle (dispatches setCurrentVehicle)
                            - Shows total count and allows removing services
                        */}
                        <CartSidebar
                            services={filteredServices}
                        />
                    </RightLayout>
                </div>
            </main>
        </FormProvider>

    )
}

/* 
=============================================================================
REDUX SLICE USAGE SUMMARY
=============================================================================

SERVICE SLICE (service):
------------------------
State Structure:
{
  selectedServices: string[],          // Array of selected service IDs
  selectedNestedServices: string[],    // Array of selected nested service IDs
  searchQuery: string,                 // Search query for filtering
  nestedServiceParent: string | null,  // Parent service for nested view
  nestedSearchQuery: string,           // Search query for nested services
  addtionalNotes: string,              // Additional notes from user
  nestedAddtionalServiceNotes: string  // Notes for nested services
}

Actions Available:
- toggleService(serviceId: string)                    // Add/remove service
- toggleNestedService({serviceId, nestedServiceId})   // Add/remove nested service
- setSearchQuery(query: string)                       // Update search
- setNestedSearchQuery(query: string)                 // Update nested search
- clearServices()                                     // Clear all selections
- setNestedServiceParent(serviceId: string | null)    // Set parent for nested view

Usage Example:
const dispatch = useAppDispatch();
dispatch(toggleService('service-1'));  // Toggle service selection

=============================================================================

CART SLICE (car):
-----------------
State Structure:
{
  currentVehicle: {
    registration: string,
    make: string,
    model: string,
    year: number,
    fuelType: string,
    transmission: string,
    engine: string,
    drive: string
  },
  savedVehicles: VehicleInfo[]  // Array of saved vehicles
}

Actions Available:
- setCurrentVehicle(vehicle: VehicleInfo)              // Set active vehicle
- updateVehicleField({field, value})                   // Update single field
- addSavedVehicle(vehicle: VehicleInfo)                // Save vehicle
- removeSavedVehicle(registration: string)             // Remove saved vehicle
- clearCurrentVehicle()                                // Reset to default

Usage Example:
const dispatch = useAppDispatch();
const vehicle = useAppSelector(state => state.car.currentVehicle);
dispatch(setCurrentVehicle(newVehicle));  // Change vehicle

=============================================================================
*/

