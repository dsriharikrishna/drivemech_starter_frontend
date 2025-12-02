"use client";

import { useState } from "react";

export default function AddAddressForm() {
  const [type, setType] = useState<"home" | "office" | "truck">("home");
  const [isDefault, setIsDefault] = useState(false);

  const types = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "office", label: "Office", icon: "💼" },
    { id: "truck", label: "Truck", icon: "📍" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add Address</h2>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ➕ Add New Address
        </button>
      </div>

      {/* ADDRESS TYPE */}
      <div>
        <p className="font-medium mb-3">Address Type*</p>

        <div className="flex gap-4">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id as any)}
              className={`
                border rounded-2xl px-5 py-3 flex items-center gap-3 text-sm font-medium transition
                ${
                  type === t.id
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              <span className="text-xl">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <section>
        <p className="font-semibold mb-4">Contact Information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Full Name*</label>
            <input
              type="text"
              placeholder="John Smith"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50
              focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Phone Number*</label>

            <div className="flex">
              <span className="bg-gray-100 border border-gray-300 px-3 flex items-center rounded-l-lg">
                🇮🇳 +91
              </span>
              <input
                type="text"
                placeholder="X XX XX XX XX"
                className="w-full border border-gray-300 rounded-r-lg px-4 py-2 text-sm bg-gray-50
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ADDRESS DETAILS */}
      <section>
        <p className="font-semibold mb-4">Address Details</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Address Line 1*</label>
            <input className="input" placeholder="123 Main Street" />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Address Line 2 (Optional)</label>
            <input className="input" placeholder="Apartment 4B" />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Landmark (Optional)</label>
            <input className="input" placeholder="Near Central Park" />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">City*</label>
            <input className="input" placeholder="Downtown" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="space-y-1">
            <label className="text-sm text-gray-600">State*</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50">
              <option>Select State</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Postcode*</label>
            <input className="input" placeholder="10001" />
          </div>

        </div>
      </section>

      {/* QUICK LOCATION OPTIONS */}
      <section className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-3">
        <p className="font-semibold">📍 Quick Location Options</p>

        <button className="w-full border bg-white border-gray-300 py-2 rounded-lg text-sm flex items-center gap-2 px-3">
          📌 Use Current Location
        </button>

        <button className="w-full border bg-white border-gray-300 py-2 rounded-lg text-sm flex items-center gap-2 px-3">
          🗺 Select from Map
        </button>
      </section>

      {/* DEFAULT TOGGLE */}
      <section className="p-6 border rounded-xl bg-orange-50">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Set as Default Address</p>
            <p className="text-gray-600 text-sm">
              This address will be auto-selected for deliveries
            </p>
          </div>

          {/* PURE TAILWIND TOGGLE */}
          <button
            type="button"
            onClick={() => setIsDefault(!isDefault)}
            className={`relative inline-flex h-6 w-11 rounded-full transition ${
              isDefault ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                isDefault ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      </section>

      {/* SAVE BUTTON */}
      <div className="flex justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg text-lg">
          Save Address
        </button>
      </div>

    </div>
  );
}

/* SIMPLE TAILWIND INPUT CLASS HELPER */
const input = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none";
