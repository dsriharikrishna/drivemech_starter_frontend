"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WorkInProgressCard from "../cards/workshop/WorkInProgressCard";
import ServiceDueCard from "../cards/workshop/ServiceDueCard";
import RegoRenewalDueCard from "../cards/workshop/RegoRenewalDueCard";
import VehicleListingCard from "../cards/workshop/VehicleListingCard";
import QuoteReportCard from "../cards/workshop/QuoteReportCard";
import FollowUpReportCard from "../cards/workshop/FollowUpReportCard";
import BookingReportCard from "../cards/workshop/BookingReportCard";

/* ---------------- SCHEMA ---------------- */

const workshopReportSchema = z.object({
  // Work In Progress fields
  workInProgressStartDate: z.string().optional(),
  workInProgressEndDate: z.string().optional(),

  // Service Due fields
  serviceDueStartDate: z.string().optional(),
  serviceDueEndDate: z.string().optional(),

  // Rego Renewal Due fields
  regoRenewalStartDate: z.string().optional(),
  regoRenewalEndDate: z.string().optional(),

  // Vehicle Listing fields
  vehicleListingOrderBy: z.string().optional(),

  // Quote Report fields
  quoteReportStartDate: z.string().optional(),
  quoteReportEndDate: z.string().optional(),

  // Follow Up Report fields
  followUpReportStartDate: z.string().optional(),
  followUpReportEndDate: z.string().optional(),

  // Booking Report fields
  bookingReportStartDate: z.string().optional(),
  bookingReportEndDate: z.string().optional(),
});

type WorkshopReportFormValues = z.infer<typeof workshopReportSchema>;

/* ---------------- COMPONENT ---------------- */

const WorkshopReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    workInProgress: true,
    serviceDue: false,
    regoRenewalDue: false,
    vehicleListing: false,
    quoteReport: false,
    followUpReport: false,
    bookingReport: false,
  });

  const [toggleStates, setToggleStates] = useState({
    workInProgressSummery: false,
  });

  const form = useForm<WorkshopReportFormValues>({
    resolver: zodResolver(workshopReportSchema),
    defaultValues: {},
  });

  const handleToggleCard = (cardName: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  // Watch form values and log to console
  useEffect(() => {
    const subscription = form.watch((values) => {
      console.log("🔧 Workshop Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log toggle states whenever they change
  useEffect(() => {
    console.log("🔄 Workshop Report Toggle States:", toggleStates);
  }, [toggleStates]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <WorkInProgressCard
          form={form}
          isExpanded={expandedCards.workInProgress}
          onToggle={() => handleToggleCard("workInProgress")}
          summery={toggleStates.workInProgressSummery}
          onSummeryChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              workInProgressSummery: checked,
            }))
          }
        />
        <ServiceDueCard
          form={form}
          isExpanded={expandedCards.serviceDue}
          onToggle={() => handleToggleCard("serviceDue")}
        />
        <RegoRenewalDueCard
          form={form}
          isExpanded={expandedCards.regoRenewalDue}
          onToggle={() => handleToggleCard("regoRenewalDue")}
        />
        <VehicleListingCard
          form={form}
          isExpanded={expandedCards.vehicleListing}
          onToggle={() => handleToggleCard("vehicleListing")}
        />
        <QuoteReportCard
          form={form}
          isExpanded={expandedCards.quoteReport}
          onToggle={() => handleToggleCard("quoteReport")}
        />
        <FollowUpReportCard
          form={form}
          isExpanded={expandedCards.followUpReport}
          onToggle={() => handleToggleCard("followUpReport")}
        />
        <BookingReportCard
          form={form}
          isExpanded={expandedCards.bookingReport}
          onToggle={() => handleToggleCard("bookingReport")}
        />
      </div>
    </FormProvider>
  );
};

export default WorkshopReportTab;
