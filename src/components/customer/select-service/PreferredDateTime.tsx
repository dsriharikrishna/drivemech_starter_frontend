"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MapPin, Locate } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { SelectServiceFormData } from "@/schemas/customer/selectService.schema";

interface Props {
  form: UseFormReturn<SelectServiceFormData>;
  mode?: "pickup" | "walkin";
}

export default function PreferredDateTime({ form, mode = "pickup" }: Props) {
  const selectedDate: string = form.watch("date");
  const selectedMode = form.watch("mode");

  const today = new Date().toISOString().split("T")[0];

  // Get current time for minimum time validation
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Update current time when component mounts or date changes to today
    if (selectedDate === today) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    } else {
      setCurrentTime("");
    }
  }, [selectedDate, today]);

  // Handle "Locate Me" button click
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Set lat/lng in form
          form.setValue("location.lat", latitude);
          form.setValue("location.lng", longitude);

          // Optionally, you can reverse geocode to get address
          // For now, just show coordinates in the address field
          form.setValue("location.address", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

          // Show success message
          (window as any).addToast?.("Location detected successfully", "success");
        },
        (error) => {
          console.error("Geolocation error:", error);
          (window as any).addToast?.("Unable to detect location. Please enter manually.", "error");
        }
      );
    } else {
      (window as any).addToast?.("Geolocation is not supported by your browser", "error");
    }
  };

  return (
    <div
      className={
        selectedMode === "pickup"
          ? "grid grid-cols-1 md:grid-cols-2 gap-3"
          : "grid grid-cols-1 gap-3"
      }
    >
      {/* ===================== PICKUP ADDRESS ===================== */}
      {selectedMode === "pickup" && (
        <div className="p-4 border border-gray-200 rounded-xl bg-white">
          <p className="font-medium mb-3">Pickup Address *</p>

          <div>
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <MapPin className="w-4 h-4 text-gray-400" />

              <input
                {...form.register("location.address")}
                placeholder="Enter your pickup address"
                className="w-full outline-none text-sm"
              />

              <button
                type="button"
                onClick={handleLocateMe}
                className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1 hover:bg-blue-100 transition-colors"
              >
                <Locate className="w-3 h-3" />
                Locate Me
              </button>
            </div>

            {form.formState.errors.location?.address && (
              <p className="text-red-500 text-xs mt-1">
                {(form.formState.errors.location.address as any)?.message || 'Address is required'}
              </p>
            )}

            {form.formState.errors.location && !form.formState.errors.location.address && (
              <p className="text-red-500 text-xs mt-1">
                {(form.formState.errors.location as any)?.message || 'Pickup address is required'}
              </p>
            )}

            {/* Hidden fields for lat/lng coordinates with default values */}
            <input
              type="hidden"
              {...form.register("location.lat", {
                valueAsNumber: true,
                value: 0
              })}
            />
            <input
              type="hidden"
              {...form.register("location.lng", {
                valueAsNumber: true,
                value: 0
              })}
            />
          </div>
        </div>
      )}

      {/* ===================== DATE & TIME ===================== */}
      <div className="p-4 border border-gray-200 rounded-xl bg-white">
        <p className="font-medium mb-3">Preferred Date & Time *</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ---------------------- DATE FIELD ---------------------- */}
          <CommonTextInput
            name="date"
            type="date"
            label="Date"
            form={form}
            placeholder="Select Date"
            min={today}
          />

          {/* ---------------------- TIME FIELD ---------------------- */}
          <CommonTextInput
            name="time"
            type="time"
            label="Time"
            form={form}
            placeholder="Select Time"
            min={selectedDate === today ? currentTime : undefined}
          />

        </div>
      </div>
    </div>
  );
}
