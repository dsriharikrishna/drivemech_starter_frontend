import UnderServicingDetailsPage from "@/components/vendor/transaction-center/under-servicing/UnderServicingDetailsPage";
import React from "react";

export default async function UnderServicingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <UnderServicingDetailsPage id={id} />;
}
