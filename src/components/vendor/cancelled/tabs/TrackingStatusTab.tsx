import React from "react";

interface TrackingStatusTabProps {
  customerName: string;
}

const TrackingStatusTab: React.FC<TrackingStatusTabProps> = ({
  customerName,
}) => {
  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Order Timeline
        </h3>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Timeline Items */}
          <div className="space-y-6">
            {/* Cancelled */}
            <div className="relative flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="flex-1 pb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-red-600">
                      Order Cancelled
                    </p>
                    <p className="text-xs text-gray-500">
                      Oct 15, 2024 - 2:30 PM
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Order was cancelled by customer due to emergency situation.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmed */}
            <div className="relative flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="flex-1 pb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-blue-600">
                      Order Confirmed
                    </p>
                    <p className="text-xs text-gray-500">
                      Oct 14, 2024 - 4:15 PM
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Appointment confirmed for Oct 15, 2024 at 3:00 PM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Received */}
            <div className="relative flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="flex-1 pb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-green-600">
                      Order Received
                    </p>
                    <p className="text-xs text-gray-500">
                      Oct 14, 2024 - 3:45 PM
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Walk-in order received from {customerName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingStatusTab;
