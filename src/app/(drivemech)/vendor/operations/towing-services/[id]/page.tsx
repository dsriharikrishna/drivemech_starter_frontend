"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TowingRequestDetails from "@/components/vendor/operations/towing/TowingRequestDetails";

interface TowingRequestDetailPageProps {
  params: Promise<{ id: string }>;
}

const TowingRequestDetailPage = ({ params }: TowingRequestDetailPageProps) => {
  const router = useRouter();
  const [requestId, setRequestId] = React.useState<string>("");

  React.useEffect(() => {
    params.then((p) => setRequestId(p.id));
  }, [params]);

  // In a real app, you would fetch the request data based on the ID
  const sampleRequest = {
    id: "1",
    requestId: requestId,
    priority: "high" as const,
    createdAt: "22 Nov, 09:30 AM",
    status: "new" as const,
    customerInfo: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      address: "123, MG Road, Koramangala, Bangalore - 560034",
    },
    vehicleDetails: {
      makeModel: "Hyundai Creta",
      year: "2022",
      registration: "KA-01-AB-1234",
      color: "White",
    },
    breakdownDetails: {
      issueType: "Engine Breakdown",
      description: "Engine stopped suddenly while driving. Strange noise from engine bay. Unable to restart.",
    },
    breakdownLocation: {
      location: "MG Road, Near Metro Station",
      landmark: "Opposite Prestige Mall",
      distanceFromWorkshop: "5.2 km",
    },
  };

  if (!requestId) return null;

  return (
    <div className="w-full h-full bg-gray-50">
      <TowingRequestDetails
        request={sampleRequest}
        onBack={() => router.back()}
      />
    </div>
  );
};

export default TowingRequestDetailPage;
