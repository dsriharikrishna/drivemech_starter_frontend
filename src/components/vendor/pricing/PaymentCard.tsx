"use client";

import React from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useAppSelector } from "@/store/store";

interface PaymentCardProps {
  onProceed: () => void;
}

// Pricing plans data (same as in PricingLayout)
const PRICING_PLANS = [
  { id: "starter", name: "Starter", price: { monthly: 23, yearly: 230 } },
  {
    id: "professional",
    name: "Professional",
    price: { monthly: 63, yearly: 630 },
  },
  { id: "business", name: "Business", price: { monthly: 119, yearly: 1190 } },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 239, yearly: 2390 },
  },
];

const PaymentCard: React.FC<PaymentCardProps> = ({ onProceed }) => {
  const { billingCycle, selectedPlanId, servicesCount } = useAppSelector(
    (state) => state.pricing
  );

  // Get selected plan details from Redux state
  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId);

  if (!selectedPlan) {
    return null;
  }

  const price =
    billingCycle === "monthly"
      ? selectedPlan.price.monthly
      : selectedPlan.price.yearly;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-3xl shadow-lg sticky top-6">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Summary</h3>

      {/* Summary Details */}
      <div className="space-y-2 mb-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Selected Plan</span>
          <span className="text-sm font-semibold text-gray-900">
            {selectedPlan.name}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Billing Cycle</span>
          <span className="text-sm font-semibold text-gray-900 capitalize">
            {billingCycle}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Services</span>
          <span className="text-sm font-semibold text-gray-900">
            {servicesCount} services
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Total Amount */}
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-base font-semibold text-gray-900">
          Total Amount
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <span className="text-sm text-gray-500">
            /{billingCycle === "monthly" ? "month" : "year"}
          </span>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={onProceed}
        className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
      >
        Proceed to Payment
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Security Info */}
      <div className="mt-2 text-center space-y-1">
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>
            Secure payment powered by Razorpay • 100% safe & encrypted
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Cancel anytime • 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
