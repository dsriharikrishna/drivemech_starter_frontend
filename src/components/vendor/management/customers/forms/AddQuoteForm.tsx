"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";

/* ── Schema ── */
const addQuoteSchema = z.object({
    quoteDate: z.string().min(1, "Quote date is required"),
    expiryDate: z.string().optional(),
    vehicleId: z.string().optional(),
    status: z.string().min(1, "Status is required"),
    description: z.string().optional(),
});

type AddQuoteFormValues = z.infer<typeof addQuoteSchema>;

/* ── Options ── */
const statusOptions = [
    { id: "draft", name: "Draft" },
    { id: "sent", name: "Sent" },
    { id: "accepted", name: "Accepted" },
    { id: "declined", name: "Declined" },
];

const vehicleOptions = [
    { id: "v1", name: "10 BMK — Freighter" },
    { id: "v2", name: "11 XYZ — Toyota" },
];

interface AddQuoteFormProps {
    onClose: () => void;
    onSave?: (data: AddQuoteFormValues) => void;
    initialData?: Partial<AddQuoteFormValues>;
}

const AddQuoteForm: React.FC<AddQuoteFormProps> = ({ onClose, onSave, initialData }) => {
    const methods = useForm<AddQuoteFormValues>({
        resolver: zodResolver(addQuoteSchema),
        defaultValues: {
            quoteDate: initialData?.quoteDate ?? "",
            expiryDate: initialData?.expiryDate ?? "",
            vehicleId: initialData?.vehicleId ?? "",
            status: initialData?.status ?? "draft",
            description: initialData?.description ?? "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: AddQuoteFormValues) => {
        onSave?.(data);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Quote Date */}
                    <div>
                        <Controller
                            name="quoteDate"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        label="Quote Date"
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

                    {/* Expiry Date */}
                    <div>
                        <Controller
                            name="expiryDate"
                            control={methods.control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Expiry Date"
                                    value={field.value ? new Date(field.value) : null}
                                    onChange={(date) =>
                                        field.onChange(date ? date.toISOString().split("T")[0] : "")
                                    }
                                    placeholder="Select date"
                                />
                            )}
                        />
                    </div>

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

                    {/* Status */}
                    <div>
                        <Controller
                            name="status"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropDown
                                        label="Status"
                                        items={statusOptions}
                                        selectedItem={statusOptions.find((o) => o.id === field.value) || null}
                                        onSelect={(item) => field.onChange(item.id)}
                                        placeholder="Select status"
                                        error={fieldState.error?.message}
                                    />
                                </>
                            )}
                        />
                    </div>
                </div>

                {/* Description */}
                <CommonTextArea
                    name="description"
                    label="Description"
                    placeholder="Enter description..."
                    rows={3}
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button variant="outline" type="button" onClick={onClose} size="sm">
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" size="sm">
                        Save Quote
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddQuoteForm;
