'use client';

import { ArrowLeft, Search } from 'lucide-react';
import CommonTextInput from '@/components/forms/CommonTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchQuery } from '@/store/slicers/serviceSlicer';

export default function ServiceHeader() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.service.searchQuery);

  return (
    <header className="w-full bg-white border border-gray-100 rounded-xl px-2.5 py-5 md:px-4 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <h1 className="text-xl font-semibold text-gray-900">
          What are you looking for?
        </h1>
      </div>

      <div className="w-full md:w-72 lg:w-80">
        <CommonTextInput
          type="text"
          placeholder="Search services..."
          name='search'
          label=''
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          icon={<Search className="h-4 w-4 text-gray-400" />}
        />
      </div>

    </header>
  );
}
