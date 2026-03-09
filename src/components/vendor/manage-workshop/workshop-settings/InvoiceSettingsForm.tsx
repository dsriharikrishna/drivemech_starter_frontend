"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ControlledDropdown } from "@/components/ui/ControlledDropdown";
import { z } from "zod";

// Extended schema for invoice settings
const invoiceSettingsSchema = z.object({
  invoiceFormat: z.string().min(1, "Invoice format is required"),
  invoiceTerms: z.string().min(1, "Invoice terms are required"),
  bundledItemPrintStyle: z.string().min(1, "Print style is required"),
  hidePartNumbers: z.boolean(),
  hideLabourQuantity: z.boolean(),
  hideLinePrices: z.boolean(),
  hideHeaderFooterOnBundles: z.boolean(),
  barcodeOnJobCard: z.boolean(),
  invoiceNumberEqualsJobCard: z.boolean(),
  cannotProcessOrdersAttached: z.boolean(),
  addPricingToJobCard: z.boolean(),
  hideTyreDetails: z.boolean(),
  mergeBundlesWithInvoiceLines: z.boolean(),
  hoursWorkedField: z.boolean(),
  ideTaxOnInvoiceLines: z.boolean(),
  preventSplitNotesOnInvoices: z.boolean(),
  askForDueDatesOnProcessInvoice: z.boolean(),
  useTodayAsInvoicePostDate: z.boolean(),
  useServiceAdvisors: z.boolean(),
});

type InvoiceSettingsFormValues = z.infer<typeof invoiceSettingsSchema>;

const InvoiceSettingsForm = () => {
  const methods = useForm<InvoiceSettingsFormValues>({
    resolver: zodResolver(invoiceSettingsSchema),
    defaultValues: {
      invoiceFormat: "default_bw",
      invoiceTerms: "net_30",
      bundledItemPrintStyle: "standard",
      hidePartNumbers: false,
      hideLabourQuantity: false,
      hideLinePrices: false,
      hideHeaderFooterOnBundles: false,
      barcodeOnJobCard: false,
      invoiceNumberEqualsJobCard: false,
      cannotProcessOrdersAttached: false,
      addPricingToJobCard: false,
      hideTyreDetails: false,
      mergeBundlesWithInvoiceLines: false,
      hoursWorkedField: false,
      ideTaxOnInvoiceLines: false,
      preventSplitNotesOnInvoices: false,
      askForDueDatesOnProcessInvoice: false,
      useTodayAsInvoicePostDate: false,
      useServiceAdvisors: false,
    },
  });

  const onSubmit = (data: InvoiceSettingsFormValues) => {
    console.log("Invoice Settings:", data);
  };

  const invoiceFormatOptions = [
    { value: "default_bw", label: "Default (B&W)" },
    { value: "default_color", label: "Default (Color)" },
    { value: "custom", label: "Custom" },
  ];

  const invoiceTermsOptions = [
    { value: "net_15", label: "Net 15" },
    { value: "net_30", label: "Net 30" },
    { value: "net_60", label: "Net 60" },
    { value: "due_on_receipt", label: "Due on Receipt" },
  ];

  const printStyleOptions = [
    { value: "standard", label: "Standard" },
    { value: "detailed", label: "Detailed" },
    { value: "compact", label: "Compact" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {/* Dropdowns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ControlledDropdown
            name="invoiceFormat"
            label="Invoice Format"
            options={invoiceFormatOptions}
            placeholder="Choose a format"
            required
          />
          <ControlledDropdown
            name="invoiceTerms"
            label="Invoice Terms"
            options={invoiceTermsOptions}
            placeholder="Choose a default payment term"
            required
          />
          <ControlledDropdown
            name="bundledItemPrintStyle"
            label="Bundled Item Print Style"
            options={printStyleOptions}
            placeholder="Choose a print style"
            required
          />
        </div>

        {/* Toggle Switches Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hide Part Numbers
            </label>
            <ControlledToggleSwitch name="hidePartNumbers" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hide Labour Quantity
            </label>
            <ControlledToggleSwitch name="hideLabourQuantity" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hide Line Prices
            </label>
            <ControlledToggleSwitch name="hideLinePrices" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hide Header/Footer On Bundles
            </label>
            <ControlledToggleSwitch
              name="hideHeaderFooterOnBundles"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Barcode on Job Card
            </label>
            <ControlledToggleSwitch name="barcodeOnJobCard" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Invoice Number Equals Job Card Number
            </label>
            <ControlledToggleSwitch
              name="invoiceNumberEqualsJobCard"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Cannot Process - Orders Attached
            </label>
            <ControlledToggleSwitch
              name="cannotProcessOrdersAttached"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Add pricing to Job Card
            </label>
            <ControlledToggleSwitch name="addPricingToJobCard" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hide Tyre Details( Job Card)
            </label>
            <ControlledToggleSwitch name="hideTyreDetails" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Merge Bundles With Invoice Lines
            </label>
            <ControlledToggleSwitch
              name="mergeBundlesWithInvoiceLines"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Hours Worked Field
            </label>
            <ControlledToggleSwitch name="hoursWorkedField" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ide Tax On Invoice Lines
            </label>
            <ControlledToggleSwitch name="ideTaxOnInvoiceLines" size="md" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Prevent Split Notes on Invoices
            </label>
            <ControlledToggleSwitch
              name="preventSplitNotesOnInvoices"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ask FOr Due Dates On Process Invoice
            </label>
            <ControlledToggleSwitch
              name="askForDueDatesOnProcessInvoice"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Use Today As Invoice Post Date
            </label>
            <ControlledToggleSwitch
              name="useTodayAsInvoicePostDate"
              size="md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Use Service Advisors
            </label>
            <ControlledToggleSwitch name="useServiceAdvisors" size="md" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default InvoiceSettingsForm;
