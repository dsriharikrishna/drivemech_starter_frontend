"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import ModalDropdown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import Button from "@/components/ui/Button";
import { UserSearchIcon } from "@/components/icons/ManagementModuleIcons";
import { CalendarIcon } from "@/components/icons/TransactionIcons";

/* ── Schema ── */
const addInspectionSchema = z.object({
    inspectionNo: z.string().min(1, "Inspection number is required"),
    date: z.date().nullable().optional(),
    technician: z.string().optional(),
    result: z.string().optional(),
    notes: z.string().optional(),
});

type AddInspectionFormValues = z.infer<typeof addInspectionSchema>;

const resultOptions = [
    { id: "pass", name: "Pass" },
    { id: "fail", name: "Fail" },
    { id: "pending", name: "Pending" },
    { id: "conditional", name: "Conditional Pass" },
];

/* ── Page ── */
const AddInspectionPage = ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const router = useRouter();
    const { id } = use(params);

    const methods = useForm<AddInspectionFormValues>({
        resolver: zodResolver(addInspectionSchema),
    });

    const { control, handleSubmit } = methods;

    const onSubmit = (data: AddInspectionFormValues) => {
        console.log("Add inspection", data);
        router.back();
    };

    return (
        <FormProvider {...methods}>
            <div className="h-full w-full bg-white">
                <div className="p-3 flex flex-col gap-4 border border-gray-200 rounded-xl">
                    <div className="p-0 flex flex-col gap-1 border border-gray-200 rounded-xl">

                        {/* Page Header */}
                        <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <UserSearchIcon size={18} className="text-gray-700" />
                                <span className="text-sm font-semibold text-gray-800">Add Inspection</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <button
                                    onClick={() => router.push(`/vendor/management/vehicles/${id}`)}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Vehicle
                                </button>
                                <span className="text-gray-400">▶</span>
                                <span className="text-blue-600 font-medium">Add Inspection</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <CommonTextInput
                                        name="inspectionNo"
                                        label="Inspection No *"
                                        placeholder="e.g. INS-001"
                                    />

                                    <Controller
                                        control={control}
                                        name="date"
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Inspection Date"
                                                value={field.value || null}
                                                onChange={field.onChange}
                                                endIcon={<CalendarIcon size={16} className="text-gray-500" />}
                                            />
                                        )}
                                    />

                                    <CommonTextInput
                                        name="technician"
                                        label="Technician"
                                        placeholder="Enter technician name"
                                    />

                                    <Controller
                                        control={control}
                                        name="result"
                                        render={({ field, fieldState }) => (
                                            <ModalDropdown
                                                items={resultOptions}
                                                label="Result"
                                                selectedItem={resultOptions.find((o) => o.id === field.value) || null}
                                                onSelect={(item) => field.onChange(item.id)}
                                                error={fieldState.error?.message}
                                            />
                                        )}
                                    />

                                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                                        <CommonTextArea
                                            name="notes"
                                            label="Notes"
                                            rows={3}
                                            placeholder="Enter inspection notes or findings"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 pb-2">
                                <Button
                                    type="button"
                                    onClick={() => router.back()}
                                    variant="danger"
                                    size="md"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" size="md" variant="primary">
                                    Save
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default AddInspectionPage;
