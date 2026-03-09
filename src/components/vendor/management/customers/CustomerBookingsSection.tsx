"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";

interface CustomerBookingsSectionProps {
  customerId: string;
  onEdit?: (booking: Booking) => void;
  onDelete?: (booking: Booking) => void;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  bookingDate: string;
  status: string;
  description: string;
  total: string;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: "1",
    bookingNumber: "50003",
    bookingDate: "10/05/25",
    status: "Open",
    description: "$520.00",
    total: "$520.00",
  },
  {
    id: "2",
    bookingNumber: "50003",
    bookingDate: "10/10/25",
    status: "Closed",
    description: "$520.00",
    total: "$520.00",
  },
];

const CustomerBookingsSection: React.FC<CustomerBookingsSectionProps> = ({
  customerId,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumn<Booking>[] = [
    {
      key: "bookingNumber",
      header: "Booking Number",
      render: (booking) => (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {booking.bookingNumber}
        </span>
      ),
    },
    {
      key: "bookingDate",
      header: "Booking Date",
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "total",
      header: "Total",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (booking) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit?.(booking)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Edit size={16} className="text-white" />
          </button>
          <button
            onClick={() => onDelete?.(booking)}
            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            title="Delete"
          >
            <Trash2 size={16} className="text-white" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {mockBookings.length > 0 ? (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
          <Table
            columns={columns}
            data={mockBookings}
            keyExtractor={(booking) => booking.id}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found for this customer</p>
        </div>
      )}
    </div>
  );
};

export default CustomerBookingsSection;
