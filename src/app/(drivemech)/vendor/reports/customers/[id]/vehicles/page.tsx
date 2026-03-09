"use client";

import React from "react";

/* ---------------- TYPES ---------------- */

interface Vehicle {
    id: string;
    name: string;
    year: number;
    registrationNumber: string;
    fuelType: string;
    color: string;
    mileage: string;
    lastService: string;
    nextService: string;
}

/* ---------------- MOCK DATA ---------------- */

const mockVehicles: Vehicle[] = [
    {
        id: "1",
        name: "BMW X7",
        year: 2022,
        registrationNumber: "TS 09 FZ 1234",
        fuelType: "Petrol",
        color: "Pearl White",
        mileage: "45,678 km",
        lastService: "07 August 2025",
        nextService: "07 November 2025",
    },
    {
        id: "2",
        name: "BMW X7",
        year: 2022,
        registrationNumber: "TS 09 FZ 1234",
        fuelType: "Petrol",
        color: "Pearl White",
        mileage: "45,678 km",
        lastService: "07 August 2025",
        nextService: "07 November 2025",
    },
    {
        id: "3",
        name: "BMW X7",
        year: 2022,
        registrationNumber: "TS 09 FZ 1234",
        fuelType: "Petrol",
        color: "Pearl White",
        mileage: "45,678 km",
        lastService: "07 August 2025",
        nextService: "07 November 2025",
    },
];

const VehiclesPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVehicles.map((vehicle) => (
                <div
                    key={vehicle.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#1A1C21]"
                            >
                                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
                            </svg>
                            <h3 className="text-base font-bold text-[#1A1C21]">
                                {vehicle.name}
                            </h3>
                        </div>
                        <span className="px-3 py-1 bg-[#DCFCE7] text-[#15803D] rounded-lg text-xs font-bold">
                            {vehicle.year}
                        </span>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[13px] font-medium text-[#94A3B8] mb-2 text-nowrap">Registration Number</p>
                                <p className="text-sm font-bold text-[#1A1C21]">{vehicle.registrationNumber}</p>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-[#94A3B8] mb-2">Fuel Type</p>
                                <p className="text-sm font-bold text-[#1A1C21]">{vehicle.fuelType}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[13px] font-medium text-[#94A3B8] mb-2">Color</p>
                                <p className="text-sm font-bold text-[#1A1C21]">{vehicle.color}</p>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-[#94A3B8] mb-2">Milage</p>
                                <p className="text-sm font-bold text-[#1A1C21]">{vehicle.mileage}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[13px] font-medium text-[#94A3B8] mb-2">Last Service</p>
                                <p className="text-sm font-bold text-[#1A1C21]">{vehicle.lastService}</p>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-[#94A3B8] mb-2">Next Service</p>
                                <p className="text-sm font-bold text-[#EF4444]">{vehicle.nextService}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VehiclesPage;
