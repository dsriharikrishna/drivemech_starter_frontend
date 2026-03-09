"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomerInvoiceFormValues,
  customerInvoiceSchema,
} from "@/schemas/vendor/invoice.schema";
import ModalDropdown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import RichTextEditor from "@/components/forms/RichTextEditor";
import DatePicker from "@/components/ui/DatePicker";
import Button from "@/components/ui/Button";
import Table, { TableColumn } from "@/components/ui/Table";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import FilledTabs from "@/components/ui/FilledTabs";
import { Plus, Trash2 } from "lucide-react";

interface CustomerInvoiceFormProps {
  onCancel?: () => void;
  onSave?: () => void;
  onProceed?: () => void;
  defaultValues?: Partial<CustomerInvoiceFormValues>;
}

const CustomerInvoiceForm: React.FC<CustomerInvoiceFormProps> = ({
  onCancel,
  onSave,
  onProceed,
  defaultValues,
}) => {
  const methods = useForm<CustomerInvoiceFormValues>({
    resolver: zodResolver(customerInvoiceSchema),
    defaultValues: {
      reference: defaultValues?.reference || "",
      invoiceNumber: defaultValues?.invoiceNumber || "",
      jobCardNumber: defaultValues?.jobCardNumber || "",
      orderNumber: defaultValues?.orderNumber || "",
      postDate: defaultValues?.postDate || "",
      invoiceType: defaultValues?.invoiceType || "",
      accountType: defaultValues?.accountType || false,
      nextServiceKms: defaultValues?.nextServiceKms || "",
      jobStatus: defaultValues?.jobStatus || "",
      jobStatusComments: defaultValues?.jobStatusComments || "",
      internalInvoice: defaultValues?.internalInvoice || false,
      paymentTerms: defaultValues?.paymentTerms || "",
      customerSource: defaultValues?.customerSource || "",
      lineItems: defaultValues?.lineItems || [],
      invoiceNotes: defaultValues?.invoiceNotes || "",
      jobCardNotes: defaultValues?.jobCardNotes || "",
      subTotal: defaultValues?.subTotal || 0,
      freight: defaultValues?.freight || 0,
      salesTax: defaultValues?.salesTax || 0,
      total: defaultValues?.total || 0,
    },
  });

  const { register, control, watch, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const [activeTab, setActiveTab] = useState("invoice-notes");

  const tabs = [
    { id: "invoice-notes", label: "Invoice Notes" },
    { id: "job-card-notes", label: "Job Card Notes" },
  ];

  const invoiceTypeOptions = [
    { id: "invoice", name: "Invoice" },
    { id: "quote", name: "Quote" },
    { id: "order", name: "Order" },
  ];

  const jobStatusOptions = [
    { id: "pending", name: "Pending" },
    { id: "in-progress", name: "In Progress" },
    { id: "completed", name: "Completed" },
  ];

  const paymentTermsOptions = [
    { id: "net-30", name: "Net 30" },
    { id: "net-60", name: "Net 60" },
    { id: "due-on-receipt", name: "Due on Receipt" },
  ];

  const customerSourceOptions = [
    { id: "walk-in", name: "Walk-in" },
    { id: "online", name: "Online" },
    { id: "referral", name: "Referral" },
  ];

  // Watch line items for calculations
  const lineItems = watch("lineItems") || [];

  // Calculate totals
  useEffect(() => {
    const subTotal = lineItems.reduce((sum, item) => {
      const itemTotal = (item.quantity || 0) * (item.unitPrice || 0);
      return sum + itemTotal;
    }, 0);

    const freight = watch("freight") || 0;
    const salesTax = subTotal * 0.1; // 10% tax
    const total = subTotal + freight + salesTax;

    setValue("subTotal", subTotal);
    setValue("salesTax", salesTax);
    setValue("total", total);
  }, [lineItems, watch("freight")]);

  const addLineItem = () => {
    append({
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 10,
      total: 0,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* Header Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommonTextInput name="invoiceNumber" label="Invoice Number" />
          <CommonTextInput name="jobCardNumber" label="Job Card Number" />
          <CommonTextInput name="orderNumber" label="Order Number" />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <DatePicker
              label="Post Date"
              value={watch("postDate") ? new Date(watch("postDate")!) : null}
              onChange={(date) =>
                setValue("postDate", date?.toISOString() || "")
              }
              placeholder="Select Post Date"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Invoice type <span className="text-red-500">*</span>
            </label>
            <ModalDropdown
              items={invoiceTypeOptions}
              selectedItem={
                invoiceTypeOptions.find(
                  (opt) => opt.id === watch("invoiceType")
                ) || null
              }
              onSelect={(item) => setValue("invoiceType", item.id)}
              placeholder="Select"
            />
          </div>
          <div className="flex items-center pt-6">
            <ControlledToggleSwitch
              name="accountType"
              label="Account Type"
              size="md"
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommonTextInput name="nextServiceKms" label="Next Service - KMs" />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Status
            </label>
            <ModalDropdown
              items={jobStatusOptions}
              selectedItem={
                jobStatusOptions.find((opt) => opt.id === watch("jobStatus")) ||
                null
              }
              onSelect={(item) => setValue("jobStatus", item.id)}
              placeholder="Select"
            />
          </div>
          <CommonTextInput
            name="jobStatusComments"
            label="Job Status Comments"
          />
        </div>

        {/* Fourth Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <ControlledToggleSwitch
              name="internalInvoice"
              label="Internal Invoice"
              size="md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Terms
            </label>
            <ModalDropdown
              items={paymentTermsOptions}
              selectedItem={
                paymentTermsOptions.find(
                  (opt) => opt.id === watch("paymentTerms")
                ) || null
              }
              onSelect={(item) => setValue("paymentTerms", item.id)}
              placeholder="Select"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Customer Source
            </label>
            <ModalDropdown
              items={customerSourceOptions}
              selectedItem={
                customerSourceOptions.find(
                  (opt) => opt.id === watch("customerSource")
                ) || null
              }
              onSelect={(item) => setValue("customerSource", item.id)}
              placeholder="Select"
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div>
          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
            <Table
              columns={[
                {
                  key: "sno",
                  header: "S.No",
                  width: "60px",
                  render: (_, index) => (
                    <span className="text-sm text-gray-900">{index + 1}</span>
                  ),
                },
                {
                  key: "product",
                  header: "Product",
                  width: "150px",
                  render: (item, index) => (
                    <CommonTextInput
                      name={`lineItems.${index}.product`}
                      compact
                    />
                  ),
                },
                {
                  key: "description",
                  header: "Description",
                  width: "200px",
                  render: (item, index) => (
                    <CommonTextInput
                      name={`lineItems.${index}.description`}
                      compact
                    />
                  ),
                },
                {
                  key: "quantity",
                  header: "Quantity",
                  width: "100px",
                  render: (item, index) => (
                    <CommonNumberInput
                      name={`lineItems.${index}.quantity`}
                      compact
                      min={1}
                    />
                  ),
                },
                {
                  key: "unitPrice",
                  header: "Unit Price ($)",
                  width: "120px",
                  render: (item, index) => (
                    <CommonNumberInput
                      name={`lineItems.${index}.unitPrice`}
                      compact
                      min={0}
                      allowFloat
                      decimalPlaces={2}
                    />
                  ),
                },
                {
                  key: "tax",
                  header: "Tax (10%)",
                  width: "100px",
                  render: (item, index) => {
                    const quantity = watch(`lineItems.${index}.quantity`) || 0;
                    const unitPrice = watch(`lineItems.${index}.unitPrice`) || 0;
                    const itemTotal = quantity * unitPrice;
                    const tax = itemTotal * 0.1;
                    return (
                      <span className="text-sm text-gray-900">
                        {tax.toFixed(2)}
                      </span>
                    );
                  },
                },
                {
                  key: "total",
                  header: "Total",
                  width: "100px",
                  render: (item, index) => {
                    const quantity = watch(`lineItems.${index}.quantity`) || 0;
                    const unitPrice = watch(`lineItems.${index}.unitPrice`) || 0;
                    const itemTotal = quantity * unitPrice;
                    return (
                      <span className="text-sm text-gray-900">
                        {itemTotal.toFixed(2)}
                      </span>
                    );
                  },
                },
                {
                  key: "actions",
                  header: "Actions",
                  width: "80px",
                  align: "center" as const,
                  render: (item, index) => (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-1 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  ),
                },
              ]}
              data={fields}
              keyExtractor={(item) => item.id}
              striped={false}
              hoverable
              className="h-full"
              style={{ height: "100%" }}
            />
          </div>

          {/* Add Button */}
          <div className="mt-4">
            <Button
              type="button"
              onClick={addLineItem}
              variant="primary-blue"
              size="sm"
              startIcon={<Plus size={16} />}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Sub Total</span>
              <span className="font-medium text-gray-900">
                $ {watch("subTotal")?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Freight</span>
              <span className="font-medium text-gray-900">
                $ {watch("freight")?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Sales Tax (10%)</span>
              <span className="font-medium text-gray-900">
                $ {watch("salesTax")?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
              <span className="text-red-600">Total</span>
              <span className="text-red-600">
                $ {watch("total")?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Notes Tabs */}
        <div>
          <FilledTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mt-4">
            {activeTab === "invoice-notes" && (
              <RichTextEditor
                name="invoiceNotes"
                label="Body Text"
                placeholder="Enter invoice notes..."
              />
            )}

            {activeTab === "job-card-notes" && (
              <RichTextEditor
                name="jobCardNotes"
                label="Body Text"
                placeholder="Enter job card notes..."
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button type="button" onClick={onCancel} variant="danger" size="md">
            Cancel
          </Button>
          <Button type="button" onClick={onSave} variant="outline" size="md">
            Save
          </Button>
          <Button type="button" onClick={onProceed} variant="primary" size="md">
            Proceed
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default CustomerInvoiceForm;
