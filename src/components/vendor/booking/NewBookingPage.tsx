"use client";

import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";
import Table, { type TableColumn } from "@/components/ui/Table";
import {
  bookingSchema,
  type Booking,
} from "@/lib/schemas/registration-booking";
import CommonTextArea from "@/components/forms/CommonTextArea";
import PhoneInput from "@/components/forms/PhoneInput";

// Mock customer data
const mockCustomer = {
  name: "John Doe",
  phone: "+61 123 456 789",
  email: "johndoe@example.com",
  street: "Street 31",
  state: "Abc State",
  country: "Xyz +4000 8",
};

// Mock vehicle data
const mockVehicles = [
  { id: "01", regno: "T809F-2027", make: "BMW", model: "X7" },
  { id: "02", regno: "T809F-2027", make: "BMW", model: "X7" },
  { id: "03", regno: "T809F-2027", make: "BMW", model: "X7" },
];

export default function NewBookingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"customer" | "workshop">(
    "customer"
  );
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof mockVehicles)[0] | null
  >(null);
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const [showVehicleSelection, setShowVehicleSelection] = useState(true);

  const methods = useForm<Booking>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      updateInsurance: false,
      jobCardItems: [
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
      ],
      freight: 0,
      salesTax: 0,
    },
  });

  const { handleSubmit, watch, setValue, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobCardItems",
  });

  const updateInsurance = watch("updateInsurance");
  const jobCardItems = watch("jobCardItems");

  // Calculate totals
  const calculateItemTotal = (
    quantity: number,
    unitPrice: number,
    tax: number
  ) => {
    const subtotal = quantity * unitPrice;
    return subtotal + tax;
  };

  const subTotal = jobCardItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const freight = watch("freight") || 0;
  const salesTaxRate = watch("salesTax") || 0;
  const salesTaxAmount = subTotal * salesTaxRate;
  const grandTotal = subTotal + freight + salesTaxAmount;

  const handleAddItem = () => {
    append({
      id: String(fields.length + 1),
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0,
    });
  };

  const onSubmit = (data: Booking) => {
    console.log("Booking Data:", data);
    // Navigate to success page
    router.push("/vendor/operations/booking-success");
  };

  const insuranceClaimOptions = [
    { id: "yes", name: "Yes" },
    { id: "no", name: "No" },
    { id: "decideLater", name: "Decide Later" },
  ];

  const insuranceProviderOptions = [
    { id: "provider1", name: "Insurance Provider 1" },
    { id: "provider2", name: "Insurance Provider 2" },
  ];

  return (
    <FormProvider {...methods}>
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-6xl mx-auto mt-3 flex flex-col gap-4"
        >
          {/* Customer Information Section */}
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DropDown
                  items={[
                    { id: "john-doe", name: "Customer : John Doe" },
                    { id: "jane-smith", name: "Customer : Jane Smith" },
                  ]}
                  selectedItem={{ id: "john-doe", name: "Customer : John Doe" }}
                  onSelect={(item) => console.log("Selected customer:", item)}
                  placeholder="Select Customer"
                />
                <button
                  type="button"
                  onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showCustomerInfo ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>

            {showCustomerInfo && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Customer Information
                  </h4>
                  <p className="text-gray-600">{mockCustomer.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Customer Contact
                  </h4>
                  <p className="text-gray-600 flex items-center gap-2">
                    <span>📞</span> {mockCustomer.phone}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <span>✉️</span> {mockCustomer.email}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Customer Address
                  </h4>
                  <p className="text-gray-600">{mockCustomer.street}</p>
                  <p className="text-gray-600">{mockCustomer.state}</p>
                  <p className="text-gray-600">{mockCustomer.country}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Bookings</h4>
                  <p className="text-gray-600">Reference</p>
                  <p className="text-gray-600">Enter Reference</p>
                  <p className="text-gray-600">Booking Date</p>
                  <p className="text-gray-600">Select</p>
                  <p className="text-gray-600">Description</p>
                </div>
              </div>
            )}
          </div>

          {/* Vehicle Selection Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">
                Select A Vehicle
              </h3>
              <button
                type="button"
                onClick={() => setShowVehicleSelection(!showVehicleSelection)}
                className="text-blue-600 hover:text-blue-700"
              >
                {showVehicleSelection ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>

            {showVehicleSelection && (
              <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
                <Table
                  columns={[
                    {
                      key: "id",
                      header: "S.No",
                      width: "80px",
                      render: (vehicle) => (
                        <span className="text-sm text-gray-700">{vehicle.id}</span>
                      ),
                    },
                    {
                      key: "regno",
                      header: "Reg.no",
                      render: (vehicle) => (
                        <span className="text-sm text-gray-700">{vehicle.regno}</span>
                      ),
                    },
                    {
                      key: "make",
                      header: "Make",
                      render: (vehicle) => (
                        <span className="text-sm text-gray-700">{vehicle.make}</span>
                      ),
                    },
                    {
                      key: "model",
                      header: "Model",
                      render: (vehicle) => (
                        <span className="text-sm text-gray-700">{vehicle.model}</span>
                      ),
                    },
                  ]}
                  data={mockVehicles}
                  keyExtractor={(vehicle) => vehicle.id}
                  striped={false}
                  hoverable
                  className="h-full"
                  style={{ height: "100%" }}
                  onRowClick={(vehicle: any) => setSelectedVehicle(vehicle)}
                />
              </div>
            )}
          </div>

          {/* Booking Form Section */}
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <CommonTextInput
                name="reference"
                label="Reference"
                placeholder="Enter reference"
              />
              <CommonTextInput
                name="customerOrderNumber"
                label="Customer Order Number"
                placeholder="Enter"
                required
              />
              <DatePicker
                label="Booking Date"
                value={watch("bookingDate") || null}
                onChange={(date) => setValue("bookingDate", date || new Date())}
                placeholder="Select"
                required
              />
              <DatePicker
                label="Due By"
                value={watch("dueBy") || null}
                onChange={(date) => setValue("dueBy", date || new Date())}
                placeholder="Select"
                required
              />
            </div>

            <div className="mb-4">
              <CommonTextArea
                name="description"
                label="Description"
                placeholder="Enter description"
                rows={4}
              />
            </div>

            {/* Update Insurance Toggle */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">
                Update Insurance Details
              </label>
              <button
                type="button"
                onClick={() => setValue("updateInsurance", !updateInsurance)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${updateInsurance ? "bg-blue-500" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${updateInsurance ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Insurance Details Section */}
          {updateInsurance && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Insurance Details
              </h3>

              <div className="space-y-4">
                {/* Insurance Claims Radio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Insurance Claims <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {insuranceClaimOptions.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option.id}
                          {...methods.register("insuranceClaims")}
                          className="w-4 h-4 text-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <DropDown
                      label="Insurance Provider Name"
                      items={insuranceProviderOptions}
                      selectedItem={
                        insuranceProviderOptions.find(
                          (p) => p.id === watch("insuranceProviderName")
                        ) || null
                      }
                      onSelect={(item) =>
                        setValue("insuranceProviderName", item.id)
                      }
                      placeholder="Select"
                    />
                  </div>
                  <CommonTextInput
                    name="policyExcess"
                    label="Policy Excess"
                    placeholder="Enter"
                  />
                  <DatePicker
                    label="Insurance Expiry Date"
                    value={watch("insuranceExpiryDate") || null}
                    onChange={(date) =>
                      setValue("insuranceExpiryDate", date || undefined)
                    }
                    placeholder="Select Expiry Date"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Job Card Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Job Card
            </h3>

            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
              <Table
                columns={[
                  {
                    key: "sno",
                    header: "S.No",
                    width: "60px",
                    render: (_, index) => (
                      <span className="text-sm text-gray-700">{index + 1}</span>
                    ),
                  },
                  {
                    key: "product",
                    header: "Product",
                    width: "150px",
                    render: (item: any, index: number) => (
                      <CommonTextInput
                        name={`jobCardItems.${index}.product`}
                        placeholder="Product"
                        compact
                      />
                    ),
                  },
                  {
                    key: "description",
                    header: "Description",
                    width: "250px",
                    render: (item: any, index: number) => (
                      <CommonTextArea
                        name={`jobCardItems.${index}.description`}
                        placeholder="Description"
                      />
                    ),
                  },
                  {
                    key: "quantity",
                    header: "Quantity",
                    width: "100px",
                    render: (item: any, index: number) => (
                      <CommonTextInput
                        name={`jobCardItems.${index}.quantity`}
                        type="number"
                        placeholder="1"
                        compact
                      />
                    ),
                  },
                  {
                    key: "unitPrice",
                    header: "Unit Price ($)",
                    width: "120px",
                    render: (item: any, index: number) => (
                      <CommonTextInput
                        name={`jobCardItems.${index}.unitPrice`}
                        type="number"
                        placeholder="0.00"
                        compact
                      />
                    ),
                  },
                  {
                    key: "tax",
                    header: "Tax (10%)",
                    width: "100px",
                    render: (item: any, index: number) => (
                      <CommonTextInput
                        name={`jobCardItems.${index}.tax`}
                        type="number"
                        placeholder="0.00"
                        compact
                      />
                    ),
                  },
                  {
                    key: "total",
                    header: "Total",
                    width: "100px",
                    render: (item: any, index: number) => (
                      <span className="text-sm text-gray-700">
                        {calculateItemTotal(
                          watch(`jobCardItems.${index}.quantity`) || 0,
                          watch(`jobCardItems.${index}.unitPrice`) || 0,
                          watch(`jobCardItems.${index}.tax`) || 0
                        ).toFixed(2)}
                      </span>
                    ),
                  },
                  {
                    key: "actions",
                    header: "Actions",
                    width: "80px",
                    render: (item: any, index: number) => (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
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

            <button
              type="button"
              onClick={handleAddItem}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
            >
              <span className="text-lg">+</span> Add
            </button>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Sub Total</span>
                  <span className="font-semibold">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Freight</span>
                  <span className="font-semibold">${freight.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Sales Tax (10%)</span>
                  <span className="font-semibold">
                    ${salesTaxAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold border-t pt-2">
                  <span className="text-red-500">Total</span>
                  <span className="text-red-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("customer")}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === "customer"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Customer Notes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("workshop")}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === "workshop"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Workshop Notes
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex gap-2 mb-3 text-gray-500">
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                A
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                📎
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                😊
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                🔗
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                📷
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                🎵
              </button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded">
                ✏️
              </button>
            </div>

            {/* Textarea */}
            <textarea
              {...methods.register(
                activeTab === "customer" ? "customerNotes" : "workshopNotes"
              )}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[120px]"
              placeholder="Body Text"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="min-w-[150px]"
            >
              Close
            </Button>
            <Button type="button" variant="secondary" className="min-w-[150px]">
              Save
            </Button>
            <Button type="submit" variant="primary" className="min-w-[150px]">
              Start Job
            </Button>
          </div>
        </form>
      </>
    </FormProvider>
  );
}
