"use client";

import React from "react";
import DashboardHeader from "@/components/vendor/ModuleHeader";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";

/* ---------------- REPORT ROUTES ---------------- */

const reportRoutes = [
  { label: "Sales Reports", href: "/vendor/reports/sales" },
  { label: "Parts Reports", href: "/vendor/reports/parts" },
  { label: "Vendor Reports", href: "/vendor/reports/vendor" },
  { label: "Workshop Reports", href: "/vendor/reports/workshop" },
  { label: "Mechanic Reports", href: "/vendor/reports/mechanic" },
  { label: "Customer Reports", href: "/vendor/reports/customers" },
  { label: "Log Reports", href: "/vendor/reports/log" },
];

/* ---------------- COMPONENT ---------------- */

const AllReportsLayout = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = reportRoutes.map((route) => ({
    id: route.href,
    label: route.label,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Reports"
        breadcrumbs={[
          { label: "Reports", href: "/vendor/reports" },
          { label: "Business Reports" },
        ]}
      />

      <div className="p-2">
        {/* Tab Navigation */}
        <Tabs
          tabs={tabs}
          activeTab={pathname}
          onTabChange={(id) => router.push(id)}
          variant="pills"
        />  

        {/* Content */}
        <div className="px-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AllReportsLayout;
