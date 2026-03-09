"use client";

import React from "react";
import { DownloadSimple } from "phosphor-react";
import ModuleHeader from "@/components/vendor/ModuleHeader";
import StockTakeFilters from "@/components/vendor/inventory/stock-take/StockTakeFilters";
import StockTakeList from "@/components/vendor/inventory/stock-take/StockTakeList";
import Button from "@/components/ui/Button";
import Link from "next/link";

const StockTakePage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex-1 px-0 pb-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-full flex flex-col">
          {/* 2. Module Header (Black Bar) */}
          <div className="p-4 pb-0">
            <ModuleHeader
              title="Stock Take"
              breadcrumbs={[{ label: "Stock Take" }, { label: "Stock Take" }]}
            />
          </div>

          {/* 3. Page Content */}
          <div className="p-4 space-y-4 flex-1">
            {/* Title & Download Action */}
            <div className="bg-[#e0f1ff] px-6 py-3 rounded-md flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Stock Take</h2>
              <button className="flex items-center gap-2 text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-md text-sm transition-colors">
                <DownloadSimple size={18} />
                Download Report
              </button>
            </div>

            {/* Filters */}
            <StockTakeFilters />

            {/* Data List */}
            <StockTakeList />
          </div>

          {/* 4. Footer Actions */}
          <div className="p-4 border-t border-gray-200 flex justify-center gap-4 bg-white rounded-b-lg">
            <Button variant="danger" className="min-w-[120px]">
              Cancel
            </Button>
            <Button variant="success" className="min-w-[120px]">
              Save Draft
            </Button>
            <Link href="/vendor/inventory/stock-take/single-item">
              <Button variant="primary" className="min-w-[120px]">
                Process
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTakePage;
