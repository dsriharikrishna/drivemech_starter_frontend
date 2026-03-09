"use client";

import React from "react";
import { ServiceRequest } from "@/store/slices/vendor/dashboard/dashboardSlice";
import NewRequestCard from "./NewRequestCard";
import { useRouter } from "next/navigation";

interface NewRequestsProps {
  requests: ServiceRequest[];
}

const NewRequests: React.FC<NewRequestsProps> = ({ requests }) => {
  const router = useRouter();
  const handleAccept = (request: ServiceRequest) => {
    // TODO: Implement accept logic (e.g., dispatch Redux action or call API)
    console.log("Accepting request:", request);
  };

  const handleDecline = (request: ServiceRequest) => {
    // TODO: Implement decline logic (e.g., dispatch Redux action or call API)
    console.log("Declining request:", request);
  };

  return (
    <div className="bg-white rounded-xl flex flex-col gap-2 p-4 shadow-sm h-full max-h-[400px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">New Requests</h2>
        <button onClick={() => router.push("/vendor/operations/transaction-center/new-services")} className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
          View All
          <span>→</span>
        </button>
      </div>

      {/* Request Cards */}
      <div className="space-y-2">
        {requests.map((request) => (
          <NewRequestCard
            key={request.orderId}
            request={request}
            handleAccept={() => handleAccept(request)}
            handleDecline={() => handleDecline(request)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRequests;
