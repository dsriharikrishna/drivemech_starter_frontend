"use client";

import React from "react";
import ModuleHeader from "@/components/vendor/ModuleHeader";
import Button from "@/components/ui/Button";
import ModalDropdown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";

const StockTakeSingleItemPage = () => {
  // Mock Data
  const mockOptions = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-full flex flex-col">
          {/* 2. Module Header (Black Bar) */}
          <div className="p-4 pb-0">
            <ModuleHeader
              title="Stock Take"
              breadcrumbs={[
                { label: "Stock Take", href: "/vendor/inventory/stock-take" },
                { label: "Stock Take - Single Item" },
              ]}
            />
          </div>

          {/* 3. Page Content */}
          <div className="p-4 space-y-8 flex-1">
            {/* Title Area */}
            <div className="bg-[#e0f1ff] px-6 py-3 rounded-md">
              <h2 className="font-semibold text-gray-800">
                Stock Take - Single Item
              </h2>
            </div>

            {/* Form Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl px-2">
              {/* Select Product */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Select Product
                </label>
                <ModalDropdown
                  items={mockOptions}
                  selectedItem={null}
                  onSelect={() => {}}
                  placeholder="Select"
                />
              </div>

              {/* Quantity Count */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Quantity Count
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Spacer to push footer down visually if needed, though flex-1 handles it */}
            <div className="h-32"></div>
          </div>

          {/* 4. Footer Actions */}
          <div className="p-4 border-t border-gray-200 flex justify-center gap-4 bg-white rounded-b-lg">
            <Button
              variant="outline"
              className="min-w-[120px] border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              Cancel
            </Button>
            <Button variant="primary" className="min-w-[120px]">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTakeSingleItemPage;
