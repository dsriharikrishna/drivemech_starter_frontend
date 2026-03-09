"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronDown, ChevronUp, Plus,
    Package, FileText, CreditCard, Mail, Settings,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { ImportIcon } from "@/components/icons/ManagementModuleIcons";
import { DownloadIcon } from "@/components/icons/TransactionIcons";

/* ── Section components ── */
import SupplierDetailsSection from "@/components/vendor/inventory/suppliers/SupplierDetailsSection";
import SupplierPartOrdersSection from "@/components/vendor/inventory/suppliers/SupplierPartOrdersSection";
import SupplierInvoicesSection from "@/components/vendor/inventory/suppliers/SupplierInvoicesSection";
import SupplierPaymentsSection from "@/components/vendor/inventory/suppliers/SupplierPaymentsSection";
import SupplierMessagesSection from "@/components/vendor/inventory/suppliers/SupplierMessagesSection";

/* ── Schema ── */
import { Supplier } from "@/schemas/vendor/supplier.schema";

/* ── Mock Data ── */
const mockSuppliers: Supplier[] = [
    { id: "1", name: "Chopra, Rana and Bharadwaj", city: "Bhilwara", phone: "+91 70007 70007", website: "www.website.com" },
    { id: "2", name: "Kapoor-Iyengar", city: "Firozabad", phone: "+91 70007 70007", website: "www.website.com" },
    { id: "3", name: "Sample Corporation", city: "New Delhi", phone: "+91 70007 70007", website: "www.website.com" },
    { id: "4", name: "Sundry Supplier", city: "Hyderabad", phone: "+91 70007 70007", website: "www.website.com" },
    { id: "5", name: "Jagan", city: "Kadapa", phone: "+91 70007 70007", website: "www.website.com" },
    { id: "6", name: "Anji Reddy", city: "Guntur", phone: "+91 70007 70007", website: "www.website.com" },
];

/* ── Types ── */
type ExpandedSection =
    | "details"
    | "part-orders"
    | "invoices"
    | "payments"
    | "messages"
    | null;

/* ── Page ── */
const SupplierDetailPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const supplier = mockSuppliers.find((s) => s.id === id) ?? mockSuppliers[0];

    const [expandedSection, setExpandedSection] = useState<ExpandedSection>("details");

    /* Inline dialog state — kept for sections that still use internal dialogs */
    const [partOrderDialogMode, setPartOrderDialogMode] = useState<"add" | "edit">("add");
    const [isPartOrderDialogOpen, setIsPartOrderDialogOpen] = useState(false);
    const [invoiceDialogMode, setInvoiceDialogMode] = useState<"add" | "edit">("add");
    const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
    const [paymentDialogMode, setPaymentDialogMode] = useState<"add" | "edit">("add");
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

    const toggleSection = (section: ExpandedSection) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    /* Orange Add button */
    const AddBtn = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
        <button
            onClick={onClick}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
            <Plus size={13} />
            Add
        </button>
    );

    const sections = [
        /* 1. Supplier Details */
        {
            id: "details" as ExpandedSection,
            icon: Package,
            title: supplier ? `Details – ${supplier.name}` : "Supplier Details",
            addButton: null,
            renderContent: () => <SupplierDetailsSection />,
        },

        /* 2. Part Orders */
        {
            id: "part-orders" as ExpandedSection,
            icon: Settings,
            title: "Supplier Part Orders",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/inventory/suppliers/${id}/add-part-order`);
                    }}
                />
            ),
            renderContent: () => (
                <SupplierPartOrdersSection
                    dialogMode={partOrderDialogMode}
                    setDialogMode={setPartOrderDialogMode}
                    isDialogOpen={isPartOrderDialogOpen}
                    setIsDialogOpen={setIsPartOrderDialogOpen}
                />
            ),
        },

        /* 3. Invoices */
        {
            id: "invoices" as ExpandedSection,
            icon: FileText,
            title: "Supplier Invoices",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/inventory/suppliers/${id}/add-invoice`);
                    }}
                />
            ),
            renderContent: () => (
                <SupplierInvoicesSection
                    dialogMode={invoiceDialogMode}
                    setDialogMode={setInvoiceDialogMode}
                    isDialogOpen={isInvoiceDialogOpen}
                    setIsDialogOpen={setIsInvoiceDialogOpen}
                />
            ),
        },

        /* 4. Payments */
        {
            id: "payments" as ExpandedSection,
            icon: CreditCard,
            title: "Supplier Payments",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/inventory/suppliers/${id}/add-payment`);
                    }}
                />
            ),
            renderContent: () => (
                <SupplierPaymentsSection
                    dialogMode={paymentDialogMode}
                    setDialogMode={setPaymentDialogMode}
                    isDialogOpen={isPaymentDialogOpen}
                    setIsDialogOpen={setIsPaymentDialogOpen}
                />
            ),
        },

        /* 5. Messages */
        {
            id: "messages" as ExpandedSection,
            icon: Mail,
            title: "Supplier Messages",
            addButton: null,
            renderContent: () => <SupplierMessagesSection />,
        },
    ];

    return (
        <div className="h-full w-full bg-white">
            <div className="p-2 flex flex-col gap-4 border border-gray-200 rounded-xl">
                <div className="flex flex-col gap-4 border border-gray-200 rounded-xl">

                    {/* Top bar */}
                    <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">Suppliers</span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                startIcon={<span className="text-blue-600"><ImportIcon size={15} /></span>}
                                className="!border-blue-200 bg-white text-blue-600 hover:bg-blue-50 text-xs"
                            >
                                Import
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                startIcon={<span className="text-blue-600"><DownloadIcon size={15} /></span>}
                                className="!border-blue-200 bg-white text-blue-600 hover:bg-blue-50 text-xs"
                            >
                                Export
                            </Button>
                            <div className="flex items-center gap-1 ml-2 text-sm text-gray-500">
                                <button
                                    onClick={() => router.push("/vendor/inventory/suppliers")}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Suppliers
                                </button>
                                <span className="text-gray-400">▶</span>
                                <span className="text-blue-600 font-medium cursor-pointer">Edit</span>
                            </div>
                        </div>
                    </div>

                    {/* Accordion */}
                    <div className="flex flex-col gap-2 p-2">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            const isExpanded = expandedSection === section.id;

                            return (
                                <div
                                    key={section.id}
                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                                >
                                    {/* Header */}
                                    <div
                                        className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors ${isExpanded ? "bg-blue-50 border-b border-gray-200" : ""}`}
                                    >
                                        <div
                                            onClick={() => toggleSection(section.id)}
                                            className="flex items-center gap-3 flex-1 cursor-pointer"
                                        >
                                            <Icon size={18} className="text-gray-900" />
                                            <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {section.addButton}
                                            <button
                                                onClick={() => toggleSection(section.id)}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <ChevronUp size={20} className="text-gray-600" />
                                                ) : (
                                                    <ChevronDown size={20} className="text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    {isExpanded && (
                                        <div className="bg-white p-1 border border-gray-200">
                                            {section.renderContent()}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SupplierDetailPage;
