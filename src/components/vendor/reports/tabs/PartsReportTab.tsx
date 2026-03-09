"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PartsValueCard from "../cards/parts/PartsValueCard";
import PartsListingCard from "../cards/parts/PartsListingCard";
import StockTakeVarianceCard from "../cards/parts/StockTakeVarianceCard";
import StockStatusReportCard from "../cards/parts/StockStatusReportCard";

/* ---------------- SCHEMA ---------------- */

const partsReportSchema = z.object({
  // Parts Value fields
  partsValueGroupBy: z.string().optional(),
  partsValueLocation: z.string().optional(),

  // Parts Listing fields
  partsListingProductType: z.string().optional(),
  partsListingLocation: z.string().optional(),
  partsListingOffset: z.string().optional(),

  // Stock Take Variance fields
  stockVarianceStartDate: z.string().optional(),
  stockVarianceEndDate: z.string().optional(),
  stockVarianceLocation: z.string().optional(),

  // Stock Status Report fields
  stockStatusStartDate: z.string().optional(),
  stockStatusEndDate: z.string().optional(),
  stockStatusStatus: z.string().optional(),
});

type PartsReportFormValues = z.infer<typeof partsReportSchema>;

/* ---------------- COMPONENT ---------------- */

const PartsReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    partsValue: true,
    partsListing: false,
    stockTakeVariance: false,
    stockStatusReport: false,
  });

  const [toggleStates, setToggleStates] = useState({
    partsValuePrintZero: false,
    partsListingPrintZero: false,
  });

  const form = useForm<PartsReportFormValues>({
    resolver: zodResolver(partsReportSchema),
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
      console.log("📦 Parts Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log toggle states whenever they change
  useEffect(() => {
    console.log("🔄 Parts Report Toggle States:", toggleStates);
  }, [toggleStates]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <PartsValueCard
          form={form}
          isExpanded={expandedCards.partsValue}
          onToggle={() => handleToggleCard("partsValue")}
          printZeroParts={toggleStates.partsValuePrintZero}
          onPrintZeroPartsChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              partsValuePrintZero: checked,
            }))
          }
        />
        <PartsListingCard
          form={form}
          isExpanded={expandedCards.partsListing}
          onToggle={() => handleToggleCard("partsListing")}
          printZeroParts={toggleStates.partsListingPrintZero}
          onPrintZeroPartsChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              partsListingPrintZero: checked,
            }))
          }
        />
        <StockTakeVarianceCard
          form={form}
          isExpanded={expandedCards.stockTakeVariance}
          onToggle={() => handleToggleCard("stockTakeVariance")}
        />
        <StockStatusReportCard
          form={form}
          isExpanded={expandedCards.stockStatusReport}
          onToggle={() => handleToggleCard("stockStatusReport")}
        />
      </div>
    </FormProvider>
  );
};

export default PartsReportTab;
