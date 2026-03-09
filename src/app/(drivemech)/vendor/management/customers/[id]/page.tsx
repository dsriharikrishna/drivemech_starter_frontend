"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

/* ── Section components ── */
import CustomerDetailsForm from "@/components/vendor/management/customers/CustomerDetailsForm";
import CustomerVehiclesSection from "@/components/vendor/management/customers/CustomerVehiclesSection";
import CustomerInvoicesSection from "@/components/vendor/management/customers/CustomerInvoicesSection";
import CustomerPaymentsSection from "@/components/vendor/management/customers/CustomerPaymentsSection";
import CustomerQuotesSection from "@/components/vendor/management/customers/CustomerQuotesSection";
import CustomerBookingsSection from "@/components/vendor/management/customers/CustomerBookingsSection";
import CustomerInspectionsSection from "@/components/vendor/management/customers/CustomerInspectionsSection";

/* ── Icons ── */
import {
    UserSearchIcon,
    CarFillIcon,
    DocumentTextIcon,
    ReceiptItemIcon,
    CalendarManagementIcon,
    IncomeIcon,
    UserIcon,
    ImportIcon,
} from "@/components/icons/ManagementModuleIcons";
import { DownloadIcon } from "@/components/icons/TransactionIcons";

/* ── Schema ── */
import { Customer, CustomerFormValues } from "@/schemas/vendor/customer.schema";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const mockCustomers: Customer[] = Array.from({ length: 10 }, (_, i) => ({
    id: `cust-${i + 1}`,
    sNo: String(i + 1).padStart(2, "0"),
    name: "John Doe",
    mobileNumber: "+91 70007 12345",
    location: "Hyderabad",
    customerType: "cash",
    email: "john.doe@example.com",
    vipCustomer: i % 3 === 0,
}));

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type ExpandedSection =
    | "details"
    | "vehicles"
    | "invoices"
    | "payments"
    | "quotes"
    | "bookings"
    | "inspections"
    | null;

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const CustomersAccordiansPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const customer = mockCustomers.find((c) => c.id === id) ?? null;

    const [expandedSection, setExpandedSection] =
        useState<ExpandedSection>("details");
    const [selectedCustomer] = useState<Customer | null>(customer);

    const toggleSection = (section: ExpandedSection) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const handleSaveCustomer = (data: CustomerFormValues) => {
        console.log("Save customer", data);
        setExpandedSection(null);
    };

    /* ── Helper: orange Add button used in each row header ── */
    const AddBtn = ({
        onClick,
    }: {
        onClick: (e: React.MouseEvent) => void;
    }) => (
        <button
            onClick={onClick}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
            <Plus size={13} />
            Add
        </button>
    );

    /* ── Section definitions ── */
    const sections = [
        {
            id: "details" as ExpandedSection,
            icon: (props: any) => <UserIcon {...props} />,
            title: selectedCustomer
                ? `Customer Details - ${selectedCustomer.name}`
                : "Customer Details",
            addButton: null,
            renderContent: () => (
                <CustomerDetailsForm
                    initialData={
                        selectedCustomer
                            ? {
                                customerType: selectedCustomer.customerType,
                                customerName: selectedCustomer.name,
                                mobileNumber: selectedCustomer.mobileNumber,
                                email: selectedCustomer.email,
                                salesTaxFree: false,
                                customerLimited: false,
                                vipCustomer: selectedCustomer.vipCustomer || false,
                            }
                            : undefined
                    }
                    onCancel={() => setExpandedSection(null)}
                    onSave={handleSaveCustomer}
                />
            ),
        },
        {
            id: "vehicles" as ExpandedSection,
            icon: (props: any) => <CarFillIcon {...props} />,
            title: "Customer Vehicles",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/customers/add-vehicle`);
                    }}
                />
            ),
            renderContent: () => (
                <CustomerVehiclesSection
                    customerId={selectedCustomer?.id || ""}
                    onEdit={(v) => router.push(`/vendor/management/customers/${id}/edit-vehicle?vehicleId=${v.id}`)}
                    onDelete={(v) => console.log("Delete vehicle", v.id)}
                />
            ),
        },
        {
            id: "invoices" as ExpandedSection,
            icon: (props: any) => <DocumentTextIcon {...props} />,
            title: "Customer Invoices",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/customers/${id}/add-invoice`);
                    }}
                />
            ),
            renderContent: () => (
                <CustomerInvoicesSection
                    customerId={selectedCustomer?.id || ""}
                    onEdit={(inv) => router.push(`/vendor/management/customers/${id}/edit-invoice?invoiceId=${inv.id}`)}
                    onDelete={(inv) => console.log("Delete invoice", inv.id)}
                />
            ),
        },
        {
            id: "payments" as ExpandedSection,
            icon: (props: any) => <IncomeIcon {...props} />,
            title: "Customer Payments",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/customers/${id}/add-payment`);
                    }}
                />
            ),
            renderContent: () => (
                <CustomerPaymentsSection
                    customerId={selectedCustomer?.id || ""}
                    onEdit={(p) => router.push(`/vendor/management/customers/${id}/edit-payment?paymentId=${p.id}`)}
                    onDelete={(p) => console.log("Delete payment", p.id)}
                />
            ),
        },
        {
            id: "quotes" as ExpandedSection,
            icon: (props: any) => <ReceiptItemIcon {...props} />,
            title: "Customer Quotes",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/customers/${id}/add-quote`);
                    }}
                />
            ),
            renderContent: () => (
                <CustomerQuotesSection
                    customerId={selectedCustomer?.id || ""}
                    onEdit={(q) => router.push(`/vendor/management/customers/${id}/edit-quote?quoteId=${q.id}`)}
                    onDelete={(q) => console.log("Delete quote", q.id)}
                />
            ),
        },
        {
            id: "bookings" as ExpandedSection,
            icon: (props: any) => <CalendarManagementIcon {...props} />,
            title: "Customer Bookings",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/customers/${id}/add-booking`);
                    }}
                />
            ),
            renderContent: () => (
                <CustomerBookingsSection
                    customerId={selectedCustomer?.id || ""}
                    onEdit={(b) => router.push(`/vendor/management/customers/${id}/edit-booking?bookingId=${b.id}`)}
                    onDelete={(b) => console.log("Delete booking", b.id)}
                />
            ),
        },
        {
            id: "inspections" as ExpandedSection,
            icon: (props: any) => <UserSearchIcon {...props} />,
            title: "Customer Inspections",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/customers/${id}/add-inspection`);
                    }}
                />
            ),
            renderContent: () => (
                <CustomerInspectionsSection
                    customerId={selectedCustomer?.id || ""}
                    onEdit={(ins) => router.push(`/vendor/management/customers/${id}/edit-inspection?inspectionId=${ins.id}`)}
                    onDelete={(ins) => console.log("Delete inspection", ins.id)}
                />
            ),
        },
    ];

    return (
        <div className="h-full w-full bg-white">
            <div className="p-2 flex flex-col gap-4 border border-gray-200 rounded-xl">
                <div className="flex flex-col gap-4 border border-gray-200 rounded-xl">

                    {/* Top bar */}
                    <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-800">Customers</span>
                        <div className="flex items-center gap-2">
                            {/* Import */}
                            <Button
                                variant="outline"
                                size="sm"
                                startIcon={
                                    <span className="text-blue-600">
                                        <ImportIcon size={15} />
                                    </span>
                                }
                                className="!border-blue-200 bg-white text-blue-600 hover:bg-blue-50 text-xs"
                            >
                                Import
                            </Button>
                            {/* Export */}
                            <Button
                                variant="outline"
                                size="sm"
                                startIcon={
                                    <span className="text-blue-600">
                                        <DownloadIcon size={15} />
                                    </span>
                                }
                                className="!border-blue-200 bg-white text-blue-600 hover:bg-blue-50 text-xs"
                            >
                                Export
                            </Button>
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-1 ml-2 text-sm text-gray-500">
                                <button
                                    onClick={() => router.back()}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Customers
                                </button>
                                <span className="text-gray-400">▶</span>
                                <span className="text-blue-600 font-medium cursor-pointer">Edit</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Accordion cards ── */}
                    <div className="flex flex-col gap-2 p-2">
                        {sections.map((section) => {
                            const Icon = section.icon as any;
                            const isExpanded = expandedSection === section.id;

                            return (
                                <div
                                    key={section.id}
                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                                >
                                    {/* Section Header */}
                                    <div
                                        className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors ${isExpanded ? "bg-blue-50 border-b border-gray-200" : ""
                                            }`}
                                    >
                                        <div
                                            onClick={() => toggleSection(section.id)}
                                            className="flex items-center gap-3 flex-1 cursor-pointer"
                                        >
                                            <Icon size={18} className="text-gray-900" />
                                            <h2 className="text-base font-semibold text-gray-900">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-4">
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

                                    {/* Section Content */}
                                    {isExpanded && (
                                        <div className="bg-white p-1 border border-gray-200">{section.renderContent()}</div>
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

export default CustomersAccordiansPage;
