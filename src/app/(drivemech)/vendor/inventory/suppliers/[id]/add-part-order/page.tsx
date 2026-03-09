"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierPartOrderFormSchema, SupplierPartOrderFormValues } from "@/schemas/vendor/supplier.schema";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Button from "@/components/ui/Button";
import { Settings } from "lucide-react";

const AddSupplierPartOrderPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const methods = useForm<SupplierPartOrderFormValues>({
        resolver: zodResolver(supplierPartOrderFormSchema),
        defaultValues: {
            orderNumber: "",
            orderDate: "",
            dueDate: "",
            lineItems: [],
            subTotal: 0,
            freight: 0,
            salesTax: 0,
            total: 0,
        },
    });

    const onSubmit = (data: SupplierPartOrderFormValues) => {
        console.log("Add supplier part order", data);
        router.back();
    };

    return (
        <FormProvider {...methods}>
            <div className="h-full w-full bg-white">
                <div className="p-3 flex flex-col gap-4 border border-gray-200 rounded-xl">
                    <div className="p-0 flex flex-col gap-1 border border-gray-200 rounded-xl">

                        {/* Header */}
                        <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Settings size={18} className="text-gray-700" />
                                <span className="text-sm font-semibold text-gray-800">Add Part Order</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <button
                                    onClick={() => router.push(`/vendor/inventory/suppliers/${id}`)}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Supplier
                                </button>
                                <span className="text-gray-400">▶</span>
                                <span className="text-blue-600 font-medium">Add Part Order</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Part Order Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <CommonTextInput name="orderNumber" label="Order Number *" placeholder="ORD-001" />
                                    <CommonTextInput name="orderDate" label="Order Date *" placeholder="DD/MM/YY" />
                                    <CommonTextInput name="dueDate" label="Due Date *" placeholder="DD/MM/YY" />
                                    <CommonTextInput name="freight" label="Freight" placeholder="0.00" />
                                    <CommonTextInput name="subTotal" label="Sub Total" placeholder="0.00" />
                                    <CommonTextInput name="salesTax" label="Sales Tax" placeholder="0.00" />
                                    <CommonTextInput name="total" label="Total" placeholder="0.00" />
                                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                                        <CommonTextArea name="note" label="Note" rows={3} placeholder="Enter any notes" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 pb-2">
                                <Button type="button" onClick={() => router.back()} variant="danger" size="md">Cancel</Button>
                                <Button type="submit" size="md" variant="primary">Save</Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default AddSupplierPartOrderPage;
