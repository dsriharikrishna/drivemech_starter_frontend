"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SalesReportCard from "../cards/sales/SalesReportCard";
import SalesBreakupCard from "../cards/sales/SalesBreakupCard";
import ItemSalesCard from "../cards/sales/ItemSalesCard";
import PaymentMethodCard from "../cards/sales/PaymentMethodCard";

/* ---------------- SCHEMA ---------------- */

const salesReportSchema = z.object({
  // Sales Report fields
  salesOrderBy: z.string().optional(),
  salesSearchBy: z.string().optional(),
  salesStartRange: z.string().optional(),
  salesEndRange: z.string().optional(),
  salesCustomerType: z.string().optional(),

  // Sales Breakup fields
  breakupInternalOnly: z.string().optional(),

  // Item Sales fields
  itemOrderBy: z.string().optional(),
  itemSearchBy: z.string().optional(),
  itemStartRange: z.string().optional(),
  itemEndRange: z.string().optional(),
  itemInternalOnly: z.string().optional(),
});

type SalesReportFormValues = z.infer<typeof salesReportSchema>;

/* ---------------- COMPONENT ---------------- */

const SalesReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    salesReport: true,
    salesBreakup: false,
    itemSales: false,
    paymentMethod: false,
  });

  const [toggleStates, setToggleStates] = useState({
    breakupSummary: false,
    itemSummary: false,
  });

  const form = useForm<SalesReportFormValues>({
    resolver: zodResolver(salesReportSchema),
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
      console.log("📊 Sales Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log toggle states whenever they change
  useEffect(() => {
    console.log("🔄 Sales Report Toggle States:", toggleStates);
  }, [toggleStates]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <SalesReportCard
          form={form}
          isExpanded={expandedCards.salesReport}
          onToggle={() => handleToggleCard("salesReport")}
        />
        <SalesBreakupCard
          form={form}
          isExpanded={expandedCards.salesBreakup}
          onToggle={() => handleToggleCard("salesBreakup")}
          summaryChecked={toggleStates.breakupSummary}
          onSummaryChange={(checked) =>
            setToggleStates((prev) => ({ ...prev, breakupSummary: checked }))
          }
        />
        <ItemSalesCard
          form={form}
          isExpanded={expandedCards.itemSales}
          onToggle={() => handleToggleCard("itemSales")}
          summaryChecked={toggleStates.itemSummary}
          onSummaryChange={(checked) =>
            setToggleStates((prev) => ({ ...prev, itemSummary: checked }))
          }
        />
        <PaymentMethodCard
          form={form}
          isExpanded={expandedCards.paymentMethod}
          onToggle={() => handleToggleCard("paymentMethod")}
        />
      </div>
    </FormProvider>
  );
};

export default SalesReportTab;
