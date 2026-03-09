"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";

const rescheduleSchema = z.object({
  reason: z.string().min(1, "Please select a reason"),
  assignedEmployee: z.string().min(1, "Please select an employee"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  writeReason: z.string().optional(),
});

type RescheduleFormValues = z.infer<typeof rescheduleSchema>;

interface RescheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RescheduleFormValues) => void;
  employeeOptions: Array<{ id: string; name: string; description?: string }>;
}

export default function RescheduleDialog({
  isOpen,
  onClose,
  onSubmit,
  employeeOptions,
}: RescheduleDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RescheduleFormValues>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      reason: "",
      assignedEmployee: "",
      date: "",
      time: "",
      writeReason: "",
    },
  });

  const reasonOptions = [
    { id: "customer-request", name: "Customer Request" },
    { id: "parts-unavailable", name: "Parts Unavailable" },
    { id: "technician-unavailable", name: "Technician Unavailable" },
    { id: "emergency", name: "Emergency" },
    { id: "other", name: "Other" },
  ];

  const handleFormSubmit = (data: RescheduleFormValues) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const selectedReason = reasonOptions.find((r) => r.id === watch("reason"));
  const selectedEmployee = employeeOptions.find(
    (e) => e.id === watch("assignedEmployee")
  );

  return (
    <Dialog isOpen={isOpen} onClose={handleCancel}>
      <DialogBody className="h-auto w-full md:w-2xl">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-6">
            <DialogHeader
              title="Reason for reschedule"
              onClose={handleCancel}
            />

            <div className="mt-6 space-y-6">
              {/* Reason for reschedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for reschedule<span className="text-red-500">*</span>
                  </label>
                  <DropDown
                    items={reasonOptions}
                    selectedItem={selectedReason || null}
                    onSelect={(reason) => setValue("reason", reason.id)}
                    placeholder="Select Reason"
                  />
                  {errors.reason && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Employee<span className="text-red-500">*</span>
                  </label>
                  <DropDown
                    items={employeeOptions}
                    selectedItem={selectedEmployee || null}
                    onSelect={(employee) =>
                      setValue("assignedEmployee", employee.id)
                    }
                    placeholder="Select Employee"
                  />
                  {errors.assignedEmployee && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.assignedEmployee.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <DatePicker
                    label="Date"
                    value={watch("date") ? new Date(watch("date")) : null}
                    onChange={(date) =>
                      setValue(
                        "date",
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    placeholder="Select Date"
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <TimePicker
                    label="Time"
                    value={watch("time")}
                    onChange={(time) => setValue("time", time || "")}
                    placeholder="Select Time"
                  />
                  {errors.time && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Write Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write Reason
                </label>
                <textarea
                  {...register("writeReason")}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter additional details..."
                />
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <DialogFooter
              leftTitle="Cancel"
              rightTitle="Submit"
              onCancel={handleCancel}
              onConfirm={handleSubmit(handleFormSubmit)}
            />
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
