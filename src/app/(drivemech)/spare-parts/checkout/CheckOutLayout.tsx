"use client";

import React from "react";
import CheckoutTabs from "@/components/spare-parts/checkout/CheckoutTabs";
import AddressForm from "@/components/spare-parts/checkout/AddressForm";
import ReviewStep from "@/components/spare-parts/checkout/ReviewStep";
import { PaymentStep } from "@/components/spare-parts/checkout/PaymentStep";
import OrderSummary from "@/components/spare-parts/checkout/OrderSummary";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import { AddressFormData } from "@/schemas/checkout.schema";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  setCurrentStep,
  setAddressData,
  goToNextStep,
  completeStep,
} from "@/store/slices/customer/spare-parts/sparePartsCheckoutSlice";
import { recalculatePricing } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import { useRouter } from "next/navigation";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";

const CheckOutLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentStep, completedSteps, addressData } = useAppSelector(
    (state) => state.sparePartsCheckout
  );
  const { cart, pricing } = useAppSelector((state) => state.spareParts);

  const cartItems = cart.products;
  const {
    subtotal,
    shippingCost: shipping,
    taxAmount: tax,
    totalAmount: total,
  } = pricing;

  React.useEffect(() => {
    dispatch(recalculatePricing());
  }, [dispatch]);

  const handleAddressSubmit = (data: AddressFormData) => {
    console.log("Address submitted:", data);
    dispatch(setAddressData(data));
    dispatch(completeStep("address"));
    dispatch(goToNextStep());
  };

  const handleEditAddress = () => {
    dispatch(setCurrentStep("address"));
  };

  const handleContinueToPayment = () => {
    dispatch(completeStep("review"));
    dispatch(goToNextStep());
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const handleStepClick = (step: typeof currentStep) => {
    if (completedSteps.includes(step) || step === currentStep) {
      dispatch(setCurrentStep(step));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Centered Container */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT : 3 PARTS */}
          <SmoothLandingBox
            variant="slide-right"
            delay={0.1}
            distance={30}
            className="w-full lg:flex-[3]"
          >
            <div className="w-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Complete your order in 3 simple steps
                </p>
              </div>

              <CheckoutTabs
                currentStep={currentStep}
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
              />

              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:w-full mt-4">
                {currentStep === "address" && (
                  <AddressForm
                    onSubmit={handleAddressSubmit}
                    onCancel={handleCancel}
                    initialData={addressData || undefined}
                  />
                )}

                {currentStep === "review" && addressData && (
                  <ReviewStep
                    addressData={addressData}
                    onEdit={handleEditAddress}
                    onContinue={handleContinueToPayment}
                  />
                )}

                {currentStep === "payment" && (
                  <PaymentStep
                    onComplete={() =>
                      router.push("/spare-parts/checkout/success")
                    }
                  />
                )}
              </div>
            </div>
          </SmoothLandingBox>

          {/* RIGHT : 1 PART */}
          <SmoothLandingBox
            variant="slide-left"
            delay={0.15}
            distance={30}
            className="w-full lg:flex-[1]"
          >
            <div className="w-full">
              <div className="lg:sticky lg:top-24">
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  itemCount={cartItems.length}
                  total={total}
                />
              </div>
            </div>
          </SmoothLandingBox>
        </div>
      </div>
    </div>
  );
};

export default CheckOutLayout;
