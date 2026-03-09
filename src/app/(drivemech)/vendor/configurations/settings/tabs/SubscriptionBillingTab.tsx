"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import {
  Layers,
  Calendar,
  CreditCard,
  X,
  Pause,
  Download,
  ArrowRight,
  Check,
} from "lucide-react";
import CancelSubscriptionModal from "@/components/vendor/configurations/settings/CancelSubscriptionModal";
import BillingHistoryModal from "@/components/vendor/configurations/settings/BillingHistoryModal";

const SubscriptionBillingTab = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBillingHistory, setShowBillingHistory] = useState(false);

  const handleCancelSubscription = () => {
    console.log("Subscription cancelled");
    setShowCancelModal(false);
    // TODO: Implement actual cancellation logic
  };

  const handlePauseSubscription = () => {
    console.log("Subscription paused");
    // TODO: Implement pause logic
  };

  const handleDownloadInvoice = () => {
    console.log("Download invoice");
    // TODO: Implement invoice download
  };

  const handleUpdatePayment = () => {
    console.log("Update payment method");
    // TODO: Implement payment update
  };

  const handleUpgradePlan = () => {
    console.log("Upgrade plan");
    // TODO: Navigate to pricing page
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
          <Button
            variant="primary"
            size="sm"
            rounded="lg"
            onClick={handleUpgradePlan}
          >
            Upgrade Plan
          </Button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Your active subscription details
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Plan Details */}
          <div className="space-y-4">
            {/* Plan Name */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Layers size={24} className="text-orange-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  Professional
                </h4>
                <p className="text-sm text-gray-600">
                  Perfect for growing businesses
                </p>
              </div>
            </div>

            {/* Billing Type */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                Billing Type
              </label>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                <Calendar size={14} />
                Yearly Billing
              </span>
            </div>

            {/* Services Included */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                Services Included
              </label>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-lg">
                  Workshop
                </span>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                  Spare Parts
                </span>
                <span className="px-3 py-1.5 bg-pink-100 text-pink-700 text-sm font-medium rounded-lg">
                  Towing
                </span>
              </div>
            </div>

            {/* View Billing History Link */}
            <button
              onClick={() => setShowBillingHistory(true)}
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
            >
              View Billing History
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column - Pricing & Status */}
          <div className="space-y-4">
            {/* Renewal Date */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                Renewal Date
              </label>
              <div className="flex items-center gap-2 text-sm text-gray-900">
                <Calendar size={16} className="text-gray-400" />
                <span className="font-medium">Renews on October 28, 2025</span>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">Amount</label>
              <div>
                <span className="text-3xl font-bold text-gray-900">$63</span>
                <span className="text-gray-500 text-sm ml-1">/year</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                You're saving $16/year with annual billing
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">Status</label>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Subscription Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Manage Subscription
        </h3>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Method
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  •••• •••• •••• 1234
                </p>
                <p className="text-xs text-gray-500">Expires 12/2026</p>
              </div>
              <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                Visa
              </span>
            </div>
            <button
              onClick={handleUpdatePayment}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Subscription Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Subscription Controls
          </label>
          <div className="flex flex-col lg:flex-row gap-3">
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
              <X size={18} />
              Cancel Subscription
            </button>
            <button
              onClick={handlePauseSubscription}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <Pause size={18} />
              Pause Subscription
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <Download size={18} />
              Download Invoice
            </button>
          </div>
        </div>

        {/* Your Plan Includes */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Your Plan Includes:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Unlimited bookings",
              "Advanced analytics",
              "Mobile app access",
              "Up to 3 locations",
              "Priority support",
              "Custom branding",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CancelSubscriptionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelSubscription}
        renewalDate="October 28, 2025"
      />

      <BillingHistoryModal
        isOpen={showBillingHistory}
        onClose={() => setShowBillingHistory(false)}
      />
    </div>
  );
};

export default SubscriptionBillingTab;
