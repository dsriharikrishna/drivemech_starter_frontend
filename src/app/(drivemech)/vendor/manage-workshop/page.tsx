"use client";

import React, { useState } from "react";
import BasicInfoForm from "@/components/vendor/manage-workshop/workshop-settings/BasicInfoForm";
import WorkshopDetailsForm from "@/components/vendor/manage-workshop/workshop-settings/WorkshopDetailsForm";
import DocumentsManager from "@/components/vendor/manage-workshop/workshop-settings/DocumentsManager";
import TaxSettingsForm from "@/components/vendor/manage-workshop/workshop-settings/TaxSettingsForm";
import InvoiceSettingsForm from "@/components/vendor/manage-workshop/workshop-settings/InvoiceSettingsForm";
import TimeZoneSecurityForm from "@/components/vendor/manage-workshop/workshop-settings/TimeZoneSecurityForm";
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Building2,
    FileCheck,
    Calculator,
    Receipt,
    Shield
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type ExpandedSection =
    | "basic-info"
    | "workshop-details"
    | "branch-locations"
    | "contact-details"
    | "documents"
    | "tax-settings"
    | "invoice-settings"
    | "timezone-security"
    | null;

/* ---------------- COMPONENT ---------------- */

const ManageWorkshopPage = () => {
    const [expandedSection, setExpandedSection] =
        useState<ExpandedSection>("basic-info");

    const toggleSection = (section: ExpandedSection) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const sections = [
        {
            id: "basic-info" as ExpandedSection,
            icon: FileText,
            title: "Basic Info",
            renderContent: () => <BasicInfoForm />,
        },
        {
            id: "workshop-details" as ExpandedSection,
            icon: Building2,
            title: "Workshop Details",
            renderContent: () => <WorkshopDetailsForm />,
        },
        {
            id: "documents" as ExpandedSection,
            icon: FileCheck,
            title: "Documents",
            renderContent: () => <DocumentsManager />,
        },
        {
            id: "tax-settings" as ExpandedSection,
            icon: Calculator,
            title: "Tax Settings",
            renderContent: () => <TaxSettingsForm />,
        },
        {
            id: "invoice-settings" as ExpandedSection,
            icon: Receipt,
            title: "Invoice Settings",
            renderContent: () => <InvoiceSettingsForm />,
        },
        {
            id: "timezone-security" as ExpandedSection,
            icon: Shield,
            title: "Time Zone & Security",
            renderContent: () => <TimeZoneSecurityForm />,
        },
    ];

    return (
        <div className="space-y-4">
            {sections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSection === section.id;

                return (
                    <div
                        key={section.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                        {/* Section Header */}
                        <div
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={20} className="text-gray-900" />
                                <h2 className="text-base font-semibold text-gray-900">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-4">
                                {isExpanded ? (
                                    <ChevronUp size={20} className="text-gray-600" />
                                ) : (
                                    <ChevronDown size={20} className="text-gray-600" />
                                )}
                            </div>
                        </div>

                        {/* Section Content */}
                        {isExpanded && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                {section.renderContent()}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ManageWorkshopPage;
