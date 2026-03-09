"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomerInvoiceFormValues,
  customerInvoiceSchema,
} from "@/schemas/vendor/invoice.schema";
import DropDown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import DatePicker from "@/components/ui/DatePicker";
import Tabs from "@/components/ui/Tabs";
import { Plus, Trash2, MoreVertical, FileText } from "lucide-react";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Table, { TableColumn } from "@/components/ui/Table";

const CustomerSupplierInvoicesSection = () => {
  const [activeTab, setActiveTab] = useState("invoice-notes");

  const methods = useForm<CustomerInvoiceFormValues>({
    resolver: zodResolver(customerInvoiceSchema),
    defaultValues: {
      reference: "INV-2025-001",
      postDate: new Date().toISOString().split("T")[0],
      invoiceType: "invoice",
      accountType: false,
      paymentTerms: "net-30",
      lineItems: [
        {
          product: "Oil Filter",
          description: "Premium synthetic oil filter",
          quantity: 2,
          unitPrice: 15.99,
          tax: 0,
          total: 0,
        },
        {
          product: "Brake Pads",
          description: "Ceramic brake pads - front set",
          quantity: 1,
          unitPrice: 89.99,
          tax: 0,
          total: 0,
        },
        {
          product: "Air Filter",
          description: "High-performance air filter",
          quantity: 1,
          unitPrice: 24.99,
          tax: 0,
          total: 0,
        },
      ],
      subTotal: 0,
      freight: 15.0,
      salesTax: 0,
      total: 0,
      invoiceNotes: "Thank you for your business!",
      jobCardNotes: "Regular maintenance service completed.",
    },
  });

  const { register, control, watch, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const tabs = [
    { id: "invoice-notes", label: "Invoice Notes" },
    { id: "job-card-notes", label: "Job Card Notes" },
  ];

  const invoiceTypeOptions = [
    { id: "invoice", name: "Invoice" },
    { id: "quote", name: "Quote" },
    { id: "order", name: "Order" },
  ];

  const paymentTermsOptions = [
    { id: "net-30", name: "Net 30" },
    { id: "net-60", name: "Net 60" },
    { id: "due-on-receipt", name: "Due on Receipt" },
  ];

  // Watch line items for calculations
  const lineItems = watch("lineItems") || [];
  const freight = watch("freight") || 0;

  // Helper function to round to 2 decimal places
  const roundToTwo = (num: number): number => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  // Calculate totals
  useEffect(() => {
    const subTotal = lineItems.reduce((sum, item) => {
      const itemTotal = roundToTwo(
        (item.quantity || 0) * (item.unitPrice || 0)
      );
      return sum + itemTotal;
    }, 0);

    const roundedSubTotal = roundToTwo(subTotal);
    const salesTax = roundToTwo(roundedSubTotal * 0.1); // 10% tax
    const total = roundToTwo(roundedSubTotal + freight + salesTax);

    setValue("subTotal", roundedSubTotal);
    setValue("salesTax", salesTax);
    setValue("total", total);
  }, [lineItems, freight, setValue]);

  const addLineItem = () => {
    append({
      product: "",
      description: "",
      quantity: 0,
      unitPrice: 0,
      tax: 0,
      total: 0,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="p-4 space-y-6 bg-white">
        {/* Invoice Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <CommonTextInput
              name="reference"
              label="Reference"
              placeholder=""
            />
          </div>
          <div className="col-span-1">
            <DatePicker
              label="Post Date"
              value={watch("postDate") ? new Date(watch("postDate")) : undefined}
              onChange={(date) =>
                setValue("postDate", date ? date.toISOString().split("T")[0] : "")
              }
              placeholder="Select"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Price Including Tax</span>
            <ControlledToggleSwitch name="accountType" size="md" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <DropDown
              label="Invoice type"
              items={invoiceTypeOptions}
              selectedItem={invoiceTypeOptions.find((opt) => opt.id === watch("invoiceType")) || null}
              onSelect={(item) => setValue("invoiceType", item.id)}
              placeholder="Select"
            />
          </div>
          <div>
            <DropDown
              label="Payment Terms"
              items={paymentTermsOptions}
              selectedItem={paymentTermsOptions.find((opt) => opt.id === watch("paymentTerms")) || null}
              onSelect={(item) => setValue("paymentTerms", item.id)}
              placeholder="Select"
            />
          </div>
        </div>

        {/* Price Including Tax Toggle */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              Price Including Tax
            </span>
            <ControlledToggleSwitch name="accountType" size="md" />
          </div>
        </div>

        {/* Line Items Table */}
        <div>
          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
            <Table
              columns={[
                {
                  key: "sNo",
                  header: "S.No",
                  width: "80px",
                  render: (_, index) => (
                    <span className="text-sm text-gray-900">{index + 1}</span>
                  ),
                },
                {
                  key: "product",
                  header: "Product",
                  width: "150px",
                  render: (field, index) => (
                    <CommonTextInput
                      name={`lineItems.${index}.product`}
                      compact
                    />
                  ),
                },
                {
                  key: "description",
                  header: "Description",
                  minWidth: "200px",
                  render: (field, index) => (
                    <CommonTextInput
                      name={`lineItems.${index}.description`}
                      compact
                    />
                  ),
                },
                {
                  key: "quantity",
                  header: "Quantity",
                  width: "120px",
                  render: (field, index) => (
                    <CommonTextInput
                      name={`lineItems.${index}.quantity`}
                      type="number"
                      defaultValue={0}
                      compact
                      rules={{ valueAsNumber: true }}
                    />
                  ),
                },
                {
                  key: "unitPrice",
                  header: "Unit Price ($)",
                  width: "140px",
                  render: (field, index) => (
                    <CommonTextInput
                      name={`lineItems.${index}.unitPrice`}
                      type="number"
                      step="0.01"
                      defaultValue={0}
                      compact
                      rules={{ valueAsNumber: true }}
                    />
                  ),
                },
                {
                  key: "tax",
                  header: "Tax (10%)",
                  width: "100px",
                  render: (field, index) => {
                    const quantity = watch(`lineItems.${index}.quantity`) || 0;
                    const unitPrice = watch(`lineItems.${index}.unitPrice`) || 0;
                    const itemTotal = quantity * unitPrice;
                    const tax =
                      Math.round((itemTotal * 0.1 + Number.EPSILON) * 100) / 100;
                    return (
                      <span className="text-sm text-gray-900">
                        ${tax.toFixed(2)}
                      </span>
                    );
                  },
                },
                {
                  key: "total",
                  header: "Total",
                  width: "100px",
                  render: (field, index) => {
                    const quantity = watch(`lineItems.${index}.quantity`) || 0;
                    const unitPrice = watch(`lineItems.${index}.unitPrice`) || 0;
                    const itemTotal =
                      Math.round((quantity * unitPrice + Number.EPSILON) * 100) /
                      100;
                    return (
                      <span className="text-sm text-gray-900">
                        ${itemTotal.toFixed(2)}
                      </span>
                    );
                  },
                },
                {
                  key: "actions",
                  header: "Actions",
                  width: "100px",
                  align: "center",
                  render: (field, index) => (
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
              keyExtractor={(field) => field.id}
              striped={false}
              hoverable
              emptyMessage="No line items added yet. Click 'Add' to create one."
              className="h-full"
              style={{ height: "100%" }}
            />
          </div>

          {/* Add Button */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={addLineItem}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {/* Totals Summary */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Sub Total</span>
              <span className="font-medium text-gray-900">
                ${watch("subTotal")?.toFixed(2) || "00.00"}
              </span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-700">Freight</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-500">$</span>
                <input
                  {...register("freight", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  defaultValue={0}
                  className="border border-gray-300 text-sm rounded px-2 py-1 w-20 text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Sales Tax (10%)</span>
              <span className="font-medium text-gray-900">
                $ {watch("salesTax")?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
              <span className="text-red-600">Total</span>
              <span className="text-red-600">
                $ {watch("total")?.toFixed(2) || "00.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Notes Tabs */}
        <div>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
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
      </div>
    </FormProvider>
  );
};

export default CustomerSupplierInvoicesSection;
