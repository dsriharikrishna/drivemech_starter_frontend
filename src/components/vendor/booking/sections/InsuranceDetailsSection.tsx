"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";

const claimOptions = [
    { id: "yes", name: "Yes" },
    { id: "no", name: "No" },
    { id: "decideLater", name: "Decide Later" },
];

const mockOptions = [
    { id: "opt1", name: "Option 1" },
    { id: "opt2", name: "Option 2" },
];

export default function InsuranceDetailsSection() {
    const { watch, setValue, control, register } = useFormContext();
    const updateInsurance = watch("updateInsurance");

    if (!updateInsurance) return null;

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side */}
                <div className="flex-1 space-y-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-3">Insurance Claims</label>
                        <div className="flex gap-6">
                            {claimOptions.map((option) => (
                                <label key={option.id} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        value={option.id}
                                        {...register("insuranceClaims")}
                                        className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                        {option.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Insurance Provider Name</label>
                        <DropDown
                            items={mockOptions}
                            selectedItem={mockOptions.find(o => o.id === watch("insuranceProviderName")) || null}
                            onSelect={(item) => setValue("insuranceProviderName", item.id)}
                            placeholder="Select"
                        />
                    </div>

                    <CommonTextInput
                        name="policyExcess"
                        label="Policy Excess"
                        placeholder="Enter Policy Excess"
                    />
                </div>

                {/* Right Side */}
                <div className="flex-1 space-y-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Insurance Claim Type *</label>
                        <DropDown
                            items={mockOptions}
                            selectedItem={mockOptions.find(o => o.id === watch("insuranceClaimType")) || null}
                            onSelect={(item) => setValue("insuranceClaimType", item.id)}
                            placeholder="Select"
                        />
                    </div>

                    <Controller
                        name="insuranceExpiryDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Insurance Expiry Date"
                                value={field.value || null}
                                onChange={field.onChange}
                                placeholder="Select Expiry Date"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
