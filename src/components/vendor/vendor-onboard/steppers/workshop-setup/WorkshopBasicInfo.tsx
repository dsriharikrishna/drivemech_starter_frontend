"use client";

import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Bike, Car, Bus, Layers, MoreHorizontal } from "lucide-react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";

const WorkshopBasicInfo = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedVehicleTypes = (watch("vehicleTypes") as string[]) || [];
  const selectedWorkingDays = (watch("workingDays") as string[]) || [];
  const selectedWorkingHours = (watch("workingHours") as string[]) || [];

  // Vehicle Types Data
  const vehicleTypes = [
    { id: "motorcycle", label: "Motorcycle", icon: <Bike size={24} /> },
    {
      id: "3-wheeler",
      label: "3- Wheeler",
      icon: (
        <img
          src="/icons/rickshaw.png"
          alt="3-wheeler"
          className="w-6 h-6"
          onError={(e) =>
            (e.currentTarget.src =
              "https://cdn-icons-png.flaticon.com/512/3063/3063823.png")
          }
        />
      ),
    },
    { id: "4-wheeler", label: "4 - Wheeler", icon: <Car size={24} /> },
    { id: "bus-truck", label: "Bus/ Truck", icon: <Bus size={24} /> },
    {
      id: "large-fleet",
      label: "Large Fleet Vehicles",
      icon: <Layers size={24} />,
    },
    { id: "others", label: "Others", icon: <MoreHorizontal size={24} /> },
  ];

  const handleVehicleTypeClick = useCallback(
    (typeId: string) => {
      const current = [...selectedVehicleTypes];
      const index = current.indexOf(typeId);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(typeId);
      }
      setValue("vehicleTypes", current, { shouldValidate: true });
    },
    [selectedVehicleTypes]
  );

  // Working days options for MultiSelectDropdown
  const dayOptions = React.useMemo(
    () => [
      { id: "monday", name: "Monday" },
      { id: "tuesday", name: "Tuesday" },
      { id: "wednesday", name: "Wednesday" },
      { id: "thursday", name: "Thursday" },
      { id: "friday", name: "Friday" },
      { id: "saturday", name: "Saturday" },
      { id: "sunday", name: "Sunday" },
    ],
    []
  );

  const workingHoursOptions = React.useMemo(
    () => [
      { id: "9am-5pm", name: "9am-5pm" },
      { id: "10am-6pm", name: "10am-6pm" },
      { id: "11am-7pm", name: "11am-7pm" },
      { id: "12pm-8pm", name: "12pm-8pm" },
      { id: "1pm-9pm", name: "1pm-9pm" },
      { id: "2pm-10pm", name: "2pm-10pm" },
      { id: "3pm-11pm", name: "3pm-11pm" },
      { id: "4pm-12am", name: "4pm-12am" },
      { id: "5pm-1am", name: "5pm-1am" },
      { id: "6pm-2am", name: "6pm-2am" },
      { id: "7pm-3am", name: "7pm-3am" },
      { id: "8pm-4am", name: "8pm-4am" },
      { id: "9pm-5am", name: "9pm-5am" },
    ],
    []
  );

  const handleWorkingDaysChange = useCallback(
    (selectedDays: Array<{ id: string; name: string }>) => {
      const dayIds = selectedDays.map((day) => day.id);
      setValue("workingDays", dayIds, { shouldValidate: true });
    },
    [setValue]
  );

  const handleWorkingHoursChange = useCallback(
    (selectedHours: Array<{ id: string; name: string }>) => {
      const hourIds = selectedHours.map((hour) => hour.id);
      setValue("workingHours", hourIds, { shouldValidate: true });
    },
    [setValue]
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="text-gray-900">Workshop Details</span>
      </h3>

      {/* Vehicle Type Section */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-700">Vehicle Type</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleVehicleTypeClick(type.id)}
              className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border transition-all h-28 ${
                selectedVehicleTypes.includes(type.id)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`${
                  selectedVehicleTypes.includes(type.id)
                    ? "text-orange-500"
                    : "text-gray-600"
                }`}
              >
                {type.icon}
              </div>
              <span
                className={`text-xs text-center font-medium ${
                  selectedVehicleTypes.includes(type.id)
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {type.label}
              </span>
            </button>
          ))}
        </div>
        {errors.vehicleTypes && (
          <p className="text-sm text-red-500">
            {errors.vehicleTypes.message as string}
          </p>
        )}
      </div>

      {/* Working Days Section */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <MultiSelectDropdown
            label="Working Days"
            options={dayOptions}
            selectedValues={dayOptions.filter((day) =>
              selectedWorkingDays.includes(day.id)
            )}
            onChange={handleWorkingDaysChange}
            placeholder="Select working days"
            required
            error={errors.workingDays?.message as string}
          />
        </div>
        <div className="flex-1">
          <MultiSelectDropdown
            label="Working Hours"
            options={workingHoursOptions}
            selectedValues={workingHoursOptions.filter((day) =>
              selectedWorkingHours.includes(day.id)
            )}
            onChange={handleWorkingHoursChange}
            placeholder="Select working hours"
            required
            error={errors.workingHours?.message as string}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkshopBasicInfo;
