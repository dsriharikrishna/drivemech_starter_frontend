import React from "react";
import Avatar from "@/components/ui/Avatar";

interface CustomerNotesTabProps {
  customerName: string;
  customerAvatar?: string;
}

const CustomerNotesTab: React.FC<CustomerNotesTabProps> = ({
  customerName,
  customerAvatar,
}) => {
  return (
    <div className="mt-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <Avatar name={customerName} src={customerAvatar} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {customerName}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <p className="text-sm text-gray-600">
                  Please check the brake pads as well. I've been hearing some
                  squeaking noise when braking.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <Avatar name={customerName} src={customerAvatar} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {customerName}
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <p className="text-sm text-gray-600">
                  I need to cancel this appointment due to an emergency. Will
                  reschedule soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNotesTab;
