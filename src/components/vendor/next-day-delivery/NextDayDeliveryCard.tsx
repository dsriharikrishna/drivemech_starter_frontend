import React from "react";
import Avatar from "@/components/ui/Avatar";
import { Car, Wrench } from "lucide-react";
import { CarIcon } from "@/components/icons/DashboardIcons";
import { ChipIcon, StoryIcon } from "@/components/icons/TransactionIcons";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";

interface NextDayDeliveryOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    avatar?: string;
  };
  vehicle: {
    make: string;
    model: string;
    registration: string;
  };
  technician: {
    name: string;
    avatar?: string;
  };
  status: string;
}

interface NextDayDeliveryCardProps {
  order: NextDayDeliveryOrder;
  onViewDetails: () => void;
}

const NextDayDeliveryCard: React.FC<NextDayDeliveryCardProps> = ({
  order,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      {/* Customer Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-3 flex items-center gap-2">
          <div className="relative">
            <Avatar
              src={order.customer.avatar}
              name={order.customer.name}
              size="md"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-xs font-medium text-gray-900">
              {order.customer.name}
            </p>
            <p className="text-xs text-gray-500">#{order.orderNumber}</p>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <Avatar
            src="/images/vendor/transactions-center/sample-user.png"
            name={order.technician.name}
            size="sm"
            className="rounded-full shadow-none bg-transparent border-none"
          />
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="space-y-2 flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm flex-1">
          <CarIcon size={14} className="text-gray-500" />
          <span className="text-gray-900 text-xs font-medium">
            {order.vehicle.make} {order.vehicle.model}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm flex-1">
          <ChipIcon size={14} className="text-gray-500" />
          <span className="text-gray-900 text-xs">
            {order.vehicle.registration}
          </span>
        </div>
      </div>

      {/* Technician */}
      <div className="flex items-center gap-2 text-sm mb-3">
        <Wrench size={16} className="text-gray-400" />
        <span className="text-gray-500">Technician</span>
        <span className="text-gray-900 font-medium">
          {order.technician.name}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <StoryIcon size={14} className="text-gray-500" />
        <span className="text-xs text-gray-500">Status</span>
        <StatusBadge status={order.status} size="sm" color="orange" />
      </div>

      {/* View Details Button */}
      <Button
        onClick={onViewDetails}
        variant="outline"
        size="sm"
        className="w-full cursor-pointer px-4 py-2 text-sm font-medium text-orange-600 bg-white border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
      >
        View Details
      </Button>
    </div>
  );
};

export default NextDayDeliveryCard;
