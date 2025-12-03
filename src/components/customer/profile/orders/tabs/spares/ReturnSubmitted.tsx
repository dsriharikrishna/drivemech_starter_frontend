"use client";

import React from "react";

export default function ReturnSubmitted({ returnId = "RET-2024-7042", onClose }: { returnId?: string; onClose?: () => void }) {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 text-center">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
        ✅
      </div>
      <h2 className="text-xl font-semibold mb-2">Return Request Submitted!</h2>
      <p className="text-gray-600 mb-6">Your return request has been successfully submitted. We will arrange a pickup shortly.</p>

      <div className="border rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-500">Return ID</p>
        <p className="font-semibold text-lg">{returnId}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl mb-4">
        <p className="font-medium">Estimated Pickup</p>
        <p className="text-sm text-gray-700">Within 2-3 business days</p>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 border rounded-xl py-3">Back to Orders</button>
        <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl">Track Return Status</button>
      </div>
    </div>
  );
}
