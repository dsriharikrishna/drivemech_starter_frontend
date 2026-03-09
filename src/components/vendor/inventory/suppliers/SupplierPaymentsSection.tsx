"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Table, { TableColumn } from "@/components/ui/Table";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import Button from "@/components/ui/Button";
import {
  supplierPaymentSchema,
  type SupplierPaymentFormValues,
  type SupplierPayment,
} from "@/schemas/vendor/supplier.schema";

interface SupplierPaymentsSectionProps {
  dialogMode: "add" | "edit";
  setDialogMode: (mode: "add" | "edit") => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const statusOptions = [
  { id: "Processed", name: "Processed" },
  { id: "Pending", name: "Pending" },
  { id: "Failed", name: "Failed" },
];

const SupplierPaymentsSection = ({
  dialogMode,
  setDialogMode,
  isDialogOpen,
  setIsDialogOpen,
}: SupplierPaymentsSectionProps) => {
  const [selectedPayment, setSelectedPayment] =
    useState<SupplierPayment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mock data
  const [payments, setPayments] = useState<SupplierPayment[]>([
    {
      id: "1",
      paymentNumber: "#1234",
      postDate: "2025-05-25",
      status: "Processed",
      appliedAmount: "Invoice",
      amount: "1234.00",
    },
    {
      id: "2",
      paymentNumber: "#1235",
      postDate: "2025-05-25",
      status: "Processed",
      appliedAmount: "Invoice",
      amount: "1234.00",
    },
  ]);

  const methods = useForm<SupplierPaymentFormValues>({
    resolver: zodResolver(supplierPaymentSchema),
    defaultValues: {
      paymentNumber: "",
      postDate: "",
      status: "",
      appliedAmount: "",
      amount: 0,
    },
  });

  const { handleSubmit, watch, setValue, reset } = methods;
  const selectedStatus = watch("status");

  // Reset form when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      if (dialogMode === "add") {
        reset({
          paymentNumber: "",
          postDate: new Date().toISOString().split("T")[0],
          status: "",
          appliedAmount: "",
          amount: 0,
        });
      } else if (selectedPayment) {
        reset({
          paymentNumber: selectedPayment.paymentNumber,
          postDate: selectedPayment.postDate,
          status: selectedPayment.status,
          appliedAmount: selectedPayment.appliedAmount,
          // Remove '$' and parse float
          amount: parseFloat(selectedPayment.amount.replace(/[^0-9.]/g, "")),
        });
      }
    }
  }, [isDialogOpen, dialogMode, selectedPayment, reset]);

  const onEditClick = (payment: SupplierPayment) => {
    setSelectedPayment(payment);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const onDeleteClick = (payment: SupplierPayment) => {
    setSelectedPayment(payment);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit: SubmitHandler<SupplierPaymentFormValues> = (data) => {
    console.log("Payment Data:", data);
    if (dialogMode === "add") {
      // Add logic
    } else {
      // Edit logic
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete Payment:", selectedPayment?.id);
    setIsDeleteDialogOpen(false);
    setSelectedPayment(null);
  };

  const columns: TableColumn<SupplierPayment>[] = [
    {
      key: "paymentNumber",
      header: "Payment Number",
      width: "15%",
      sortable: true,
    },
    {
      key: "postDate",
      header: "Post Date",
      width: "15%",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Processed"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "appliedAmount",
      header: "Applied Amount",
      width: "20%",
    },
    {
      key: "amount",
      header: "Amount",
      width: "15%",
      align: "right",
      render: (row) => (
        <span>
          {row.amount.startsWith("$") ? row.amount : `$${row.amount}`}
        </span>
      ),
    },
    {
      key: "actions",
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
          data={payments}
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
        <DialogBody className="w-full h-auto sm:w-2xl lg:w-3xl p-4">
          <DialogHeader
            title={dialogMode === "add" ? "Add Payment" : "Edit Payment"}
            onClose={() => setIsDialogOpen(false)}
          />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <CommonTextInput
                  name="paymentNumber"
                  label="Payment Number"
                  placeholder="Enter payment number"
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Status
                  </label>
                  <DropDown
                    items={statusOptions}
                    selectedItem={
                      statusOptions.find((t) => t.id === selectedStatus) || null
                    }
                    onSelect={(item) => setValue("status", item.id)}
                    placeholder="Select"
                  />
                </div>
                <CommonTextInput
                  name="appliedAmount"
                  label="Applied To"
                  placeholder="e.g. Invoice #123"
                />
              </div>

              <div>
                <CommonNumberInput
                  name="amount"
                  label="Amount"
                  placeholder="0.00"
                  allowFloat
                  decimalPlaces={2}
                  required
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
        <DialogBody className="w-md p-6">
          <DialogHeader
            title="Delete Payment"
            onClose={() => setIsDeleteDialogOpen(false)}
          />
          <p className="text-gray-700">
            Are you sure you want to delete payment{" "}
            <b>{selectedPayment?.paymentNumber}</b>? This action cannot be
            undone.
          </p>
          <DialogFooter
            onCancel={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            leftTitle="Cancel"
            rightTitle="Delete"
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SupplierPaymentsSection;
