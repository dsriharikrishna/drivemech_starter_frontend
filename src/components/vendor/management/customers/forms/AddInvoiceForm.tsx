"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";

/* ── Schema ── */
const addInvoiceSchema = z.object({
    invoiceDate: z.string().min(1, "Invoice date is required"),
    dueDate: z.string().optional(),
    amount: z.string().min(1, "Amount is required"),
    invoiceType: z.string().min(1, "Invoice type is required"),
    reference: z.string().optional(),
    status: z.string().min(1, "Status is required"),
});

type AddInvoiceFormValues = z.infer<typeof addInvoiceSchema>;

/* ── Options ── */
const typeOptions = [
    { id: "account", name: "Account" },
    { id: "cash", name: "Cash" },
    { id: "credit", name: "Credit" },
];

const statusOptions = [
    { id: "open", name: "Open" },
    { id: "paid", name: "Paid" },
    { id: "overdue", name: "Overdue" },
    { id: "cancelled", name: "Cancelled" },
];

interface AddInvoiceFormProps {
    onClose: () => void;
    onSave?: (data: AddInvoiceFormValues) => void;
    initialData?: Partial<AddInvoiceFormValues>;
}

const AddInvoiceForm: React.FC<AddInvoiceFormProps> = ({ onClose, onSave, initialData }) => {
    const methods = useForm<AddInvoiceFormValues>({
        resolver: zodResolver(addInvoiceSchema),
        defaultValues: {
            invoiceDate: initialData?.invoiceDate ?? "",
            dueDate: initialData?.dueDate ?? "",
            amount: initialData?.amount ?? "",
            invoiceType: initialData?.invoiceType ?? "",
            reference: initialData?.reference ?? "",
            status: initialData?.status ?? "open",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: AddInvoiceFormValues) => {
        onSave?.(data);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Invoice Date */}
                    <div>
                        <Controller
                            name="invoiceDate"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        label="Invoice Date"
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

                    {/* Due Date */}
                    <div>
                        <Controller
                            name="dueDate"
                            control={methods.control}
                            render={({ field }) => (
                                <DatePicker
                                    label="Due Date"
                                    value={field.value ? new Date(field.value) : null}
                                    onChange={(date) =>
                                        field.onChange(date ? date.toISOString().split("T")[0] : "")
                                    }
                                    placeholder="Select date"
                                />
                            )}
                        />
                    </div>

                    {/* Amount */}
                    <CommonTextInput
                        name="amount"
                        label="Amount"
                        placeholder="0.00"
                        type="number"
                        required
                    />

                    {/* Invoice Type */}
                    <div>
                        <Controller
                            name="invoiceType"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropDown
                                        label="Type"
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

                    {/* Reference */}
                    <CommonTextInput
                        name="reference"
                        label="Reference"
                        placeholder="Enter reference"
                    />

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

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button variant="outline" type="button" onClick={onClose} size="sm">
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" size="sm">
                        Save Invoice
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddInvoiceForm;
