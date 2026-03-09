import React from "react";
import NewServiceDetailsPage from "@/components/vendor/transaction-center/new-services/NewServiceDetailsPage";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NewServiceDetailsPage id={id} />;
}
