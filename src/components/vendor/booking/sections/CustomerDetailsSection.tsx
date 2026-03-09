"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import DropDown from "@/components/ui/DropDown";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import { User, Smartphone, Phone, Mail, MapPin } from "lucide-react";
import Accordion from "@/components/ui/Accordion";

interface CustomerDetailsSectionProps {
    isExpanded: boolean;
    onToggle: () => void;
    isSelected?: boolean;
}

const stateOptions = [
    { id: "AP", name: "Andhra Pradesh" },
    { id: "TS", name: "Telangana" },
    { id: "KA", name: "Karnataka" },
];

const countryOptions = [
    { id: "IN", name: "India" },
    { id: "AU", name: "Australia" },
];

const phoneCountryOptions = [
    { code: "+91", label: "India", iso: "IN" },
    { code: "+61", label: "Australia", iso: "AU" },
];

export default function CustomerDetailsSection({
    isExpanded,
    onToggle,
    isSelected = false,
}: CustomerDetailsSectionProps) {
    const { watch, setValue } = useFormContext();
    const customerName = watch("customerName") || "John Doe";

    if (isSelected) {
        return (
            <Accordion
                title={`Customer : ${customerName}`}
                icon={<User size={20} className="text-blue-600" />}
                isExpanded={isExpanded}
                onToggle={onToggle}
                headerClassName="bg-blue-50 text-blue-900 hover:bg-blue-100"
            >
                <div className="flex flex-col md:flex-row gap-8 py-2">
                    {/* Customer Information */}
                    <div className="flex-1 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Customer Information</h4>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-700 font-medium">{customerName}</p>
                            <p className="text-sm text-gray-500">Hyd - 500018</p>
                        </div>
                    </div>

                    {/* Customer Contact */}
                    <div className="flex-1 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Customer Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Smartphone size={16} className="text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-700">+91 70007 70007</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Phone size={16} className="text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-700">040-123 456</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Mail size={16} className="text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-700">johndoe@example.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Address */}
                    <div className="flex-1 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">Customer Address</h4>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <MapPin size={16} className="text-blue-600" />
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Street 1, ABD Colony, Hyd-18
                            </p>
                        </div>
                    </div>
                </div>
            </Accordion>
        );
    }

    return (
        <Accordion
            title="Customer Details"
            icon={<User size={20} className="text-blue-600" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
            headerClassName="bg-blue-50 text-blue-900 hover:bg-blue-100"
        >
            <div className="space-y-6">
                {/* Toggles */}
                <div className="flex flex-wrap gap-8">
                    <ControlledToggleSwitch name="isCash" label="Cash" size="sm" />
                    <ControlledToggleSwitch name="isCompany" label="Company/Individual" size="sm" />
                    <ControlledToggleSwitch name="isVip" label="VIP Customer" size="sm" />
                </div>

                {/* Form Fields */}
                <div className="flex flex-wrap gap-4">
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="customerName"
                            label="Customer Name"
                            placeholder="John Matt"
                            required
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <PhoneInput
                            name="mobileNumber"
                            label="Mobile Number"
                            countryOptions={phoneCountryOptions}
                            required
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="emailId"
                            label="Email"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="street"
                            label="Address 1"
                            placeholder="Enter Address"
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="suburb"
                            label="Suburb"
                            placeholder="Enter Suburb"
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="postcode"
                            label="Postcode"
                            placeholder="Enter Postcode"
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">State</label>
                        <DropDown
                            items={stateOptions}
                            selectedItem={stateOptions.find(o => o.id === watch("customerState")) || null}
                            onSelect={(item) => setValue("customerState", item.id)}
                            placeholder="Select State"
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Country</label>
                        <DropDown
                            items={countryOptions}
                            selectedItem={countryOptions.find(o => o.id === watch("country")) || null}
                            onSelect={(item) => setValue("country", item.id)}
                            placeholder="Select Country"
                        />
                    </div>
                </div>

                {/* Warning Banner */}
                <div className="bg-red-50 text-red-500 py-2 px-4 rounded-lg text-center text-xs font-medium border border-red-100">
                    Customer details not found
                </div>
            </div>
        </Accordion>
    );
}
