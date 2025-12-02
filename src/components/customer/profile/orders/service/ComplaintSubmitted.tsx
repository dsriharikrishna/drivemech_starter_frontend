export default function ComplaintSubmitted({ onDone }: { onDone: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[650px] rounded-2xl pb-6">

        <div className="bg-blue-500 text-white text-center py-6 rounded-t-2xl">
          <div className="text-3xl">✔</div>
          <h3 className="text-xl font-semibold mt-2">Complaint Submitted</h3>
          <p className="text-sm mt-1">We're here to help resolve your issue</p>
        </div>

        <div className="p-6 space-y-6">

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <p className="font-semibold text-lg">CMP-2024-6990</p>
            <p className="text-sm text-gray-600">Save this for tracking</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold mb-1">Issue Type</p>
            <p>Service Quality Issue</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl space-y-1">
            <p className="font-semibold">⏳ Resolution Timeline</p>
            <p>1. Review within 24 hours</p>
            <p>2. Contact you for details if needed</p>
            <p>3. Resolution within 3–5 business days</p>
          </div>

          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold">📞 Need Immediate Help?</p>
            <p className="text-sm text-gray-600">
              For urgent issues, call our 24/7 support hotline
            </p>

            <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg">
              Call Now: 1-800-DRIVEMECH
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            You’ll receive status updates via email and SMS
          </p>

          <button
            onClick={onDone}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
          >
            Done
          </button>

        </div>
      </div>

    </div>
  );
}
