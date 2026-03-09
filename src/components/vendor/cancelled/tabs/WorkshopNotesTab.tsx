import React from "react";

const WorkshopNotesTab: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">JD</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    John Doe (Technician)
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
                <p className="text-sm text-gray-600">
                  Customer requested cancellation. Order marked as cancelled. No
                  work was started.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">SM</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    Sarah Miller (Manager)
                  </p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
                <p className="text-sm text-gray-600">
                  Initial inspection scheduled. Vehicle appears to be in good
                  condition. Customer mentioned brake concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopNotesTab;
