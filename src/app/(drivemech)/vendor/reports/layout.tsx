"use client";

import React from "react";
import DashboardHeader from "@/components/vendor/ModuleHeader";
import { usePathname, useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";
import { ChartIcon } from "@/components/icons/ManageWorkshopIcons";

/* ---------------- REPORT ROUTES ---------------- */

const reportRoutes = [
    { id: "/vendor/reports/sales", label: "Sales Reports" },
    { id: "/vendor/reports/parts", label: "Parts Reports" },
    { id: "/vendor/reports/vendor", label: "Vendor Reports" },
    { id: "/vendor/reports/workshop", label: "Workshop Reports" },
    { id: "/vendor/reports/mechanic", label: "Mechanic Reports" },
    { id: "/vendor/reports/customers-tab", label: "Customer Reports" },
    { id: "/vendor/reports/log", label: "Log Reports" },
];

/* ---------------- LAYOUT ---------------- */

export default function ReportsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Determine which tab is active based on the current pathname
    const activeTabId = reportRoutes.find((r) => pathname.startsWith(r.id))?.id;

    // Only show tab nav on the sub-report pages, not on /vendor/reports root
    if (!activeTabId) {
        return <>{children}</>;
    }

    return (
        <div className="bg-gray-50 flex flex-col gap-1">
            <DashboardHeader
                title="Reports"
                breadcrumbs={[
                    { label: "Reports", href: "/vendor/reports" },
                    { label: "Business Reports" },
                ]}
                icon={<ChartIcon size={20} />}
            />

            <div className="p-1 flex flex-col gap-2">
                {/* Tab Navigation Wrapper */}
                <div className="bg-white p-1 rounded-xl border border-gray-100 shadow-sm overflow-x-auto scrollbar-hide">
                    <Tabs
                        tabs={reportRoutes}
                        activeTab={activeTabId}
                        onTabChange={(id) => router.push(id)}
                        variant="pills"
                    />
                </div>

                {/* Page Content */}
                <div className="">{children}</div>
            </div>
        </div>
    );
}
