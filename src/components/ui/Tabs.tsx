"use client";

import { useState } from "react";

interface TabItem {
label: string;
value: string;
}

interface TabsProps {
tabs: TabItem[];
defaultValue?: string;
onChange?: (value: string) => void;
}

export default function Tabs({ tabs, defaultValue, onChange }: TabsProps) {
const [active, setActive] = useState(defaultValue || tabs[0].value);

const handleClick = (value: string) => {
setActive(value);
onChange?.(value);
};

return (
<div className="border-b border-gray-200">
    <div className="flex gap-8 px-1">
    {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
        <button
            key={tab.value}
            onClick={() => handleClick(tab.value)}
            className={`pb-3 pt-1 text-sm font-medium transition-all ${
            isActive
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
        >
            <div className="relative">
            {tab.label}
            {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
            )}
            </div>
        </button>
        );
    })}
    </div>
</div>
);
}
