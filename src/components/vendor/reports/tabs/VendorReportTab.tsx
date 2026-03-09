"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PartsOrderReportCard from "../cards/vendor/PartsOrderReportCard";
import PurchasesReportsCard from "../cards/vendor/PurchasesReportsCard";
import ItemPurchasesCard from "../cards/vendor/ItemPurchasesCard";
import VendorListingCard from "../cards/vendor/VendorListingCard";
import VendorBalancesCard from "../cards/vendor/VendorBalancesCard";
import SupplierBillerBalancesCard from "../cards/vendor/SupplierBillerBalancesCard";

/* ---------------- SCHEMA ---------------- */

const vendorReportSchema = z.object({
  // Parts Order Report fields
  partsOrderStartDate: z.string().optional(),
  partsOrderEndDate: z.string().optional(),

  // Purchases Reports fields
  purchasesStartDate: z.string().optional(),
  purchasesEndDate: z.string().optional(),
  purchasesSortBy: z.string().optional(),

  // Item Purchases fields
  itemPurchasesStartDate: z.string().optional(),
  itemPurchasesEndDate: z.string().optional(),
  itemPurchasesOrderBy: z.string().optional(),
  itemPurchasesStartRange: z.string().optional(),
  itemPurchasesEndRange: z.string().optional(),
  itemPurchasesSearchBy: z.string().optional(),

  // Vendor Listing fields
  vendorListingOrderBy: z.string().optional(),

  // Vendor Balances fields
  vendorBalancesOrderBy: z.string().optional(),
  vendorBalancesOlderThanDate: z.string().optional(),

  // Supplier Biller Balances fields
  supplierBillerStartDate: z.string().optional(),
  supplierBillerEndDate: z.string().optional(),
});

type VendorReportFormValues = z.infer<typeof vendorReportSchema>;

/* ---------------- COMPONENT ---------------- */

const VendorReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    partsOrderReport: true,
    purchasesReports: false,
    itemPurchases: false,
    vendorListing: false,
    vendorBalances: false,
    supplierBillerBalances: false,
  });

  const [toggleStates, setToggleStates] = useState({
    outstandingOnly: false,
    itemPurchasesSummery: false,
  });

  const form = useForm<VendorReportFormValues>({
    resolver: zodResolver(vendorReportSchema),
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
      console.log("🏪 Vendor Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log toggle states whenever they change
  useEffect(() => {
    console.log("🔄 Vendor Report Toggle States:", toggleStates);
  }, [toggleStates]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <PartsOrderReportCard
          form={form}
          isExpanded={expandedCards.partsOrderReport}
          onToggle={() => handleToggleCard("partsOrderReport")}
          outstandingOnly={toggleStates.outstandingOnly}
          onOutstandingOnlyChange={(checked) =>
            setToggleStates((prev) => ({ ...prev, outstandingOnly: checked }))
          }
        />
        <PurchasesReportsCard
          form={form}
          isExpanded={expandedCards.purchasesReports}
          onToggle={() => handleToggleCard("purchasesReports")}
        />
        <ItemPurchasesCard
          form={form}
          isExpanded={expandedCards.itemPurchases}
          onToggle={() => handleToggleCard("itemPurchases")}
          summery={toggleStates.itemPurchasesSummery}
          onSummeryChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              itemPurchasesSummery: checked,
            }))
          }
        />
        <VendorListingCard
          form={form}
          isExpanded={expandedCards.vendorListing}
          onToggle={() => handleToggleCard("vendorListing")}
        />
        <VendorBalancesCard
          form={form}
          isExpanded={expandedCards.vendorBalances}
          onToggle={() => handleToggleCard("vendorBalances")}
        />
        <SupplierBillerBalancesCard
          form={form}
          isExpanded={expandedCards.supplierBillerBalances}
          onToggle={() => handleToggleCard("supplierBillerBalances")}
        />
      </div>
    </FormProvider>
  );
};

export default VendorReportTab;
