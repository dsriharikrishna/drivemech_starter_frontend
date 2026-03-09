"use client";

import { CheckCircle, Phone } from "lucide-react";

export default function ComplaintSubmitted({
  onDone,
}: {
  onDone?: () => void;
}) {
  return (
    <div className="w-full sm:w-2xl md-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-4">
      {/* Top Section */}
      <div className="text-center mb-4">
        <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2.5">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>

        <h2 className="text-xl font-bold text-gray-800">Complaint Submitted</h2>
        <p className="text-gray-500 mt-0.5 text-xs">
          We're reviewing your complaint
        </p>
      </div>

      {/* Complaint Details */}
      <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl mb-3">
        <p className="text-xs font-medium text-gray-700">Complaint ID</p>
        <p className="text-lg font-bold mt-0.5">CMP-2024-6990</p>
        <p className="text-xs text-orange-600 mt-0.5">Save this for tracking</p>
      </div>

      {/* Issue Summary */}
      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 mb-3">
        <p className="text-xs font-medium text-gray-700">Issue Type</p>
        <p className="font-semibold mt-0.5 text-gray-900 text-xs">
          Service Quality Issue
        </p>
      </div>

      {/* What Happens Next */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs space-y-1.5">
        <p className="font-semibold text-gray-700">What happens next?</p>

        <div className="text-gray-700 divide-y divide-gray-200">
          {[
            "Your complaint will be reviewed within 24 hours",
            "We'll contact you for additional details (if needed)",
            "Expected resolution time: 3–5 business days",
            "You can track complaint status in your profile",
          ].map((item) => (
            <div key={item} className="flex gap-1.5 py-1.5">
              <span>•</span>
              <span>{item}</span>
            </div>
          ))}
          \n{" "}
        </div>
      </div>

      {/* Immediate Help Box */}
      <div className="p-3 bg-green-50 rounded-xl border border-green-200 mt-3">
        <p className="font-semibold text-gray-800 mb-0.5 text-xs">
          Need Immediate Help?
        </p>
        <p className="text-gray-700 text-xs mb-2.5">
          For urgent issues, contact our 24/7 support team.
        </p>

        <button className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs">
          <Phone size={16} />
          Call Now: 1-800-DRIVEMECH
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs mt-4">
        You'll receive updates via SMS & email.
      </p>

      {/* Done Button */}
      <button
        onClick={onDone}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl mt-4 text-xs"
      >
        Done
      </button>
    </div>
  );
}
