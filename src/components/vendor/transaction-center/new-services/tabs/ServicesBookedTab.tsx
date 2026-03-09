"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import { ServiceItemFormValues } from "@/schemas/vendor/transaction.schema";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import Button from "@/components/ui/Button";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import OrderTotalsSummary from "@/components/vendor/OrderTotalsSummary";

// Consolidated data interface
interface ServicesBookedData {
  serviceItems: ServiceItemFormValues[];
  totals: {
    subTotal: number;
    freight: number;
    salesTax: number;
    total: number;
  };
  assignment: {
    employeeOptions: Array<{ id: string; name: string; description?: string }>;
    assignedEmployee: string;
    estimatedDate: string;
    estimatedTime: string;
  };
  errors?: {
    assignedEmployee?: { message?: string };
    estimatedDate?: { message?: string };
    estimatedTime?: { message?: string };
  };
}

// Consolidated actions interface
interface ServicesBookedActions {
  onEmployeeChange: (employeeId: string) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onDecline: () => void;
  onAssignAndStart: () => void;
  onAddItem: (item: ServiceItemFormValues) => void;
  onUpdateItem: (index: number, item: ServiceItemFormValues) => void;
  onDeleteItem: (index: number) => void;
}

interface ServicesBookedTabProps {
  data: ServicesBookedData;
  actions: ServicesBookedActions;
  isJobAssigned?: boolean;
}

// Inline editable cell component
interface EditableCellProps {
  value: string | number;
  type?: "text" | "number";
  fieldName: string;
  onSave: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  allowFloat?: boolean;
  readOnly?: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  type = "text",
  fieldName,
  onSave,
  min,
  max,
  step,
  allowFloat = false,
  readOnly = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const methods = useForm({
    defaultValues: {
      [fieldName]: value,
    },
  });

  const { handleSubmit, watch, reset } = methods;

