"use client";

import React from "react";
import { useRouter } from "next/navigation";
import VendorFilterSection from "@/components/vendor/VendorFilterSection";
import CustomersTable from "@/components/vendor/management/customers/CustomersTable";
import { Customer } from "@/schemas/vendor/customer.schema";


/* ---------------- MOCK DATA ---------------- */

const mockCustomers: Customer[] = Array.from({ length: 10 }, (_, i) => ({
  id: `cust-${i + 1}`,
  sNo: String(i + 1).padStart(2, "0"),
  name: "John Doe",
  mobileNumber: "+91 70007 12345",
  location: "Hyderabad",
  customerType: "cash",
  email: "john.doe@example.com",
  vipCustomer: i % 3 === 0,
}));

/* ---------------- PAGE ---------------- */

const CustomerPage = () => {
  const router = useRouter();
  const handleRowClick = (customer: Customer) => {
    router.push(`/vendor/management/customers/${customer.id}`);
  };

  return (
    <div className="w-full bg-white">
      <div className="p-2 flex flex-col gap-4">
        {/* Filter Section */}
        <VendorFilterSection
          title="Customers"
          searchPlaceholder="Search customers..."
          onSearch={(v) => console.log("search:", v)}
          statusItems={[
            { id: "all", label: "All Types" },
            { id: "cash", label: "Cash" },
            { id: "credit", label: "Credit" },
            { id: "vip", label: "VIP" },
          ]}
          statusLabel="Type"
          timeItems={[
            { id: "all", label: "All time" },
            { id: "today", label: "Today" },
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" },
            { id: "year", label: "This Year" },
          ]}
          onExport={() => console.log("Export customers")}
        />

        {/* Table — max-height keeps it within viewport; overflow-y-auto scrolls inside */}
        <div
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-auto flex-1"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <CustomersTable
            customers={mockCustomers}
            onView={handleRowClick}
            onRowClick={handleRowClick}
            onEdit={(c) => router.push(`/vendor/management/customers/${c.id}`)}
            onAddVehicle={() => router.push("/vendor/management/customers/add-vehicle")}
            onMessage={(c) => {
              router.push(
                `/vendor/management/customers/send-email?name=${encodeURIComponent(c.name)}&email=${encodeURIComponent(c.email || "")}`
              );
            }}
            onInvoice={() => router.push("/vendor/management/customers/invoices")}
            onPayment={() => router.push("/vendor/management/customers/payments")}
            onQuote={(c) => router.push(`/vendor/management/customers/${c.id}/add-quote`)}
            onBooking={(c) => router.push(`/vendor/operations/create-booking`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;