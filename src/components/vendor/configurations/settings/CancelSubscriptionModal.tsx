"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import Button from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  renewalDate?: string;
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  renewalDate = "October 28, 2025",
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
              <AlertCircle size={32} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Cancel Your Subscription
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to cancel your subscription? Your account will
          remain active until the end of the billing period.
        </p>

        {/* Note Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> You'll continue to have
            access until {renewalDate}. After that, your account will be
            downgraded to the free tier.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            rounded="lg"
          >
            Keep Subscription
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="flex-1"
            rounded="lg"
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
