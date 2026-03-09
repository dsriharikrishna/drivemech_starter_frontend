"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect /vendor/reports/all → /vendor/reports/sales by default
export default function AllReportsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/vendor/reports/sales");
  }, [router]);

  return null;
}
