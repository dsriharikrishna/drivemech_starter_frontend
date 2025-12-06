"use client";

import { useEffect, useMemo, useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { MapPin, Locate } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";

interface Props {
  form: UseFormReturn<any>;
  mode?: "pickup" | "walkin";
}

function timeToMinutes(t: string) {
  const [hh = "0", mm = "0"] = (t || "").split(":");
  return parseInt(hh, 10) * 60 + parseInt(mm, 10);
}

export default function PickupAndDateTime({ form, mode = "pickup" }: Props) {
  const selectedDate: string = form.watch("date");

  const today = new Date().toISOString().split("T")[0];

  // 🔥 Store locked minimum time (fixed once when user selects today)
  const [todayMinTime, setTodayMinTime] = useState<string | undefined>(undefined);

  // 🔥 When date changes → lock the time if today is selected
  useEffect(() => {
    if (selectedDate === today) {
      const locked = new Date().toTimeString().slice(0, 5); // "HH:mm"
      setTodayMinTime(locked);
    } else {
      setTodayMinTime(undefined);
    }

    // revalidate fields when date changes
    form.trigger("time");
    form.trigger("date");
  }, [selectedDate, today, form]);

  return (
    <div
      className={
        mode === "pickup"
          ? "grid grid-cols-1 md:grid-cols-2 gap-3"
          : "grid grid-cols-1 gap-3"
      }
    >
      {/* ===================== PICKUP ADDRESS ===================== */}
      {mode === "pickup" && (
        <div className="p-4 border border-gray-200 rounded-xl bg-white">
          <p className="font-medium mb-3">Pickup Address *</p>

          <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <MapPin className="w-4 h-4 text-gray-400" />

            <input
              {...form.register("location", { required: "Location is required" })}
              placeholder="Location"
              className="w-full outline-none text-sm"
            />

            <button
              type="button"
              className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1"
            >
              <Locate className="w-3 h-3" />
              Locate Me
            </button>
          </div>
        </div>
      )}

      {/* ===================== DATE & TIME ===================== */}
      <div className="p-4 border border-gray-200 rounded-xl bg-white">
        <p className="font-medium mb-3">Preferred Date & Time *</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ---------------------- DATE FIELD ---------------------- */}
          <Controller
            control={form.control}
            name="date"
            rules={{
              required: "Date is required",
              validate: (val: string) => {
                if (!val) return "Date is required";
                if (val < today) return `Please select ${today} or later`;
                return true;
              },
            }}
            render={({ field }) => (
              <CommonTextInput
                {...field}
                name="date"
                type="date"
                label="Date"
                form={form}
                placeholder="Select Date"
                min={today}
              />
            )}
          />

          {/* ---------------------- TIME FIELD ---------------------- */}
          <Controller
            control={form.control}
            name="time"
            rules={{
              required: "Time is required",
              validate: (val: string) => {
                if (!val) return "Time is required";

                const selected = form.getValues("date");
                if (!selected) return "Please choose a date first";

                if (selected === today && todayMinTime) {
                  if (timeToMinutes(val) < timeToMinutes(todayMinTime)) {
                    return `Please choose a time at or after ${todayMinTime}`;
                  }
                }

                return true;
              },
            }}
            render={({ field }) => (
              <CommonTextInput
                {...field}
                name="time"
                type="time"
                label="Time"
                form={form}
                placeholder="Select Time"
                min={selectedDate === today ? todayMinTime : undefined}
              />
            )}
          />

        </div>
      </div>
    </div>
  );
}
