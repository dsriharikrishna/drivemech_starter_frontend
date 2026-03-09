"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomerBalancesCard from "../cards/customer/CustomerBalancesCard";
import OutstandingCustomerBalancesCard from "../cards/customer/OutstandingCustomerBalancesCard";
import CustomerListingsCard from "../cards/customer/CustomerListingsCard";
import CustomerSalesCard from "../cards/customer/CustomerSalesCard";
import CustomerOpenDepositsCard from "../cards/customer/CustomerOpenDepositsCard";
import CustomerSourcesCard from "../cards/customer/CustomerSourcesCard";
import BillerBalancesCard from "../cards/customer/BillerBalancesCard";

/* ---------------- SCHEMA ---------------- */

const customerReportSchema = z.object({
  // Customer Balances fields
  customerBalancesOrderBy: z.string().optional(),
  customerBalancesOlderThanDate: z.string().optional(),

  // Outstanding Customer Balances fields
  outstandingCustomerBalancesOrderBy: z.string().optional(),

  // Customer Listings fields
  customerListingsOrderBy: z.string().optional(),

  // Customer Sales fields
  customerSalesStartDate: z.string().optional(),
  customerSalesEndDate: z.string().optional(),
  customerSalesOrderBy: z.string().optional(),

  // Customer Sources fields
  customerSourcesStartDate: z.string().optional(),
  customerSourcesEndDate: z.string().optional(),

  // Biller Balances fields
  billerBalancesStartDate: z.string().optional(),
  billerBalancesEndDate: z.string().optional(),
});

type CustomerReportFormValues = z.infer<typeof customerReportSchema>;

/* ---------------- COMPONENT ---------------- */

const CustomerReportTab: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState({
    customerBalances: true,
    outstandingCustomerBalances: false,
    customerListings: false,
    customerSales: false,
    customerOpenDeposits: false,
    customerSources: false,
    billerBalances: false,
  });

  const [toggleStates, setToggleStates] = useState({
    customerBalancesSummery: false,
  });

  const form = useForm<CustomerReportFormValues>({
    resolver: zodResolver(customerReportSchema),
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
      console.log("👤 Customer Report Form Values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log toggle states whenever they change
  useEffect(() => {
    console.log("🔄 Customer Report Toggle States:", toggleStates);
  }, [toggleStates]);

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <CustomerBalancesCard
          form={form}
          isExpanded={expandedCards.customerBalances}
          onToggle={() => handleToggleCard("customerBalances")}
          summery={toggleStates.customerBalancesSummery}
          onSummeryChange={(checked) =>
            setToggleStates((prev) => ({
              ...prev,
              customerBalancesSummery: checked,
            }))
          }
        />
        <OutstandingCustomerBalancesCard
          form={form}
          isExpanded={expandedCards.outstandingCustomerBalances}
          onToggle={() => handleToggleCard("outstandingCustomerBalances")}
        />
        <CustomerListingsCard
          form={form}
          isExpanded={expandedCards.customerListings}
          onToggle={() => handleToggleCard("customerListings")}
        />
        <CustomerSalesCard
          form={form}
          isExpanded={expandedCards.customerSales}
          onToggle={() => handleToggleCard("customerSales")}
        />
        <CustomerOpenDepositsCard
          form={form}
          isExpanded={expandedCards.customerOpenDeposits}
          onToggle={() => handleToggleCard("customerOpenDeposits")}
        />
        <CustomerSourcesCard
          form={form}
          isExpanded={expandedCards.customerSources}
          onToggle={() => handleToggleCard("customerSources")}
        />
        <BillerBalancesCard
          form={form}
          isExpanded={expandedCards.billerBalances}
          onToggle={() => handleToggleCard("billerBalances")}
        />
      </div>
    </FormProvider>
  );
};

export default CustomerReportTab;
