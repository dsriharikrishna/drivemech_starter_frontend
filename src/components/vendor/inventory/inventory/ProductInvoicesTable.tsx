"use client";

import React, { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { ProductInvoice } from "@/schemas/vendor/invoice.schema";
import { Eye } from "lucide-react";
import Button from "@/components/ui/Button";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import CustomerInvoiceForm from "./CustomerInvoiceForm";
import { EditIcon } from "@/components/icons/ManagementModuleIcons";
import { zodResolver } from "@hookform/resolvers/zod";

// Product Invoice Form Schema
const productInvoiceFormSchema = z.object({
  invoiceNo: z.string().min(1, "Invoice number is required"),
  customer: z.string().min(1, "Customer name is required"),
  postDate: z.string().min(1, "Post date is required"),
  tranType: z.string().min(1, "Transaction type is required"),
  status: z.string().min(1, "Status is required"),
  qty: z.number().min(0, "Quantity must be positive"),
  amount: z.number().min(0, "Amount must be positive"),
});

type ProductInvoiceFormValues = z.infer<typeof productInvoiceFormSchema>;

export type DialogMode = "add" | "edit";

interface ProductInvoicesTableProps {
  invoices: ProductInvoice[];
  onInvoiceClick?: (invoice: ProductInvoice) => void;
  dialogMode?: DialogMode;
  setDialogMode?: (value: DialogMode) => void;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (value: boolean) => void;
}

const ProductInvoicesTable: React.FC<ProductInvoicesTableProps> = ({
  invoices,
  onInvoiceClick,
  dialogMode = "add",
  setDialogMode,
  isDialogOpen = false,
  setIsDialogOpen,
}) => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<ProductInvoice | null>(
    null
  );

  const methods = useForm<ProductInvoiceFormValues>({
    resolver: zodResolver(productInvoiceFormSchema),
    defaultValues: {
      invoiceNo: "",
      customer: "",
      postDate: "",
      tranType: "",
      status: "",
      qty: 0,
      amount: 0,
    },
  });

  // Sync with parent's dialog state
  useEffect(() => {
    if (isDialogOpen && dialogMode === "add") {
      methods.reset();
      setSelectedInvoice(null);
      setIsFormDialogOpen(true);
    }
  }, [isDialogOpen, dialogMode, methods]);

  const handleCloseDialog = () => {
    setIsFormDialogOpen(false);
    setIsDialogOpen?.(false);
  };

  const handleEditClick = (invoice: ProductInvoice) => {
    if (onInvoiceClick) {
      onInvoiceClick(invoice);
      return;
    }
    setDialogMode?.("edit");
    setSelectedInvoice(invoice);
    methods.setValue("invoiceNo", invoice.invoiceNo);
    methods.setValue("customer", invoice.customer);
    methods.setValue("postDate", invoice.postDate);
    methods.setValue("tranType", invoice.tranType);
    methods.setValue("status", invoice.status);
    methods.setValue("qty", invoice.qty);
    methods.setValue("amount", invoice.amount);
    setIsFormDialogOpen(true);
  };

  const handleViewClick = (invoice: ProductInvoice) => {
    onInvoiceClick?.(invoice);
  };

  const handleDeleteClick = (invoice: ProductInvoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteDialogOpen(true);
  };

  const onAddInvoice = (invoice: ProductInvoiceFormValues) => {
    console.log("Adding invoice:", invoice);
    // TODO: Implement actual add logic
  };

  const onEditInvoice = (id: string, invoice: ProductInvoiceFormValues) => {
    console.log("Editing invoice:", id, invoice);
    // TODO: Implement actual edit logic
  };

  const onDeleteInvoice = (id: string) => {
    console.log("Deleting invoice:", id);
    // TODO: Implement actual delete logic
  };

  const onSubmitForm: SubmitHandler<ProductInvoiceFormValues> = (data) => {
    if (dialogMode === "add") {
      onAddInvoice(data);
    } else {
      if (selectedInvoice) {
        onEditInvoice(selectedInvoice.id, data);
      }
    }
    setIsFormDialogOpen(false);
    methods.reset();
    setSelectedInvoice(null);
  };

  const handleDelete = () => {
    if (selectedInvoice) {
      onDeleteInvoice?.(selectedInvoice.id);
      setIsDeleteDialogOpen(false);
      setSelectedInvoice(null);
    }
  };

  return (
    <FormProvider {...methods}>
      {/* Invoices Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
        <Table
          columns={[
            {
              key: "invoiceNo",
              header: "Invoice No.",
              width: "120px",
            },
            {
              key: "customer",
              header: "Customer",
              width: "180px",
            },
            {
              key: "postDate",
              header: "Post Date",
              width: "120px",
            },
            {
              key: "tranType",
              header: "Tran Type",
              width: "120px",
            },
            {
              key: "status",
              header: "Status",
              width: "120px",
            },
            {
              key: "qty",
              header: "Qty",
              width: "80px",
            },
            {
              key: "amount",
              header: "Amount",
              width: "120px",
              render: (invoice: ProductInvoice) =>
                `$${invoice.amount.toFixed(2)}`,
            },
            {
              key: "actions",
              header: "Actions",
              width: "140px",
              render: (invoice: ProductInvoice) => (
                <div className="flex items-center gap-2">
                  <Button
                    variant="icon-edit"
                    size="sm"
                    rounded="md"
                    onClick={() => handleEditClick(invoice)}
                    title="Edit"
                    startIcon={<EditIcon size={24} className="text-gray-200 bg-gray-500 p-1 rounded-md" />}
                  />
                  <Button
                    variant="icon-edit"
                    size="sm"
                    rounded="md"
                    onClick={() => handleViewClick(invoice)}
                    title="View"
                    startIcon={<Eye size={24} className="text-gray-200 bg-gray-500 p-1 rounded-md" />}
                  />
                </div>
              ),
            },
          ]}
          data={invoices}
          keyExtractor={(invoice) => invoice.id}
          pagination
          pageSize={10}
          hoverable
          striped={false}
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* Add/Edit Invoice Dialog */}
      <Dialog isOpen={isFormDialogOpen} onClose={handleCloseDialog}>
        <DialogBody className="w-full lg:w-2xl p-6">
          <DialogHeader
            title={dialogMode === "add" ? "Add New Invoice" : "Edit Invoice"}
            subtitle={
              dialogMode === "add"
                ? "Enter invoice details"
                : `Editing: ${selectedInvoice?.invoiceNo || ""}`
            }
            onClose={handleCloseDialog}
          />
          <div className="px-0">
            <CustomerInvoiceForm
              defaultValues={
                dialogMode === "edit" && selectedInvoice
                  ? {
                    invoiceNumber: selectedInvoice.invoiceNo,
                    reference: selectedInvoice.customer,
                    postDate: selectedInvoice.postDate,
                    invoiceType: selectedInvoice.tranType,
                    jobStatus: selectedInvoice.status,
                    lineItems: [
                      {
                        description: "",
                        quantity: selectedInvoice.qty,
                        unitPrice:
                          selectedInvoice.amount / selectedInvoice.qty,
                        tax: 0,
                        total: selectedInvoice.amount,
                      },
                    ],
                    subTotal: selectedInvoice.amount,
                    freight: 0,
                    salesTax: 0,
                    total: selectedInvoice.amount,
                    accountType: false,
                    internalInvoice: false,
                  }
                  : undefined
              }
              onCancel={handleCloseDialog}
              onSave={() => {
                console.log("Save invoice");
                handleCloseDialog();
              }}
              onProceed={() => {
                console.log("Proceed with invoice");
                handleCloseDialog();
              }}
            />
          </div>
        </DialogBody>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogBody className="w-md h-auto p-6">
          <DialogHeader
            title="Delete Invoice"
            subtitle="Are you sure you want to delete this invoice?"
            onClose={() => setIsDeleteDialogOpen(false)}
          />

          <div className="py-4">
            <p className="text-gray-700">
              You are about to delete:{" "}
              <span className="font-semibold">
                {selectedInvoice?.invoiceNo}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be undone.
            </p>
          </div>

          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Delete"
            onCancel={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
          />
        </DialogBody>
      </Dialog>
    </FormProvider>
  );
};

export default ProductInvoicesTable;
