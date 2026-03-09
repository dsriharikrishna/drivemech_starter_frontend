"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import Button from "@/components/ui/Button";
import { Settings } from "lucide-react";

interface TestDriveSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleNumber: string;
  onGoToHomepage: () => void;
}

const TestDriveSuccessModal: React.FC<TestDriveSuccessModalProps> = ({
  isOpen,
  onClose,
  vehicleNumber,
  onGoToHomepage,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-8">
        <DialogHeader title="Test Drive Successful..!" onClose={onClose} />

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <Settings size={48} className="text-blue-600" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Green arrows */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-green-500"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-green-500"></div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-green-500"></div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
          Vehicle is fully QC approved and moved to Ready to Delivery.
        </h3>

        {/* Vehicle Number */}
        <div className="text-center mb-8">
          <p className="text-lg text-blue-600 font-medium">
            Vechile Number: {vehicleNumber}
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          onClick={onGoToHomepage}
          className="w-full py-4 text-lg"
        >
          Homepage
        </Button>
      </div>
    </Dialog>
  );
};

export default TestDriveSuccessModal;
