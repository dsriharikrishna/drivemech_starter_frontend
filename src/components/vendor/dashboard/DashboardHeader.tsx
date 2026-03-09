"use client";

import React from "react";
import { ArrowLeft, Search, Bell, Plus } from "lucide-react";
import Image from "next/image";

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 rounded-lg">
      <div className="flex items-center justify-between">
        {/* Left Section - Back Button and Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="relative max-w-md w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section - Notifications, Language, Add Button */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Language Selector */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              <Image
                src="/images/flags/uk.png"
                alt="English"
                width={20}
                height={20}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">Eng</span>
          </button>

          {/* Add Button */}
          <button className="p-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
            <Plus size={20} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
