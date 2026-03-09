"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DatePicker from "@/components/ui/DatePicker";
import SupplierInfoDisplay from "./SupplierInfoDisplay";
import LineItemsTable from "./LineItemsTable";
import Table, { TableColumn } from "@/components/ui/Table";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import Button from "@/components/ui/Button";
import {
  supplierPartOrderFormSchema,
  type SupplierPartOrderFormValues,
  type CustomerInfo,
  type SupplierPartOrder,
} from "@/schemas/vendor/supplier.schema";

interface SupplierPartOrdersSectionProps {
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

const SupplierPartOrdersSection = ({
  dialogMode,
  setDialogMode,
  isDialogOpen,
  setIsDialogOpen,
}: SupplierPartOrdersSectionProps) => {
  const [selectedOrder, setSelectedOrder] = useState<SupplierPartOrder | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mock Data for the table
  const [partOrders, setPartOrders] = useState<SupplierPartOrder[]>([
    {
      id: "1",
      orderNo: "PO-001",
      date: "2024-01-15",
      dueDate: "2024-01-20",
      comment: "Urgent order",
      status: "Open",
      amount: "1500.00",
    },
    {
      id: "2",
      orderNo: "PO-002",
      date: "2024-01-18",
      dueDate: "2024-01-25",
      comment: "Regular stock",
      status: "Received",
      amount: "3200.50",
    },
  ]);

  const methods = useForm<SupplierPartOrderFormValues>({
    resolver: zodResolver(supplierPartOrderFormSchema),
    defaultValues: {
      orderNumber: "",
      orderDate: new Date().toISOString().split("T")[0],
      dueDate: new Date().toISOString().split("T")[0],
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

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isDialogOpen) {
      if (dialogMode === "add") {
        reset({
          orderNumber: "",
          orderDate: new Date().toISOString().split("T")[0],
          dueDate: new Date().toISOString().split("T")[0],
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
      } else if (selectedOrder) {
        // In a real app, you would fetch the full order details including line items
        // For now, we'll just pre-fill what we have from the table data
        reset({
          orderNumber: selectedOrder.orderNo,
          orderDate: selectedOrder.date,
          dueDate: selectedOrder.dueDate,
          note: selectedOrder.comment,
          lineItems: [
            {
              id: "item-1",
              product: "Sample Product",
              description: "Sample Description",
              quantity: 1,
              unitPrice: parseFloat(selectedOrder.amount),
              tax: 0,
              total: parseFloat(selectedOrder.amount),
            },
          ],
          subTotal: parseFloat(selectedOrder.amount),
          freight: 0,
          salesTax: 0,
          total: parseFloat(selectedOrder.amount),
        });
      }
    }
  }, [isDialogOpen, dialogMode, selectedOrder, reset]);

  const onEditClick = (order: SupplierPartOrder) => {
    setSelectedOrder(order);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const onDeleteClick = (order: SupplierPartOrder) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = (data: SupplierPartOrderFormValues) => {
    console.log("Part Order Data:", data);
    if (dialogMode === "add") {
      // Add logic
    } else {
      // Edit logic
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete Order:", selectedOrder?.id);
    // Delete logic
    setIsDeleteDialogOpen(false);
    setSelectedOrder(null);
  };

  const columns: TableColumn<SupplierPartOrder>[] = [
    {
      key: "orderNo",
      header: "Order No",
      width: "15%",
      sortable: true,
    },
    {
      key: "date",
      header: "Date",
      width: "15%",
      sortable: true,
    },
    {
      key: "dueDate",
      header: "Due Date",
      width: "15%",
      sortable: true,
    },
    {
      key: "comment",
      header: "Comment",
      width: "25%",
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Received"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
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
          data={partOrders}
          keyExtractor={(item) => item.id}
          pagination
          pageSize={10}
          striped={false}
          hoverable
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* Add/Edit Dialog */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogBody className="w-full sm:w-2xl lg:w-3xl p-4">
          <DialogHeader
            title={dialogMode === "add" ? "Add Part Order" : "Edit Part Order"}
            onClose={() => setIsDialogOpen(false)}
          />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Customer Information Display */}
              <SupplierInfoDisplay customerInfo={mockCustomerInfo} />

              {/* Part Orders Form Fields */}
              <div className="grid grid-cols-3 gap-4">
                <CommonTextInput
                  name="orderNumber"
                  label="Order Number"
                  placeholder=""
                  required
                />
                <div>
                  <DatePicker
                    label="Order Date"
                    value={
                      watch("orderDate") ? new Date(watch("orderDate")) : null
                    }
                    onChange={(date) =>
                      setValue(
                        "orderDate",
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    placeholder="Select"
                  />
                </div>
                <div>
                  <DatePicker
                    label="Due Date"
                    value={watch("dueDate") ? new Date(watch("dueDate")) : null}
                    onChange={(date) =>
                      setValue(
                        "dueDate",
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    placeholder="Select"
                  />
                </div>
              </div>

              {/* Line Items Table */}
              <LineItemsTable name="lineItems" />

              {/* Calculations */}
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

              {/* Note */}
              <div>
                <CommonTextArea
                  name="note"
                  label="Note"
                  placeholder="Text Area"
                  rows={3}
                />
              </div>
            </form>
          </FormProvider>
          <DialogFooter
            onCancel={() => setIsDialogOpen(false)}
            onConfirm={handleSubmit(onSubmit)}
            leftTitle="Cancel"
            rightTitle={dialogMode === "add" ? "Save" : "Update"}
          />
        </DialogBody>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogHeader
          title="Delete Part Order"
          onClose={() => setIsDeleteDialogOpen(false)}
        />
        <DialogBody className="w-md p-6">
          <p className="text-gray-700">
            Are you sure you want to delete order{" "}
            <b>{selectedOrder?.orderNo}</b>? This action cannot be undone.
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

export default SupplierPartOrdersSection;
