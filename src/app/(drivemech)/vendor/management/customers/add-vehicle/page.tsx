"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleFormValues } from "@/schemas/vendor/vehicle.schema";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import ModalDropdown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import Button from "@/components/ui/Button";
import { CarFillIcon } from "@/components/icons/ManagementModuleIcons";
import { CalendarIcon } from "@/components/icons/TransactionIcons";
import RegoInput, { StateOption } from "@/components/forms/RegoInput";

interface VehicleDetailsFormProps {
    initialData?: Partial<VehicleFormValues>;
    onSave?: (data: VehicleFormValues) => void;
    onCancel?: () => void;
}

const VehicleDetailsPage = ({
    initialData,
    onSave,
    onCancel,
}: VehicleDetailsFormProps) => {
    const router = useRouter();

    const methods = useForm<VehicleFormValues>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            ac: false,
            ...initialData,
        },
    });

    const { control, handleSubmit } = methods;

    const mockOptions = [
        { id: "opt1", name: "Option 1" },
        { id: "opt2", name: "Option 2" },
    ];

    const stateOptions: StateOption[] = [
        { id: "AP", name: "Andhra Pradesh", code: "AP" },
        { id: "TS", name: "Telangana", code: "TS" },
        { id: "KA", name: "Karnataka", code: "KA" },
        { id: "TN", name: "Tamil Nadu", code: "TN" },
        { id: "MH", name: "Maharashtra", code: "MH" },
        { id: "DL", name: "Delhi", code: "DL" },
    ];

    return (
        <FormProvider {...methods}>
            <div className="h-full w-full bg-white">
                <div className="p-3 flex flex-col gap-4 border border-gray-200 rounded-xl">
                    <div className="p-0 flex flex-col gap-1 border border-gray-200 rounded-xl">

                        {/* ── Page Header ── */}
                        <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CarFillIcon size={18} className="text-gray-700" />
                                <span className="text-sm font-semibold text-gray-800">Add Vehicle</span>
                            </div>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSave || console.log)}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Vehicle Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Row 1 */}
                                    <div className="col-span-1 ">
                                        <RegoInput
                                            name="regNumber"
                                            stateName="state"
                                            label="State"
                                            regoLabel="Rego"
                                            placeholder="Enter your Reg. Number"
                                            stateOptions={stateOptions}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="vehicleMake"
                                            render={({ field, fieldState }) => (
                                                <ModalDropdown
                                                    items={mockOptions}
                                                    label="Vehicle Make"
                                                    selectedItem={
                                                        mockOptions.find((o) => o.id === field.value) || null
                                                    }
                                                    onSelect={(item) => field.onChange(item.id)}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <CommonTextInput
                                        name="vehicleModel"
                                        label="Vehicle Model *"
                                        placeholder="Enter Vehicle Model"
                                    />

                                    {/* Row 2 */}
                                    <CommonTextInput
                                        name="vehicleModelCode"
                                        label="Vehicle Model Code"
                                        placeholder="Enter Vehicle Model Code"
                                    />
                                    <CommonTextInput
                                        name="vehicleModelSeries"
                                        label="Vehicle Model Series"
                                        placeholder="Enter Vehicle Model Series"
                                    />
                                    <CommonTextInput name="vin" label="VIN" placeholder="Enter VIN" />
                                    <CommonTextInput
                                        name="engineNumber"
                                        label="Engine Number"
                                        placeholder="Enter Engine Number"
                                    />

                                    {/* Row 3 */}
                                    <CommonTextInput
                                        name="chassisNumber"
                                        label="Chassis Number"
                                        placeholder="Enter Chassis Number"
                                    />
                                    <CommonTextInput
                                        name="engineCode"
                                        label="Engine Code"
                                        placeholder="Enter Engine Code"
                                    />
                                    <CommonTextInput
                                        name="fleetCode"
                                        label="Fleet Code"
                                        placeholder="Enter Fleet Code"
                                    />
                                    <div>
                                        <Controller
                                            control={control}
                                            name="transmission"
                                            render={({ field, fieldState }) => (
                                                <ModalDropdown
                                                    items={mockOptions}
                                                    label="Transmission"
                                                    selectedItem={
                                                        mockOptions.find((o) => o.id === field.value) || null
                                                    }
                                                    onSelect={(item) => field.onChange(item.id)}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>

                                    {/* Row 4 */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">A/C</label>
                                        <Controller
                                            control={control}
                                            name="ac"
                                            render={({ field }) => (
                                                <ToggleSwitch
                                                    checked={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="bodyType"
                                            render={({ field, fieldState }) => (
                                                <ModalDropdown
                                                    items={mockOptions}
                                                    label="Body Type"
                                                    selectedItem={
                                                        mockOptions.find((o) => o.id === field.value) || null
                                                    }
                                                    onSelect={(item) => field.onChange(item.id)}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="driveType"
                                            render={({ field, fieldState }) => (
                                                <ModalDropdown
                                                    items={mockOptions}
                                                    label="Drive Type"
                                                    selectedItem={
                                                        mockOptions.find((o) => o.id === field.value) || null
                                                    }
                                                    onSelect={(item) => field.onChange(item.id)}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Controller
                                            control={control}
                                            name="fuelType"
                                            render={({ field, fieldState }) => (
                                                <ModalDropdown
                                                    items={mockOptions}
                                                    label="Fuel Type"
                                                    selectedItem={
                                                        mockOptions.find((o) => o.id === field.value) || null
                                                    }
                                                    onSelect={(item) => field.onChange(item.id)}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>

                                    {/* Row 5 - Dates */}
                                    <Controller
                                        control={control}
                                        name="regoDueDate"
                                        render={({ field, fieldState }) => (
                                            <DatePicker
                                                label="Rego Due Date"
                                                value={field.value || null}
                                                onChange={field.onChange}
                                                endIcon={<CalendarIcon size={16} className="text-gray-500" />}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="buildDate"
                                        render={({ field, fieldState }) => (
                                            <DatePicker
                                                label="Build Date"
                                                value={field.value || null}
                                                onChange={field.onChange}
                                                endIcon={<CalendarIcon size={16} className="text-gray-500" />}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="nextServiceDate"
                                        render={({ field, fieldState }) => (
                                            <DatePicker
                                                label="Next Service Date"
                                                value={field.value || null}
                                                onChange={field.onChange}
                                                endIcon={<CalendarIcon size={16} className="text-gray-500" />}
                                            />
                                        )}
                                    />
                                    <CommonTextInput
                                        name="nextServiceKms"
                                        label="Next Service KMS"
                                        placeholder="Enter KMS"
                                        rules={{ valueAsNumber: true }}
                                    />

                                    {/* Row 6 */}
                                    <Controller
                                        control={control}
                                        name="manufacturingDate"
                                        render={({ field, fieldState }) => (
                                            <DatePicker
                                                label="Manufacturing Date"
                                                value={field.value || null}
                                                onChange={field.onChange}
                                                endIcon={<CalendarIcon size={16} className="text-gray-500" />}
                                            />
                                        )}
                                    />
                                    <CommonTextInput
                                        name="cylinders"
                                        label="Cylinders"
                                        placeholder="Select Cylinders"
                                    />
                                    <CommonTextInput
                                        name="tyreSize"
                                        label="Tyre Size"
                                        placeholder="Enter Tyre Size"
                                    />
                                    <CommonTextInput
                                        name="importedId"
                                        label="Imported ID"
                                        placeholder="Enter ID"
                                    />
                                </div>

                                <div className="mt-6">
                                    <CommonTextArea
                                        name="notes"
                                        label="Notes"
                                        rows={4}
                                        placeholder="Enter Notes"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 pb-2">
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    variant='danger'
                                    size='md'
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size='md'
                                    variant='primary'
                                >
                                    Save
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </FormProvider>

    )
}

export default VehicleDetailsPage