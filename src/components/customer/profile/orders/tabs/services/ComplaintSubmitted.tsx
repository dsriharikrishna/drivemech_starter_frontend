import { CheckCircle, Phone } from "lucide-react";

export default function ComplaintSubmitted() {
  return (
    <div className="w-full md:w-3xl mx-auto bg-white rounded-2xl overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white text-center py-8 relative">
        <CheckCircle className="w-12 h-12 mx-auto mb-3" />

        <h1 className="text-xl font-semibold">Complaint Submitted</h1>
        <p className="text-blue-100 mt-0.5 text-xs">
          We're here to help resolve your issue
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* COMPLAINT ID */}
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-xs font-medium text-gray-700">Complaint ID</p>
          <p className="text-lg font-bold mt-0.5">CMP-2024-6990</p>
          <p className="text-xs text-orange-600 mt-0.5">
            Save this for tracking
          </p>
        </div>

        {/* ISSUE TYPE */}
        <div className="p-3 bg-gray-50 rounded-xl border text-gray-800">
          <p className="text-xs font-medium text-gray-700">Issue Type</p>
          <p className="font-semibold mt-0.5 text-xs">Service Quality Issue</p>
        </div>

        {/* TIMELINE */}
        <div className="p-3 bg-blue-50 rounded-xl border">
          <p className="font-semibold text-gray-800 mb-2.5 text-xs">
            Resolution Timeline
          </p>

          <ul className="space-y-1.5 text-gray-700 text-xs">
            <li>1. Review within 24 hours</li>
            <li>2. Contact you for details (if needed)</li>
            <li>3. Resolution within 3–5 business days</li>
          </ul>
        </div>

        {/* HELP SECTION */}
        <div className="p-3 bg-green-50 rounded-xl border">
          <p className="font-semibold text-gray-800 mb-0.5 text-xs">
            Need Immediate Help?
          </p>
          <p className="text-gray-700 mb-2.5 text-xs">
            For urgent issues, call our 24/7 support hotline
          </p>

          <button className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs">
            <Phone size={16} />
            Call Now: 1-800-DRIVEMECH
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs">
          You'll receive status updates via email and SMS
        </p>

        {/* DONE BUTTON */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-xs">
          Done
        </button>
      </div>
    </div>
  );
}
