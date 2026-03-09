import React from "react";
import { ServiceRequest } from "@/lib/schemas/transaction-center";
import UnderServicingCard from "./UnderServicingCard";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface UnderServicingSectionProps {
  requests: ServiceRequest[];
}

export default function UnderServicingSection({
  requests,
}: UnderServicingSectionProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="bg-slate-800 rounded-t-xl px-6 py-3 flex items-center justify-between">
        <h3 className="text-white  font-semibold text-base">Under Servicing</h3>
        <button
          onClick={() => {
            router.push(
              "/vendor/operations/transaction-center/under-servicing"
            );
          }}
          className="cursor-pointer text-gray-300 hover:text-white text-sm flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight size={16} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        {requests.map((request) => (
          <UnderServicingCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}
