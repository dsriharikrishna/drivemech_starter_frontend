"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onProceedToGatePass: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  onProceedToGatePass,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-4">
        <DialogHeader title="Payment Confirmed" onClose={onClose} />

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <CheckCircle
                size={48}
                className="text-green-500"
                strokeWidth={3}
              />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-pink-400"></div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
          Payment Successful!
        </h3>

        <p className="text-center text-gray-600 mb-8">
          The payment of ${totalAmount.toFixed(2)} has been received.
        </p>

        {/* Action Button */}
        <Button
          variant="primary"
          onClick={onProceedToGatePass}
          className="w-full py-4 text-lg"
        >
          Proceed to Issue Gate pass
        </Button>
      </div>
    </Dialog>
  );
};

export default PaymentSuccessModal;
