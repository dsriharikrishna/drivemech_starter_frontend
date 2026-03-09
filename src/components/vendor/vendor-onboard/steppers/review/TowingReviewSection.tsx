"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Edit, Truck } from "lucide-react";
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
  setTowingDetails,
  setVehicleTypes as setTowingVehicleTypes,
} from "@/store/slices/vendor-onboarding/towingServicesSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const towingReviewSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  email: z.string().email("Invalid email"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),

  chargesPerHour: z.string().min(1, "Charges per hour is required"),
  serviceRadius: z.string().min(1, "Service radius is required"),
  vehicleTypes: z.array(z.string()).min(1, "Select at least one vehicle type"),
});

type TowingReviewForm = z.infer<typeof towingReviewSchema>;

interface TowingReviewSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const TowingReviewSection: React.FC<TowingReviewSectionProps> = ({
  isExpanded,
  onToggle,
}) => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.vendorBasicInfo);
  const towingServices = useAppSelector((state) => state.vendorTowingServices);
  const [isEditing, setIsEditing] = useState(false);

  // Extract data from Redux
  const companyName = basicInfo.companyName || "Company Name";
  const contactPerson =
    basicInfo.contacts?.[0]?.contactPersonName || "Contact Person";
  const email = basicInfo.contacts?.[0]?.email || "email@example.com";
  const phoneNumber = basicInfo.contacts?.[0]?.phoneNumber || "+00 0000000000";

  // Towing data
  const towingVehicleTypes = towingServices.vehicleTypes || [];
  const chargesPerHour = towingServices.chargesPerHour || "0.00";
  const serviceRadius = towingServices.serviceRadius || "0";
  const servicePincodes = towingServices.servicePincodes || "";
  const serviceCities = towingServices.serviceCities || "";

  const methods = useForm<TowingReviewForm>({
    resolver: zodResolver(towingReviewSchema),
    defaultValues: {
      companyName,
      email,
      contactPerson,
      phoneNumber,
      chargesPerHour: String(chargesPerHour),
      serviceRadius: String(serviceRadius),
      vehicleTypes: towingVehicleTypes,
    },
  });

  useEffect(() => {
    if (isEditing) {
      methods.reset({
        companyName,
        email,
        contactPerson,
        phoneNumber,
        chargesPerHour: String(chargesPerHour),
        serviceRadius: String(serviceRadius),
        vehicleTypes: towingVehicleTypes,
      });
    }
  }, [
    isEditing,
    companyName,
    email,
    contactPerson,
    phoneNumber,
    chargesPerHour,
    serviceRadius,
    towingVehicleTypes,
    methods,
  ]);

  const onSave = useCallback(
    (data: TowingReviewForm) => {
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

      dispatch(
        setTowingDetails({
          chargesPerHour: data.chargesPerHour,
          serviceRadius: data.serviceRadius,
        })
      );
      dispatch(setTowingVehicleTypes(data.vehicleTypes));

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
      title="Towing Services"
      icon={<Truck size={20} />}
      isExpanded={isExpanded}
      className="p-2"
      onToggle={onToggle}
      actionButton={
        !isEditing && (
          <Button
            variant="icon-edit"
            size="sm"
            onClick={startEditing}
            title="Edit Towing Details"
          >
            <Edit size={16} />
          </Button>
        )
      }
    >
      {isEditing ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSave)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Business Info */}
              <CommonTextInput
                name="companyName"
                label="Business Name"
                required
              />
              <CommonTextInput name="email" label="Email Address" required />
              <CommonTextInput
                name="chargesPerHour"
                label="Charges/Hour"
                placeholder="0.00"
                required
              />
              <CommonTextInput
                name="serviceRadius"
                label="Service Area (KM)"
                placeholder="0"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
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

            {/* Vehicle Types */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Vehicle Types (View Only)
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {towingVehicleTypes.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
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
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Business Info */}
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
                  Charges/Hour
                </p>
                <p className="text-sm text-gray-900">${chargesPerHour}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Service Area (KM)
                </p>
                <p className="text-sm text-gray-900">{serviceRadius} KM</p>
              </div>
            </div>
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
                  Service Availability
                </p>
                <p className="text-sm text-gray-900">
                  {towingServices.enabled ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Vehicle Types */}
          <div className="">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Vehicle Types
            </p>
            <div className="flex flex-wrap gap-2">
              {towingVehicleTypes.length > 0 ? (
                towingVehicleTypes.map((type: string) => (
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

          {/* Service Area */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Service Area
            </p>
            <p className="text-sm text-gray-900">
              {servicePincodes || serviceCities || "No service areas specified"}
            </p>
          </div>
        </div>
      )}
    </Accordion>
  );
};

export default TowingReviewSection;
