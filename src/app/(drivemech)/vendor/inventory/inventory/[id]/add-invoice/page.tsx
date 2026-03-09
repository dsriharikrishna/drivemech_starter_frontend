"use client";

import React, { use, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import ModalDropdown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Tabs from "@/components/ui/Tabs";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Table, { TableColumn } from "@/components/ui/Table";
import { FileText, Plus, Trash2, ChevronDown } from "lucide-react";

// ─── Schema ──────────────────────────────────────────────────────────────────

const lineItemSchema = z.object({
    product: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().min(0),
    unitPrice: z.number().min(0),
});

const addInvoiceSchema = z.object({
    invoiceNumber: z.string().optional(),
    jobCardNumber: z.string().optional(),
    orderNumber: z.string().optional(),
    postDate: z.string().optional(),
    invoiceType: z.string().optional(),
    accountType: z.boolean(),
    nextServiceKms: z.string().optional(),
    jobStatus: z.string().optional(),
    jobStatusComments: z.string().optional(),
    internalInvoice: z.boolean(),
    paymentTerms: z.string().optional(),
    customerSource: z.string().optional(),
    lineItems: z.array(lineItemSchema),
    invoiceNotes: z.string().optional(),
    jobCardNotes: z.string().optional(),
});

type AddInvoiceFormValues = z.infer<typeof addInvoiceSchema>;

// ─── Line Item type used by Table ────────────────────────────────────────────
type LineItemRow = {
    id: string;
    index: number;
    product: string;
    description: string;
    quantity: number;
    unitPrice: number;
};

// ─── Dropdown Options ─────────────────────────────────────────────────────────

const invoiceTypeOptions = [
    { id: "standard", name: "Standard" },
    { id: "credit", name: "Credit Note" },
    { id: "debit", name: "Debit Note" },
];

const jobStatusOptions = [
    { id: "open", name: "Open" },
    { id: "in-progress", name: "In Progress" },
    { id: "completed", name: "Completed" },
    { id: "cancelled", name: "Cancelled" },
];

const paymentTermsOptions = [
    { id: "cod", name: "Cash on Delivery" },
    { id: "net-30", name: "Net 30" },
    { id: "net-60", name: "Net 60" },
    { id: "prepaid", name: "Prepaid" },
];

const customerSourceOptions = [
    { id: "walk-in", name: "Walk-in" },
    { id: "referral", name: "Referral" },
    { id: "online", name: "Online" },
    { id: "repeat", name: "Repeat Customer" },
];

const TAX_RATE = 0.1;

// ─── Page ─────────────────────────────────────────────────────────────────────

const AddProductInvoicePage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const [activeNotesTab, setActiveNotesTab] = useState("invoice-notes");
    const [selectedInvoiceType, setSelectedInvoiceType] = useState<{ id: string; name: string } | null>(null);
    const [selectedJobStatus, setSelectedJobStatus] = useState<{ id: string; name: string } | null>(null);
    const [selectedPaymentTerms, setSelectedPaymentTerms] = useState<{ id: string; name: string } | null>(null);
    const [selectedCustomerSource, setSelectedCustomerSource] = useState<{ id: string; name: string } | null>(null);
    const [accountType, setAccountType] = useState(false);
    const [internalInvoice, setInternalInvoice] = useState(false);

    const methods = useForm<AddInvoiceFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(addInvoiceSchema) as any,
        defaultValues: {
            invoiceNumber: "",
            jobCardNumber: "",
            orderNumber: "",
            postDate: "",
            invoiceType: "",
            accountType: false,
            nextServiceKms: "",
            jobStatus: "",
            jobStatusComments: "",
            internalInvoice: false,
            paymentTerms: "",
            customerSource: "",
            lineItems: [
                { product: "Product 01", description: "A \"lorem ipsum\" text generator is a tool that creates filler text for design and layout purposes.", quantity: 0, unitPrice: 0 },
                { product: "Product 02", description: "A \"lorem ipsum\" text generator is a tool that creates filler text for design and layout purposes.", quantity: 0, unitPrice: 0 },
            ],
            invoiceNotes: "",
            jobCardNotes: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "lineItems",
    });

    const lineItems = methods.watch("lineItems");

    // Computed totals
    const subTotal = lineItems.reduce((sum, item) => sum + (Number(item.unitPrice) * Number(item.quantity) || 0), 0);
    const freight = 0;
    const salesTax = subTotal * TAX_RATE;
    const total = subTotal + freight + salesTax;

    // Build table rows from field array
    const tableRows: LineItemRow[] = fields.map((field, index) => ({
        id: field.id,
        index,
        product: lineItems[index]?.product ?? "",
        description: lineItems[index]?.description ?? "",
        quantity: lineItems[index]?.quantity ?? 0,
        unitPrice: lineItems[index]?.unitPrice ?? 0,
    }));

    // ─── Table Columns ────────────────────────────────────────────────────────
    const columns: TableColumn<LineItemRow>[] = [
        {
            key: "sno",
            header: "S.No",
            width: "52px",
            align: "center",
            render: (_, index) => (
                <span className="text-sm text-gray-600">{index + 1}</span>
            ),
        },
        {
            key: "product",
            header: "Product",
            width: "160px",
            render: (row) => (
                <input
                    {...methods.register(`lineItems.${row.index}.product`)}
                    className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
                    placeholder="Product name"
                />
            ),
        },
        {
            key: "description",
            header: "Description",
            render: (row) => (
                <textarea
                    {...methods.register(`lineItems.${row.index}.description`)}
                    rows={2}
                    className="w-full text-xs text-gray-500 bg-transparent focus:outline-none resize-none leading-relaxed"
                    placeholder="Description..."
                />
            ),
        },
        {
            key: "quantity",
            header: "Quantity",
            width: "96px",
            align: "center",
            render: (row) => (
                <input
                    {...methods.register(`lineItems.${row.index}.quantity`)}
                    type="number"
                    min={0}
                    className="w-full text-center text-sm text-gray-700 bg-transparent focus:outline-none"
                />
            ),
        },
        {
            key: "unitPrice",
            header: "Unit Price ($)",
            width: "112px",
            align: "center",
            render: (row) => (
                <input
                    {...methods.register(`lineItems.${row.index}.unitPrice`)}
                    type="number"
                    min={0}
                    step={0.01}
                    className="w-full text-center text-sm text-gray-700 bg-transparent focus:outline-none"
                />
            ),
        },
        {
            key: "tax",
            header: "Tax (10%)",
            width: "96px",
            align: "center",
            render: (row) => {
                const tax = (Number(lineItems[row.index]?.quantity) || 0) * (Number(lineItems[row.index]?.unitPrice) || 0) * TAX_RATE;
                return <span className="text-sm text-gray-700">{tax.toFixed(2)}</span>;
            },
        },
        {
            key: "total",
            header: "Total",
            width: "96px",
            align: "center",
            render: (row) => {
                const qty = Number(lineItems[row.index]?.quantity) || 0;
                const price = Number(lineItems[row.index]?.unitPrice) || 0;
                const rowTotal = qty * price * (1 + TAX_RATE);
                return <span className="text-sm text-gray-700">{rowTotal.toFixed(2)}</span>;
            },
        },
        {
            key: "actions",
            header: "Actions",
            width: "64px",
            align: "center",
            render: (row) => (
                <button
                    type="button"
                    onClick={() => remove(row.index)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Trash2 size={15} />
                </button>
            ),
        },
    ];

    const notesTabs = [
        { id: "invoice-notes", label: "Invoice Notes" },
        { id: "job-card-notes", label: "Job Card Notes" },
    ];

    const onSubmit = (data: AddInvoiceFormValues) => {
        console.log("Add invoice", data);
        router.back();
    };

    const handleTabChange = useCallback((tab: string) => {
        setActiveNotesTab(tab);
    }, []);

    return (
        <FormProvider {...methods}>
            <div className="w-full bg-white min-h-screen">
                <div className="border border-gray-200 rounded-2xl overflow-hidden">

                    {/* ── Header ─────────────────────────────────────────── */}
                    <div className="bg-[#EEF3FB] px-5 py-3.5 flex items-center justify-between border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-gray-700" />
                            <span className="text-sm font-semibold text-gray-800">Customer Invoices</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="primary-blue"
                                size="sm"
                                startIcon={<Plus size={14} />}
                                onClick={() => append({ product: "", description: "", quantity: 0, unitPrice: 0 })}
                            >
                                Add
                            </Button>
                            <button
                                type="button"
                                className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* ── Form ────────────────────────────────────────────── */}
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="p-5 space-y-5">

                            {/* Row 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Invoice Number</label>
                                    <input {...methods.register("invoiceNumber")} className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Job Card Number</label>
                                    <input {...methods.register("jobCardNumber")} className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Order Number</label>
                                    <input {...methods.register("orderNumber")} className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Post Date</label>
                                    <div className="relative">
                                        <input {...methods.register("postDate")} placeholder="Select Start Date" className="w-full h-9 px-3 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Invoice type</label>
                                    <ModalDropdown items={invoiceTypeOptions} selectedItem={selectedInvoiceType} onSelect={(item) => { setSelectedInvoiceType(item); methods.setValue("invoiceType", item.id); }} placeholder="Select" buttonClassName="!h-9 !rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Account Type</label>
                                    <div className="flex items-center h-9">
                                        <ToggleSwitch checked={accountType} onChange={(val) => { setAccountType(val); methods.setValue("accountType", val); }} size="sm" variant="primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Next Service - KMs</label>
                                    <input {...methods.register("nextServiceKms")} className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Job Status</label>
                                    <ModalDropdown items={jobStatusOptions} selectedItem={selectedJobStatus} onSelect={(item) => { setSelectedJobStatus(item); methods.setValue("jobStatus", item.id); }} placeholder="Select" buttonClassName="!h-9 !rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Job Status Comments</label>
                                    <input {...methods.register("jobStatusComments")} className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Internal Invoice</label>
                                    <div className="flex items-center h-9">
                                        <ToggleSwitch checked={internalInvoice} onChange={(val) => { setInternalInvoice(val); methods.setValue("internalInvoice", val); }} size="sm" variant="primary" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Payment Terms</label>
                                    <ModalDropdown items={paymentTermsOptions} selectedItem={selectedPaymentTerms} onSelect={(item) => { setSelectedPaymentTerms(item); methods.setValue("paymentTerms", item.id); }} placeholder="Select" buttonClassName="!h-9 !rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Customer Source</label>
                                    <ModalDropdown items={customerSourceOptions} selectedItem={selectedCustomerSource} onSelect={(item) => { setSelectedCustomerSource(item); methods.setValue("customerSource", item.id); }} placeholder="Select" buttonClassName="!h-9 !rounded-lg" />
                                </div>
                            </div>

                            {/* ── Line Items Table (uses shared Table component) ── */}
                            <div>
                                <Table<LineItemRow>
                                    columns={columns}
                                    data={tableRows}
                                    keyExtractor={(row) => row.id}
                                    striped
                                    hoverable
                                    emptyMessage="No line items yet. Click Add to get started."
                                />

                                {/* Table Footer: Add Button + Totals */}
                                <div className="border border-t-0 border-gray-200 rounded-b-lg px-4 py-3 flex items-start justify-between gap-4 bg-white">
                                    <Button
                                        type="button"
                                        variant="primary-blue"
                                        size="sm"
                                        startIcon={<Plus size={13} />}
                                        onClick={() => append({ product: "", description: "", quantity: 0, unitPrice: 0 })}
                                    >
                                        Add
                                    </Button>
                                    <div className="min-w-[260px] space-y-1.5 text-sm border border-gray-200 rounded-lg p-2">
                                        <div className="flex items-center justify-between text-gray-600">
                                            <span>Sub Total</span>
                                            <span className="font-medium text-gray-800">${subTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600">
                                            <span>Freight</span>
                                            <span className="font-medium text-gray-800">$ {freight.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600">
                                            <span>Sales Tax (10%)</span>
                                            <span className="font-medium text-gray-800">$ {salesTax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                                            <span className="font-semibold text-red-500">Total</span>
                                            <span className="font-bold text-red-500">$ {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Notes Tabs ───────────────────────────────── */}
                            <div className="rounded-xl overflow-hidden">
                                <div className="pt-2 px-1">
                                    <Tabs tabs={notesTabs} activeTab={activeNotesTab} onTabChange={handleTabChange} />
                                </div>
                                <div className="p-1">
                                    {activeNotesTab === "invoice-notes" && <RichTextEditor name="invoiceNotes" placeholder="Body Text" />}
                                    {activeNotesTab === "job-card-notes" && <RichTextEditor name="jobCardNotes" placeholder="Body Text" />}
                                </div>
                            </div>

                        </div>

                        {/* ── Footer ────────────────────────────────────────── */}
                        <div className="flex items-center justify-center gap-4 py-5 border-t border-gray-100">
                            <Button type="button" variant="outline" size="md" onClick={() => router.back()} className="min-w-[140px] border-orange-400 text-orange-500 hover:bg-orange-50">Cancel</Button>
                            <Button type="submit" variant="primary" size="md" className="min-w-[140px]">Save</Button>
                        </div>
                    </form>

                </div>
            </div>
        </FormProvider>
    );
};

export default AddProductInvoicePage;
