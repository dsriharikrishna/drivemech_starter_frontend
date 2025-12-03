"use client";

import React from "react";

export default function ConfirmReturn({ payload, onBack, onSubmit }: { payload: any; onBack?: () => void; onSubmit?: () => void }) {
  if (!payload) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4">Confirm Return</h2>

      <div className="border rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{payload.productName ?? "Product"}</p>
            <p className="text-sm text-gray-600">{payload.reason}</p>
          </div>
          <div className="text-orange-500 font-semibold">${payload.amount?.toFixed?.(2) ?? payload.amount}</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">📦</div>
          <div>
            <p className="font-medium">Request Type</p>
            <p className="text-sm text-gray-600">Return for Refund</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">💳</div>
          <div>
            <p className="font-medium">Refund Method</p>
            <p className="text-sm text-gray-600">{payload.refundMethod === "wallet" ? "DriveMech Wallet" : "Original Payment Method"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">📦</div>
          <div>
            <p className="font-medium">Pickup Timeline</p>
            <p className="text-sm text-gray-600">Within 2-3 business days</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl mb-4">
        <p className="font-medium">What happens next?</p>
        <ul className="text-sm text-gray-700 mt-2">
          <li>• Request verification within 2-4 hours</li>
          <li>• Pickup scheduled at your convenience</li>
          <li>• Refund processed in 5-7 business days after pickup</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 border rounded-xl py-3">Go Back</button>
        <button onClick={onSubmit} className="flex-1 bg-orange-500 text-white py-3 rounded-xl">Confirm & Submit</button>
      </div>
    </div>
  );
}
