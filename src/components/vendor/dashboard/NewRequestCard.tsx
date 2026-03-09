import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { ServiceRequest } from "@/store/slices/vendor/dashboard/dashboardSlice";
import { CheckIcon, Clock, MapPin, XIcon } from "lucide-react";

const NewRequestCard = ({
  request,
  handleAccept,
  handleDecline,
}: {
  request: ServiceRequest;
  handleAccept: () => void;
  handleDecline: () => void;
}) => {
  return (
    <div
      key={request.orderId}
      className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex flex-col gap-2"
    >
      {/* Customer Info */}
      <div className="flex flex-col rounded-xl">
        <div className="flex items-start justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3 p-2">
            <Avatar
              src={request.customerImage}
              alt={request.customerName}
              size="sm"
              name={request.customerName}
              className="w-9 h-9 rounded-md"
            />

            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">
                Order ID: {request.orderId}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {request.customerName}
              </p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-bl-xl rounded-tr-xl">
              <Clock size={12} />
              <span className="text-xs font-semibold">{request.timeAgo}</span>
            </div>

            <div className="px-2">
              <Avatar
                src={request.customerImage}
                alt={request.customerName}
                size="xs"
                name={request.customerName}
              />
            </div>
          </div>
        </div>

        <Divider variant="solid" className="" />
      </div>

      {/* Vehicle Details */}
      <div className="flex flex-wrap gap-4 px-4">
        <div className="flex-1 min-w-[120px]">
          <p className="text-xs text-gray-500 mb-1">Reg. Number</p>
          <p className="text-xs font-semibold text-gray-900">
            {request.regNumber}
          </p>
        </div>
        <div className="flex-1 min-w-[120px]">
          <p className="text-xs text-gray-500 mb-1">Make & Model</p>
          <p className="text-xs font-semibold text-gray-900">
            {request.makeModel}
          </p>
        </div>
        <div className="flex-1 min-w-[120px]">
          <p className="text-xs text-gray-500 mb-1">Year</p>
          <p className="text-xs font-semibold text-gray-900">{request.year}</p>
        </div>
        <div className="flex-1 min-w-[120px]">
          <p className="text-xs text-gray-500 mb-1">Service Type</p>
          <p className="text-xs font-semibold text-gray-900">
            {request.serviceType}
          </p>
        </div>
      </div>

      {/* Walk-in Time */}
      <div className="flex items-center justify-between gap-0 bg-gray-100 px-4 py-2">
        <p className="text-xs text-red-600 font-medium">
          {request.date} , {request.time}
        </p>
        <p className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-1">
          <MapPin size={12} />
          Walk in {request.walkInTime}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 px-2 pb-2">
        <Button
          onClick={() => handleDecline()}
          endIcon={
            <XIcon className="w-4 h-4 bg-red-100 p-1 rounded-full text-red-500 font-medium" />
          }
          size="sm"
          variant="custom"
          className="flex-1 text-red-600 text-sm font-medium bg-red-100"
        >
          Decline
        </Button>
        <Button
          onClick={() => handleAccept()}
          endIcon={
            <CheckIcon className="w-4 h-4 bg-orange-300 p-1 rounded-full text-white font-medium" />
          }
          size="sm"
          className="flex-1"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default NewRequestCard;
