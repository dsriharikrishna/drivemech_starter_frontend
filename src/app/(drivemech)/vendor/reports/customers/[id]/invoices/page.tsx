"use client";

import React, { useState } from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import { Download } from "lucide-react";

/* ---------------- TYPES ---------------- */

interface Invoice {
    id: string;
    invoiceNumber: string;
    date: string;
    vehicle: string;
    services: string;
    amount: number;
    payment: string;
    status: "Paid" | "Pending";
}

/* ---------------- MOCK DATA ---------------- */

const mockInvoices: Invoice[] = Array.from({ length: 6 }, (_, i) => ({
    id: `INV-${i + 1}`,
    invoiceNumber: `INV-2024-001`,
    date: "29 Aug 2025",
    vehicle: "BMW X7 (TS 09 FZ 1234)",
    services: "General Service, Oil Change, Brake Check",
    amount: 120,
    payment:
        i % 4 === 0 ? "Upi" : i % 4 === 1 ? "Cash" : i % 4 === 2 ? "Card" : "Upi",
    status: "Paid",
}));

const InvoicesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const invoiceColumns: TableColumn<Invoice>[] = [
        {
            key: "sno",
            header: "S.No",
            width: "80px",
            render: (_, index) => {
                const sno = (currentPage - 1) * 10 + index + 1;
                return String(sno).padStart(2, "0");
            },
        },
        {
            key: "invoiceNumber",
            header: "Invoice",
            render: (invoice) => invoice.invoiceNumber,
        },
        {
            key: "date",
            header: "Date",
            render: (invoice) => invoice.date,
        },
        {
            key: "vehicle",
            header: "Vehicle",
            render: (invoice) => (
                <span className="font-medium">{invoice.vehicle}</span>
            ),
        },
        {
            key: "services",
            header: "Services",
            render: (invoice) => (
                <span className="text-gray-600">{invoice.services}</span>
            ),
        },
        {
            key: "amount",
            header: "Amount",
            width: "120px",
            render: (invoice) => (
                <span className="text-green-600 font-medium">$ {invoice.amount}</span>
            ),
        },
        {
            key: "payment",
            header: "Payment",
            width: "100px",
            render: (invoice) => invoice.payment,
        },
        {
            key: "status",
            header: "Status",
            width: "100px",
            render: (invoice) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {invoice.status}
                </span>
            ),
        },
        {
            key: "actions",
            header: "Actions",
            width: "100px",
            align: "center",
            render: () => (
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <Download size={18} />
                </button>
            ),
        },
    ];

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
            height: "calc(100vh - 250px)"
        }}>
            <Table
                columns={invoiceColumns}
                data={mockInvoices}
                keyExtractor={(invoice) => invoice.id}
                pagination
                pageSize={10}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                hoverable
                striped={false}
                className="h-full"
                style={{ height: "100%" }}
            />
        </div>
    );
};

export default InvoicesPage;
