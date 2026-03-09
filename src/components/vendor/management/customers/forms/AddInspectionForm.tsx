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

/* ── Schema (subset of newInspectionSchema for quick-add) ── */
const addInspectionSchema = z.object({
    inspectionDate: z.string().min(1, "Inspection date is required"),
    vehicleId: z.string().optional(),
    inspectionType: z.string().min(1, "Inspection type is required"),
    status: z.string().min(1, "Status is required"),
    reasonForInspection: z.string().min(1, "Reason is required"),
    inspectionNotes: z.string().optional(),
});

type AddInspectionFormValues = z.infer<typeof addInspectionSchema>;

/* ── Options ── */
const typeOptions = [
    { id: "pre_service", name: "Pre-Service" },
    { id: "post_service", name: "Post-Service" },
    { id: "safety_check", name: "Safety Check" },
    { id: "full_inspection", name: "Full Inspection" },
];

const statusOptions = [
    { id: "draft", name: "Draft" },
    { id: "open", name: "Open" },
    { id: "completed", name: "Completed" },
];

const vehicleOptions = [
    { id: "v1", name: "10 BMK — Freighter" },
    { id: "v2", name: "11 XYZ — Toyota" },
];

interface AddInspectionFormProps {
    onClose: () => void;
    onSave?: (data: AddInspectionFormValues) => void;
    initialData?: Partial<AddInspectionFormValues>;
}

const AddInspectionForm: React.FC<AddInspectionFormProps> = ({ onClose, onSave, initialData }) => {
    const methods = useForm<AddInspectionFormValues>({
        resolver: zodResolver(addInspectionSchema),
        defaultValues: {
            inspectionDate: initialData?.inspectionDate ?? "",
            vehicleId: initialData?.vehicleId ?? "",
            inspectionType: initialData?.inspectionType ?? "",
            status: initialData?.status ?? "draft",
            reasonForInspection: initialData?.reasonForInspection ?? "",
            inspectionNotes: initialData?.inspectionNotes ?? "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: AddInspectionFormValues) => {
        onSave?.(data);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Inspection Date */}
                    <div>
                        <Controller
                            name="inspectionDate"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        label="Inspection Date"
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

                    {/* Inspection Type */}
                    <div>
                        <Controller
                            name="inspectionType"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropDown
                                        label="Inspection Type"
                                        items={typeOptions}
                                        selectedItem={typeOptions.find((o) => o.id === field.value) || null}
                                        onSelect={(item) => field.onChange(item.id)}
                                        placeholder="Select type"
                                        error={fieldState.error?.message}
                                    />
                                </>
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

                {/* Reason for Inspection */}
                <CommonTextInput
                    name="reasonForInspection"
                    label="Reason for Inspection"
                    placeholder="Enter reason..."
                    required
                />

                {/* Inspection Notes */}
                <CommonTextArea
                    name="inspectionNotes"
                    label="Notes"
                    placeholder="Enter inspection notes..."
                    rows={3}
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button variant="outline" type="button" onClick={onClose} size="sm">
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" size="sm">
                        Save Inspection
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddInspectionForm;
