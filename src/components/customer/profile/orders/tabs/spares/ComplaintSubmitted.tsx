"use client";

import { CheckCircle, Phone } from "lucide-react";

export default function ComplaintSubmitted({
  onDone,
}: {
  onDone?: () => void;
}) {
  return (
    <div className="w-full sm:w-2xl md-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6">

      {/* Top Section */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Complaint Submitted</h2>
        <p className="text-gray-500 mt-1">We’re reviewing your complaint</p>
      </div>

      {/* Complaint Details */}
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mb-4">
        <p className="text-sm font-medium text-gray-700">Complaint ID</p>
        <p className="text-xl font-bold mt-1">CMP-2024-6990</p>
        <p className="text-sm text-orange-600 mt-1">Save this for tracking</p>
      </div>

      {/* Issue Summary */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-700">Issue Type</p>
        <p className="font-semibold mt-1 text-gray-900">Service Quality Issue</p>
      </div>

      {/* What Happens Next — Styled like your RaiseComplaint UI */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm space-y-2">
        <p className="font-semibold text-gray-700">What happens next?</p>

        <div className="text-gray-700 divide-y divide-gray-200">
          {[
            "Your complaint will be reviewed within 24 hours",
            "We’ll contact you for additional details (if needed)",
            "Expected resolution time: 3–5 business days",
            "You can track complaint status in your profile",
          ].map((item) => (
            <div key={item} className="flex gap-2 py-2">
              <span>•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Help Box */}
      <div className="p-4 bg-green-50 rounded-xl border border-green-200 mt-4">
        <p className="font-semibold text-gray-800 mb-1">Need Immediate Help?</p>
        <p className="text-gray-700 text-sm mb-3">
          For urgent issues, contact our 24/7 support team.
        </p>

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
          <Phone size={18} />
          Call Now: 1-800-DRIVEMECH
        </button>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        You’ll receive updates via SMS & email.
      </p>

      {/* Done Button */}
      <button
        onClick={onDone}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl mt-6"
      >
        Done
      </button>
    </div>
  );
}
