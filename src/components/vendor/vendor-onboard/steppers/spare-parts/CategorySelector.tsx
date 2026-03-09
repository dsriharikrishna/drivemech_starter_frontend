"use client";

import React from "react";
import { Check, ChevronRight } from "lucide-react";
import { Category } from "./types";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onToggleCategory(category.id)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
              isSelected
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={isSelected ? "text-orange-500" : "text-gray-600"}>
                {category.icon}
              </div>
              <span
                className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-700"}`}
              >
                {category.name}
              </span>
            </div>
            {isSelected ? (
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            ) : (
              <ChevronRight size={18} className="text-gray-400" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelector;
