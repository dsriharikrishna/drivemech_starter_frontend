"use client";

import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { Locate } from "lucide-react";
import Image from "next/image";
import DatePicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import { SelectServiceFormData } from "@/schemas/customer/selectService.schema";

interface Props {
  form: UseFormReturn<SelectServiceFormData>;
  mode?: "pickup" | "walkin";
}

export default function PreferredDateTime({ form, mode = "pickup" }: Props) {
  const selectedMode = form.watch("mode");
  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");

  // Handle "Locate Me" button click
  const handleLocateMe = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Set lat/lng in form
          form.setValue("location.lat", latitude);
          form.setValue("location.lng", longitude);

          // Optionally, you can reverse geocode to get address
          // For now, just show coordinates in the address field
          form.setValue(
            "location.address",
            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          );

          // Show success message
          if (window.addToast) {
            window.addToast(
              "Location detected successfully",
              "success"
            );
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          if (window.addToast) {
            window.addToast(
              "Unable to detect location. Please enter manually.",
              "error"
            );
          }
        }
      );
    } else {
      if (window.addToast) {
        window.addToast(
          "Geolocation is not supported by your browser",
          "error"
        );
      }
    }
  }, [form]);

  // Convert string date to Date object for DatePicker
  const dateValue = selectedDate ? new Date(selectedDate) : null;

  // Handle date change from DatePicker
  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (date) {
        // Format date as YYYY-MM-DD for form
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        form.setValue("date", `${year}-${month}-${day}`);
      } else {
        form.setValue("date", "");
      }
    },
    [form]
  );

  // Convert HH:MM format to TimePicker format (HH:MM:SS AM/PM)
  const convertToTimePickerFormat = (time24: string): string => {
    if (!time24 || !time24.match(/^\d{1,2}:\d{2}$/)) {
      return "";
    }

    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00 ${period}`;
  };

  // Convert TimePicker format (HH:MM:SS AM/PM) to HH:MM 24-hour format
  const handleTimeChange = useCallback(
    (time: string) => {
      // Parse the time from TimePicker format: "HH:MM:SS AM/PM"
      const timeMatch = time.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/);
      if (timeMatch) {
        const [, h, m, , period] = timeMatch;
        let hours = parseInt(h, 10);
        const minutes = parseInt(m, 10);

        // Convert to 24-hour format
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        // Format as HH:MM
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        form.setValue("time", formattedTime);
      }
    },
    [form]
  );

  return (
    <div
      className={
        selectedMode === "pickup"
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : "grid grid-cols-1 gap-4"
      }
    >
      {/* ===================== PICKUP ADDRESS ===================== */}
      {selectedMode === "pickup" && (
        <div className="p-3 border border-gray-200 rounded-xl bg-white">
          <p className="text-sm font-medium mb-2">Pickup Address *</p>

          <div>
            <div className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-3 py-2 bg-white">

              <div className="flex items-center gap-2 flex-3">
                <Image
                  src="/svgs/select-service/google-location.svg"
                  alt="Location"
                  width={16}
                  height={16}
                  className="text-gray-400"
                />
                <input
                  {...form.register("location.address")}
                  placeholder="Location"
                  className="w-full outline-none text-xs"
                />
              </div>

              <button
                type="button"
                onClick={handleLocateMe}
                className="flex-1 text-xs  px-1.5 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center gap-1 hover:bg-blue-100 transition-colors"
              >
                <Locate className="w-3 h-3 font-semibold" strokeWidth={2.5} />
                Locate Me
              </button>
            </div>

            {form.formState.errors.location?.address && (
              <p className="text-red-500 text-xs mt-1">
                {(form.formState.errors.location.address as any)?.message ||
                  "Address is required"}
              </p>
            )}

            {form.formState.errors.location &&
              !form.formState.errors.location.address && (
                <p className="text-red-500 text-xs mt-1">
                  {(form.formState.errors.location as any)?.message ||
                    "Pickup address is required"}
                </p>
              )}

            {/* Hidden fields for lat/lng coordinates */}
            <input
              type="hidden"
              {...form.register("location.lat", {
                valueAsNumber: true,
              })}
            />
            <input
              type="hidden"
              {...form.register("location.lng", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>
      )}

      {/* ===================== DATE & TIME ===================== */}
      <div className="p-3 border border-gray-200 rounded-xl bg-white">
        <p className="text-sm font-medium mb-2">Preferred Date & Time *</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* ---------------------- DATE FIELD ---------------------- */}
          <div>
            <DatePicker
              label="Date"
              endIcon={<img src="/svgs/select-service/calendar.svg" alt="Calendar" className="text-gray-400" width={16} height={16} />}
              placeholder="Select Date"
              value={dateValue}
              onChange={handleDateChange}
              required
            />
            {form.formState.errors.date && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          {/* ---------------------- TIME FIELD ---------------------- */}
          <div>
            <TimePicker
              label="Time"
              placeholder="Select Time"
              endIcon={<img src="/svgs/select-service/clock-icon.svg" alt="Clock" width={16} height={16} />}
              value={convertToTimePickerFormat(selectedTime)}
              onChange={handleTimeChange}
              required
              use24Hour={false}
            />
            {form.formState.errors.time && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.time.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
