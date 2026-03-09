"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";
import TimePicker from "@/components/ui/TimePicker";

/* ── Schema ── */
const addBookingSchema = z.object({
    bookingDate: z.string().min(1, "Booking date is required"),
    bookingTime: z.string().min(1, "Booking time is required"),
    vehicleId: z.string().optional(),
    serviceType: z.string().min(1, "Service type is required"),
    notes: z.string().optional(),
});

type AddBookingFormValues = z.infer<typeof addBookingSchema>;

/* ── Options ── */
const serviceOptions = [
    { id: "oil_change", name: "Oil Change" },
    { id: "tyre_rotation", name: "Tyre Rotation" },
    { id: "full_service", name: "Full Service" },
    { id: "inspection", name: "Inspection" },
    { id: "brake_service", name: "Brake Service" },
    { id: "other", name: "Other" },
];

const vehicleOptions = [
    { id: "v1", name: "10 BMK — Freighter" },
    { id: "v2", name: "11 XYZ — Toyota" },
];

interface AddBookingFormProps {
    onClose: () => void;
    onSave?: (data: AddBookingFormValues) => void;
    initialData?: Partial<AddBookingFormValues>;
}

const AddBookingForm: React.FC<AddBookingFormProps> = ({ onClose, onSave, initialData }) => {
    const methods = useForm<AddBookingFormValues>({
        resolver: zodResolver(addBookingSchema),
        defaultValues: {
            bookingDate: initialData?.bookingDate ?? "",
            bookingTime: initialData?.bookingTime ?? "",
            vehicleId: initialData?.vehicleId ?? "",
            serviceType: initialData?.serviceType ?? "",
            notes: initialData?.notes ?? "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: AddBookingFormValues) => {
        onSave?.(data);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Booking Date */}
                    <div>
                        <Controller
                            name="bookingDate"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        label="Booking Date"
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) =>
                                            field.onChange(date ? date.toISOString().split("T")[0] : "")
                                        }
                                        placeholder="Select date"
                                    />
                                    {fieldState.error && (
                                        <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>


                    <Controller
                        name="bookingTime"
                        control={methods.control}
                        render={({ field, fieldState }) => (
                            <>
                                <TimePicker
                                    label="Booking Time"
                                    value={field.value || undefined}
                                    onChange={(time) => field.onChange(time)}
                                    placeholder="Select time"
                                />
                                {fieldState.error && (
                                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />

                    {/* Vehicle */}
                    <div>
                        <Controller
                            name="vehicleId"
                            control={methods.control}
                            render={({ field }) => (
                                <DropDown
                                    label="Vehicle"
                                    items={vehicleOptions}
                                    selectedItem={vehicleOptions.find((o) => o.id === field.value) || null}
                                    onSelect={(item) => field.onChange(item.id)}
                                    placeholder="Select vehicle"
                                />
                            )}
                        />
                    </div>

                    {/* Service Type */}
                    <div>
                        <Controller
                            name="serviceType"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropDown
                                        label="Service Type"
                                        items={serviceOptions}
                                        selectedItem={serviceOptions.find((o) => o.id === field.value) || null}
                                        onSelect={(item) => field.onChange(item.id)}
                                        placeholder="Select service"
                                        error={fieldState.error?.message}
                                    />
                                </>
                            )}
                        />
                    </div>
                </div>

                {/* Notes */}
                <CommonTextArea
                    name="notes"
                    label="Notes"
                    placeholder="Enter notes..."
                    rows={3}
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button variant="outline" type="button" onClick={onClose} size="sm">
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" size="sm">
                        Save Booking
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddBookingForm;
