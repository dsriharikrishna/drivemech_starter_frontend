"use client";

import React from "react";
import EmployeeDetailsView from "@/components/vendor/management/employees/EmployeeDetailsView";
import { ArrowLeft } from "phosphor-react";
import Link from "next/link";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <div className="flex-1 px-4 pb-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/vendor/management/employees"
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Employee Details</h1>
        </div>

        <EmployeeDetailsView />
      </div>
    </div>
  );
}
