"use client";

import PolicyDetailsPage from "@/components/customer/profile/orders/tabs/insurance/PolicyDetailsPage";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import cookieService from "@/services/cookieService";

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // ✅ Store policy ID in cookies (more secure than localStorage)
  useEffect(() => {
    if (id) {
      cookieService.set("policyId", id, {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
      });
    }
  }, [id]);

  if (!id) {
    return null; // or a loading state
  }

  return <PolicyDetailsPage id={id} />;
}