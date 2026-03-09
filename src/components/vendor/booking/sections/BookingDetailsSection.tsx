"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DatePicker from "@/components/ui/DatePicker";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Calendar } from "lucide-react";
import Accordion from "@/components/ui/Accordion";

interface BookingDetailsSectionProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export default function BookingDetailsSection({
    isExpanded,
    onToggle,
}: BookingDetailsSectionProps) {
    const { control } = useFormContext();

    return (
        <Accordion
            title="Bookings"
            icon={<Calendar size={20} className="text-blue-600" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
            headerClassName="bg-blue-50 text-blue-900 hover:bg-blue-100"
        >
            <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="reference"
                            label="Reference"
                            placeholder="Enter Reference"
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="customerOrderNumber"
                            label="Customer Order Number *"
                            placeholder="Enter Order Number"
                            required
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <Controller
                            name="bookingDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Booking Date"
                                    value={field.value || null}
                                    onChange={field.onChange}
                                    placeholder="Select"
                                />
                            )}
                        />
                    </div>
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <Controller
                            name="dueBy"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Due By"
                                    value={field.value || null}
                                    onChange={field.onChange}
                                    placeholder="Select"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        name="description"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                        placeholder="Description"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-900">Update Insurance Details</span>
                    <ControlledToggleSwitch name="updateInsurance" size="sm" variant="info" />
                </div>
            </div>
        </Accordion>
    );
}
