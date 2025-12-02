"use client";

import AddAddressForm from "@/components/customer/profile/address/AddAddressForm";
import { useState } from "react";

interface Address {
  id: string;
  label: string;
  icon: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  isDefault?: boolean;
}

export default function AddressTab() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      icon: "🏠",
      address1: "123 Main Street, Apartment 4B",
      city: "Downtown, City",
      postcode: "10001",
      isDefault: true,
    },
    {
      id: "2",
      label: "Office",
      icon: "💼",
      address1: "456 Business Park, Floor 8",
      city: "Commercial District, City",
      postcode: "10020",
    },
    {
      id: "3",
      label: "Garage Pickup",
      icon: "📍",
      address1: "456 Business Park, Floor 8",
      city: "Commercial District, City",
      postcode: "10020",
    },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Addresses</h2>

        <button onClick={() => setIsAddOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ➕ Add New Address
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {addresses.map((a) => (
          <div
            key={a.id}
            className={`border rounded-2xl p-5 bg-white transition shadow-sm
            ${a.isDefault
                ? "border-orange-400 shadow-[0_0_0_2px_#ff7a1a40]"
                : "border-gray-200"
              }`}
          >
            {/* ICON + LABEL */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                {a.icon}
              </div>

              <div>
                <p className="font-semibold">{a.label}</p>

                {a.isDefault && (
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-md ml-2">
                    Default
                  </span>
                )}
              </div>
            </div>

            {/* ADDRESS LINES */}
            <p className="mt-4 text-gray-700">{a.address1}</p>
            {a.address2 && <p className="text-gray-700">{a.address2}</p>}
            <p className="text-gray-700">{a.city} - {a.postcode}</p>

            {/* ACTIONS */}
            <div className="border-t mt-4 pt-4 flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 text-sm">
                ✏ Edit
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-sm text-red-600">
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACCESS BOX */}
      <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
        <p className="font-semibold">📍 Quick Access</p>
        <p className="text-gray-700 text-sm mt-1">
          Save frequently used addresses for faster checkout during spare parts delivery,
          service bookings, and towing requests.
        </p>
      </div>

      {isAddOpen && (
        <AddAddressForm />
      )}
    </div>
  );
}
