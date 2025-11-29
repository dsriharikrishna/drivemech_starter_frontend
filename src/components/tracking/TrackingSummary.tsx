interface Props {
  status: string;
  stage: string;
  estimate: string;
}

export default function TrackingSummary({ status, stage, estimate }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-4">

      <div>
        <p className="text-sm text-gray-500">Current Status</p>
        <p className="text-green-600 font-medium">{status}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Current Stage</p>
        <p className="text-orange-500 font-medium">{stage}</p>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Estimated Completion:</p>
          <p className="text-blue-600 font-medium">{estimate}</p>
        </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
          Contact Support
        </button>
      </div>
    </div>
  );
}
