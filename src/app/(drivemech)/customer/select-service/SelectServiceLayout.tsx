"use client";

import { useCallback } from "react";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import ModeOfService from "@/components/customer/select-service/ModeOfService";
import PreferredDateTime from "@/components/customer/select-service/PreferredDateTime";
import PersonalDetails from "@/components/customer/select-service/PersonalDetails";
import AddOns from "@/components/customer/select-service/AddOns";
import GuestToggle from "@/components/customer/select-service/GuestToggle";
import AppTiptap from "@/components/editor/AppTiptap";
import { AddOnService } from "@/types/customer/services/select-service";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Section from "@/components/customer/select-service/Section";
import InfoBlock from "@/components/customer/select-service/InfoBlock";
import { Bicycle, Clock, Star } from "phosphor-react";
import Image from "next/image";
import DetailRow from "@/components/customer/select-service/DetailRow";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import ModuleHeader from "@/components/common/ModuleHeader";
import {
  selectServiceSchema,
  type SelectServiceFormData,
} from "@/schemas/customer/selectService.schema";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ADDON_SERVICES } from "@/constants/service.constants";
import { setBookingFormData } from "@/store/slices/booking/bookingSlice";
import {
  formatBookingDate,
  formatBookingTime,
  calculateAddOnsTotal,
  formatServiceMode,
  formatAddress,
  generateBookingTimestamp,
  formatServiceCount,
} from "@/utils/booking.utils";

