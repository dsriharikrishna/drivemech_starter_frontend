"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({
  items,
  className = "",
}: BreadcrumbsProps) {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-xs md:text-sm overflow-x-auto scrollbar-hide">
          {/* Home Icon */}
          <Link
            href="/spare-parts"
            className="flex items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors flex-shrink-0"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {items.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <Link
                href={item.href}
                className={`whitespace-nowrap hover:text-orange-500 transition-colors ${
                  index === items.length - 1
                    ? "text-gray-900 font-medium"
                    : "text-gray-600"
                } ${index === items.length - 1 ? "max-w-[200px] md:max-w-none truncate" : ""}`}
                title={item.name}
              >
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
