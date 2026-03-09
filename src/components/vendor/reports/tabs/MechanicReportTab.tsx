"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MechanicPerformanceCard from "../cards/mechanic/MechanicPerformanceCard";
import NoLaborTimesCard from "../cards/mechanic/NoLaborTimesCard";
import MechanicClockedOnCard from "../cards/mechanic/MechanicClockedOnCard";
import MechanicTimeSheetCard from "../cards/mechanic/MechanicTimeSheetCard";
import MechanicBarcodeListCard from "../cards/mechanic/MechanicBarcodeListCard";

/* ---------------- SCHEMA ---------------- */

const mechanicReportSchema = z.object({
  // Mechanic Performance fields
  mechanicPerformanceStartDate: z.string().optional(),
  mechanicPerformanceEndDate: z.string().optional(),
  mechanicPerformanceInternalOnly: z.string().optional(),

  // No Labor Times fields
  noLaborTimesStartDate: z.string().optional(),
  noLaborTimesEndDate: z.string().optional(),

  // Mechanic Time Sheet fields
  mechanicTimeSheetStartDate: z.string().optional(),
  mechanicTimeSheetEndDate: z.string().optional(),
  mechanicTimeSheetMechanic: z.string().optional(),
});

type MechanicReportFormValues = z.infer<typeof mechanicReportSchema>;

/* ---------------- COMPONENT ---------------- */

const MechanicReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    mechanicPerformance: true,
    noLaborTimes: false,
    mechanicClockedOn: false,
    mechanicTimeSheet: false,
    mechanicBarcodeList: false,
  });

  const [toggleStates, setToggleStates] = useState({
    performanceReportType: false,
    performanceSummery: false,
    performanceShowOpenTransactions: false,
    noLaborSummery: false,
    noLaborShowOpenTransactions: false,
  });

  const form = useForm<MechanicReportFormValues>({
    resolver: zodResolver(mechanicReportSchema),
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
      console.log("👨‍🔧 Mechanic Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log toggle states whenever they change
  useEffect(() => {
    console.log("🔄 Mechanic Report Toggle States:", toggleStates);
  }, [toggleStates]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <MechanicPerformanceCard
          form={form}
          isExpanded={expandedCards.mechanicPerformance}
          onToggle={() => handleToggleCard("mechanicPerformance")}
          reportType={toggleStates.performanceReportType}
          onReportTypeChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              performanceReportType: checked,
            }))
          }
          summery={toggleStates.performanceSummery}
          onSummeryChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              performanceSummery: checked,
            }))
          }
          showOpenTransactions={toggleStates.performanceShowOpenTransactions}
          onShowOpenTransactionsChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              performanceShowOpenTransactions: checked,
            }))
          }
        />
        <NoLaborTimesCard
          form={form}
          isExpanded={expandedCards.noLaborTimes}
          onToggle={() => handleToggleCard("noLaborTimes")}
          summery={toggleStates.noLaborSummery}
          onSummeryChange={(checked) =>
            setToggleStates((prev) => ({ ...prev, noLaborSummery: checked }))
          }
          showOpenTransactions={toggleStates.noLaborShowOpenTransactions}
          onShowOpenTransactionsChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              noLaborShowOpenTransactions: checked,
            }))
          }
        />
        <MechanicClockedOnCard
          form={form}
          isExpanded={expandedCards.mechanicClockedOn}
          onToggle={() => handleToggleCard("mechanicClockedOn")}
        />
        <MechanicTimeSheetCard
          form={form}
          isExpanded={expandedCards.mechanicTimeSheet}
          onToggle={() => handleToggleCard("mechanicTimeSheet")}
        />
        <MechanicBarcodeListCard
          form={form}
          isExpanded={expandedCards.mechanicBarcodeList}
          onToggle={() => handleToggleCard("mechanicBarcodeList")}
        />
      </div>
    </FormProvider>
  );
};

export default MechanicReportTab;
