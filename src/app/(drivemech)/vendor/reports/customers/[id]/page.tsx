"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const CustomerDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    router.replace(`/vendor/reports/customers/${id}/service-history`);
  }, [id, router]);

  return null;
};

export default CustomerDetailPage;
