"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { IncomeIcon } from "@/components/icons/ManagementModuleIcons";
import AddPaymentForm from "@/components/vendor/management/customers/forms/AddPaymentForm";

const AddCustomerPaymentPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    return (
        <div className="h-full w-full bg-white">
            <div className="p-3 flex flex-col gap-4 border border-gray-200 rounded-xl">
                <div className="p-0 flex flex-col gap-1 border border-gray-200 rounded-xl">

                    {/* Header */}
                    <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <IncomeIcon size={18} className="text-gray-700" />
                            <span className="text-sm font-semibold text-gray-800">Add Payment</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <button
                                onClick={() => router.push(`/vendor/management/customers/${id}`)}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Customer
                            </button>
                            <span className="text-gray-400">▶</span>
                            <span className="text-blue-600 font-medium">Add Payment</span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-4">
                        <AddPaymentForm
                            onClose={() => router.push(`/vendor/management/customers/${id}`)}
                            onSave={(data) => {
                                console.log("Save payment", data);
                                router.push(`/vendor/management/customers/${id}`);
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddCustomerPaymentPage;
