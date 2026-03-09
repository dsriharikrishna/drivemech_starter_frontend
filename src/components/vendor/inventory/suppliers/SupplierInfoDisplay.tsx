"use client";

import React from "react";
import { Phone, Smartphone, Mail, MapPin } from "lucide-react";
import type { CustomerInfo } from "@/schemas/vendor/supplier.schema";

interface SupplierInfoDisplayProps {
  customerInfo: CustomerInfo;
}

const SupplierInfoDisplay: React.FC<SupplierInfoDisplayProps> = ({
  customerInfo,
}) => {
  return (
    <div className="grid grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
      {/* Customer Information */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Customer Information
        </h3>
        <div className="space-y-1 text-sm text-gray-700">
          <p className="font-medium">{customerInfo.name}</p>
          <p>{customerInfo.street}</p>
          <p>{customerInfo.road}</p>
          <p>
            {customerInfo.city} - {customerInfo.postalCode}
          </p>
        </div>
      </div>

      {/* Customer Contact */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Customer Contact
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Phone size={14} className="text-gray-500" />
            <span>{customerInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Smartphone size={14} className="text-gray-500" />
            <span>{customerInfo.mobile}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Mail size={14} className="text-gray-500" />
            <span>{customerInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Customer Address */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Customer Address
        </h3>
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin size={14} className="text-gray-500 mt-0.5" />
          <span>{customerInfo.address}</span>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfoDisplay;
