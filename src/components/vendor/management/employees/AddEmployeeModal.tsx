"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import { UploadSimple, CalendarBlank, Envelope, MapPin } from "phosphor-react";
import {
  employeeSchema,
  EmployeeFormValues,
} from "@/schemas/vendor/management.schema";
import PhoneInput from "@/components/forms/PhoneInput";
import { CalendarManagementIcon } from "@/components/icons/ManagementModuleIcons";
import DatePicker from "@/components/ui/DatePicker";
import { CloudUploadIcon } from "lucide-react";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "add" | "edit";
  initialData?: EmployeeFormValues | null;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  mode = "add",
  initialData,
}) => {
  // Mock Data
  const designations = [
    { id: "1", name: "Technician" },
    { id: "2", name: "Manager" },
  ];
  const states = [
    { id: "1", name: "Tamil Nadu" },
    { id: "2", name: "Kerala" },
  ];
  const postCodes = [
    { id: "1", name: "600001" },
    { id: "2", name: "600002" },
    { id: "3", name: "600003" },
  ];
  const cities = [
    { id: "1", name: "Chennai" },
    { id: "2", name: "Coimbatore" },
    { id: "3", name: "Madurai" },
  ];
  const docTypes = [
    { id: "1", name: "Aadhaar Card" },
    { id: "2", name: "Driving License" },
  ];
  const countryOptions = [
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "United States", iso: "US" },
  ];

  const methods = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      designation: "",
      contactNumber: "",
      email: "",
      streetAddress: "",
      postCode: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      docType: "",
      joiningDate: "22/07/2025",
    } as any, // initialData might have more fields or different structure
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        reset(initialData);
      } else {
        reset({
          firstName: "",
          lastName: "",
          designation: "",
          contactNumber: "",
          email: "",
          streetAddress: "",
          postCode: "",
          landmark: "",
          city: "",
          state: "",
          country: "",
          docType: "",
          joiningDate: "22/07/2025",
        });
      }
    }
  }, [isOpen, mode, initialData, reset]);

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Employee Data:", data);
    reset();
    onClose();
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toLocaleDateString('en-GB');
      reset({
        ...methods.getValues(),
        joiningDate: formattedDate,
      });
    } else {
      // Handle null case (e.g., when date is cleared)
      reset({
        ...methods.getValues(),
        joiningDate: '',
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogBody className="w-[800px] h-[80vh] overflow-y-auto p-6 bg-white rounded-lg">
        <DialogHeader
          title={mode === "add" ? "Add New Employee" : "Edit Employee"}
          subtitle={
            mode === "add" ? "Create a new employee" : "Update employee details"
          }
          onClose={handleClose}
        />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-6">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <CommonTextInput
                    {...field}
                    label="First Name*"
                    placeholder="Enter first name"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <CommonTextInput
                    {...field}
                    label="Last Name*"
                    placeholder="Enter last name"
                  />
                )}
              />
            </div>

            {/* Designation */}
            <div>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <ModalDropdown
                    label="Designation"
                    items={designations}
                    selectedItem={
                      designations.find((d) => d.name === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.name)}
                    placeholder="Select designation"
                    error={errors.designation?.message}
                  />
                )}
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    label="Contact Number"
                    placeholder="Enter contact number"
                    countryOptions={countryOptions}
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CommonTextInput
                    {...field}
                    label="Email"
                    placeholder="Enter email"
                    icon={<Envelope size={20} className="text-gray-400" />}
                  />
                )}
              />
            </div>

            {/* Address Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Address Information
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="streetAddress"
                    control={control}
                    render={({ field }) => (
                      <CommonTextInput
                        {...field}
                        label="Street Address*"
                        placeholder="Enter full address"
                        icon={<MapPin size={20} className="text-red-500" />}
                      />
                    )}
                  />
                  <Controller
                    name="postCode"
                    control={control}
                    render={({ field }) => (
                      <ModalDropdown
                        label="Post Code*"
                        items={postCodes}
                        selectedItem={
                          postCodes.find((p) => p.name === field.value) || null
                        }
                        onSelect={(item) => field.onChange(item.name)}
                        placeholder="Enter postcode"
                        error={errors.postCode?.message}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="landmark"
                    control={control}
                    render={({ field }) => (
                      <CommonTextInput
                        {...field}
                        label="Landmark (Optional)"
                        placeholder="Enter landmark"
                      />
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <ModalDropdown
                        label="City*"
                        items={cities}
                        selectedItem={
                          cities.find((c) => c.name === field.value) || null
                        }
                        onSelect={(item) => field.onChange(item.name)}
                        placeholder="Enter City"
                        error={errors.city?.message}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <ModalDropdown
                        label="State*"
                        items={states}
                        selectedItem={
                          states.find((s) => s.name === field.value) || null
                        }
                        onSelect={(item) => field.onChange(item.name)}
                        placeholder="Select State"
                        error={errors.state?.message}
                      />
                    )}
                  />
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <ModalDropdown
                        label="Country*"
                        items={[{ id: "1", name: "India" }]}
                        selectedItem={
                          field.value === "India"
                            ? { id: "1", name: "India" }
                            : null
                        }
                        onSelect={(item) => field.onChange(item.name)}
                        placeholder="Select Country"
                        error={errors.country?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-2"></div>

            {/* Identity Proof */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Identity Proof
              </h4>
              <Controller
                name="docType"
                control={control}
                render={({ field }) => (
                  <ModalDropdown
                    label="Document Type"
                    items={docTypes}
                    selectedItem={
                      docTypes.find((d) => d.name === field.value) || null
                    }
                    onSelect={(item) => field.onChange(item.name)}
                    placeholder="Select document type"
                    error={errors.docType?.message}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Document*
              </label>
              <div className="border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 bg-white">
                <span className="text-gray-500 text-sm">
                  Choose file to upload
                </span>
                <CloudUploadIcon size={20} className="text-gray-500" />
              </div>
            </div>

            {/* Joining Date */}
            <div>
              <Controller
                name="joiningDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Joining Date*"
                    placeholder="DD/MM/YYYY"
                    value={field.value ? new Date(field.value) : null}
                    onChange={handleDateChange}
                    required
                    endIcon={<CalendarManagementIcon size={16} />}
                  />
                )}
              />
              {errors.joiningDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.joiningDate.message}
                </p>
              )}
            </div>

            <DialogFooter
              leftTitle="Cancel"
              rightTitle={mode === "add" ? "Add Employee" : "Save Changes"}
              leftVariant="outline"
              rightVariant="success"
              onCancel={handleClose}
              disabled={isSubmitting}
              onConfirm={handleSubmit(onSubmit)}
            />
          </form>
        </FormProvider>
      </DialogBody>
    </Dialog>
  );
};

export default AddEmployeeModal;
