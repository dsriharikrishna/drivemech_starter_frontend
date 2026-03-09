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

/* ── Schema ── */
const addPaymentSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    paymentDate: z.string().min(1, "Payment date is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    reference: z.string().optional(),
    notes: z.string().optional(),
});

type AddPaymentFormValues = z.infer<typeof addPaymentSchema>;

/* ── Options ── */
const methodOptions = [
    { id: "cash", name: "Cash" },
    { id: "card", name: "Card" },
    { id: "bank_transfer", name: "Bank Transfer" },
    { id: "cheque", name: "Cheque" },
    { id: "eft", name: "EFT" },
];

interface AddPaymentFormProps {
    onClose: () => void;
    onSave?: (data: AddPaymentFormValues) => void;
    initialData?: Partial<AddPaymentFormValues>;
}

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({ onClose, onSave, initialData }) => {
    const methods = useForm<AddPaymentFormValues>({
        resolver: zodResolver(addPaymentSchema),
        defaultValues: {
            amount: initialData?.amount ?? "",
            paymentDate: initialData?.paymentDate ?? "",
            paymentMethod: initialData?.paymentMethod ?? "",
            reference: initialData?.reference ?? "",
            notes: initialData?.notes ?? "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: AddPaymentFormValues) => {
        onSave?.(data);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Amount */}
                    <CommonTextInput
                        name="amount"
                        label="Amount"
                        placeholder="0.00"
                        type="number"
                        required
                    />

                    {/* Payment Date */}
                    <div>
                        <Controller
                            name="paymentDate"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DatePicker
                                        label="Payment Date"
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

                    {/* Payment Method */}
                    <div>
                        <Controller
                            name="paymentMethod"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <DropDown
                                        label="Payment Method"
                                        items={methodOptions}
                                        selectedItem={methodOptions.find((o) => o.id === field.value) || null}
                                        onSelect={(item) => field.onChange(item.id)}
                                        placeholder="Select method"
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
                        Save Payment
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddPaymentForm;
