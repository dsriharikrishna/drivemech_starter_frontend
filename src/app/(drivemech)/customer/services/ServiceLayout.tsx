"use client"
import CartSidebar from '@/components/customer/cart/CartSidebar';
import ServiceHeader from '@/components/customer/service-section/ServiceHeader';
import ServiceList from '@/components/customer/service-section/ServiceList';
import LeftLayout from '@/components/Layout/LeftLayout';
import RightLayout from '@/components/Layout/RightLayout';
import { useAppSelector } from '@/store/store';
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

    const selectedServices = useAppSelector(state => state.service.selectedServices);
    const searchQuery = useAppSelector(state => state.service.searchQuery);

    // Filter services based on search query
    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <FormProvider {...methods}>
            <main className="max-w-7xl mx-auto p-4 md:p-6 ">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <LeftLayout>
                        {/* Header */}
                        <ServiceHeader />

                        {/* Services Grid */}
                        <ServiceList
                            services={filteredServices}
                        />

                        {/* Can't find / textarea */}
                        <div className='bg-white p-4 rounded-2xl'>
                            <label className="block text-sm font-bold text-gray-800 mb-2">
                                Can't find your service? Let us know!
                            </label>
                            <CommonTextArea
                                label=""
                                name='addtionalNotes'
                                placeholder="Can't find your service? Let us know!"
                                className="w-full"
                                rows={4}

                            />
                        </div>

                        {/* Next */}
                        <div className="flex justify-end">
                            <Button
                                onClick={()=>router.push("/customer/workshop")}
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
                        <CartSidebar
                            services={filteredServices}
                        />
                    </RightLayout>
                </div>
            </main>
        </FormProvider>

    )
}
