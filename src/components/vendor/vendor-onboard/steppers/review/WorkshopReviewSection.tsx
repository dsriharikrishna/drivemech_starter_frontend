"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Building2, Edit } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import {
  setBasicInfo,
  updateContact,
} from "@/store/slices/vendor-onboarding/basicInfoSlice";
import {
  setVehicleTypes,
  setWorkingDays,
} from "@/store/slices/vendor-onboarding/workshopSetupSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const workshopReviewSchema = z.object({
  // Basic Info
  companyName: z.string().min(1, "Company Name is required"),
  email: z.string().email("Invalid email"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  // Workshop Info
  vehicleTypes: z.array(z.string()).min(1, "Select at least one vehicle type"),
  workingDays: z.array(z.string()).min(1, "Select at least one working day"),
});

type WorkshopReviewForm = z.infer<typeof workshopReviewSchema>;

interface WorkshopReviewSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const WorkshopReviewSection: React.FC<WorkshopReviewSectionProps> = ({
  isExpanded,
  onToggle,
}) => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.vendorBasicInfo);
  const workshopSetup = useAppSelector((state) => state.workshopSetup);
  const [isEditing, setIsEditing] = useState(false);

  // Extract data from Redux
  const companyName = basicInfo.companyName || "Company Name";
  const contactPerson =
    basicInfo.contacts?.[0]?.contactPersonName || "Contact Person";
  const email = basicInfo.contacts?.[0]?.email || "email@example.com";
  const phoneNumber = basicInfo.contacts?.[0]?.phoneNumber || "+00 0000000000";

  // Workshop data
  const vehicleTypes = workshopSetup.basicInfo.vehicleTypes || [];
  const workingDays = workshopSetup.basicInfo.workingDays || [];

  const methods = useForm<WorkshopReviewForm>({
    resolver: zodResolver(workshopReviewSchema),
    defaultValues: {
      companyName,
      email,
      contactPerson,
      phoneNumber,
      vehicleTypes,
      workingDays,
    },
  });

  useEffect(() => {
    if (isEditing) {
      methods.reset({
        companyName,
        email,
        contactPerson,
        phoneNumber,
        vehicleTypes,
        workingDays,
      });
    }
  }, [
    isEditing,
    companyName,
    email,
    contactPerson,
    phoneNumber,
    vehicleTypes,
    workingDays,
    methods,
  ]);

  const onSave = useCallback(
    (data: WorkshopReviewForm) => {
      dispatch(setBasicInfo({ companyName: data.companyName }));
      if (basicInfo.contacts.length > 0) {
        dispatch(
          updateContact({
            index: 0,
            contact: {
              ...basicInfo.contacts[0],
              contactPersonName: data.contactPerson,
              email: data.email,
              phoneNumber: data.phoneNumber,
            },
          })
        );
      }
      dispatch(setVehicleTypes(data.vehicleTypes));
      dispatch(setWorkingDays(data.workingDays));

      setIsEditing(false);
    },
    [dispatch, basicInfo, setIsEditing]
  );

  const startEditing = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsEditing(true);
      if (!isExpanded) onToggle();
    },
    [isExpanded, onToggle, setIsEditing]
  );

  return (
    <Accordion
      title="Workshop"
      icon={<Building2 size={20} />}
      isExpanded={isExpanded}
      onToggle={onToggle}
      className="p-2"
      actionButton={
        !isEditing && (
          <Button
            variant="icon-edit"
            size="sm"
            onClick={startEditing}
            title="Edit Workshop Details"
          >
            <Edit size={16} />
          </Button>
        )
      }
    >
      {isEditing ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSave)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CommonTextInput
                name="companyName"
                label="Business Name"
                required
              />
              <CommonTextInput name="email" label="Email Address" required />
              <CommonTextInput
                name="contactPerson"
                label="Contact Person"
                required
              />
              <CommonTextInput
                name="phoneNumber"
                label="Phone Number"
                required
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Business Name
              </p>
              <p className="text-sm text-gray-900">{companyName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Email Address
              </p>
              <p className="text-sm text-gray-900">{email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Service Types
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {vehicleTypes.length > 0 ? (
                  vehicleTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    No vehicle types selected
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Service Offers
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "Logistic Service",
                  "Basic Service",
                  "Breakover",
                  "Air Conditioning",
                  "Roadworthy Inspection",
                  "Auto Glass",
                ].map((offer) => (
                  <span
                    key={offer}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {offer}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Working Hours
              </p>
              <p className="text-sm text-gray-900">
                {workingDays.length > 0
                  ? workingDays.join(", ")
                  : "No working days selected"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Contact Person
              </p>
              <p className="text-sm text-gray-900">{contactPerson}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Phone Number
              </p>
              <p className="text-sm text-gray-900">{phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Working Hours
              </p>
              <p className="text-sm text-gray-900">08:30 AM - 08:30 PM</p>
            </div>
          </div>
        </div>
      )}
    </Accordion>
  );
};

export default WorkshopReviewSection;
