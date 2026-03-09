"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import { Settings } from "lucide-react";

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  email: string;
  mobile: string;
  onResendOrUpdate: () => void;
  onPaymentReceived?: () => void;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  email,
  mobile,
  onResendOrUpdate,
  onPaymentReceived,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-[32px] max-w-lg w-full p-8 flex flex-col gap-2 shadow-2xl border border-gray-50">
        {/* Centered Header */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0F172B] tracking-tight text-center">
            Awaiting Payment Confirmation
          </h2>
          <div className="w-full h-px bg-gray-100 mt-6" />
        </div>

        {/* Processing Icon */}
        <div className="flex justify-center py-6">
          <div className="relative w-24 h-20 flex items-center justify-center">
            <div className="absolute top-0 right-4 animate-spin-slow">
              <Settings size={52} className="text-blue-600 opacity-90" />
            </div>
            <div className="absolute bottom-0 left-6 animate-spin-reverse-slow">
              <Settings size={36} className="text-orange-500 opacity-90" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Payment Link Sent!
          </h3>
          <p className="text-sm font-medium text-gray-500">
            Waiting for customer payment of ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Sent To Section */}
        <div className="bg-[#F0F5FA] rounded-2xl p-6 my-4 border border-[#E1E8F0]">
          <p className="text-center text-sm font-medium text-gray-500 mb-3">Sent to</p>
          <p className="text-center text-lg font-bold text-blue-600 break-all leading-tight">
            {email}/ {mobile}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onResendOrUpdate}
            className="w-full py-4 text-base font-bold text-gray-800 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center"
          >
            Resend Link or Update Contact Details
          </button>

          {/* Test button - Keeping it for functional testing but making it subtle */}
          {onPaymentReceived && (
            <button
              onClick={onPaymentReceived}
              className="w-full py-2 text-xs font-medium text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest text-center"
            >
              Simulate Success (Dev Only)
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
