"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

/* ── Section components ── */
import VehicleDetailsForm from "@/components/vendor/management/vehicles/VehicleDetailsForm";
import VehicleBookingsTable from "@/components/vendor/management/vehicles/VehicleBookingsTable";
import VehicleInspectionsTable from "@/components/vendor/management/vehicles/VehicleInspectionsTable";
import VehicleHistoryTable from "@/components/vendor/management/vehicles/VehicleHistoryTable";
import MediaUploadSection from "@/components/forms/MediaUploadSection";
import ProductInvoicesTable from "@/components/vendor/inventory/inventory/ProductInvoicesTable";

/* ── Icons ── */
import {
    SearchingCarIcon,
    AttachSquareIcon,
    ReceiptMinusIcon,
    HistoryIcon,
    OnlineBookingIcon,
    DocumentTextIcon,
} from "@/components/icons/InventoryIcons";
import {
    ImportIcon,
} from "@/components/icons/ManagementModuleIcons";
import { DownloadIcon } from "@/components/icons/TransactionIcons";

/* ── Schema ── */
import { Vehicle, VehicleFormValues } from "@/schemas/vendor/vehicle.schema";
import { ProductInvoice } from "@/schemas/vendor/invoice.schema";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const mockVehicles: Vehicle[] = Array.from({ length: 10 }, (_, i) => ({
    id: `veh-${i + 1}`,
    regNumber: "TS09FJ0007",
    vehicleMake: "BMW",
    vehicleModel: "X7",
    customerName: "John Doe",
    vehicleModelCode: "G07",
    vehicleModelSeries: "2023",
    vin: "WBA1234567890",
    engineNumber: "B58B30M1",
    chassisNumber: "CH123456",
    engineCode: "B58",
    fleetCode: "FL-001",
    transmission: "opt1",
    ac: true,
    bodyType: "opt1",
    driveType: "opt1",
    fuelType: "opt1",
    regoDueDate: new Date("2025-05-20"),
    buildDate: new Date("2023-01-15"),
    nextServiceDate: new Date("2025-11-20"),
    nextServiceKms: 15000,
    manufacturingDate: new Date("2022-12-10"),
    cylinders: "6",
    tyreSize: "275/40R22",
    importedId: "IMP-123",
    notes: "Premium customer vehicle.",
}));

const mockInvoices: ProductInvoice[] = Array.from({ length: 5 }, (_, i) => ({
    id: `inv-${i + 1}`,
    invoiceNo: "#1234",
    customer: "John Doe",
    postDate: "27/5/25",
    tranType: "Invoice",
    status: "Processed",
    qty: 1,
    amount: 1234.0,
}));

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type ExpandedSection =
    | "details"
    | "attachments"
    | "invoices"
    | "history"
    | "bookings"
    | "inspections"
    | null;

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const VehicleAccordionPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const initialVehicle = mockVehicles.find((v) => v.id === id) ?? mockVehicles[0];

    const [expandedSection, setExpandedSection] = useState<ExpandedSection>("details");
    const [selectedVehicle] = useState<Vehicle | null>(initialVehicle);
    const [invoices] = useState<ProductInvoice[]>(mockInvoices);

    const toggleSection = (section: ExpandedSection) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    /* ── Helper: orange Add button used in each section header ── */
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
        /* ── 2. Vehicle Details ── */
        {
            id: "details" as ExpandedSection,
            icon: DocumentTextIcon,
            title: selectedVehicle
                ? `Details - ${selectedVehicle.vehicleMake} ${selectedVehicle.vehicleModel} (${selectedVehicle.regNumber})`
                : "Vehicle Details",
            addButton: null,
            headerExtra: null,
            renderContent: () => (
                <VehicleDetailsForm
                    initialData={selectedVehicle || {}}
                    onCancel={() => setExpandedSection(null)}
                    onSave={(data) => {
                        console.log("Save vehicle", data);
                        setExpandedSection(null);
                    }}
                />
            ),
        },

        /* ── 3. Attachments ── */
        {
            id: "attachments" as ExpandedSection,
            icon: AttachSquareIcon,
            title: "Attachments",
            addButton: null,
            headerExtra: null,
            renderContent: () => (
                <MediaUploadSection
                    onCancel={() => setExpandedSection(null)}
                    onSave={() => {
                        console.log("Save attachments");
                        setExpandedSection(null);
                    }}
                />
            ),
        },

        /* ── 4. Invoices ── */
        {
            id: "invoices" as ExpandedSection,
            icon: ReceiptMinusIcon,
            title: "Vehicle Invoices",
            headerExtra: null,
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/vehicles/${id}/add-invoice`);
                    }}
                />
            ),
            renderContent: () => (
                <ProductInvoicesTable
                    invoices={invoices}
                    onInvoiceClick={() => {
                        router.push(`/vendor/management/vehicles/${id}/add-invoice`);
                    }}
                />
            ),
        },

        /* ── 5. History ── */
        {
            id: "history" as ExpandedSection,
            icon: HistoryIcon,
            title: "Imported Vehicle History",
            addButton: null,
            headerExtra: null,
            renderContent: () => <VehicleHistoryTable />,
        },

        /* ── 6. Bookings ── */
        {
            id: "bookings" as ExpandedSection,
            icon: OnlineBookingIcon,
            title: "Vehicle Bookings",
            headerExtra: null,
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/vehicles/${id}/add-booking`);
                    }}
                />
            ),
            renderContent: () => (
                <VehicleBookingsTable
                    onBookingClick={() => {
                        router.push(`/vendor/management/vehicles/${id}/add-booking`);
                    }}
                />
            ),
        },

        /* ── 7. Inspections ── */
        {
            id: "inspections" as ExpandedSection,
            icon: SearchingCarIcon,

            title: "Vehicle Inspections",
            headerExtra: null,
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/management/vehicles/${id}/add-inspection`);
                    }}
                />
            ),
            renderContent: () => (
                <VehicleInspectionsTable
                    onInspectionClick={() => {
                        router.push(`/vendor/management/vehicles/${id}/add-inspection`);
                    }}
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
                        <div className="flex items-center gap-2">
                            <SearchingCarIcon size={20} />
                            <span className="text-sm font-semibold text-gray-800">Vehicles</span>
                        </div>
                        <div className="flex items-center gap-2">
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
                            <div className="flex items-center gap-1 ml-2 text-sm text-gray-500">
                                <Button
                                    onClick={() => router.back()}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Vehicles
                                </Button>
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
                                        <div className="flex items-center gap-3">
                                            {/* Extra controls (search/import/export for vehicles section) */}
                                            {(section as any).headerExtra}
                                            {/* Orange add button */}
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

export default VehicleAccordionPage;
