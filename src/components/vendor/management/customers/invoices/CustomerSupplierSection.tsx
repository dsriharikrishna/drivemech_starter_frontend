"use client";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Mock customer data - replace with actual data fetching
const mockCustomerData = {
  name: "John Doe",
  street: "Street 01",
  road: "Abc Road",
  city: "Hyd",
  postalCode: "500018",
  phone1: "+917000770007",
  phone2: "040-123 456",
  email: "johndoe@example.com",
  address: "Street 1, ABD Colony, Hyd-18",
};

const mockSuppliers = [
  { id: "1", name: "Supplier 1" },
  { id: "2", name: "Supplier 2" },
  { id: "3", name: "Supplier 3" },
];

const CustomerSupplierSection = () => {
  return (
    <div className="px-6 py-4 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Customer Information */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 mb-3">
          Customer Information
        </h3>
        <div className="space-y-1 text-sm text-gray-900">
          <p className="font-medium">{mockCustomerData.name}</p>
          <p>{mockCustomerData.street}</p>
          <p>{mockCustomerData.road}</p>
          <p>
            {mockCustomerData.city} - {mockCustomerData.postalCode}
          </p>
        </div>
      </div>

      {/* Customer Contact */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 mb-3">
          Customer Contact
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Phone size={14} className="text-gray-500" />
            <span>{mockCustomerData.phone1}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Phone size={14} className="text-gray-500" />
            <span>{mockCustomerData.phone2}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Mail size={14} className="text-gray-500" />
            <span>{mockCustomerData.email}</span>
          </div>
        </div>
      </div>

      {/* Customer Address */}
      <div>
        <h3 className="text-xs font-semibold text-gray-700 mb-3">
          Customer Address
        </h3>
        <div className="flex items-start gap-2 text-sm text-gray-900">
          <MapPin
            size={14}
            className="text-gray-500 mt-0.5 flex-shrink-0"
          />
          <span>{mockCustomerData.address}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupplierSection;
