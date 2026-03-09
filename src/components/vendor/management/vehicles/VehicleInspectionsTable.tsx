"use client";

import React, { useState } from "react";
import Table from "@/components/ui/Table";
import { Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import { EditIcon } from "@/components/icons/ManageWorkshopIcons";

interface InspectionItem {
    id: string;
    inspectionNo: string;
    date: string;
    technician: string;
    result: "Passed" | "Failed" | "In-Progress";
}

const mockInspections: InspectionItem[] = [
    { id: "1", inspectionNo: "INSP-101", date: "12/01/2024", technician: "Mike Chen", result: "Passed" },
    { id: "2", inspectionNo: "INSP-102", date: "05/02/2024", technician: "John Smith", result: "In-Progress" },
];

interface VehicleInspectionsTableProps {
    onInspectionClick?: (item: InspectionItem) => void;
}

export default function VehicleInspectionsTable({ onInspectionClick }: VehicleInspectionsTableProps) {
    const [data, setData] = useState(mockInspections);

    const getResultBadge = (result: string) => {
        switch (result) {
            case "Passed": return <span className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle size={14} /> Passed</span>;
            case "In-Progress": return <span className="flex items-center gap-1 text-blue-600 font-medium"><Clock size={14} /> In-Progress</span>;
            default: return <span className="text-red-600 font-medium">Failed</span>;
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
            <Table
                columns={[
                    {
                        key: "inspectionNo",
                        header: "Inspection No",
                        width: "140px",
                    },
                    {
                        key: "date",
                        header: "Date",
                        width: "120px",
                    },
                    {
                        key: "technician",
                        header: "Technician",
                    },
                    {
                        key: "result",
                        header: "Result",
                        width: "140px",
                        render: (item) => getResultBadge(item.result)
                    },
                    {
                        key: "actions",
                        header: "Actions",
                        width: "120px",
                        render: (item) => (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="icon-edit"
                                    size="sm"
                                    startIcon={<EditIcon size={24} className="text-gray-500 bg-gray-200 p-1 rounded-md" />}
                                    onClick={() => onInspectionClick?.(item)}
                                    title="Edit"
                                />
                            </div>
                        ),
                    },
                ]}
                data={data}
                keyExtractor={(item) => item.id}
                hoverable
                striped={false}
                className="h-full"
                style={{ height: "100%" }}
            />
        </div>
    );
}
