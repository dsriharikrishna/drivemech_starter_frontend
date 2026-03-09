"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import FormActionButtons from "@/components/ui/FormActionButtons";
import {
  newInspectionSchema,
  type NewInspectionFormValues,
} from "@/schemas/vendor/inspection.schema";

const customerTypeOptions = [
  { id: "cash", name: "Cash" },
  { id: "company", name: "Company/Individual" },
  { id: "individual", name: "Non-Biller" },
];

const stateOptions = [
  { id: "1", name: "Select / State" },
  { id: "NSW", name: "NSW" },
  { id: "VIC", name: "VIC" },
  { id: "QLD", name: "QLD" },
];

const countryOptions = [
  { id: "1", name: "Select / Country" },
  { id: "India", name: "India" },
  { id: "Australia", name: "Australia" },
];

const reasonOptions = [
  { id: "1", name: "Select" },
  { id: "routine", name: "Routine Inspection" },
  { id: "prepur", name: "Pre-Purchase" },
];

const NewInspectionForm = () => {
  const methods = useForm<NewInspectionFormValues>({
    resolver: zodResolver(newInspectionSchema),
    defaultValues: {
      customerType: "cash",
      customerName: "",
      mobileNumber: "",
      phoneNumber: "",
      email: "",
      address1: "",
      address2: "",
      suburb: "",
      postcode: "",
      state: "",
      country: "",
      importerId: "",
      businessNumber: "",
      salesTaxFree: false,
      customerLimit: false,
      vipCustomer: false,
      vehicleRegNumber: "",
      vehicleState: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleModelCode: "",
      vehicleModelSeries: "",
      engineNumber: "",
      driveType: "",
      model: "",
      rearCode: "",
      transmission: "",
      ac: false,
      bodyType: "",
      fuelType: "",
      regoRunDate: "",
      buildDate: "",
      nextServiceDate: "",
      nextServiceKMs: "",
      odometer: "",
      cylinders: "",
      tyreSize: "",
      manufacturer: "",
      warrantyExpiry: "",
      notes: "",
      reasonForInspection: "",
      referredInspectionDateTime: "",
      inspectionNotes: "",
      passedInspections: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const onSubmit = (data: NewInspectionFormValues) => {
    console.log("Inspection Data:", data);
  };

  const handleCancel = () => {
    methods.reset();
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Details Section */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h2 className="text-base font-medium text-gray-900">
            Customer Details
          </h2>
        </div>

        <div className="space-y-4">
          {/* Customer Type Toggles */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Cash
              </label>
              <ControlledToggleSwitch name="customerType" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Company/Individual
              </label>
              <ControlledToggleSwitch name="customerType" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Non-Biller
              </label>
              <ControlledToggleSwitch name="customerType" />
            </div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput
              name="customerName"
              label="Customer Name"
              placeholder=""
              required
            />
            <CommonTextInput
              name="mobileNumber"
              label="Mobile Number"
              placeholder=""
              required
            />
            <CommonTextInput
              name="phoneNumber"
              label="Phone Number"
              placeholder=""
            />
            <CommonTextInput name="email" label="Email" placeholder="" />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput name="address1" label="Address 1" placeholder="" />
            <CommonTextInput name="address2" label="Address 2" placeholder="" />
            <CommonTextInput name="suburb" label="Suburb" placeholder="" />
            <CommonTextInput name="postcode" label="Postcode" placeholder="" />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <DropDown
                label="State"
                items={stateOptions}
                selectedItem={
                  stateOptions.find((s) => s.id === watch("state")) || null
                }
                onSelect={(item) => setValue("state", item.id)}
                placeholder="Select / State"
              />
            </div>
            <div>
              <DropDown
                label="Country"
                items={countryOptions}
                selectedItem={
                  countryOptions.find((c) => c.id === watch("country")) || null
                }
                onSelect={(item) => setValue("country", item.id)}
                placeholder="Select / Country"
              />
            </div>
            <CommonTextInput
              name="importerId"
              label="Importer ID"
              placeholder=""
            />
            <CommonTextInput
              name="businessNumber"
              label="Business Number"
              placeholder=""
            />
          </div>

          {/* Row 4 - Toggles */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Sales Tax Free
              </label>
              <ControlledToggleSwitch name="salesTaxFree" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Customer Limit
              </label>
              <ControlledToggleSwitch name="customerLimit" />
            </div>
          </div>

          {/* VIP Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              VIP Customer
            </label>
            <ControlledToggleSwitch name="vipCustomer" />
          </div>
        </div>

        {/* Vehicle Details Section */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h2 className="text-base font-medium text-gray-900">
            Vehicle Details
          </h2>
        </div>

        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput
              name="vehicleRegNumber"
              label="Vehicle Reg Number"
              placeholder=""
              required
            />
            <div>
              <DropDown
                label="State"
                items={stateOptions}
                selectedItem={
                  stateOptions.find((s) => s.id === watch("vehicleState")) ||
                  null
                }
                onSelect={(item) => setValue("vehicleState", item.id)}
                placeholder="Select"
              />
            </div>
            <CommonTextInput
              name="vehicleMake"
              label="Vehicle Make"
              placeholder=""
              required
            />
            <CommonTextInput
              name="vehicleModel"
              label="Vehicle Model"
              placeholder=""
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput
              name="vehicleModelCode"
              label="Vehicle Model Code"
              placeholder=""
            />
            <CommonTextInput
              name="vehicleModelSeries"
              label="Vehicle Model Series"
              placeholder=""
            />
            <CommonTextInput
              name="engineNumber"
              label="Engine Number"
              placeholder=""
            />
            <CommonTextInput
              name="driveType"
              label="Drive Type"
              placeholder=""
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput name="model" label="Model" placeholder="" />
            <CommonTextInput name="rearCode" label="Rear Code" placeholder="" />
            <CommonTextInput
              name="transmission"
              label="Transmission"
              placeholder=""
            />
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                AC
              </label>
              <ControlledToggleSwitch name="ac" />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput name="bodyType" label="Body Type" placeholder="" />
            <CommonTextInput name="fuelType" label="Fuel Type" placeholder="" />
            <div>
              <DatePicker
                label="Rego Run Date"
                value={
                  watch("regoRunDate") && watch("regoRunDate") !== ""
                    ? new Date(watch("regoRunDate")!)
                    : null
                }
                onChange={(date) =>
                  setValue(
                    "regoRunDate",
                    date ? date.toISOString().split("T")[0] : ""
                  )
                }
                placeholder="Select Date"
              />
            </div>
            <div>
              <DatePicker
                label="Build Date"
                value={
                  watch("buildDate") && watch("buildDate") !== ""
                    ? new Date(watch("buildDate")!)
                    : null
                }
                onChange={(date) =>
                  setValue(
                    "buildDate",
                    date ? date.toISOString().split("T")[0] : ""
                  )
                }
                placeholder="Select Date"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <DatePicker
                label="Next Service Date"
                value={
                  watch("nextServiceDate") && watch("nextServiceDate") !== ""
                    ? new Date(watch("nextServiceDate")!)
                    : null
                }
                onChange={(date) =>
                  setValue(
                    "nextServiceDate",
                    date ? date.toISOString().split("T")[0] : ""
                  )
                }
                placeholder="Select Date"
              />
            </div>
            <CommonTextInput
              name="nextServiceKMs"
              label="Next Service KMs"
              placeholder=""
            />
            <CommonTextInput name="odometer" label="Odometer" placeholder="" />
            <CommonTextInput
              name="cylinders"
              label="Cylinders"
              placeholder=""
            />
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput name="tyreSize" label="Tyre Size" placeholder="" />
            <CommonTextInput
              name="manufacturer"
              label="Manufacturer"
              placeholder=""
            />
            <CommonTextInput
              name="warrantyExpiry"
              label="Warranty Expiry"
              placeholder=""
            />
          </div>

          {/* Notes */}
          <div>
            <CommonTextArea
              name="notes"
              label="Notes"
              placeholder=""
              rows={3}
            />
          </div>
        </div>

        {/* Inspection Details Section */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h2 className="text-base font-medium text-gray-900">
            Inspection Details
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <DropDown
                label="Reason for Inspection"
                items={reasonOptions}
                selectedItem={
                  reasonOptions.find(
                    (r) => r.id === watch("reasonForInspection")
                  ) || null
                }
                onSelect={(item) => setValue("reasonForInspection", item.id)}
                placeholder="Select"
              />
            </div>
            <div>
              <DatePicker
                label="Referred Inspection Date & Time"
                value={
                  watch("referredInspectionDateTime") &&
                  watch("referredInspectionDateTime") !== ""
                    ? new Date(watch("referredInspectionDateTime")!)
                    : null
                }
                onChange={(date) =>
                  setValue(
                    "referredInspectionDateTime",
                    date ? date.toISOString() : ""
                  )
                }
                placeholder="Select Date & Time"
              />
            </div>
          </div>

          <div>
            <CommonTextArea
              name="inspectionNotes"
              label="Inspection Notes"
              placeholder=""
              rows={3}
            />
          </div>

          <div>
            <CommonTextArea
              name="passedInspections"
              label="Type your Passed on Inspections"
              placeholder=""
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <FormActionButtons onCancel={handleCancel} onSave={handleSave} />
      </form>
    </FormProvider>
  );
};

export default NewInspectionForm;
