"use client";

import React, { useState } from "react";
import Table from "@/components/ui/Table";
import { Edit, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { EditIcon } from "@/components/icons/ManagementModuleIcons";

interface BookingItem {
    id: string;
    bookingNo: string;
    date: string;
    serviceType: string;
    status: "Confirmed" | "Pending" | "Completed";
}

const mockBookings: BookingItem[] = [
    { id: "1", bookingNo: "BK-7890", date: "20/02/2024", serviceType: "Full Service", status: "Confirmed" },
    { id: "2", bookingNo: "BK-7891", date: "25/02/2024", serviceType: "Wheel Alignment", status: "Pending" },
];

interface VehicleBookingsTableProps {
    onBookingClick?: (item: BookingItem) => void;
}

export default function VehicleBookingsTable({ onBookingClick }: VehicleBookingsTableProps) {
    const [data, setData] = useState(mockBookings);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed": return "text-green-600 bg-green-50";
            case "Pending": return "text-orange-600 bg-orange-50";
            default: return "text-gray-600 bg-gray-50";
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
            <Table
                columns={[
                    {
                        key: "bookingNo",
                        header: "Booking No",
                        width: "120px",
                    },
                    {
                        key: "date",
                        header: "Date",
                        width: "120px",
                    },
                    {
                        key: "serviceType",
                        header: "Service Type",
                    },
                    {
                        key: "status",
                        header: "Status",
                        width: "120px",
                        render: (item) => (
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                {item.status}
                            </span>
                        )
                    },
                    {
                        key: "actions",
                        header: "Actions",
                        width: "100px",
                        render: (item) => (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="icon-edit"
                                    size="sm"
                                    startIcon={<EditIcon size={24} className="bg-gray-500 p-1 rounded-md" />}
                                    onClick={() => onBookingClick?.(item)}
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
