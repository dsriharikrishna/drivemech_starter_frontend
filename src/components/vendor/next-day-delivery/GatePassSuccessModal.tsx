"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

interface GatePassSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  gatePassNumber: string;
  onGoToGatePass: () => void;
  onGoToHomepage: () => void;
}

const GatePassSuccessModal: React.FC<GatePassSuccessModalProps> = ({
  isOpen,
  onClose,
  gatePassNumber,
  onGoToGatePass,
  onGoToHomepage,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl max-w-xl w-full p-4 flex flex-col gap-2">
        <DialogHeader
          title="Gate Pass Issued & Ready for Handover"
          onClose={onClose}
        />

        {/* Success Icon */}
        <div className="flex justify-center">
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

        <h3 className="text-md font-bold text-gray-900 text-center">
          Vehicle Handover Authorized
        </h3>

        <p className="text-center text-gray-600">
          Gate Pass generated. Vehicle can now be handed over to the customer.
        </p>

        {/* Gate Pass Number */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-center text-sm text-gray-600">
            GATE PASS NUMBER
          </p>
          <p className="text-center text-3xl font-bold text-blue-600">
            {gatePassNumber}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            onClick={onGoToGatePass}
            className="w-full py-2 text-md"
          >
            Go to Gate pass Issued
          </Button>
          <Button
            variant="outline"
            onClick={onGoToHomepage}
            className="w-full py-2 text-md"
          >
            Homepage
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default GatePassSuccessModal;
