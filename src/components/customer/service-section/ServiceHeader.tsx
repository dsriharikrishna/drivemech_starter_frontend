// components/services/ServiceHeader.tsx
'use client';

import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onBack?: () => void;
  className?: string;
}

export default function ServiceHeader({ searchQuery, onSearchChange, onBack, className = '' }: Props) {
  return (
    <header className={`w-full ${className}`}>
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">What are you looking for?</h1>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <label htmlFor="service-search" className="sr-only">Search Services</label>
        <input
          id="service-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Services"
          aria-label="Search Services"
          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
    </header>
  );
}
