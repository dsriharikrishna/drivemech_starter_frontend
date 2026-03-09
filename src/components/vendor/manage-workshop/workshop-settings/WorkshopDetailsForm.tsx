"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, ShoppingBag } from "lucide-react";
import ModalDropdown from "@/components/ui/DropDown";
import { workshopDetailsSchema } from "@/schemas/workshop.schema";
import { WorkshopDetailsFormValues } from "@/types/workshop.types";
import WorkshopServicesBrands from "../../vendor-onboard/steppers/workshop-setup/WorkshopServicesBrands";
import Accordion from "@/components/ui/Accordion";

const WorkshopDetailsForm = () => {
  const [isDetailsExpanded, setIsDetailsExpanded] = React.useState(true);

  const methods = useForm<WorkshopDetailsFormValues>({
    resolver: zodResolver(workshopDetailsSchema),
    defaultValues: {
      tradingHours: "9am-5pm",
      serviceCapacity: "general",
      serviceCategory: "repair",
      vehicleType: "all",
      workingDays: "mon-fri",
      brandsServiced: "Toyota, Honda, Ford",
      selectedServices: ["logbook", "basic"],
      selectedBrands: ["hyundai", "honda", "kia"],
      pricingRows: [],
    },
  });

  const onSubmit = (data: WorkshopDetailsFormValues) => {
    console.log("Workshop Details:", data);
  };

  const serviceTypesOptions = [
    { id: "general", name: "General Service" },
    { id: "repair", name: "Repair" },
    { id: "custom", name: "Custom" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion
          title="Workshop Details"
          icon={<ShoppingBag size={24} className="text-white" />}
          isExpanded={isDetailsExpanded}
          onToggle={() => setIsDetailsExpanded(!isDetailsExpanded)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller
              name="serviceCategory"
              control={methods.control}
              render={({ field, fieldState }) => (
                <ModalDropdown
                  label="Service Category"
                  placeholder="Select Service Category"
                  required
                  items={serviceTypesOptions}
                  selectedItem={
                    serviceTypesOptions.find((opt) => opt.id === field.value) ||
                    null
                  }
                  onSelect={(item) => field.onChange(item.id)}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="vehicleType"
              control={methods.control}
              render={({ field, fieldState }) => (
                <ModalDropdown
                  label="Vehicle Type"
                  placeholder="Select vehicle type"
                  required
                  items={[{ id: "all", name: "All Types" }, { id: "sedan", name: "Sedan" }, { id: "suv", name: "SUV" }]}
                  selectedItem={
                    [{ id: "all", name: "All Types" }, { id: "sedan", name: "Sedan" }, { id: "suv", name: "SUV" }].find((opt) => opt.id === field.value) ||
                    null
                  }
                  onSelect={(item) => field.onChange(item.id)}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="workingDays"
              control={methods.control}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <ModalDropdown
                    label="Working Days"
                    placeholder="Select working days"
                    required
                    items={[{ id: "mon-fri", name: "Mon - Fri" }, { id: "mon-sat", name: "Mon - Sat" }, { id: "all", name: "All Days" }]}
                    selectedItem={
                      [{ id: "mon-fri", name: "Mon - Fri" }, { id: "mon-sat", name: "Mon - Sat" }, { id: "all", name: "All Days" }].find((opt) => opt.id === field.value) ||
                      null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    error={fieldState.error?.message}
                  />
                </div>
              )}
            />
          </div>
        </Accordion>

        <WorkshopServicesBrands />
      </form>
    </FormProvider>
  );
};

export default WorkshopDetailsForm;
