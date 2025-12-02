"use client";

import { useState } from "react";

export default function AddVehicleForm() {
  const [vehicleType, setVehicleType] = useState<"car" | "bike" | "truck">("car");
  const [isDefault, setIsDefault] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add Vehicle</h2>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ➕ Add Vehicle
        </button>
      </div>

      {/* VEHICLE TYPE */}
      <div>
        <p className="font-medium mb-3">Vehicle Type*</p>

        <div className="flex items-center gap-4">
          {["car", "bike", "truck"].map((type) => (
            <button
              key={type}
              onClick={() => setVehicleType(type as "car" | "bike" | "truck")}
              className={`
                border rounded-2xl px-5 py-3 flex items-center gap-3 text-sm font-medium transition
                ${
                  vehicleType === type
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              <span className="text-lg">
                {type === "car" && "🚗"}
                {type === "bike" && "🏍"}
                {type === "truck" && "🚚"}
              </span>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* FORM SECTIONS */}
      <div className="space-y-10">

        {/* Add Vehicle Details */}
        <section className="p-6 border rounded-2xl bg-white">
          <p className="font-semibold mb-4">Add Vehicle Details</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* State */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">State*</label>
              <input
                type="text"
                placeholder="State"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Vehicle Reg No */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Vehicle Reg No.*</label>
              <input
                type="text"
                placeholder="e.g., ABC 1234 D"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Make */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Make*</label>
              <input
                type="text"
                placeholder="Toyota"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Model */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Model*</label>
              <input
                type="text"
                placeholder="e.g., Camry, Hilux"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Cubic Capacity */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Cubic Capacity</label>
              <input
                type="text"
                placeholder="e.g., 1000cc"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Mfg Year */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Mfg. Year</label>
              <input
                type="number"
                placeholder="2018"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="p-6 border rounded-2xl bg-white">
          <p className="font-semibold mb-4">Technical Details</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Chassis Number</label>
              <input
                type="text"
                placeholder="JT3HN86R9Y0123456"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Insurance Expiry Date</label>
              <input
                type="text"
                placeholder="DD-MM-YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Purchase Date</label>
              <input
                type="text"
                placeholder="DD-MM-YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Insurance Information */}
        <section className="p-6 border rounded-2xl bg-white">
          <p className="font-semibold mb-4">Insurance Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Insurance Provider</label>
              <input
                type="text"
                placeholder="GEICO"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Engine Number</label>
              <input
                type="text"
                placeholder="2GD-FTV123456"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

          </div>
        </section>

        {/* Service History */}
        <section className="p-6 border rounded-2xl bg-white">
          <p className="font-semibold mb-4">Service History</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Last Service Date</label>
              <input
                type="text"
                placeholder="DD-MM-YY"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Odometer (km)</label>
              <input
                type="number"
                placeholder="45000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Default Vehicle Toggle */}
        <section className="p-6 border rounded-2xl bg-orange-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Set as Default Vehicle</p>
              <p className="text-gray-600 text-sm">
                This vehicle will be auto-selected for bookings
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

        {/* Documents */}
        <section className="p-6 border rounded-2xl bg-white">
          <p className="font-semibold mb-4">Documents (Optional)</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="border border-gray-300 bg-gray-50 w-full py-3 rounded-lg text-sm hover:bg-gray-100 flex items-center justify-center gap-2">
              📄 Upload Registration Certificate
            </button>

            <button className="border border-gray-300 bg-gray-50 w-full py-3 rounded-lg text-sm hover:bg-gray-100 flex items-center justify-center gap-2">
              📄 Upload Insurance Policy
            </button>
          </div>
        </section>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg text-lg">
          Save Vehicle Details
        </button>
      </div>
    </div>
  );
}
