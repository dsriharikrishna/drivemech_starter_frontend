"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import { Car, Plus, Search } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

interface VehicleDetailsSectionProps {
    isExpanded: boolean;
    onToggle: () => void;
    isSelected?: boolean;
    onSearch?: () => void;
}

const mockOptions = [
    { id: "opt1", name: "Option 1" },
    { id: "opt2", name: "Option 2" },
];

const stateOptions = [
    { id: "AP", name: "AP" },
    { id: "TS", name: "TS" },
];

const mockVehicles = [
    { id: "1", rego: "TS09FJ0007", make: "BMW", model: "X7" },
    { id: "2", rego: "TS09FJ0007", make: "BMW", model: "X7" },
    { id: "3", rego: "TS09FJ0007", make: "BMW", model: "X7" },
    { id: "4", rego: "TS09FJ0007", make: "BMW", model: "X7" },
];

export default function VehicleDetailsSection({
    isExpanded,
    onToggle,
    isSelected = false,
    onSearch,
}: VehicleDetailsSectionProps) {
    const { watch, setValue, control } = useFormContext();

    if (isSelected) {
        return (
            <Accordion
                title="Select A Vehicle"
                icon={<Car size={20} className="text-blue-600" />}
                isExpanded={isExpanded}
                onToggle={onToggle}
                headerClassName="bg-gray-50 text-gray-900 hover:bg-gray-100 border-b border-gray-100"
            >
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-sm"
                        >
                            <Plus size={14} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
                        <Table
                            columns={[
                                {
                                    key: "sno",
                                    header: "S.No",
                                    width: "60px",
                                    render: (_, index) => (
                                        <span className="text-xs text-gray-500">{(index + 1).toString().padStart(2, '0')}</span>
                                    )
                                },
                                {
                                    key: "rego",
                                    header: "Rego",
                                    render: (item) => <span className="text-xs font-medium text-gray-700">{item.rego}</span>
                                },
                                {
                                    key: "make",
                                    header: "Make",
                                    render: (item) => <span className="text-xs text-gray-600">{item.make}</span>
                                },
                                {
                                    key: "model",
                                    header: "Model",
                                    render: (item) => <span className="text-xs text-gray-600">{item.model}</span>
                                },
                            ]}
                            data={mockVehicles}
                            keyExtractor={(item) => item.id}
                            striped={false}
                            hoverable
                            className="h-full"
                            style={{ height: "100%" }}
                        />
                    </div>
                </div>
            </Accordion>
        );
    }

    return (
        <Accordion
            title="Vehicle Details"
            icon={<Car size={20} className="text-blue-600" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
            headerClassName="bg-blue-50 text-blue-900 hover:bg-blue-100"
        >
            <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <div className="flex gap-2">
                            <div className="w-1/3">
                                <label className="text-sm font-semibold text-gray-700">State *</label>
                                <DropDown
                                    items={stateOptions}
                                    selectedItem={stateOptions.find(o => o.id === watch("state")) || null}
                                    onSelect={(item) => setValue("state", item.id)}
                                    placeholder="AP"
                                />
                            </div>
                            <div className="w-2/3">
                                <div className="flex items-end gap-2">
                                    <div className="flex-1">
                                        <CommonTextInput
                                            name="vehicleRegNumber"
                                            label="Rego *"
                                            placeholder="Enter your Reg. Number"
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        size="md"
                                        onClick={onSearch}
                                        className="h-[40px] px-3 bg-blue-600"
                                    >
                                        <Search size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Vehicle Make *</label>
                        <DropDown
                            items={mockOptions}
                            selectedItem={mockOptions.find(o => o.id === watch("vehicleMake")) || null}
                            onSelect={(item) => setValue("vehicleMake", item.id)}
                            placeholder="Select"
                        />
                    </div>

                    <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Vehicle Model *</label>
                        <DropDown
                            items={mockOptions}
                            selectedItem={mockOptions.find(o => o.id === watch("vehicleModel")) || null}
                            onSelect={(item) => setValue("vehicleModel", item.id)}
                            placeholder="Enter Vehicle Model"
                        />
                    </div>

                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <Controller
                            name="manufacturingDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Manufacturing Date"
                                    value={field.value || null}
                                    onChange={field.onChange}
                                    placeholder="Select Date"
                                />
                            )}
                        />
                    </div>

                    <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Transmission</label>
                        <DropDown
                            items={mockOptions}
                            selectedItem={mockOptions.find(o => o.id === watch("transmission")) || null}
                            onSelect={(item) => setValue("transmission", item.id)}
                            placeholder="Select Transmission"
                        />
                    </div>

                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <CommonTextInput
                            name="vin"
                            label="VIN"
                            placeholder="Enter VIN"
                        />
                    </div>

                    <div className="w-full md:w-[calc(50%-0.5rem)] flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Fuel Type</label>
                        <DropDown
                            items={mockOptions}
                            selectedItem={mockOptions.find(o => o.id === watch("fuelType")) || null}
                            onSelect={(item) => setValue("fuelType", item.id)}
                            placeholder="Select Fuel Type"
                        />
                    </div>
                </div>

                {/* Warning Banner */}
                <div className="bg-red-50 text-red-500 py-2 px-4 rounded-lg text-center text-xs font-medium border border-red-100">
                    Vehicle Details Not Found
                </div>
            </div>
        </Accordion>
    );
}
