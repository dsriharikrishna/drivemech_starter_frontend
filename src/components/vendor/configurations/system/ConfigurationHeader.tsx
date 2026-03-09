import Button from "@/components/ui/Button";
import { Plus, Search } from "lucide-react";
import React from "react";

export interface ConfigurationHeaderProps {
  title?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsModalOpen: (open: boolean | any) => void;
}

const ConfigurationHeader = ({
  title,
  searchQuery,
  setSearchQuery,
  setIsModalOpen,
}: ConfigurationHeaderProps) => {
  return (
    <div className="bg-[#E7F0FF] rounded-xl p-4 border border-[#D1E0FF]">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {title && (
          <h2 className="text-gray-800 font-semibold text-lg shrink-0">{title}</h2>
        )}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 lg:justify-end">
          <div className="relative w-full sm:max-w-sm">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
          </div>
          <Button
            variant="primary-blue"
            startIcon={<Plus size={16} className="rounded-full bg-white text-blue-600 font-semibold" />}
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg h-[36px] text-sm font-medium w-full sm:w-auto shrink-0"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationHeader;
