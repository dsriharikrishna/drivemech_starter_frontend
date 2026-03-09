"use client";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { House, Suitcase, MapPin } from "phosphor-react";
import { useCallback, useMemo } from "react";

import Typography from "@/components/ui/Typography";
import CustomCard from "@/components/ui/CustomCard";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import ModalDropdown from "@/components/ui/DropDown";

export type AddAddressValues = {
  type: "home" | "office" | "pickup";
  label: string;
  fullName: string;
  phone: string;
  address1: string;
  address2?: string;
  landmark?: string;
  city: string;
  state: string;
  postcode: string;
  isDefault: boolean;
};

export default function AddAddressForm({
  mode = "add",
  initialData,
  onSave,
  onCancel,
}: {
  mode?: "add" | "edit";
  initialData?: Partial<AddAddressValues>;
  onSave?: (vals: AddAddressValues) => void;
  onCancel?: () => void;
}) {
  const methods = useForm<AddAddressValues>({
    defaultValues: {
      type: "home",
      label: "Home",
      fullName: "",
      phone: "",
      address1: "",
      address2: "",
      landmark: "",
      city: "",
      state: "",
      postcode: "",
      isDefault: false,
      ...initialData, // ← Prefill when editing
    },
  });

  const { handleSubmit, control, setValue, watch } = methods;

  const selectedType = watch("type");

  const submit = useCallback(
    (values: AddAddressValues) => {
      onSave?.(values);
    },
    [onSave]
  );

  const typeButtons = useMemo(
    () => [
      { id: "home", label: "Home", icon: <House size={16} /> },
      { id: "office", label: "Office", icon: <Suitcase size={16} /> },
      { id: "pickup", label: "Pickup", icon: <MapPin size={16} /> },
    ],
    []
  );

  const states = useMemo(
    () => [
      { id: "MH", name: "Maharashtra" },
      { id: "KA", name: "Karnataka" },
      { id: "TN", name: "Tamil Nadu" },
      // Add more states as needed
    ],
    []
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <Typography variant="h5" weight="semibold">
            {mode === "edit" ? "Edit Address" : "Add Address"}
          </Typography>
        </div>

        {/* ADDRESS TYPE */}
        <CustomCard className="p-3 border border-gray-200">
          <Typography weight="semibold" className="text-xs">
            Address Type *
          </Typography>

          <div className="flex items-center gap-2 mt-2">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  {typeButtons.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        field.onChange(t.id as AddAddressValues["type"]);
                        setValue("label", t.label);
                      }}
                      className={`px-3 py-2 rounded-xl border flex flex-col items-center gap-1.5 text-xs transition ${
                        field.value === t.id
                          ? "bg-primary-500 text-white border-primary-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {t.icon}
                      <span className="text-[11px] font-medium">{t.label}</span>
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </CustomCard>

        {/* CONTACT INFORMATION */}
        <CustomCard className="p-3 border border-gray-200">
          <Typography weight="semibold" className="text-sm">
            Contact Information
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="Full Name*"
                  placeholder="John Smith"
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="Phone Number*"
                  placeholder="+91 X XX XX XX XX"
                />
              )}
            />
          </div>
        </CustomCard>

        {/* ADDRESS DETAILS */}
        <CustomCard className="p-3 border border-gray-200">
          <Typography weight="semibold" className="text-sm">
            Address Details
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <Controller
              name="address1"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="Address Line 1*"
                  placeholder="123 Main Street"
                />
              )}
            />

            <Controller
              name="address2"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="Address Line 2 (Optional)"
                  placeholder="Apartment 4B"
                />
              )}
            />

            <Controller
              name="landmark"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="Landmark (Optional)"
                  placeholder="Near Central Park"
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="City*"
                  placeholder="Downtown"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div className="mt-[-6px]">
              <label className="text-xs font-semibold">State*</label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <ModalDropdown
                    items={states}
                    selectedItem={
                      states.find((item) => item.name === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.name)}
                    placeholder="Select State"
                  />
                )}
              />
            </div>

            <Controller
              name="postcode"
              control={control}
              render={({ field }) => (
                <CommonTextInput
                  {...field}
                  label="Postcode*"
                  placeholder="10001"
                />
              )}
            />
          </div>
        </CustomCard>

        {/* QUICK LOCATION OPTIONS */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={14} weight="fill" className="text-red-500" />
            <Typography weight="semibold" className="text-xs">
              Quick Location Options
            </Typography>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              className="w-full flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition"
            >
              <svg
                className="w-3.5 h-3.5 text-orange-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  opacity="0.3"
                />
              </svg>
              Use Current Location
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition"
            >
              <svg
                className="w-3.5 h-3.5 text-orange-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Select from Map
            </button>
          </div>
        </div>

        {/* DEFAULT SWITCH */}
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xs">Set as Default Address</p>
              <Typography
                variant="small"
                color="muted"
                className="text-[11px] mt-0.5"
              >
                This address will be auto-selected for deliveries
              </Typography>
            </div>

            <Controller
              name="isDefault"
              control={control}
              render={({ field }) => (
                <ToggleSwitch
                  checked={field.value}
                  onChange={(checked) => field.onChange(checked)}
                />
              )}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center pt-1.5">
          <Button type="submit" variant="gradient" className="px-6 text-xs">
            {mode === "edit" ? "Update Address" : "Save Address"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
