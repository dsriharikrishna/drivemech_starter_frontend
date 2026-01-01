'use client';

import React from 'react';
import CheckoutTabs from '@/components/spare-parts/checkout/CheckoutTabs';
import AddressForm from '@/components/spare-parts/checkout/AddressForm';
import ReviewStep from '@/components/spare-parts/checkout/ReviewStep';
import { PaymentStep } from '@/components/spare-parts/checkout/PaymentStep';
import OrderSummary from '@/components/spare-parts/checkout/OrderSummary';
import LeftLayout from '@/components/Layout/LeftLayout';
import RightLayout from '@/components/Layout/RightLayout';
import { AddressFormData } from '@/schemas/checkout.schema';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { setCurrentStep, setAddressData, goToNextStep, completeStep } from '@/store/slices/spare-parts/sparePartsCheckoutSlice';
import { useRouter } from 'next/navigation';

const CheckOutLayout = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { currentStep, completedSteps, addressData, subtotal, shipping, tax, cartItems } = useAppSelector(
        state => state.sparePartsCheckout
    );

    const handleAddressSubmit = (data: AddressFormData) => {
        console.log('Address submitted:', data);
        dispatch(setAddressData(data));
        dispatch(completeStep('address'));
        dispatch(goToNextStep());
    };

    const handleEditAddress = () => {
        dispatch(setCurrentStep('address'));
    };

    const handleContinueToPayment = () => {
        dispatch(completeStep('review'));
        dispatch(goToNextStep());
    };

    const handleCancel = () => {
        console.log('Cancelled');
    };

    const handleStepClick = (step: typeof currentStep) => {
        // Only allow clicking on completed steps or current step
        if (completedSteps.includes(step) || step === currentStep) {
            dispatch(setCurrentStep(step));
        }
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="container mx-auto px-4">

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Form Content */}
                    <LeftLayout>
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Complete your order in 3 simple steps
                            </p>
                        </div>

                        {/* Tabs */}
                        <CheckoutTabs
                            currentStep={currentStep}
                            completedSteps={completedSteps}
                            onStepClick={handleStepClick}
                        />
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            {currentStep === 'address' && (
                                <AddressForm
                                    onSubmit={handleAddressSubmit}
                                    onCancel={handleCancel}
                                    initialData={addressData || undefined}
                                />
                            )}
                            {currentStep === 'review' && addressData && (
                                <ReviewStep
                                    addressData={addressData}
                                    onEdit={handleEditAddress}
                                    onContinue={handleContinueToPayment}
                                />
                            )}
                            {currentStep === 'payment' && (
                                <PaymentStep onComplete={()=>{router.push('/spare-parts/checkout/success')}} />
                            )}
                        </div>
                    </LeftLayout>

                    {/* Right: Order Summary */}
                    <RightLayout>
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            itemCount={cartItems.length}
                        />
                    </RightLayout>
                </div>
            </div>
        </div>
    );
};

export default CheckOutLayout;
