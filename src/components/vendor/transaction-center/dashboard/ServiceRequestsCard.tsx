import { ServiceRequest } from "@/lib/schemas/transaction-center";
import Avatar from "@/components/ui/Avatar";
import { ArrowRight, Check, X } from "lucide-react";
import { Clock } from "phosphor-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import NewRequestCard from "../../dashboard/NewRequestCard";

interface ServiceRequestsTableProps {
  requests: ServiceRequest[];
}

export default function ServiceRequestsCard({
  requests,
}: ServiceRequestsTableProps) {
  const router = useRouter();
  // Helper to format date
  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    const d = typeof date === "string" ? new Date(date) : date;
    // Format: Thursday, Oct 13, 2024
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleAccept = (request: ServiceRequest) => {
    // TODO: Implement accept logic (e.g., dispatch Redux action or call API)
    console.log("Accepting request:", request);
  };

  const handleDecline = (request: ServiceRequest) => {
    // TODO: Implement decline logic (e.g., dispatch Redux action or call API)
    console.log("Declining request:", request);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-auto lg:h-[calc(100vh-120px)] min-h-[400px]">
      <div className="bg-slate-800 px-6 py-3 flex items-center justify-between shrink-0">
        <h3 className="text-white font-semibold">
          New Service ({requests.length})
        </h3>
        <button
          onClick={() => {
            router.push("/vendor/operations/transaction-center/new-services");
          }}
          className="cursor-pointer text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 overflow-y-auto flex-1">
        {requests.map((request) => (
          <NewRequestCard
            key={request.orderId}
            request={{
              orderId: request.orderId,
              customerName: request.customerName,
              customerImage: "", // Not available in current schema
              regNumber: request.vehicleRegNo,
              makeModel: `${request.vehicleMake} ${request.vehicleModel}`,
              year: request.year || "N/A",
              serviceType: request.serviceType,
              walkInTime: request.scheduledTime || "Not Scheduled",
              timeAgo: formatDate(request.date), // Not available or calculation needed
              date:
                typeof request.date === "string"
                  ? request.date
                  : request.date.toLocaleDateString(),
              time: request.timeSlot || "",
            }}
            handleAccept={() => handleAccept(request)}
            handleDecline={() => handleDecline(request)}
          />
        ))}
      </div>
    </div>
  );
}
