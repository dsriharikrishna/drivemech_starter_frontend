"use client";

import React, { useState } from "react";
import ServiceHistoryCard, {
    ServiceHistoryItem,
} from "@/components/vendor/reports/customers/ServiceHistoryCard";

/* ---------------- MOCK DATA ---------------- */

const mockServiceHistory: ServiceHistoryItem[] = Array.from(
    { length: 6 },
    (_, i) => ({
        id: `SVC-${i + 1}`,
        vehicleName:
            i % 2 === 0 ? "BMW X7 (TS 09 FZ 1234)" : "Maruti Swift (TS 09 EA 5678)",
        vehicleRegistration: i % 2 === 0 ? "TS 09 FZ 1234" : "TS 09 EA 5678",
        date: "07 Sep 2025",
        invoiceNumber: "INV - 2025 -001",
        paymentMethod: "UPI",
        services: ["General Service", "Oil Change", "Brake Check"],
        technician: "Suresh Babu",
        duration: "4 Hours",
        amount: 120,
        paymentStatus: i % 3 === 0 ? "UnPaid" : "Paid",
        serviceStatus: i % 4 === 0 ? "InProgress" : "Completed",
    })
);

const ServiceHistoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentServices = mockServiceHistory.slice(startIndex, endIndex);

    return (
        <div className="space-y-4">
            {currentServices.map((service) => (
                <ServiceHistoryCard
                    key={service.id}
                    service={service}
                    onDownloadInvoice={(id) => console.log("Download invoice:", id)}
                    onRemind={(id) => console.log("Remind:", id)}
                />
            ))}

            {/* Pagination Info */}
            <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-600">
                    Showing data {startIndex + 1} to{" "}
                    {Math.min(endIndex, mockServiceHistory.length)} of{" "}
                    {mockServiceHistory.length} entries
                </div>
                <div className="flex items-center gap-2">
                    {Array.from(
                        {
                            length: Math.min(5, Math.ceil(mockServiceHistory.length / 10)),
                        },
                        (_, i) => i + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceHistoryPage;
