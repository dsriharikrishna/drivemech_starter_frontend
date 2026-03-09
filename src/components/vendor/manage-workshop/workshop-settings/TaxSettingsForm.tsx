"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp, Building2, HomeIcon, Shield } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import { z } from "zod";

// Extended schema for the new fields
const taxSettingsSchema = z.object({
  taxName: z.string().min(1, "Tax name is required"),
  purchasesTaxRate: z.string().min(1, "Purchases tax rate is required"),
  salesTaxRate: z.string().min(1, "Sales tax rate is required"),
  pricesIncludeTax: z.boolean(),
  taxFreight: z.boolean(),
  roundTotal: z.boolean(),
  multipleTaxes: z.boolean(),
  discountIncludesTax: z.boolean(),
});

type TaxSettingsFormValues = z.infer<typeof taxSettingsSchema>;

interface TaxRate {
  id: string;
  taxType: string;
  taxCategory: string;
  hsn: string;
  taxCriteria: string;
  taxValue: number;
  startDate: string;
  endDate: string;
}

const TaxSettingsForm = () => {
  const [isManageTaxExpanded, setIsManageTaxExpanded] = useState(true);

  const methods = useForm<TaxSettingsFormValues>({
    resolver: zodResolver(taxSettingsSchema),
    defaultValues: {
      taxName: "Sales Tax",
      purchasesTaxRate: "10",
      salesTaxRate: "10",
      pricesIncludeTax: false,
      taxFreight: false,
      roundTotal: false,
      multipleTaxes: false,
      discountIncludesTax: false,
    },
  });

  const onSubmit = (data: TaxSettingsFormValues) => {
    console.log("Tax Settings:", data);
  };

  // Sample tax rates data
  const taxRatesData: TaxRate[] = [
    {
      id: "1",
      taxType: "GST-PR",
      taxCategory: "HSN NA",
      hsn: "NA",
      taxCriteria: "NA",
      taxValue: 0,
      startDate: "01-05-25",
      endDate: "01-05-25",
    },
    {
      id: "2",
      taxType: "CGST",
      taxCategory: "HSN NA",
      hsn: "NA",
      taxCriteria: "NA",
      taxValue: 0,
      startDate: "01-05-25",
      endDate: "01-05-25",
    },
    {
      id: "3",
      taxType: "SGST",
      taxCategory: "HSN NA",
      hsn: "NA",
      taxCriteria: "NA",
      taxValue: 0,
      startDate: "01-05-25",
      endDate: "01-05-25",
    },
  ];

  const columns: TableColumn<TaxRate>[] = [
    {
      key: "taxType",
      header: "Tax Type",
      render: (item) => <span className="font-bold text-gray-700">{item.taxType}</span>,
    },
    { key: "taxCategory", header: "Tax Category" },
    { key: "hsn", header: "HSN" },
    { key: "taxCriteria", header: "Tax Criteria" },
    { key: "taxValue", header: "Tax Value" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {/* Main Header inside component as per Figma */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Building2 size={24} className="text-gray-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Tax Settings</h2>
          </div>
          <ChevronDown size={24} className="text-gray-400 cursor-pointer" />
        </div>

        {/* Tax Name and Rates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommonTextInput
            name="taxName"
            label="Tax Name"
            placeholder="Sales Tax"
          />
          <CommonTextInput
            name="purchasesTaxRate"
            label="Purchases Tax Rate (%)"
            type="number"
            placeholder="10"
          />
          <CommonTextInput
            name="salesTaxRate"
            label="Sales Tax Rate (%)"
            type="number"
            placeholder="10"
            required
          />
        </div>

        {/* Toggle Switches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Prices Include Tax</label>
            <ControlledToggleSwitch name="pricesIncludeTax" size="md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Tax Freight</label>
            <ControlledToggleSwitch name="taxFreight" size="md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Round Total</label>
            <ControlledToggleSwitch name="roundTotal" size="md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Multiple Taxes</label>
            <ControlledToggleSwitch name="multipleTaxes" size="md" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Discount Includes Tax</label>
            <ControlledToggleSwitch name="discountIncludesTax" size="md" />
          </div>
        </div>

        {/* Manage Tax Rates/HSN Code Section */}
        <div className="mt-2 border border-gray-100 rounded-2xl bg-[#F8FAFC]/30 p-4">
          {/* Section Header */}
          <div
            onClick={() => setIsManageTaxExpanded(!isManageTaxExpanded)}
            className="flex items-center justify-between cursor-pointer mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700">
                <HomeIcon size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Manage Tax Rates/ HSN Code
              </h3>
            </div>
            {isManageTaxExpanded ? (
              <ChevronUp size={24} className="text-gray-400" />
            ) : (
              <ChevronDown size={24} className="text-gray-400" />
            )}
          </div>

          {isManageTaxExpanded && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]" style={{ height: "calc(100vh - 250px)" }}>
              <Table
                columns={columns}
                data={taxRatesData}
                keyExtractor={(item) => item.id}
                striped={false}
                hoverable={true}
                className="h-full"
                style={{ height: "100%" }}
              />
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default TaxSettingsForm;