export default function SelectServiceLayout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ✅ Get selected services and vehicle from Redux
  const selectedServiceIds = useAppSelector(
    (state) => state.service.selectedServices
  );
  const currentVehicle = useAppSelector((state) => state.car.currentVehicle);

  // ✅ React Hook Form with Zod validation
  const form = useForm<SelectServiceFormData>({
    resolver: zodResolver(selectServiceSchema),
    defaultValues: {
      mode: "pickup",
      date: "",
      time: "",
      fullName: "",
      phone: "",
      email: "",
      addOns: [],
      notes: "",
      guest: false,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  // Watch form values for real-time summary updates
  const formMode = form.watch("mode");
  const formDate = form.watch("date");
  const formTime = form.watch("time");
  const formLocation = form.watch("location");
  const formAddOns = form.watch("addOns") || [];

  // ✅ Use add-ons from constants
  const addOns: AddOnService[] = ADDON_SERVICES.map((addon) => ({
    id: addon.id,
    name: addon.name,
    price: addon.price,
    icon: addon.icon,
  }));

  // Calculate add-ons total in real-time
  const addOnsTotal = calculateAddOnsTotal(addOns, formAddOns);

  // ✅ Form submission with Redux integration
  const submit = useCallback(
    async (data: SelectServiceFormData) => {
      try {
        const bookingData = {
          mode: data.mode,
          date: data.date,
          time: data.time,
          personalInfo: {
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
          },
          addOns: data.addOns || [],
          notes: data.notes || "",
          guest: data.guest,
          location: data.location,
          selectedServices: selectedServiceIds,
          vehicle: currentVehicle,
          addOnsTotal,
          totalAmount: addOnsTotal,
          timestamp: generateBookingTimestamp(),
        };

        // ✅ Store booking data in Redux
        dispatch(setBookingFormData(bookingData));

        // Navigate to payment
        router.push("/customer/payment-process");
      } catch (error) {
        console.error("Error submitting booking:", error);
        if (window.addToast) {
          window.addToast(
            "Failed to submit booking. Please try again.",
            "error"
          );
        }
      }
    },
    [addOnsTotal, selectedServiceIds, currentVehicle, dispatch, router]
  );

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <FormProvider {...form}>
      <div className="container mx-auto flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <LeftLayout>
            {/* Main Content */}
            <div className="mx-auto py-4">
              <form
                onSubmit={form.handleSubmit(submit)}
                className="flex flex-col gap-2"
              >
                {/* Header */}
                <ModuleHeader title="Select Service" onBack={handleBack} />

                {/* Main Card Container */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 lg:p-6 space-y-3 md:space-y-4">
                  <ModeOfService form={form} />

                  <PreferredDateTime form={form} />

                  <PersonalDetails form={form} />

                  <AddOns form={form} addOns={addOns} />

                  {/* Additional Notes Section */}
                  <div>
                    <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">
                      Additional Note for the Mechanic
                    </h3>
                    <AppTiptap
                      form={form}
                      name="notes"
                      placeholder="e.g., Please check the unusual noise from the engine"
                    />
                  </div>
                </div>

                {/* Footer Section */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 lg:p-6 gap-3 md:gap-4 flex flex-col">
                  <GuestToggle form={form} />
                  <div className="flex flex-col justify-center items-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="rounded-lg w-full md:w-auto md:min-w-[200px]"
                    >
                      Proceed Booking
                      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </LeftLayout>

          <RightLayout>
            <div className="mx-auto p-4 bg-white rounded-xl md:rounded-2xl flex flex-col gap-2 mt-0 md:mt-4">
              <h2 className="text-base md:text-lg font-semibold">Your Booking Summary</h2>

              {/* Vehicle Details */}
              <Section title="Vehicle Details">
                <InfoBlock>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm md:text-base font-medium">ABC 1234 D</span>
                    <button className="text-blue-500 text-xs md:text-sm hover:underline">Change</button>
                  </div>

                  <div className="flex justify-center">
                    <Image
                      src="/images/workshop/Car.png"
                      width={130}
                      height={80}
                      alt="Vehicle"
                      className="w-24 h-auto md:w-32"
                    />
                  </div>

                  <p className="text-sm md:text-base text-center font-medium mt-2">
                    Toyota Hilux
                  </p>
                  <p className="text-xs text-center text-gray-500">
                    2021 Petrol Automatic 2.5 Liters Hybrid AWD-i
                  </p>
                </InfoBlock>
              </Section>

              {/* Selected Workshop */}
              <Section title="Selected Workshop">
                <InfoBlock>
                  <div className="flex items-start md:items-center gap-2 md:gap-3">
                    <Image
                      src="/images/workshop/AtoZ.png"
                      width={60}
                      height={60}
                      className="rounded-lg w-12 h-12 md:w-16 md:h-16 flex-shrink-0"
                      alt="Workshop"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-semibold truncate">A to Z Services</p>

                      <div className="flex items-center gap-2 text-xs mt-1">
                        <span className="flex items-center gap-1">
                          4.5
                          <Star
                            className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            stroke="none"
                          />
                        </span>
                        <span>(120)</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs text-gray-400 mt-2">
                        <div className="flex items-center gap-1">
                          <Bicycle size={14} strokeWidth={2.5} className="md:w-4 md:h-4" />
                          <span>2Kms</span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock size={14} strokeWidth={2.5} className="md:w-4 md:h-4" />
                          <span>5 Mins Drive</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </InfoBlock>
              </Section>

              {/* Service Details */}
              <Section title="Service Details">
                <div className="space-y-3">
                  <DetailRow
                    label="Mode"
                    value={formatServiceMode(formMode)}
                  />
                  <DetailRow label="Date" value={formatBookingDate(formDate)} />
                  <DetailRow label="Time" value={formatBookingTime(formTime)} />
                  {formMode === "pickup" && (
                    <DetailRow
                      label="Address"
                      value={formatAddress(formLocation?.address)}
                    />
                  )}
                </div>
              </Section>

              {/* Bill Details */}
              <Section title="Bill Details">
                <div className="space-y-3">
                  <DetailRow
                    label="Selected Services"
                    value={formatServiceCount(selectedServiceIds.length)}
                  />
                  <DetailRow
                    label="Add-on Services"
                    value={addOnsTotal > 0 ? `$${addOnsTotal}` : "$0"}
                  />
                  <DetailRow label="Tax" value="TBD" />
                  <DetailRow label="Safety & Warranty" value="TBD" />

                  <div className="border-t border-border pt-3">
                    <DetailRow
                      label="Grand Total"
                      value={<span className="font-semibold">${addOnsTotal}</span>}
                    />
                  </div>
                </div>
              </Section>
            </div>
          </RightLayout>
        </div>
      </div>
    </FormProvider>
  );
}
