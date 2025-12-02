"use client";

import { useState } from "react";
import ComplaintSubmitted from "./ComplaintSubmitted";

export default function RaiseComplaintModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <ComplaintSubmitted onDone={onClose} />;

  return (

      <div className="bg-white w-full max-w-[650px] max-h-80 rounded-2xl p-6 space-y-6 shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Raise a Complaint</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
          <p className="font-semibold">Order Details</p>
          <p className="text-sm text-gray-600">Periodic Maintenance</p>
          <p className="text-sm text-gray-600">A to Z Garage</p>
          <p className="font-semibold mt-1">Order ID: SRV-001</p>
        </div>

        {/* TYPE */}
        <div>
          <p className="text-sm font-semibold mb-1">Complaint Type*</p>
          <select className="w-full border bg-gray-50 p-3 rounded-xl">
            <option>Select a complaint type</option>
            <option>Service Quality Issue</option>
            <option>Incorrect Charges</option>
            <option>Damaged Vehicle</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="text-sm font-semibold mb-1">Description*</p>
          <textarea
            rows={4}
            placeholder="Share details of your experience..."
            className="w-full border bg-gray-50 p-3 rounded-xl"
          ></textarea>
          <p className="text-gray-500 text-xs">0/500 characters</p>
        </div>

        {/* UPLOAD */}
        <div className="border rounded-xl p-6 text-center space-y-2 bg-gray-50">
          <p className="text-gray-600">📤 Upload Evidence (Optional)</p>
          <button className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100">
            Choose Files
          </button>
        </div>

        {/* RESOLUTION OPTIONS */}
        <div>
          <p className="font-semibold mb-2">What would you like us to do?</p>

          <div className="space-y-2 text-sm">
            {["Redo the service", "Partial refund", "Full refund", "Speak with manager", "Just filing for record"].map(
              (opt) => (
                <div className="border rounded-xl px-4 py-2 bg-gray-50">{opt}</div>
              )
            )}
          </div>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="bg-blue-50 p-4 rounded-xl text-sm">
          <p className="font-semibold mb-1">📝 What happens next?</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Your complaint will be reviewed within 24 hours</li>
            <li>We’ll contact you via email/phone for updates</li>
            <li>Resolution time: 3–5 business days</li>
            <li>You can track complaint status in your profile</li>
          </ul>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg"
        >
          Submit Complaint
        </button>
      </div>
  );
}
