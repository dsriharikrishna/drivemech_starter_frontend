"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierFormSchema, SupplierFormValues } from "@/schemas/vendor/supplier.schema";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";
import { Package } from "lucide-react";

const AddSupplierPage = () => {
    const router = useRouter();

    const methods = useForm<SupplierFormValues>({
        resolver: zodResolver(supplierFormSchema),
        defaultValues: { name: "", city: "", phone: "", website: "" },
    });

    const onSubmit = (data: SupplierFormValues) => {
        console.log("Add supplier", data);
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
                                <Package size={18} className="text-gray-700" />
                                <span className="text-sm font-semibold text-gray-800">Add Supplier</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <button
                                    onClick={() => router.push("/vendor/inventory/suppliers")}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Suppliers
                                </button>
                                <span className="text-gray-400">▶</span>
                                <span className="text-blue-600 font-medium">Add Supplier</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <CommonTextInput name="name" label="Supplier Name *" placeholder="Enter supplier name" />
                                    <CommonTextInput name="city" label="City *" placeholder="Enter city" />
                                    <CommonTextInput name="phone" label="Phone Number *" placeholder="+91 00000 00000" />
                                    <CommonTextInput name="website" label="Website" placeholder="www.example.com" />
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

export default AddSupplierPage;
