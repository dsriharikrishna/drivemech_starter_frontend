"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileSpreadsheet, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import ActionDropdown from "@/components/ui/ActionDropdown";
import Table, { TableColumn } from "@/components/ui/Table";
import { Supplier } from "@/schemas/vendor/supplier.schema";
import { AddCircleIcon, ImportIcon } from "@/components/icons/ManagementModuleIcons";
import { DownloadIcon } from "@/components/icons/TransactionIcons";
import VendorFilterSection from "@/components/vendor/VendorFilterSection";

/* ── Mock Data ── */
const mockSuppliers: Supplier[] = [
  { id: "1", name: "Chopra, Rana and Bharadwaj", city: "Bhilwara", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "2", name: "Kapoor-Iyengar", city: "Firozabad", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "3", name: "Sample Corporation", city: "New Delhi", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "4", name: "Sundry Supplier", city: "Hyderabad", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "5", name: "Jagan", city: "Kadapa", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "6", name: "Anji Reddy", city: "Guntur", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "7", name: "Chopra, Rana and Bharadwaj", city: "Bhilwara", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "8", name: "Kapoor-Iyengar", city: "Firozabad", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "9", name: "Sample Corporation", city: "New Delhi", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "10", name: "Sundry Supplier", city: "Hyderabad", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "11", name: "Jagan", city: "Kadapa", phone: "+91 70007 70007", website: "www.website.com" },
  { id: "12", name: "Anji Reddy", city: "Guntur", phone: "+91 70007 70007", website: "www.website.com" },
];

/* ── Page ── */
const SuppliersListPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockSuppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery)
  );

  const columns: TableColumn<Supplier>[] = [
    { key: "name", header: "Supplier", width: "30%", sortable: true },
    { key: "city", header: "City", width: "20%", sortable: true },
    { key: "phone", header: "Phone Number", width: "25%" },
    { key: "website", header: "Website", width: "25%" },
  ];

  return (
    <div className="h-full w-full bg-white">
      <div className="p-2 flex flex-col gap-4 border border-gray-200 rounded-xl">
        <div className="flex flex-col gap-2 border border-gray-200 rounded-xl">

          {/* Header */}
          <VendorFilterSection
            title="Suppliers"
            searchPlaceholder="Search suppliers..."
            onSearch={setSearchQuery}
            onAdd={() => router.push("/vendor/inventory/suppliers/add-supplier")}
            onExport={() => console.log("Export")}
          />

          {/* Table */}
          <div className="border border-gray-200 rounded-b-xl overflow-hidden" style={{
            height: "calc(100vh - 180px)"
          }}>
            <Table
              columns={columns}
              data={filtered}
              keyExtractor={(s) => s.id}
              pagination
              pageSize={10}
              hoverable
              striped={false}
              onRowClick={(supplier) => router.push(`/vendor/inventory/suppliers/${supplier.id}`)}
              className="h-full"
              style={{ height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersListPage;
