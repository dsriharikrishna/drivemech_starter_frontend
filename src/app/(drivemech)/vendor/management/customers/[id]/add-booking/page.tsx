"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { CalendarManagementIcon } from "@/components/icons/ManagementModuleIcons";
import AddBookingForm from "@/components/vendor/management/customers/forms/AddBookingForm";

const AddCustomerBookingPage = ({
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
                            <CalendarManagementIcon size={18} className="text-gray-700" />
                            <span className="text-sm font-semibold text-gray-800">Add Booking</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <button
                                onClick={() => router.push(`/vendor/management/customers/${id}`)}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Customer
                            </button>
                            <span className="text-gray-400">▶</span>
                            <span className="text-blue-600 font-medium">Add Booking</span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-4">
                        <AddBookingForm
                            onClose={() => router.push(`/vendor/management/customers/${id}`)}
                            onSave={(data) => {
                                console.log("Save booking", data);
                                router.push(`/vendor/management/customers/${id}`);
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddCustomerBookingPage;
