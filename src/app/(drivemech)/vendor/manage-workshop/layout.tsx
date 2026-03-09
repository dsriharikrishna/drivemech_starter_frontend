"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";

const ManageWorkshopLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();

    // Map pathnames to tab IDs
    const getActiveTab = () => {
        if (pathname.includes("/reminders")) return "reminders";
        if (pathname.includes("/messages")) return "messages";
        if (pathname.includes("/spares")) return "spares";
        if (pathname.includes("/towing-services")) return "towing-services";
        if (pathname.includes("/templates")) return "templates";
        return "workshop-settings";
    };

    const tabs = [
        { id: "workshop-settings", label: "Workshop Settings", href: "/vendor/manage-workshop" },
        { id: "reminders", label: "Reminders", href: "/vendor/manage-workshop/reminders" },
        { id: "messages", label: "Messages", href: "/vendor/manage-workshop/messages" },
        { id: "spares", label: "Spares", href: "/vendor/manage-workshop/spares" },
        { id: "towing-services", label: "Towing Services", href: "/vendor/manage-workshop/towing-services" },
        { id: "templates", label: "Templates", href: "/vendor/manage-workshop/templates" },
    ];

    const handleTabChange = (tabId: string) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (tab) {
            router.push(tab.href);
        }
    };

    return (
        <div className="min-h-full bg-white">
            <div className="px-2 py-0 flex flex-col gap-4">
                {/* Page Title */}
                <div className=" pt-4 bg-blue-50 rounded-lg p-2">
                    <h1 className="text-2xl font-bold text-gray-900">Manage Workshops</h1>
                </div>

                {/* Tabs */}
                <div className="">
                    <Tabs
                        tabs={tabs}
                        activeTab={getActiveTab()}
                        onTabChange={handleTabChange}
                    />
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl border border-gray-200 p-2">{children}</div>
            </div>
        </div>
    );
};

export default ManageWorkshopLayout;
