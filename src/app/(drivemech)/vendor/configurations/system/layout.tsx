"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ModuleHeader from "@/components/vendor/ModuleHeader";

const breadcrumbMap: Record<string, string> = {
    "insurance-provider": "Insurance Provider",
    "logs": "View Logs",
    "tax-rates": "Manage Tax Rates / HSN Code",
    "message-template": "Manage Message Template",
    "terms-conditions": "Manage Term & Conditions",
    "vehicle-category": "Vehicle Category Info",
    "vehicle-checklist": "Manage Vehicle Checklists",
    "vehicle-models": "Manage Vehicle Models",
    "vendors-purchases": "Manage Vendors & Purchases",
};

export default function SystemConfigurationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];

    // Only show ModuleHeader if we are in a sub-page, or handles root page.
    const label = breadcrumbMap[lastSegment];

    return (
        <div className="p-0 space-y-6">
            {label && (
                <ModuleHeader
                    title="System Configuration"
                    breadcrumbs={[
                        {
                            label: "System Configuration",
                            href: "/vendor/configurations/system",
                        },
                        { label: label },
                    ]}
                />
            )}
            {children}
        </div>
    );
}
