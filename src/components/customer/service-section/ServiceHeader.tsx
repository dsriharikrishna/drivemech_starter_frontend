"use client";

import { useCallback } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSearchQuery } from "@/store/slices/customer/services/serviceSlice";

export default function ServiceHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.service.searchQuery
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  return (
    <header className="w-full bg-white border border-gray-100 rounded-xl px-3 py-4 md:px-4 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 border border-gray-200 transition-colors duration-150"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-gray-900">
          What are you looking for?
        </h1>
      </div>

      <div className="w-full md:w-80 lg:w-96">
        <CommonTextInput
          type="text"
          placeholder="Search services..."
          name="search"
          label=""
          value={searchQuery}
          onChange={handleSearchChange}
          icon={<Search className="h-4 w-4 text-gray-400" />}
        />
      </div>
    </header>
  );
}
