import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vehicleSchema,
  VehicleFormValues,
} from "@/schemas/vendor/vehicle.schema";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import ModalDropdown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import RegoInput, { StateOption } from "@/components/forms/RegoInput";

interface VehicleDetailsFormProps {
  initialData?: Partial<VehicleFormValues>;
  onSave?: (data: VehicleFormValues) => void;
  onCancel?: () => void;
}

const VehicleDetailsForm = ({
  initialData,
  onSave,
  onCancel,
}: VehicleDetailsFormProps) => {
  const methods = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      ac: false,
      ...initialData,
    },
  });

  const { control, handleSubmit } = methods;

  const mockOptions = [
    { id: "opt1", name: "Option 1" },
    { id: "opt2", name: "Option 2" },
  ];

  const stateOptions: StateOption[] = [
    { id: "AP", name: "Andhra Pradesh", code: "AP" },
    { id: "TS", name: "Telangana", code: "TS" },
    { id: "KA", name: "Karnataka", code: "KA" },
    { id: "TN", name: "Tamil Nadu", code: "TN" },
    { id: "MH", name: "Maharashtra", code: "MH" },
    { id: "DL", name: "Delhi", code: "DL" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSave || console.log)}
        className="space-y-6"
      >
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Vehicle Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Row 1 */}
            <div className="col-span-1 md:col-span-2">
              <RegoInput
                name="regNumber"
                stateName="state"
                label="State"
                regoLabel="Rego"
                placeholder="Enter your Reg. Number"
                stateOptions={stateOptions}
                required
              />
            </div>
            <div>
              <Controller
                control={control}
                name="vehicleMake"
                render={({ field, fieldState }) => (
                  <ModalDropdown
                    items={mockOptions}
                    label="Vehicle Make"
                    selectedItem={
                      mockOptions.find((o) => o.id === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <CommonTextInput
              name="vehicleModel"
              label="Vehicle Model *"
              placeholder="Enter Vehicle Model"
            />

            {/* Row 2 */}
            <CommonTextInput
              name="vehicleModelCode"
              label="Vehicle Model Code"
              placeholder="Enter Vehicle Model Code"
            />
            <CommonTextInput
              name="vehicleModelSeries"
              label="Vehicle Model Series"
              placeholder="Enter Vehicle Model Series"
            />
            <CommonTextInput name="vin" label="VIN" placeholder="Enter VIN" />
            <CommonTextInput
              name="engineNumber"
              label="Engine Number"
              placeholder="Enter Engine Number"
            />

            {/* Row 3 */}
            <CommonTextInput
              name="chassisNumber"
              label="Chassis Number"
              placeholder="Enter Chassis Number"
            />
            <CommonTextInput
              name="engineCode"
              label="Engine Code"
              placeholder="Enter Engine Code"
            />
            <CommonTextInput
              name="fleetCode"
              label="Fleet Code"
              placeholder="Enter Fleet Code"
            />
            <div>
              <Controller
                control={control}
                name="transmission"
                render={({ field, fieldState }) => (
                  <ModalDropdown
                    items={mockOptions}
                    label="Transmission"
                    selectedItem={
                      mockOptions.find((o) => o.id === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">A/C</label>
              <Controller
                control={control}
                name="ac"
                render={({ field }) => (
                  <ToggleSwitch
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="bodyType"
                render={({ field, fieldState }) => (
                  <ModalDropdown
                    items={mockOptions}
                    label="Body Type"
                    selectedItem={
                      mockOptions.find((o) => o.id === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="driveType"
                render={({ field, fieldState }) => (
                  <ModalDropdown
                    items={mockOptions}
                    label="Drive Type"
                    selectedItem={
                      mockOptions.find((o) => o.id === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="fuelType"
                render={({ field, fieldState }) => (
                  <ModalDropdown
                    items={mockOptions}
                    label="Fuel Type"
                    selectedItem={
                      mockOptions.find((o) => o.id === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* Row 5 - Dates */}
            <Controller
              control={control}
              name="regoDueDate"
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Rego Due Date"
                  value={field.value || null}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="buildDate"
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Build Date"
                  value={field.value || null}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="nextServiceDate"
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Next Service Date"
                  value={field.value || null}
                  onChange={field.onChange}
                />
              )}
            />
            <CommonTextInput
              name="nextServiceKms"
              label="Next Service KMS"
              placeholder="Enter KMS"
              rules={{ valueAsNumber: true }}
            />

            {/* Row 6 */}
            <Controller
              control={control}
              name="manufacturingDate"
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Manufacturing Date"
                  value={field.value || null}
                  onChange={field.onChange}
                />
              )}
            />
            <CommonTextInput
              name="cylinders"
              label="Cylinders"
              placeholder="Select Cylinders"
            />
            <CommonTextInput
              name="tyreSize"
              label="Tyre Size"
              placeholder="Enter Tyre Size"
            />
            <CommonTextInput
              name="importedId"
              label="Imported ID"
              placeholder="Enter ID"
            />
          </div>

          <div className="mt-6">
            <CommonTextArea
              name="notes"
              label="Notes"
              rows={4}
              placeholder="Enter Notes"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pb-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default VehicleDetailsForm;
