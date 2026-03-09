"use client";

import React, { useState } from "react";
import Table from "@/components/ui/Table";
import { Edit, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface HistoryItem {
    id: string;
    date: string;
    description: string;
    odometer: string;
    workshop: string;
    amount: number;
}

const mockHistory: HistoryItem[] = [
    { id: "1", date: "15/01/2024", description: "Regular Service", odometer: "45,000 km", workshop: "DriveMech Downtown", amount: 250.00 },
    { id: "2", date: "10/11/2023", description: "Brake Pad Replacement", odometer: "42,500 km", workshop: "DriveMech Central", amount: 180.50 },
    { id: "3", date: "05/08/2023", description: "Oil Correction", odometer: "38,000 km", workshop: "DriveMech City", amount: 120.00 },
];

export default function VehicleHistoryTable() {
    const [data, setData] = useState(mockHistory);

    const handleDelete = (id: string) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
            <Table
                columns={[
                    {
                        key: "date",
                        header: "Date",
                        width: "120px",
                    },
                    {
                        key: "description",
                        header: "Description",
                    },
                    {
                        key: "odometer",
                        header: "Odometer",
                        width: "120px",
                    },
                    {
                        key: "workshop",
                        header: "Workshop",
                    },
                    {
                        key: "amount",
                        header: "Amount",
                        width: "100px",
                        render: (item) => `$${item.amount.toFixed(2)}`,
                    },
                    {
                        key: "actions",
                        header: "Actions",
                        width: "100px",
                        render: (item) => (
                            <div className="flex items-center gap-2">
                                <Button variant="icon-edit" size="sm" startIcon={<Edit size={16} />} />
                                <Button variant="icon-delete" size="sm" startIcon={<Trash2 size={16} />} onClick={() => handleDelete(item.id)} />
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
