"use client";

import React from "react";
import { CheckCircle, Phone } from "lucide-react";

export default function ComplaintSubmitted({
  complaintId = "CMP-2024-6990",
  issueType = "Service Quality Issue",
  onDone,
}: {
  complaintId?: string;
  issueType?: string;
  onDone?: () => void;
}) {
  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto text-center">

      {/* SUCCESS ICON */}
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle size={40} className="text-green-600" />
      </div>

      <h2 className="text-xl font-semibold mb-1">Complaint Submitted</h2>
      <p className="text-gray-600 mb-6">
        We're here to help resolve your issue
      </p>

      {/* COMPLAINT ID BOX */}
      <div className="border border-gray-200 rounded-xl p-4 text-left mb-4">
        <p className="text-xs text-gray-500">Complaint ID</p>
        <p className="font-semibold text-lg">{complaintId}</p>
        <p className="text-xs text-blue-500 mt-1">Save this for tracking</p>
      </div>

      {/* ISSUE TYPE */}
      <div className="border border-gray-200 rounded-xl p-4 text-left mb-4">
        <p className="text-xs text-gray-500 mb-1">Issue Type</p>
        <p className="font-medium text-gray-800">{issueType}</p>
      </div>

      {/* RESOLUTION TIMELINE */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left mb-4">
        <p className="font-semibold text-gray-800 mb-2">Resolution Timeline</p>

        <div className="text-gray-700 space-y-1 text-sm">
          <p>• Review within 24 hours</p>
          <p>• Contact you for details (if needed)</p>
          <p>• Resolution within 3–5 business days</p>
        </div>
      </div>

      {/* EMERGENCY CONTACT */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left mb-6">
        <p className="font-semibold text-gray-800 mb-2">Need Immediate Help?</p>

        <p className="text-sm text-gray-700 mb-2">
          For urgent issues, call our 24/7 support hotline
        </p>

        <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
          <Phone size={18} />
          Call Now – 1-800-DRIVEMECH
        </button>
      </div>

      {/* FOOTER NOTE */}
      <p className="text-xs text-gray-500 mb-4">
        You'll receive status updates via email and SMS
      </p>

      {/* DONE BUTTON */}
      <button
        onClick={onDone}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
      >
        Done
      </button>
    </div>
  );
}
