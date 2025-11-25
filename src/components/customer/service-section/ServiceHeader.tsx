'use client';

import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import CommonTextInput from '@/components/forms/CommonTextInput';

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onBack?: () => void;
  className?: string;
}

export default function ServiceHeader({
  searchQuery,
  onSearchChange,
  onBack,
  className = '',
}: Props) {
  return (
    <header
      className={`w-full bg-white border border-gray-100 rounded-xl px-4 py-5 md:px-6 md:py-6 shadow-sm 
                  flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${className}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                     transition-colors shadow-sm border border-gray-200"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
          What are you looking for?
        </h1>
      </div>

      {/* Right Section — Search Input */}
      <div className="w-full md:w-72 lg:w-80">
        <CommonTextInput
          type="text"
          name="searchQuery"
          label=""
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search services..."
          aria-label="Search Services"
          icon={<Search className="h-4 w-4 text-gray-400" />}
          className="w-full"
        />
      </div>
    </header>
  );
}
