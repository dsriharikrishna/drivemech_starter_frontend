"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EmailReportsCard from "../cards/log/EmailReportsCard";
import VoidedInvoicePaymentOrderReportCard from "../cards/log/VoidedInvoicePaymentOrderReportCard";
import InvoicePaymentStatusCard from "../cards/log/InvoicePaymentStatusCard";
import TransactionLogCard from "../cards/log/TransactionLogCard";
import EventReportCard from "../cards/log/EventReportCard";
import TextMessageReportCard from "../cards/log/TextMessageReportCard";

/* ---------------- SCHEMA ---------------- */

const logReportSchema = z.object({
  // Email Reports fields
  emailReportsStartDate: z.string().optional(),
  emailReportsEndDate: z.string().optional(),

  // Voided Invoice/Payment/Order Report fields
  voidedReportStartDate: z.string().optional(),
  voidedReportEndDate: z.string().optional(),

  // Invoice/Payment Status fields
  invoicePaymentSearchBy: z.string().optional(),
  invoiceNumber: z.string().optional(),

  // Transaction Log fields
  transactionLogType: z.string().optional(),
  transactionLogStartDate: z.string().optional(),
  transactionLogEndDate: z.string().optional(),

  // Event Report fields
  eventReportStartDate: z.string().optional(),
  eventReportEndDate: z.string().optional(),

  // Text Message Report fields
  textMessageReportStartDate: z.string().optional(),
  textMessageReportEndDate: z.string().optional(),
});

type LogReportFormValues = z.infer<typeof logReportSchema>;

/* ---------------- COMPONENT ---------------- */

const LogReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    emailReports: true,
    voidedInvoicePaymentOrderReport: false,
    invoicePaymentStatus: false,
    transactionLog: false,
    eventReport: false,
    textMessageReport: false,
  });

  const form = useForm<LogReportFormValues>({
    resolver: zodResolver(logReportSchema),
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
      console.log("📝 Log Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <EmailReportsCard
          form={form}
          isExpanded={expandedCards.emailReports}
          onToggle={() => handleToggleCard("emailReports")}
        />
        <VoidedInvoicePaymentOrderReportCard
          form={form}
          isExpanded={expandedCards.voidedInvoicePaymentOrderReport}
          onToggle={() => handleToggleCard("voidedInvoicePaymentOrderReport")}
        />
        <InvoicePaymentStatusCard
          form={form}
          isExpanded={expandedCards.invoicePaymentStatus}
          onToggle={() => handleToggleCard("invoicePaymentStatus")}
        />
        <TransactionLogCard
          form={form}
          isExpanded={expandedCards.transactionLog}
          onToggle={() => handleToggleCard("transactionLog")}
        />
        <EventReportCard
          form={form}
          isExpanded={expandedCards.eventReport}
          onToggle={() => handleToggleCard("eventReport")}
        />
        <TextMessageReportCard
          form={form}
          isExpanded={expandedCards.textMessageReport}
          onToggle={() => handleToggleCard("textMessageReport")}
        />
      </div>
    </FormProvider>
  );
};

export default LogReportTab;
