"use client";

import React from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Users } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import { CustomerReports2Icon } from "@/components/icons/DashboardIcons";

const CustomerDetailLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const id = params.id as string;

    const tabs = [
        { id: `/vendor/reports/customers/${id}/service-history`, label: "Service History" },
        { id: `/vendor/reports/customers/${id}/invoices`, label: "Invoices" },
        { id: `/vendor/reports/customers/${id}/vehicles`, label: "Vehicles" },
    ];

    const activeTab = tabs.find(tab => pathname === tab.id)?.id || tabs[0].id;

    const handleTabChange = (tabId: string) => {
        router.push(tabId);
    };

    const customerInfo = [
        { label: "Name", value: "John Doe" },
        { label: "Phone Number", value: "9876543210" },
        { label: "Email", value: "John@gmail.com" },
        { label: "Address", value: "123 Main Street, Jubilee Hills, Hyderabad, Telangana - 500018" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="px-2 py-2 space-y-4">
                {/* Breadcrumb */}
                <div className="bg-blue-50 px-2 py-2.5 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                        <CustomerReports2Icon size={16} className="text-gray-700" />
                        <span className="font-medium text-gray-900">Customer Reports</span>
                    </div>
                </div>

                {/* Customer Information Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Users size={20} className="text-gray-900" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Customer Information
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {customerInfo.map((info, idx) => (
                            <div key={idx}>
                                <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                                <p className="text-sm font-semibold text-gray-900">{info.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className="">
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        variant="default"
                    />
                </div>

                {/* Tab Content */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CustomerDetailLayout;
