"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { ClipboardList } from "lucide-react";

interface JobCardSectionProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export default function JobCardSection({
    isExpanded,
    onToggle,
}: JobCardSectionProps) {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "jobCardItems",
    });

    const jobCardItems = watch("jobCardItems") || [];

    const subTotal = jobCardItems.reduce(
        (sum: number, item: any) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
        0
    );
    const freight = Number(watch("freight")) || 0;
    const salesTax = Number(watch("salesTax")) || 0;
    const total = subTotal + freight + salesTax;

    const handleAddItem = () => {
        append({
            id: crypto.randomUUID(),
            product: "",
            description: "",
            quantity: 1,
            unitPrice: 0,
            tax: 0,
            total: 0,
        });
    };

    return (
        <Accordion
            title="Job Card"
            icon={<ClipboardList size={20} className="text-blue-600" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
            headerClassName="bg-blue-50 text-blue-900 hover:bg-blue-100"
        >
            <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
                    <Table
                        columns={[
                            {
                                key: "sNo",
                                header: "S.No",
                                width: "50px",
                                render: (_, index) => <span className="text-xs text-gray-500">{index + 1}</span>,
                            },
                            {
                                key: "product",
                                header: "Product",
                                width: "180px",
                                render: (_, index) => (
                                    <CommonTextInput name={`jobCardItems.${index}.product`} compact placeholder="Product" />
                                ),
                            },
                            {
                                key: "description",
                                header: "Description",
                                minWidth: "250px",
                                render: (_, index) => (
                                    <CommonTextArea name={`jobCardItems.${index}.description`} rows={1} placeholder="Description" className="text-xs" />
                                ),
                            },
                            {
                                key: "quantity",
                                header: "Quantity",
                                width: "80px",
                                render: (_, index) => (
                                    <CommonNumberInput name={`jobCardItems.${index}.quantity`} compact min={1} />
                                ),
                            },
                            {
                                key: "unitPrice",
                                header: "Unit Price ($)",
                                width: "100px",
                                render: (_, index) => (
                                    <CommonNumberInput name={`jobCardItems.${index}.unitPrice`} compact allowFloat />
                                ),
                            },
                            {
                                key: "tax",
                                header: "Tax (10%)",
                                width: "80px",
                                render: (_, index) => (
                                    <span className="text-xs text-gray-600">
                                        {((Number(watch(`jobCardItems.${index}.unitPrice`)) || 0) * (Number(watch(`jobCardItems.${index}.quantity`)) || 0) * 0.1).toFixed(2)}
                                    </span>
                                ),
                            },
                            {
                                key: "total",
                                header: "Total",
                                width: "100px",
                                render: (_, index) => {
                                    const qty = Number(watch(`jobCardItems.${index}.quantity`)) || 0;
                                    const price = Number(watch(`jobCardItems.${index}.unitPrice`)) || 0;
                                    const tax = qty * price * 0.1;
                                    return <span className="text-xs font-semibold text-gray-900">{(qty * price + tax).toFixed(2)}</span>;
                                },
                            },
                            {
                                key: "actions",
                                header: "Actions",
                                width: "60px",
                                render: (_, index) => (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                ),
                            },
                        ]}
                        data={fields}
                        keyExtractor={(item) => item.id}
                        striped={false}
                        hoverable
                        className="h-full"
                        style={{ height: "100%" }}
                    />
                </div>

                <div className="flex justify-between items-start mt-4">
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={handleAddItem}
                        startIcon={<Plus size={16} />}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Add
                    </Button>

                    <div className="w-64 space-y-2 p-4 flex flex-col border border-gray-100 rounded-md">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Sub Total</span>
                            <span className="font-semibold text-gray-900">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span className="text-gray-500">Freight</span>
                            <div className="w-20">
                                <CommonNumberInput name="freight" compact allowFloat placeholder="0.00" />
                            </div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Sales Tax (10%)</span>
                            <span className="font-semibold text-gray-900">${(subTotal * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-100">
                            <span className="text-red-500">Total</span>
                            <span className="text-red-500">${(subTotal * 1.1 + freight).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Accordion>
    );
}
