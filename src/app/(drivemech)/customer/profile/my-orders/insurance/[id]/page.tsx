"use client";

import PolicyDetailsPage from "@/components/customer/profile/orders/tabs/insurance/PolicyDetailsPage";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      localStorage.setItem("policyId", id);
    }
  }, [id]);

  if (!id) {
    return null; // or a loading state
  }

  return <PolicyDetailsPage id={id} />;
}