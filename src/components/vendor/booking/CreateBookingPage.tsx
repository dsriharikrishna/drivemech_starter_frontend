"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { bookingSchema, type Booking } from "@/lib/schemas/registration-booking";
import Button from "@/components/ui/Button";

// Sections
import CustomerDetailsSection from "./sections/CustomerDetailsSection";
import VehicleDetailsSection from "./sections/VehicleDetailsSection";
import BookingDetailsSection from "./sections/BookingDetailsSection";
import InsuranceDetailsSection from "./sections/InsuranceDetailsSection";
import JobCardSection from "./sections/JobCardSection";
import NotesSection from "./sections/NotesSection";

export default function CreateBookingPage() {
  const router = useRouter();

  // Accordion States
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    vehicle: true,
    booking: true,
    jobCard: true,
  });

  // State to toggle between Form and Summary view
  const [isDataFound, setIsDataFound] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const methods = useForm<Booking>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      isCash: true,
      isCompany: false,
      isVip: false,
      updateInsurance: false,
      bookingDate: new Date(),
      dueBy: new Date(),
      jobCardItems: [
        {
          id: crypto.randomUUID(),
          product: "Battery Replacement",
          description: "Battery Replacement for Model X",
          quantity: 1,
          unitPrice: 1500,
          tax: 150,
          total: 1650,
        },
      ],
      freight: 0,
      salesTax: 0,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: Booking) => {
    console.log("Form Data:", data);
    // router.push("/vendor/operations/booking-list");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 space-y-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-900">Create Booking</h1>
        </div>

        {/* Row 1: Customer & Vehicle */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <CustomerDetailsSection
              isExpanded={expandedSections.customer}
              onToggle={() => toggleSection("customer")}
              isSelected={isDataFound}
            />
          </div>
          <div className="flex-1">
            <VehicleDetailsSection
              isExpanded={expandedSections.vehicle}
              onToggle={() => toggleSection("vehicle")}
              isSelected={isDataFound}
              onSearch={() => setIsDataFound(true)}
            />
          </div>
        </div>

        {/* Row 2: Booking Details */}
        <BookingDetailsSection
          isExpanded={expandedSections.booking}
          onToggle={() => toggleSection("booking")}
        />

        {/* Conditional Insurance Section */}
        <InsuranceDetailsSection />

        {/* Row 3: Job Card */}
        <JobCardSection
          isExpanded={expandedSections.jobCard}
          onToggle={() => toggleSection("jobCard")}
        />

        {/* Row 4: Notes */}
        <NotesSection />

        {/* Action Buttons */}
        <div className="border-t border-gray-100 p-4">
          <div className="max-w-7xl mx-auto flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => router.back()}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
            >
              Start Job
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
