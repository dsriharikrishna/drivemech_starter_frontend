"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierPaymentSchema, SupplierPaymentFormValues } from "@/schemas/vendor/supplier.schema";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import Button from "@/components/ui/Button";
import { CreditCard } from "lucide-react";

const AddSupplierPaymentPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const methods = useForm<SupplierPaymentFormValues>({
        resolver: zodResolver(supplierPaymentSchema),
        defaultValues: {
            paymentNumber: "",
            postDate: "",
            status: "",
            appliedAmount: "",
            amount: 0,
        },
    });

    const onSubmit = (data: SupplierPaymentFormValues) => {
        console.log("Add supplier payment", data);
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
                                <CreditCard size={18} className="text-gray-700" />
                                <span className="text-sm font-semibold text-gray-800">Add Payment</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <button
                                    onClick={() => router.push(`/vendor/inventory/suppliers/${id}`)}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Supplier
                                </button>
                                <span className="text-gray-400">▶</span>
                                <span className="text-blue-600 font-medium">Add Payment</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <CommonTextInput name="paymentNumber" label="Payment Number *" placeholder="PAY-001" />
                                    <CommonTextInput name="postDate" label="Post Date *" placeholder="DD/MM/YY" />
                                    <CommonTextInput name="status" label="Status *" placeholder="Pending" />
                                    <CommonTextInput name="appliedAmount" label="Applied Amount" placeholder="0.00" />
                                    <CommonNumberInput name="amount" label="Amount *" placeholder="0.00" min={0} step={0.01} />
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

export default AddSupplierPaymentPage;
