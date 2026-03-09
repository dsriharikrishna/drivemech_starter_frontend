"use client";

import React, { useState } from "react";
import CollapsibleSection from "@/components/vendor/CollapsibleSection";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import { User, Package, Phone, Mail, MapPin, Trash2, Plus } from "lucide-react";

// Types
interface LineItem {
  id: string;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

interface SupplierInfo {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  fax: string;
  email: string;
}

const SupplierPartsOrderPage = () => {
  // State for collapsible sections (both are collapsible)
  const [supplierExpanded, setSupplierExpanded] = useState(true);
  const [partOrdersExpanded, setPartOrdersExpanded] = useState(true);

  // Mock supplier data
  const suppliers: SupplierInfo[] = [
    {
      id: "1",
      name: "John Doe",
      street: "Street 01",
      city: "Abc Road",
      state: "Hyd",
      zip: "500018",
      phone: "+31 70067 70067",
      fax: "040-123 456",
      email: "johndoe@example.com",
    },
  ];

  // State for supplier
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierInfo | null>(
    suppliers[0]
  );

  // State for order details
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // State for line items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      product: "Battery Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 10,
      tax: 1,
      total: 11,
    },
    {
      id: "2",
      product: "Roadworthy Inspection / Pink Slips",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 5,
      tax: 0.5,
      total: 5.5,
    },
  ]);

  // State for notes
  const [notes, setNotes] = useState("");

  // Calculations
  const subTotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const freight = 1.0;
  const salesTax = lineItems.reduce((sum, item) => sum + item.tax, 0);
  const grandTotal = subTotal + freight + salesTax;

  // Handlers
  const handleAddLineItem = () => {
    const newItem: LineItem = {
      id: String(lineItems.length + 1),
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleDeleteLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const handleLineItemChange = (
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Recalculate tax and total
          if (field === "quantity" || field === "unitPrice") {
            const quantity = Number(updatedItem.quantity);
            const unitPrice = Number(updatedItem.unitPrice);
            const subtotal = quantity * unitPrice;
            updatedItem.tax = subtotal * 0.1; // 10% tax
            updatedItem.total = subtotal + updatedItem.tax;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  const handleSave = () => {
    console.log("Save");
  };

  const handleProceed = () => {
    console.log("Proceed");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Dark Theme */}
      <div className="bg-gray-800 px-6 py-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={20} className="text-white" />
            <h1 className="text-lg font-semibold text-white">Suppliers</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>Suppliers</span>
            <span>›</span>
            <span className="text-white">Edit</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {/* Supplier Section - Collapsible */}
        <CollapsibleSection
          title="Supplier"
          icon={<User size={20} />}
          isExpanded={supplierExpanded}
          onToggle={() => setSupplierExpanded(!supplierExpanded)}
        >
          <div className="space-y-6">
            {/* Supplier Selector */}
            {/* <div>
              <DropDown
                items={suppliers.map((s) => ({ id: s.id, name: s.name }))}
                selectedItem={
                  selectedSupplier
                    ? { id: selectedSupplier.id, name: selectedSupplier.name }
                    : null
                }
                onSelect={(item) => {
                  const supplier = suppliers.find((s) => s.id === item.id);
                  if (supplier) setSelectedSupplier(supplier);
                }}
                placeholder="Select Supplier"
              />
            </div> */}

            {/* Customer Information Grid */}
            {selectedSupplier && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Customer Information */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Customer Information
                  </h3>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">
                      {selectedSupplier.name}
                    </p>
                    <p>{selectedSupplier.street}</p>
                    <p>{selectedSupplier.city}</p>
                    <p>
                      {selectedSupplier.state} - {selectedSupplier.zip}
                    </p>
                  </div>
                </div>

                {/* Customer Contact */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Customer Contact
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-blue-500" />
                      <span>{selectedSupplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-blue-500" />
                      <span>{selectedSupplier.fax}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-500" />
                      <span>{selectedSupplier.email}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Address */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Customer Address
                  </h3>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="mt-0.5 text-blue-500" />
                    <span>Street 1, ABD Colony, Hyd-18</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Part Orders Section - Collapsible */}
        <CollapsibleSection
          title="Part Orders"
          icon={<Package size={20} />}
          isExpanded={partOrdersExpanded}
          onToggle={() => setPartOrdersExpanded(!partOrdersExpanded)}
        >
          <div className="space-y-6">
            {/* Order Details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <CommonTextInput
                  name="orderNumber"
                  label="Order Number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter order number"
                  form={
                    { register: () => ({}), formState: { errors: {} } } as any
                  }
                />
              </div>
              <div>
                <DatePicker
                  label="Order Date"
                  placeholder="Select"
                  value={orderDate}
                  onChange={(date) => setOrderDate(date)}
                />
              </div>
              <div>
                <DatePicker
                  label="Due Date"
                  placeholder="Select"
                  value={dueDate}
                  onChange={(date) => setDueDate(date)}
                />
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 180px)" }}>
                <Table<LineItem>
                  columns={[
                    {
                      key: "sNo",
                      header: "S.No",
                      width: "80px",
                      render: (item, index) => (
                        <span className="text-sm text-gray-900">{index + 1}</span>
                      ),
                    },
                    {
                      key: "product",
                      header: "Product",
                      flex: 1,
                      render: (item) => (
                        <CommonTextInput
                          name={`product-${item.id}`}
                          value={item.product}
                          onChange={(e) =>
                            handleLineItemChange(
                              item.id,
                              "product",
                              e.target.value
                            )
                          }
                          placeholder="Product name"
                          compact
                          form={
                            {
                              register: () => ({}),
                              formState: { errors: {} },
                            } as any
                          }
                        />
                      ),
                    },
                    {
                      key: "description",
                      header: "Description",
                      flex: 2,
                      render: (item) => (
                        <CommonTextInput
                          name={`description-${item.id}`}
                          value={item.description}
                          onChange={(e) =>
                            handleLineItemChange(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                          compact
                          form={
                            {
                              register: () => ({}),
                              formState: { errors: {} },
                            } as any
                          }
                        />
                      ),
                    },
                    {
                      key: "quantity",
                      header: "Quantity",
                      width: "120px",
                      render: (item) => (
                        <CommonNumberInput
                          name={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) =>
                            handleLineItemChange(
                              item.id,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          min={1}
                          compact
                          form={
                            {
                              register: () => ({}),
                              formState: { errors: {} },
                              setValue: () => { },
                              watch: () => item.quantity,
                            } as any
                          }
                        />
                      ),
                    },
                    {
                      key: "unitPrice",
                      header: "Unit Price ($)",
                      width: "140px",
                      render: (item) => (
                        <CommonNumberInput
                          name={`unitPrice-${item.id}`}
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleLineItemChange(
                              item.id,
                              "unitPrice",
                              Number(e.target.value)
                            )
                          }
                          min={0}
                          allowFloat
                          decimalPlaces={2}
                          compact
                          form={
                            {
                              register: () => ({}),
                              formState: { errors: {} },
                              setValue: () => { },
                              watch: () => item.unitPrice,
                            } as any
                          }
                        />
                      ),
                    },
                    {
                      key: "tax",
                      header: "Tax (10%)",
                      width: "120px",
                      render: (item) => (
                        <span className="text-sm text-gray-900">
                          {item.tax.toFixed(2)}
                        </span>
                      ),
                    },
                    {
                      key: "total",
                      header: "Total",
                      width: "120px",
                      render: (item) => (
                        <span className="text-sm font-medium text-gray-900">
                          {item.total}
                        </span>
                      ),
                    },
                    {
                      key: "actions",
                      header: "Actions",
                      width: "100px",
                      render: (item) => (
                        <button
                          onClick={() => handleDeleteLineItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      ),
                    },
                  ]}
                  data={lineItems}
                  keyExtractor={(item) => item.id}
                  striped={false}
                  hoverable
                  className="h-full"
                  style={{ height: "100%" }}
                />
              </div>
            </div>

            {/* Add Button */}
            <div>
              <Button
                variant="primary-blue"
                size="sm"
                startIcon={<Plus size={16} />}
                onClick={handleAddLineItem}
              >
                Add
              </Button>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end">
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium text-gray-900">
                    ${subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Freight</span>
                  <span className="font-medium text-gray-900">
                    ${freight.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sales Tax (10%)</span>
                  <span className="font-medium text-gray-900">
                    ${salesTax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
                  <span className="text-red-600">Total</span>
                  <span className="text-red-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <CommonTextArea
                name="notes"
                label="Note"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Text Area"
                register={() => ({})}
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <Button variant="danger" size="md" onClick={handleCancel}>
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" size="md" onClick={handleSave}>
              Save
            </Button>
            <Button variant="success" size="md" onClick={handleProceed}>
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPartsOrderPage;
