"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { Package, Plus, ChevronDown, MapPin, Search } from "lucide-react";

const addProductSchema = z.object({
    itemCode: z.string().min(1, "Item code is required"),
    description: z.string().optional(),
    description2: z.string().optional(),
    searchableTags: z.string().optional(),
    group: z.string().optional(),
    category: z.string().optional(),
    vendor: z.string().optional(),
    brand: z.string().optional(),
    type: z.string().optional(),
    qtyOnHand: z.string().optional(),
    minimum: z.string().optional(),
    maximum: z.string().optional(),
    location: z.string().optional(),
    gstFee: z.boolean(),
    dontUpdQty: z.boolean(),
    requiredSerialNumber: z.boolean(),
    priceLookUp: z.boolean(),
    retailPrice: z.string().optional(),
    storePrice: z.string().optional(),
    costExclTax: z.string().optional(),
    costInclTax: z.string().optional(),
    guarantyDetails: z.string().optional(),
    warrantyDetails: z.string().optional(),
    importedId: z.string().optional(),
    comment: z.string().optional(),
    jobCardComment: z.string().optional(),
    isProductActive: z.boolean(),
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

const AddProductPage = () => {
    const router = useRouter();
    const params = useParams();
    const isEdit = !!params?.id;
    const [isFormActive, setIsFormActive] = useState(true);

    const methods = useForm<AddProductFormValues>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            itemCode: "",
            description: "",
            description2: "",
            searchableTags: "",
            group: "",
            category: "",
            vendor: "",
            brand: "",
            type: "",
            qtyOnHand: "",
            minimum: "",
            maximum: "",
            location: "",
            gstFee: false,
            dontUpdQty: false,
            requiredSerialNumber: false,
            priceLookUp: false,
            retailPrice: "",
            storePrice: "",
            costExclTax: "",
            costInclTax: "",
            guarantyDetails: "",
            warrantyDetails: "",
            importedId: "",
            comment: "",
            jobCardComment: "",
            isProductActive: true,
        },
    });

    const onSubmit = (data: AddProductFormValues) => {
        console.log("Add product", data);
        router.back();
    };

    return (
        <FormProvider {...methods}>
            <div className="h-full w-full bg-[#F8F9FB] min-h-screen">
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-4">

                        {/* Main Header Card */}
                        <div className="bg-[#E7F0FF] border border-[#D1E0FF] rounded-xl px-6 py-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <Package size={20} className="text-[#2B7FFF]" />
                                <span className="text-base font-bold text-[#1A1C21]">Products</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span
                                    className="text-[#94A3B8] hover:text-[#2B7FFF] cursor-pointer"
                                    onClick={() => router.push("/vendor/inventory/inventory")}
                                >
                                    Products
                                </span>
                                <span className="text-[#94A3B8]">▶</span>
                                <span className="text-[#2B7FFF] font-semibold">{isEdit ? "Edit Product" : "Add Product"}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden pb-6">
                            {/* Inner Section Header */}
                            <div className="bg-[#E7F0FF] px-6 py-4 flex items-center justify-between">
                                <h2 className="text-base font-bold text-[#1A1C21]">{isEdit ? "Edit Product" : "Add Product"}</h2>
                                <ToggleSwitch
                                    checked={isFormActive}
                                    onChange={setIsFormActive}
                                    size="sm"
                                />
                            </div>

                            {/* Form Content */}
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="px-6 pt-6 flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                                    {/* Row 1 */}
                                    <CommonTextInput name="itemCode" label="Item Code" placeholder="Enter Item Code" />
                                    <CommonTextInput name="description" label="Description" placeholder="" />
                                    <CommonTextInput name="description2" label="Description 2" placeholder="" />
                                    <CommonTextInput name="searchableTags" label="Searchable Tags" placeholder="" />

                                    {/* Row 2 */}
                                    <div className="relative">
                                        <CommonTextInput name="group" label="Group" placeholder="" />
                                        <button type="button" className="absolute right-3 top-[38px] text-gray-400 hover:text-[#2B7FFF]">
                                            <Plus size={18} className="bg-gray-100 rounded-full p-0.5 border border-gray-300" />
                                        </button>
                                    </div>
                                    <CommonTextInput name="category" label="Category" placeholder="" />
                                    <CommonTextInput name="vendor" label="Vendor" placeholder="" />
                                    <CommonTextInput name="brand" label="Brand" placeholder="" />

                                    {/* Row 3 */}
                                    <div className="relative">
                                        <CommonTextInput name="type" label="Type" placeholder="Select" />
                                        <button type="button" className="absolute right-3 top-[38px] text-gray-400">
                                            <ChevronDown size={18} />
                                        </button>
                                    </div>
                                    <CommonTextInput name="qtyOnHand" label="Qty on Hand" placeholder="" />
                                    <CommonTextInput name="minimum" label="Minimum" placeholder="" />
                                    <CommonTextInput name="maximum" label="Maximum" placeholder="" />

                                    {/* Row 4 */}
                                    <div className="relative">
                                        <CommonTextInput name="location" label="Location" placeholder="" />
                                        <button type="button" className="absolute right-3 top-[38px] text-gray-400 hover:text-[#2B7FFF]">
                                            <MapPin size={18} />
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-medium text-[#64748B]">GST Fee</label>
                                        <ToggleSwitch
                                            checked={methods.watch("gstFee")}
                                            onChange={(val) => methods.setValue("gstFee", val)}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-medium text-[#64748B]">Don't Upd Qty</label>
                                        <ToggleSwitch
                                            checked={methods.watch("dontUpdQty")}
                                            onChange={(val) => methods.setValue("dontUpdQty", val)}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-medium text-[#64748B]">Required Serial Number</label>
                                        <ToggleSwitch
                                            checked={methods.watch("requiredSerialNumber")}
                                            onChange={(val) => methods.setValue("requiredSerialNumber", val)}
                                            size="sm"
                                        />
                                    </div>

                                    {/* Row 5 */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-medium text-[#64748B]">Price Look up</label>
                                        <ToggleSwitch
                                            checked={methods.watch("priceLookUp")}
                                            onChange={(val) => methods.setValue("priceLookUp", val)}
                                            size="sm"
                                        />
                                    </div>
                                    <CommonTextInput name="retailPrice" label="Retail Price" placeholder="" />
                                    <CommonTextInput name="storePrice" label="Store Price" placeholder="" />
                                    <CommonTextInput name="costExclTax" label="Cost (Excl Tax)" placeholder="" />

                                    {/* Row 6 */}
                                    <CommonTextInput name="costInclTax" label="Cost (Incl Tax)" placeholder="" />
                                    <CommonTextInput name="guarantyDetails" label="Guaranty Details" placeholder="" />
                                    <CommonTextInput name="warrantyDetails" label="Warranty Details" placeholder="" />
                                    <CommonTextInput name="importedId" label="Imported ID" placeholder="" />

                                    {/* Row 7 - Spanning 2 columns each */}
                                    <div className="lg:col-span-2">
                                        <CommonTextInput name="comment" label="Comment" placeholder="" />
                                    </div>
                                    <div className="lg:col-span-2">
                                        <CommonTextInput name="jobCardComment" label="Job card Comment" placeholder="" />
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-center gap-6 mt-6 pb-2">
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="w-56 py-3 bg-[#FF3B30] text-white rounded-xl font-bold text-sm hover:bg-[#E0352B] transition-colors shadow-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-56 py-3 bg-[#FF8935] text-white rounded-xl font-bold text-sm hover:bg-[#E87A2B] transition-colors shadow-sm"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default AddProductPage;

