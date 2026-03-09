"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import ActionDropdown from "@/components/ui/ActionDropdown";
import ProductsTable from "@/components/vendor/inventory/inventory/ProductsTable";
import { Product } from "@/schemas/vendor/product.schema";
import { AddCircleIcon, ImportIcon } from "@/components/icons/ManagementModuleIcons";
import { DownloadIcon } from "@/components/icons/TransactionIcons";
import { FileSpreadsheet, FileText } from "lucide-react";
import VendorFilterSection from "@/components/vendor/VendorFilterSection";

/* ── Mock Data ── */
const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: `prod-${i + 1}`,
  itemCode: `BK0${i + 1}`,
  name: "Brake Pads",
  brand: "ABC",
  retailPrice: 100.0,
  storePrice: 50.0,
  inStock: 10,
  warranty: "1 Year",
}));

/* ── Page ── */
const InventoryListPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-white">
      <div className="p-2 flex flex-col gap-4 border border-gray-200 rounded-xl">
        <div className="flex flex-col gap-2 border border-gray-200 rounded-xl">

          {/* Header */}
          <VendorFilterSection
            title="Inventory"
            searchPlaceholder="Search products..."
            onSearch={setSearchQuery}
            onAdd={() => router.push("/vendor/inventory/inventory/add-product")}
            onExport={() => console.log("Export")}
          />
          {/* Table */}
          <div className="p-2 ">
            <ProductsTable
              products={filteredProducts}
              onRowClick={(product) => router.push(`/vendor/inventory/inventory/${product.id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryListPage;

/* Re-export DialogMode so ProductsTable can still import it */
export type DialogMode = "add" | "edit";
