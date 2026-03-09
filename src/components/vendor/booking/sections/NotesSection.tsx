"use client";

import React, { useState } from "react";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Tabs from "@/components/ui/Tabs";

const tabs = [
    { id: "customer", label: "Customer Notes" },
    { id: "workshop", label: "Workshop Notes" },
];

export default function NotesSection() {
    const [activeTab, setActiveTab] = useState("customer");

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-2">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    variant="default"
                />
            </div>

            <div className="px-6 pb-6">
                {activeTab === "customer" ? (
                    <RichTextEditor
                        name="customerNotes"
                        placeholder="Type customer notes here..."
                    />
                ) : (
                    <RichTextEditor
                        name="workshopNotes"
                        placeholder="Type workshop notes here..."
                    />
                )}
            </div>
        </div>
    );
}
