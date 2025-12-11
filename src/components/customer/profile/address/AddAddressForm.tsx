"use client";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { House, Suitcase, MapPin } from "phosphor-react";

import Typography from "@/components/ui/Typography";
import CustomCard from "@/components/ui/CustomCard";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";
import ToogleSwitch from "@/components/ui/ToogleSwitch";
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

  function submit(values: AddAddressValues) {
    onSave?.(values);
      }

  const typeButtons = [
    { id: "home", label: "Home", icon: <House size={18} /> },
    { id: "office", label: "Office", icon: <Suitcase size={18} /> },
    { id: "pickup", label: "Pickup", icon: <MapPin size={18} /> },
  ];

  const states = [
    { id: 'MH', name: 'Maharashtra' },
    { id: 'KA', name: 'Karnataka' },
    { id: 'TN', name: 'Tamil Nadu' },
    // Add more states as needed
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">

        {/* TITLE */}
        <div className="flex items-center justify-between">
          <Typography variant="h5" weight="semibold">
            {mode === "edit" ? "Edit Address" : "Add Address"}
          </Typography>
        </div>

        {/* ADDRESS TYPE */}
        <CustomCard className="p-4">
          <Typography weight="semibold">Address Type *</Typography>

          <div className="flex items-center gap-3 mt-3">
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
                      className={`px-4 py-2 rounded-2xl border flex items-center gap-3 text-sm transition ${field.value === t.id
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </CustomCard>

        {/* CONTACT INFORMATION */}
        <CustomCard className="p-4">
          <Typography weight="semibold">Contact Information</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="Full Name*" placeholder="John Smith" />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="Phone Number*" placeholder="+91 X XX XX XX XX" />
              )}
            />
          </div>
        </CustomCard>

        {/* ADDRESS DETAILS */}
        <CustomCard className="p-4">
          <Typography weight="semibold">Address Details</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <Controller
              name="address1"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="Address Line 1*" placeholder="123 Main St" />
              )}
            />

            <Controller
              name="address2"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="Address Line 2" placeholder="Apartment, Suite" />
              )}
            />

            <Controller
              name="landmark"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="Landmark" placeholder="Near Central Park" />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="City*" placeholder="Downtown" />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="mt-[-6px]">
              <label className="text-sm font-semibold">State</label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <ModalDropdown
                    items={states}
                    selectedItem={states.find(item => item.name === field.value) || null}
                    onSelect={(item) => field.onChange(item.name)}
                    placeholder="Select State*"
                  />
                )}
              />
            </div>
            
            <Controller
              name="postcode"
              control={control}
              render={({ field }) => (
                <CommonTextInput {...field} label="Postcode*" placeholder="10001" />
              )}
            />
          </div>
        </CustomCard>

        {/* DEFAULT SWITCH */}
        <CustomCard className="p-4 bg-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Set as Default Address</p>
              <Typography variant="small" color="muted">
                This address will be your primary delivery location
              </Typography>
            </div>

            <Controller
              name="isDefault"
              control={control}
              render={({ field }) => (
                <ToogleSwitch checked={field.value} onChange={(checked) => field.onChange(checked)} />
              )}
            />
          </div>
        </CustomCard>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onCancel?.()}>
            Cancel
          </Button>

          <Button type="submit" variant="gradient">
            {mode === "edit" ? "Update Address" : "Save Address"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
