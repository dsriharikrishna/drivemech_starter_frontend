"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Tabs from "@/components/ui/Tabs";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Table, { TableColumn } from "@/components/ui/Table";
import { Plus, Trash2, Calendar } from "lucide-react";

// ─── Schema ──────────────────────────────────────────────────────────────────

const lineItemSchema = z.object({
    product: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number(),
    unitPrice: z.number(),
});

const addBookingSchema = z.object({
    reference: z.string().optional(),
    customerOrderNumber: z.string().optional(),
    bookingDate: z.string().optional(),
    dueBy: z.string().optional(),
    description: z.string().optional(),
    updateInsuranceDetails: z.boolean(),
    lineItems: z.array(lineItemSchema),
    eventNotes: z.string().optional(),
    jobCardNotes: z.string().optional(),
});

type AddBookingFormValues = z.infer<typeof addBookingSchema>;

type LineItemRow = {
    id: string;
    index: number;
    product: string;
    description: string;
    quantity: number;
    unitPrice: number;
};

const TAX_RATE = 0.1;

// ─── Page ─────────────────────────────────────────────────────────────────────

const AddBookingPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const [activeNotesTab, setActiveNotesTab] = useState("event-notes");
    const [updateInsurance, setUpdateInsurance] = useState(false);

    const methods = useForm<AddBookingFormValues>({
        resolver: zodResolver(addBookingSchema),
        defaultValues: {
            reference: "",
            customerOrderNumber: "",
            bookingDate: "",
            dueBy: "",
            description: "",
            updateInsuranceDetails: false,
            lineItems: [
                { product: "Product 01", description: "A \"lorem ipsum\" text generator is a tool that creates filler text for design and layout purposes.", quantity: 0, unitPrice: 0 },
                { product: "Product 02", description: "A \"lorem ipsum\" text generator is a tool that creates filler text for design and layout purposes.", quantity: 0, unitPrice: 0 },
            ],
            eventNotes: "",
            jobCardNotes: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "lineItems",
    });

    const lineItems = methods.watch("lineItems");

    const subTotal = lineItems.reduce((sum, item) => sum + (Number(item.unitPrice) * Number(item.quantity) || 0), 0);
    const freight = 0;
    const salesTax = subTotal * TAX_RATE;
    const total = subTotal + freight + salesTax;

    const tableRows: LineItemRow[] = fields.map((field, index) => ({
        id: field.id,
        index,
        product: lineItems[index]?.product ?? "",
        description: lineItems[index]?.description ?? "",
        quantity: lineItems[index]?.quantity ?? 0,
        unitPrice: lineItems[index]?.unitPrice ?? 0,
    }));

    const columns: TableColumn<LineItemRow>[] = [
        {
            key: "sno",
            header: "S.No",
            width: "52px",
            align: "center",
            render: (_, index) => <span className="text-sm text-gray-600">{index + 1}</span>,
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
                <div className="flex items-center justify-center">
                    <input
                        {...methods.register(`lineItems.${row.index}.quantity`, { valueAsNumber: true })}
                        type="number"
                        min={0}
                        className="w-16 text-center text-sm text-gray-700 border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                </div>
            ),
        },
        {
            key: "unitPrice",
            header: "Unit Price ($)",
            width: "112px",
            align: "center",
            render: (row) => (
                <input
                    {...methods.register(`lineItems.${row.index}.unitPrice`, { valueAsNumber: true })}
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
                return <span className="text-sm text-gray-700">{(qty * price * (1 + TAX_RATE)).toFixed(2)}</span>;
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
        { id: "event-notes", label: "Event Notes" },
        { id: "job-card-notes", label: "Job Card Notes" },
    ];

    const onSubmit = (data: AddBookingFormValues) => {
        console.log("Add booking", data);
        router.back();
    };

    return (
        <FormProvider {...methods}>
            <div className="w-full bg-white min-h-screen">
                <div className="border border-gray-200 rounded-2xl overflow-hidden">

                    {/* ── Bookings Header ─────────────────────────────────── */}
                    <div className="bg-[#EEF3FB] px-5 py-3.5 border-b border-gray-200 rounded-t-2xl">
                        <h2 className="text-sm font-semibold text-gray-800">Bookings</h2>
                    </div>

                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="p-5 space-y-5">

                            {/* Row 1: Reference | Customer Order Number */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Reference</label>
                                    <input {...methods.register("reference")} placeholder="Enter Reference" className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Customer Order Number <span className="text-red-500">*</span></label>
                                    <input {...methods.register("customerOrderNumber")} className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>

                            {/* Row 2: Booking Date | Due By */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Booking Date</label>
                                    <div className="relative">
                                        <input {...methods.register("bookingDate")} placeholder="Select" className="w-full h-9 px-3 pr-9 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
                                        <Calendar size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Due By</label>
                                    <div className="relative">
                                        <input {...methods.register("dueBy")} placeholder="Select" className="w-full h-9 px-3 pr-9 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
                                        <Calendar size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Description | Update Insurance Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <div>
                                    <input {...methods.register("description")} placeholder="Description" className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400" />
                                </div>
                                <div className="flex items-center gap-3 h-9">
                                    <span className="text-sm text-gray-700">Update Insurance Details</span>
                                    <ToggleSwitch checked={updateInsurance} onChange={(val) => { setUpdateInsurance(val); methods.setValue("updateInsuranceDetails", val); }} size="sm" variant="primary" />
                                </div>
                            </div>

                        </div>

                        {/* ── Job Card Section ────────────────────────────── */}
                        <div>
                            <div className="bg-[#EEF3FB] px-5 py-3 border-y border-gray-200">
                                <h2 className="text-sm font-semibold text-gray-800">Job Card</h2>
                            </div>

                            <div className="p-5 space-y-4">

                                {/* Line Items Table */}
                                <div>
                                    <Table<LineItemRow>
                                        columns={columns}
                                        data={tableRows}
                                        keyExtractor={(row) => row.id}
                                        striped
                                        hoverable
                                        emptyMessage="No line items yet. Click Add to get started."
                                    />
                                    {/* Add button + Totals card */}
                                    <div className="border border-t-0 border-gray-200 rounded-b-lg px-4 py-3 flex items-start justify-between gap-6 bg-white">
                                        {/* Add Row button */}
                                        <Button
                                            type="button"
                                            variant="primary-blue"
                                            size="sm"
                                            startIcon={<Plus size={13} />}
                                            onClick={() => append({ product: "", description: "", quantity: 0, unitPrice: 0 })}
                                        >
                                            Add
                                        </Button>

                                        {/* Totals card */}
                                        <div className="min-w-[280px] border border-gray-200 rounded-xl bg-gray-50/60 overflow-hidden">
                                            <div className="divide-y divide-gray-200">
                                                <div className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600">
                                                    <span>Sub Total</span>
                                                    <span className="font-medium text-gray-800">${subTotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600">
                                                    <span>Freight</span>
                                                    <span className="font-medium text-gray-800">$ {freight.toFixed(2)}</span>
                                                </div>
                                                <div className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600">
                                                    <span>Sales Tax (10%)</span>
                                                    <span className="font-medium text-gray-800">$ {salesTax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex items-center justify-between px-4 py-2.5 text-sm bg-red-50">
                                                    <span className="font-semibold text-red-500">Total</span>
                                                    <span className="font-bold text-red-500">$ {total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Notes Tabs ─────────────────────────── */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="px-4 pt-2">
                                        <Tabs tabs={notesTabs} activeTab={activeNotesTab} onTabChange={setActiveNotesTab} />
                                    </div>
                                    <div className="p-1">
                                        {activeNotesTab === "event-notes" && <RichTextEditor name="eventNotes" placeholder="Body Text" />}
                                        {activeNotesTab === "job-card-notes" && <RichTextEditor name="jobCardNotes" placeholder="Body Text" />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Footer ──────────────────────────────────────── */}
                        <div className="flex items-center justify-center gap-4 py-5 border-t border-gray-100">
                            <Button type="button" variant="danger" size="md" onClick={() => router.back()} className="min-w-[140px]">Close</Button>
                            <Button type="button" variant="outline" size="md" onClick={methods.handleSubmit(onSubmit)} className="min-w-[140px] border-orange-400 text-orange-500 hover:bg-orange-50">Save</Button>
                            <Button type="submit" variant="primary" size="md" className="min-w-[140px]">Start Job</Button>
                        </div>
                    </form>

                </div>
            </div>
        </FormProvider>
    );
};

export default AddBookingPage;
