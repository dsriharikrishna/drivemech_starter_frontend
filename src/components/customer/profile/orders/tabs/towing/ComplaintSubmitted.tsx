"use client";

import React, { useCallback } from "react";
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
  const handleDone = useCallback(() => {
    onDone?.();
  }, [onDone]);

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto text-center">
      {/* SUCCESS ICON */}
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
        <CheckCircle size={32} className="text-green-600" />
      </div>

      <h2 className="text-lg font-semibold mb-0.5">Complaint Submitted</h2>
      <p className="text-gray-600 mb-4 text-xs">
        We're here to help resolve your issue
      </p>

      {/* COMPLAINT ID BOX */}
      <div className="border border-gray-200 rounded-xl p-3 text-left mb-3">
        <p className="text-xs text-gray-500">Complaint ID</p>
        <p className="font-semibold text-base">{complaintId}</p>
        <p className="text-xs text-blue-500 mt-0.5">Save this for tracking</p>
      </div>

      {/* ISSUE TYPE */}
      <div className="border border-gray-200 rounded-xl p-3 text-left mb-3">
        <p className="text-xs text-gray-500 mb-0.5">Issue Type</p>
        <p className="font-medium text-gray-800 text-xs">{issueType}</p>
      </div>

      {/* RESOLUTION TIMELINE */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-left mb-3">
        <p className="font-semibold text-gray-800 mb-1.5 text-xs">
          Resolution Timeline
        </p>

        <div className="text-gray-700 space-y-0.5 text-xs">
          <p>• Review within 24 hours</p>
          <p>• Contact you for details (if needed)</p>
          <p>• Resolution within 3–5 business days</p>
        </div>
      </div>

      {/* EMERGENCY CONTACT */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-left mb-4">
        <p className="font-semibold text-gray-800 mb-1.5 text-xs">
          Need Immediate Help?
        </p>

        <p className="text-xs text-gray-700 mb-1.5">
          For urgent issues, call our 24/7 support hotline
        </p>

        <button className="w-full flex items-center justify-center gap-1.5 bg-green-600 text-white py-1.5 rounded-lg font-medium hover:bg-green-700 text-xs">
          <Phone size={16} />
          Call Now – 1-800-DRIVEMECH
        </button>
      </div>

      {/* FOOTER NOTE */}
      <p className="text-xs text-gray-500 mb-3">
        You'll receive status updates via email and SMS
      </p>

      {/* DONE BUTTON */}
      <button
        onClick={handleDone}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-xs"
      >
        Done
      </button>
    </div>
  );
}
