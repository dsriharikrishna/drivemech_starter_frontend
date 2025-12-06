import { CheckCircle, Phone } from "lucide-react";

export default function ComplaintSubmitted() {
  return (
    <div className="w-full md:w-3xl mx-auto bg-white rounded-2xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white text-center py-10 relative">
        <CheckCircle className="w-14 h-14 mx-auto mb-4" />

        <h1 className="text-2xl font-semibold">Complaint Submitted</h1>
        <p className="text-blue-100 mt-1">
          We're here to help resolve your issue
        </p>
      </div>

      <div className="p-6 space-y-6">

        {/* COMPLAINT ID */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm font-medium text-gray-700">Complaint ID</p>
          <p className="text-xl font-bold mt-1">CMP-2024-6990</p>
          <p className="text-sm text-orange-600 mt-1">Save this for tracking</p>
        </div>

        {/* ISSUE TYPE */}
        <div className="p-4 bg-gray-50 rounded-xl border text-gray-800">
          <p className="text-sm font-medium text-gray-700">Issue Type</p>
          <p className="font-semibold mt-1">Service Quality Issue</p>
        </div>

        {/* TIMELINE */}
        <div className="p-4 bg-blue-50 rounded-xl border">
          <p className="font-semibold text-gray-800 mb-3">Resolution Timeline</p>

          <ul className="space-y-2 text-gray-700">
            <li>1. Review within 24 hours</li>
            <li>2. Contact you for details (if needed)</li>
            <li>3. Resolution within 3–5 business days</li>
          </ul>
        </div>

        {/* HELP SECTION */}
        <div className="p-4 bg-green-50 rounded-xl border">
          <p className="font-semibold text-gray-800 mb-1">
            Need Immediate Help?
          </p>
          <p className="text-gray-700 mb-3">
            For urgent issues, call our 24/7 support hotline
          </p>

          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
            <Phone size={18} />
            Call Now: 1-800-DRIVEMECH
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          You'll receive status updates via email and SMS
        </p>

        {/* DONE BUTTON */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl">
          Done
        </button>
      </div>
    </div>
  );
}
