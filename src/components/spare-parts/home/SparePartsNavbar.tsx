"use client";

import { RefObject, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Plus } from "lucide-react";
import { SPARE_PARTS_CATEGORIES } from "@/constants/spare-parts.constants";
import { useAppSelector } from "@/store/store";
import useOutsideClick from "@/hooks/useOutsideClick";

const SparePartsNavbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "engine-oil"
  );
  const { cart } = useAppSelector((state) => state.spareParts);
  const itemCount = cart.itemCount;

  const handleNavigate = (href: string) => {
    setShowCategories(false);
    router.push(href);
  };

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref as RefObject<HTMLDivElement>, () =>
    setShowCategories(false)
  );

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 w-full">
      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4 py-3">
          {/* Shop by Categories Button - Left */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 px-2 md:px-3 py-2 text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="font-medium whitespace-nowrap text-sm hidden md:block">
                SHOP BY CATEGORIES
              </span>
            </button>

            {/* Categories Dropdown */}
            {showCategories && (
              <div
                ref={ref}
                className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] md:w-[550px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col md:flex-row overflow-hidden min-h-[400px]"
              >
                {/* Left Column - Main Categories */}
                <div className=" border-r border-gray-100 overflow-y-auto max-h-[500px] bg-gray-50/50">
                  {SPARE_PARTS_CATEGORIES.map((category) => (
                    <div
                      key={category.id}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${activeCategory === category.id
                          ? "bg-orange-500 text-white"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon
                          name={category.icon}
                          className={`w-5 h-5 ${activeCategory === category.id ? "text-white" : "text-gray-500"}`}
                        />
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </div>
                      {activeCategory === category.id && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Right Column - Subcategories */}
                <div className="bg-white p-6 overflow-y-auto max-h-[600px]">
                  {activeCategory ? (
                    <div className="h-full">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                        {
                          SPARE_PARTS_CATEGORIES.find(
                            (c) => c.id === activeCategory
                          )?.name
                        }
                      </h3>
                      <div className="grid grid-cols-1 gap-y-2">
                        {SPARE_PARTS_CATEGORIES.find(
                          (c) => c.id === activeCategory
                        )?.children?.map((child: any) => (
                          <button
                            key={child.name}
                            onClick={() => handleNavigate(child.href)}
                            className="text-sm text-gray-600 hover:text-orange-500 hover:underline py-1 block text-left w-full"
                          >
                            {child.name}
                          </button>
                        ))}
                        {!SPARE_PARTS_CATEGORIES.find(
                          (c) => c.id === activeCategory
                        )?.children && (
                            <p className="text-sm text-gray-400 col-span-2 italic">
                              Select specific items from the list to view details.
                            </p>
                          )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <p>Hover over a category to see options</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-xl mx-auto min-w-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm placeholder:text-gray-400"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons - Right */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <button className="flex items-center gap-2 px-2 md:px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors bg-gray-50 border border-gray-200 hover:bg-orange-50 rounded-md">
              <Plus className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap text-sm hidden lg:block">
                Add Vehicle
              </span>
            </button>
            <button
              onClick={() => router.push("/spare-parts/cart")}
              className="relative flex items-center gap-2 px-2 md:px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors bg-gray-50 border border-gray-200 hover:bg-orange-50 rounded-md"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 flex-shrink-0" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {itemCount} Items
              </span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-4 md:gap-6 py-2 md:py-3 border-t border-gray-100 overflow-x-auto scrollbar-hide">
          {SPARE_PARTS_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => router.push(category.href)}
              className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-600 hover:text-orange-500 transition-colors whitespace-nowrap group"
            >
              <CategoryIcon name={category.icon} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Category Icon Component
const CategoryIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const iconClass =
    className ||
    "w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors";

  switch (name) {
    case "truck":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      );
    case "motorcycle":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      );
    case "tire":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "rim":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" strokeWidth={2} />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v3m0 12v3m9-9h-3m-12 0H3"
          />
        </svg>
      );
    case "tools":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "car-accessories":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      );
    case "engine-oil":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      );
    case "filters":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      );
    case "brakes":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
          />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      );
  }
};

export default SparePartsNavbar;
