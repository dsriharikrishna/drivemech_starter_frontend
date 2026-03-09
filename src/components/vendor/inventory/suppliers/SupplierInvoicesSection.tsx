"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import SupplierInfoDisplay from "./SupplierInfoDisplay";
import LineItemsTable from "./LineItemsTable";
import Table, { TableColumn } from "@/components/ui/Table";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import Button from "@/components/ui/Button";
import {
  supplierInvoiceFormSchema,
  type SupplierInvoiceFormValues,
  type CustomerInfo,
  type SupplierInvoice,
} from "@/schemas/vendor/supplier.schema";

interface SupplierInvoicesSectionProps {
  dialogMode: "add" | "edit";
  setDialogMode: (mode: "add" | "edit") => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const mockCustomerInfo: CustomerInfo = {
  name: "John Doe",
  street: "Street 01",
  road: "Abc Road",
  city: "Hyd",
  postalCode: "500018",
  phone: "+917000770007",
  mobile: "040-123 456",
  email: "johndoe@example.com",
  address: "Street 1, ABD Colony, Hyd-18",
};

const invoiceTypeOptions = [
  { id: "1", name: "Select" },
  { id: "2", name: "Invoice" },
  { id: "3", name: "Credit Note" },
];

const paymentTermsOptions = [
  { id: "1", name: "Select" },
  { id: "2", name: "Net 30" },
  { id: "3", name: "Net 60" },
  { id: "4", name: "Due on Receipt" },
];

const SupplierInvoicesSection = ({
  dialogMode,
  setDialogMode,
  isDialogOpen,
  setIsDialogOpen,
}: SupplierInvoicesSectionProps) => {
  const [selectedInvoice, setSelectedInvoice] =
    useState<SupplierInvoice | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mock data for table
  const [invoices, setInvoices] = useState<SupplierInvoice[]>([
    {
      id: "1",
      reference: "INV-2024-001",
      postDate: "2024-02-01",
      tranType: "Invoice",
      status: "Open",
      amount: "2500.00",
      balance: "2500.00",
    },
    {
      id: "2",
      reference: "INV-2024-002",
      postDate: "2024-02-10",
      tranType: "Credit Note",
      status: "Paid",
      amount: "500.00",
      balance: "0.00",
    },
  ]);

  const methods = useForm<SupplierInvoiceFormValues>({
    resolver: zodResolver(supplierInvoiceFormSchema),
    defaultValues: {
      reference: "",
      postDate: "",
      priceIncludesTax: false,
      invoiceType: "",
      paymentTerms: "",
      lineItems: [
        {
          id: "item-1",
          product: "",
          description: "",
          quantity: 0,
          unitPrice: 0,
          tax: 0,
          total: 0,
        },
      ],
      note: "",
      subTotal: 0,
      freight: 0,
      salesTax: 0,
      total: 0,
    },
  });

  const { handleSubmit, watch, setValue, reset } = methods;
  const lineItems = watch("lineItems");
  const selectedInvoiceType = watch("invoiceType");
  const selectedPaymentTerms = watch("paymentTerms");

  // Calculate totals whenever line items change
  useEffect(() => {
    const subTotal = lineItems.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const unitPrice = item.unitPrice || 0;
      return sum + quantity * unitPrice;
    }, 0);

    const salesTax = subTotal * 0.1; // 10% tax
    const freight = watch("freight") || 0;
    const total = subTotal + salesTax + freight;

    setValue("subTotal", subTotal);
    setValue("salesTax", salesTax);
    setValue("total", total);
  }, [lineItems, watch("freight"), setValue]);

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (dialogMode === "add") {
        reset({
          reference: "",
          postDate: new Date().toISOString().split("T")[0],
          priceIncludesTax: false,
          invoiceType: "",
          paymentTerms: "",
          lineItems: [
            {
              id: "item-1",
              product: "",
              description: "",
              quantity: 0,
              unitPrice: 0,
              tax: 0,
              total: 0,
            },
          ],
          note: "",
          subTotal: 0,
          freight: 0,
          salesTax: 0,
          total: 0,
        });
      } else if (selectedInvoice) {
        reset({
          reference: selectedInvoice.reference,
          postDate: selectedInvoice.postDate,
          priceIncludesTax: false,
          // Mapping mock strings to option IDs would be needed here in a real app
          invoiceType: "2",
          paymentTerms: "2",
          note: "Sample note",
          lineItems: [
            {
              id: "item-1",
              product: "Sample Product",
              description: "Sample Description",
              quantity: 1,
              unitPrice: parseFloat(selectedInvoice.amount),
              tax: 0,
              total: parseFloat(selectedInvoice.amount),
            },
          ],
          subTotal: parseFloat(selectedInvoice.amount),
          freight: 0,
          salesTax: 0,
          total: parseFloat(selectedInvoice.amount),
        });
      }
    }
  }, [isDialogOpen, dialogMode, selectedInvoice, reset]);

  const onEditClick = (invoice: SupplierInvoice) => {
    setSelectedInvoice(invoice);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const onDeleteClick = (invoice: SupplierInvoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit: SubmitHandler<SupplierInvoiceFormValues> = (data) => {
    console.log("Invoice Data:", data);
    if (dialogMode === "add") {
      // Add logic
    } else {
      // Edit logic
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete Invoice:", selectedInvoice?.id);
    setIsDeleteDialogOpen(false);
    setSelectedInvoice(null);
  };

  const columns: TableColumn<SupplierInvoice>[] = [
    {
      key: "reference",
      header: "Reference",
      sortable: true,
      width: "20%",
    },
    {
      key: "postDate",
      header: "Date",
      sortable: true,
      width: "15%",
    },
    {
      key: "tranType",
      header: "Type",
      width: "15%",
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Paid"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      width: "15%",
      render: (row) => <span>${row.amount}</span>,
    },
    {
      key: "balance",
      header: "Balance",
      width: "15%",
      render: (row) => <span>${row.balance}</span>,
    },
    {
      key: "actions", // Adding actions column
      header: "",
      width: "100px",
      align: "right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="icon-edit"
            size="sm"
            onClick={() => onEditClick(row)}
          />
          <Button
            variant="icon-delete"
            size="sm"
            onClick={() => onDeleteClick(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
        <Table
          columns={columns}
          data={invoices}
          keyExtractor={(item) => item.id}
          pagination
          pageSize={10}
          striped={false}
          hoverable
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogBody className="w-full sm:w-2xl lg:w-3xl p-4">
          <DialogHeader
            title={dialogMode === "add" ? "Add Invoice" : "Edit Invoice"}
            onClose={() => setIsDialogOpen(false)}
          />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <SupplierInfoDisplay customerInfo={mockCustomerInfo} />

              <div className="grid grid-cols-3 gap-4">
                <CommonTextInput
                  name="reference"
                  label="Reference"
                  placeholder=""
                  required
                />
                <div>
                  <DatePicker
                    label="Post Date"
                    value={
                      watch("postDate") ? new Date(watch("postDate")) : null
                    }
                    onChange={(date) =>
                      setValue(
                        "postDate",
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    placeholder="Select"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Price Includes Tax
                  </label>
                  <ControlledToggleSwitch name="priceIncludesTax" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Invoice Type
                  </label>
                  <DropDown
                    items={invoiceTypeOptions}
                    selectedItem={
                      invoiceTypeOptions.find(
                        (t) => t.id === selectedInvoiceType
                      ) || null
                    }
                    onSelect={(item) => setValue("invoiceType", item.id)}
                    placeholder="Select"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Payment Terms
                  </label>
                  <DropDown
                    items={paymentTermsOptions}
                    selectedItem={
                      paymentTermsOptions.find(
                        (t) => t.id === selectedPaymentTerms
                      ) || null
                    }
                    onSelect={(item) => setValue("paymentTerms", item.id)}
                    placeholder="Select"
                  />
                </div>
              </div>

              <LineItemsTable name="lineItems" />

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Sub Total</span>
                    <span className="text-gray-900">
                      ${watch("subTotal").toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Freight</span>
                    <span className="text-gray-900">
                      ${watch("freight").toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Sales Tax (10%)</span>
                    <span className="text-gray-900">
                      ${watch("salesTax").toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-red-600">
                      ${watch("total").toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <CommonTextArea
                  name="note"
                  label="Note"
                  placeholder="Text Area"
                  rows={3}
                />
              </div>
            </form>
            <DialogFooter
              onCancel={() => setIsDialogOpen(false)}
              onConfirm={handleSubmit(onSubmit)}
              leftTitle="Cancel"
              rightTitle={dialogMode === "add" ? "Save" : "Update"}
            />
          </FormProvider>
        </DialogBody>
      </Dialog>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogHeader
          title="Delete Invoice"
          onClose={() => setIsDeleteDialogOpen(false)}
        />
        <DialogBody className="w-md p-6">
          <p className="text-gray-700">
            Are you sure you want to delete invoice{" "}
            <b>{selectedInvoice?.reference}</b>? This action cannot be undone.
          </p>
        </DialogBody>
        <DialogFooter
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          leftTitle="Cancel"
          rightTitle="Delete"
        />
      </Dialog>
    </>
  );
};

export default SupplierInvoicesSection;
