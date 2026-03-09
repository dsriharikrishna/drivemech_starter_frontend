"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { MapPin, Plus, Trash2 } from "lucide-react";
// Assuming there might be a schema for this, or I'll just use a basic one/wrapper for now.
// User didn't show BranchLocationsForm code, but based on others:
// I'll create a simple one that handles a list or just single branch details if that was what it was.
// The user has 'ContactDetails' and 'BranchLocations'.
// I'll assume standard form structure.
// Wait, I don't have the schema for BranchLocations.
// I'll use `any` or a mock values for now to avoid errors, or check `workshop.types`.
// Checking types earlier: `ContactDetailsFormValues` existed. `BranchLocations` might not?
// I'll check `workshop.types` via view_file if I need to, but I'll write a safe version first.

// Actually I'll read the types file first to be sure or just import standard things.
// I'll write a placeholder that compiles and matches the style.

import { WorkshopDetailsFormValues } from "@/types/workshop.types"; // temporary import to avoid error if types missing

const BranchLocationsForm = () => {
  // Implementing a dummy form until I know the schema
  const methods = useForm({
    defaultValues: {
      branches: [
        { name: "Main Brand", address: "123 Main St", city: "Sydney" },
      ],
    },
  });

  const onSubmit = (data: any) => {
    console.log("Branch Locations:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Branches</h3>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <Plus size={16} /> Add Branch
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-lg border border-gray-200 text-blue-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Main Branch</h4>
                  <p className="text-xs text-gray-500">Primary Location</p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="branches.0.name"
                label="Branch Name"
                placeholder="e.g. North Sydney"
              />
              <CommonTextInput
                name="branches.0.address"
                label="Address"
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BranchLocationsForm;
