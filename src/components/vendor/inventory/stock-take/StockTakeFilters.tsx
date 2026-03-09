"use client";

import React from "react";
import { MagnifyingGlass } from "phosphor-react";
import Button from "@/components/ui/Button";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

const StockTakeFilters = () => {
  // Placeholder data for dropdowns
  const mockOptions = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
  ];

  return (
    <div className="bg-white p-4 border-b border-gray-200 space-y-4">
      {/* Top Row: Dropdowns and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Product Type */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1 block">
            Product Type
          </label>
          <ModalDropdown
            items={mockOptions}
            selectedItem={null}
            onSelect={() => {}}
            placeholder="Select"
          />
        </div>

        {/* Group */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1 block">
            Group
          </label>
          <ModalDropdown
            items={mockOptions}
            selectedItem={null}
            onSelect={() => {}}
            placeholder="Select"
          />
        </div>

        {/* Vendor Search */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1 block">
            Vendor
          </label>
          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1 block">
            Location
          </label>
          <ModalDropdown
            items={mockOptions}
            selectedItem={null}
            onSelect={() => {}}
            placeholder="Select"
          />
        </div>
      </div>

      {/* Middle Row: Range and Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        {/* Begin Item */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1 block">
            Begin Item
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300"></span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* End Item */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1 block">
            End Item
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300"></span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Hide Zero Parts */}
        <div className="flex flex-col mb-1">
          <label className="text-xs font-semibold text-gray-700 mb-2 block">
            Hide Zero Parts
          </label>
          <ToggleSwitch checked={false} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default StockTakeFilters;