  const handleSave = (data: any) => {
    const newValue = data[fieldName];
    if (newValue !== value) {
      onSave(newValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(handleSave)();
    } else if (e.key === "Escape") {
      reset({ [fieldName]: value });
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSubmit(handleSave)();
  };

  React.useEffect(() => {
    reset({ [fieldName]: value });
  }, [value, fieldName, reset]);

  if (isEditing && !readOnly) {
    return (
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        <FormProvider {...methods}>
          {type === "number" ? (
            <CommonNumberInput
              name={fieldName}
              compact
              min={min}
              max={max}
              step={step}
              allowFloat={allowFloat}
              decimalPlaces={2}
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          ) : (
            <CommonTextInput
              name={fieldName}
              compact
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          )}
        </FormProvider>
      </div>
    );
  }

  return (
    <div
      onClick={() => !readOnly && setIsEditing(true)}
      className={`px-2 py-1 rounded transition-all border ${readOnly
        ? "border-transparent bg-transparent cursor-default"
        : "cursor-pointer hover:bg-blue-50 hover:border-blue-300 border-gray-300 bg-gray-50"
        }`}
      title={readOnly ? "" : "Click to edit"}
    >
      {type === "number" && typeof value === "number"
        ? allowFloat
          ? value.toFixed(2)
          : value
        : value}
    </div>
  );
};

const ServicesBookedTab: React.FC<ServicesBookedTabProps> = ({
  data,
  actions,
  isJobAssigned = false,
}) => {
  const handleUpdateField = (
    index: number,
    field: keyof ServiceItemFormValues,
    value: string | number
  ) => {
    const item = data.serviceItems[index];
    const updatedItem = { ...item, [field]: value };

    // Recalculate total if quantity, unitPrice, or tax changes
    if (field === "quantity" || field === "unitPrice" || field === "tax") {
      const quantity = field === "quantity" ? (value as number) : item.quantity;
      const unitPrice =
        field === "unitPrice" ? (value as number) : item.unitPrice;
      const tax = field === "tax" ? (value as number) : item.tax;
      updatedItem.total = quantity * unitPrice + quantity * tax;
    }

    actions.onUpdateItem(index, updatedItem);
  };

  const columns: TableColumn<ServiceItemFormValues>[] = [
    {
      key: "product",
      header: "Product",
      render: (item, index) => (
        <EditableCell
          value={item.product}
          fieldName={`product-${index}`}
          // readOnly={isJobAssigned}
          onSave={(value) =>
            handleUpdateField(index!, "product", value as string)
          }
        />
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (item, index) => (
        <EditableCell
          value={item.description || "-"}
          fieldName={`description-${index}`}
          // readOnly={isJobAssigned}
          onSave={(value) =>
            handleUpdateField(index!, "description", value as string)
          }
        />
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (item, index) => (
        <EditableCell
          value={item.quantity}
          type="number"
          fieldName={`quantity-${index}`}
          min={1}
          step={1}
          // readOnly={isJobAssigned}
          onSave={(value) =>
            handleUpdateField(index!, "quantity", value as number)
          }
        />
      ),
    },
    {
      key: "unitPrice",
      header: "Unit Price",
      render: (item, index) => (
        <EditableCell
          value={item.unitPrice}
          type="number"
          fieldName={`unitPrice-${index}`}
          min={0}
          step={0.01}
          allowFloat
          // readOnly={isJobAssigned}
          onSave={(value) =>
            handleUpdateField(index!, "unitPrice", value as number)
          }
        />
      ),
    },
    {
      key: "tax",
      header: "Tax",
      render: (item, index) => (
        <EditableCell
          value={item.tax}
          type="number"
          fieldName={`tax-${index}`}
          min={0}
          step={0.01}
          allowFloat
          // readOnly={isJobAssigned}
          onSave={(value) => handleUpdateField(index!, "tax", value as number)}
        />
      ),
    },
    {
      key: "total",
      header: "Total",
      render: (item) => <span>${item.total.toFixed(2)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (item, index) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => actions.onDeleteItem(index!)}
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete item"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  // const filteredColumns = isJobAssigned
  //   ? columns.filter(col => col.key !== 'actions')
  //   : columns;

  const filteredColumns = columns;

  return (
    <div className="mt-0">
      {/* Service Items Table */}
      <div className="mb-2">
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
        // style={{ height: "calc(100vh - 250px)" }}
        >
          <Table
            columns={filteredColumns}
            data={data.serviceItems}
            keyExtractor={(item, index) => `service-item-${index}`}
            striped={false}
            hoverable
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>

        {/* Quick Add Row Button */}
        {!isJobAssigned && (
          <div className="mt-2">
            <Button
              onClick={() => {
                const emptyItem: ServiceItemFormValues = {
                  id: `temp-${Date.now()}`,
                  product: "",
                  description: "",
                  quantity: 1,
                  unitPrice: 0,
                  tax: 0,
                  total: 0,
                };
                actions.onAddItem(emptyItem);
              }}
              startIcon={<Plus className="w-4 h-4" />}
              size="sm"
              variant="primary-blue"
            >
              Add Row
            </Button>
          </div>
        )}
      </div>

      {/* Totals Section */}
      <OrderTotalsSummary
        subTotal={data.totals.subTotal}
        freight={data.totals.freight}
        salesTax={data.totals.salesTax}
        total={data.totals.total}
        taxLabel="Sales Tax"
      />

      {/* Assignment Section - Only show before job is assigned */}
      {!isJobAssigned && (
        <>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <DropDown
              label="Assign to Employee"
              items={data.assignment.employeeOptions}
              selectedItem={
                data.assignment.employeeOptions.find(
                  (e) => e.id === data.assignment.assignedEmployee
                ) || null
              }
              onSelect={(item) => actions.onEmployeeChange(item.id)}
              placeholder="Select Employee"
              error={data.errors?.assignedEmployee?.message}
            />
            <div>
              <DatePicker
                label="Estimated Date"
                value={
                  data.assignment.estimatedDate
                    ? new Date(data.assignment.estimatedDate)
                    : null
                }
                onChange={(date) =>
                  actions.onDateChange(date?.toISOString() || "")
                }
                placeholder="Select Date"
                required
              />
              {data.errors?.estimatedDate && (
                <p className="text-sm text-red-500 mt-1">
                  {data.errors.estimatedDate.message}
                </p>
              )}
            </div>
            <div className="overflow-visible">
              <TimePicker
                label="Estimated Time"
                value={data.assignment.estimatedTime}
                onChange={actions.onTimeChange}
                placeholder="Select Time"
                required
              />
              {data.errors?.estimatedTime && (
                <p className="text-sm text-red-500 mt-1">
                  {data.errors.estimatedTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              type="button"
              onClick={actions.onDecline}
              endIcon={<Trash2 />}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Decline
            </Button>
            <Button
              type="button"
              onClick={actions.onAssignAndStart}
              endIcon={<Plus />}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Assign & Start Job
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesBookedTab;
