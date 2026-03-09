"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronDown, ChevronUp, Plus,
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
    PackageIcon,
    DocumentTextIcon,
    HistoryIcon,
    PriceTagsIcon,
    ReceiptMinusIcon,
    SettingIcon
} from "@/components/icons/InventoryIcons";

/* ── Section components ── */
import ProductDetailsForm from "@/components/vendor/inventory/inventory/ProductDetailsForm";
import ProductInvoicesTable from "@/components/vendor/inventory/inventory/ProductInvoicesTable";

/* ── Schema ── */
import { Product } from "@/schemas/vendor/product.schema";
import { ProductInvoice } from "@/schemas/vendor/invoice.schema";

/* ── Mock Data ── */
const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
    id: `prod-${i + 1}`,
    itemCode: `BK0${i + 1}`,
    name: "Brake Pads",
    brand: "ABC",
    retailPrice: 100.0,
    storePrice: 50.0,
    inStock: 10,
    warranty: "1 Year",
}));

const mockInvoices: ProductInvoice[] = Array.from({ length: 5 }, (_, i) => ({
    id: `inv-${i + 1}`,
    invoiceNo: `#${1234 + i}`,
    customer: "John Wick",
    postDate: "27/5/25",
    tranType: "Invoice",
    status: "Processed",
    qty: 10,
    amount: 1234.0,
}));

/* ── Types ── */
type ExpandedSection =
    | "product-info"
    | "product-invoices"
    | "part-orders"
    | "purchase-history"
    | "stock-take-log"
    | null;

/* ── Page ── */
const ProductDetailPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const product = mockProducts.find((p) => p.id === id) ?? mockProducts[0];

    const [expandedSection, setExpandedSection] = useState<ExpandedSection>("product-info");

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
        /* 1. Product Info */
        {
            id: "product-info" as ExpandedSection,
            icon: PriceTagsIcon,
            title: product
                ? `${product.itemCode} – ${product.name}`
                : "Product Info",
            addButton: null,
            renderContent: () => (
                <ProductDetailsForm
                    onCancel={() => setExpandedSection(null)}
                    onSave={(data) => {
                        console.log("Save product", data);
                        setExpandedSection(null);
                    }}
                />
            ),
        },

        /* 2. Product Invoices */
        {
            id: "product-invoices" as ExpandedSection,
            icon: ReceiptMinusIcon,
            title: "Product Invoices",
            addButton: (
                <AddBtn
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vendor/inventory/inventory/${id}/add-invoice`);
                    }}
                />
            ),
            renderContent: () => (
                <ProductInvoicesTable
                    invoices={mockInvoices}
                    onInvoiceClick={() => {
                        router.push(`/vendor/inventory/inventory/${id}/add-invoice`);
                    }}
                />
            ),
        },

        /* 3. Part Orders */
        {
            id: "part-orders" as ExpandedSection,
            icon: SettingIcon,
            title: "Part Orders",
            // addButton: (
            //     <AddBtn
            //         onClick={(e) => {
            //             e.stopPropagation();
            //             router.push(`/vendor/inventory/inventory/${id}/add-part-order`);
            //         }}
            //     />
            // ),
            renderContent: () => (
                <div className="p-4 text-sm text-gray-500">Part Orders – coming soon.</div>
            ),
        },

        /* 4. Purchase History */
        {
            id: "purchase-history" as ExpandedSection,
            icon: HistoryIcon,
            title: "Purchase History",
            addButton: null,
            renderContent: () => (
                <div className="p-4 text-sm text-gray-500">Purchase History – coming soon.</div>
            ),
        },

        /* 5. Stock Take Log */
        {
            id: "stock-take-log" as ExpandedSection,
            icon: DocumentTextIcon,
            title: "Stock Take Log",
            addButton: null,
            renderContent: () => (
                <div className="p-4 text-sm text-gray-500">Stock Take Log – coming soon.</div>
            ),
        },
    ];

    return (
        <div className="h-full w-full bg-white">
            <div className="p-2 flex flex-col gap-2 border border-gray-200 rounded-xl">

                {/* Top bar */}
                <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <PackageIcon size={20} />
                        <span className="text-sm font-semibold text-gray-800">Products</span>
                    </div>
                    <div className="flex items-center gap-2">

                        <div className="flex items-center gap-1 ml-2 text-sm text-gray-500">

                            <Button
                                onClick={() => router.push("/vendor/inventory/inventory")}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Products
                            </Button>
                            <span className="text-gray-400">▶</span>
                            <span className="text-blue-600 font-medium cursor-pointer">Edit</span>
                        </div>
                    </div>
                </div>

                {/* Accordion */}
                <div className="flex flex-col gap-2 p-2">
                    {sections.map((section) => {
                        const Icon = section.icon as any;
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
                                    <div className="bg-white p-4 border border-gray-200 ">
                                        {section.renderContent()}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;
