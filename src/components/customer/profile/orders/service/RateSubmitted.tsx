export default function RateSubmitted({ onDone }: { onDone: () => void }) {
  return (
      <div className="bg-white w-full max-w-[650px] rounded-2xl pb-6 shadow-lg overflow-hidden">

        <div className="bg-green-500 text-white rounded-t-2xl py-6 text-center">
          <div className="text-3xl">👍</div>
          <h3 className="text-xl font-semibold mt-2">Thank You!</h3>
          <p>Your feedback has been submitted</p>
        </div>

        <div className="p-6 space-y-6">

          {/* Rating */}
          <div className="bg-orange-50 p-6 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-2">Your Rating</p>
            <div className="text-3xl text-orange-500 mb-1">★★★★☆</div>
            <p className="text-sm text-gray-600">Periodic Maintenance at A to Z Garage</p>
          </div>

          {/* Impact */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="font-semibold">Your Impact</p>
            <p className="text-sm text-gray-600">
              Your positive review helps others discover great service providers!
            </p>
          </div>

          {/* Reward */}
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="font-semibold">Reward Unlocked!</p>
            <p className="text-sm text-gray-600">
              You've earned 50 DriveMech Reward Points.
            </p>
            <span className="inline-block mt-2 bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full">
              +50 Points Added
            </span>
          </div>

          <p className="text-center text-gray-500 text-sm">
            We’ve saved your feedback and notified the service provider.
          </p>

          <button
            onClick={onDone}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
          >
            Done
          </button>

        </div>
      </div>
  );
}
