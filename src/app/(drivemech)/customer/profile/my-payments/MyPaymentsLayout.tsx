"use client";

import { useState } from "react";
import {
    Wrench,
    Car,
    Truck,
    ShieldCheck,
    CreditCard,
    Plus,
    Calendar,
} from "phosphor-react";
import Image from "next/image";

export default function MyPaymentsLayout() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filters = ["all", "services", "spares", "towing", "insurance"];

    const transactions = [
        {
            id: 1,
            title: "Periodic Maintenance - A to Z Garage",
            reg: "ABC-1234",
            icon: "/images/workshop/car.png",
            date: "30 July 2025, 4:35 PM",
            method: "Card",
            amount: 149.0,
            status: "Completed",
            type: "services",
        },
        {
            id: 2,
            title: "Flatbed Tow Service",
            icon: null,
            iconComponent: <Truck size={32} weight="duotone" className="text-gray-600" />,
            date: "28 July 2025, 2:45 PM",
            method: "Card",
            amount: 85.0,
            status: "Completed",
            type: "towing",
        },
        {
            id: 3,
            title: "Bosch Brake Pad Set (Qty: 2)",
            icon: "/images/orders/BreakPads.png",
            date: "28 July 2025, 2:45 PM",
            method: "Card",
            amount: 118.0,
            status: "Completed",
            type: "spares",
        },
        {
            id: 4,
            title: "GEICO Comprehensive Plan",
            icon: null,
            iconComponent: <ShieldCheck size={32} weight="duotone" className="text-gray-600" />,
            date: "01 Aug 2024, 3:15 PM",
            method: "Card",
            amount: 249.0,
            status: "Completed",
            type: "insurance",
        },
        {
            id: 5,
            title: "Oil Change & Filter - QuickFix",
            icon: null,
            iconComponent: <Wrench size={32} weight="duotone" className="text-gray-600" />,
            date: "15 Aug 2025, 10:00 AM",
            method: "Card",
            amount: 249.0,
            status: "Completed",
            type: "services",
        },
    ];

    const filteredPayments =
        activeFilter === "all"
            ? transactions
            : transactions.filter((t) => t.type === activeFilter);

    const totalSpent = filteredPayments.reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="bg-white p-4 rounded-xl space-y-5">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Payments</h2>

                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                    <Plus size={18} weight="bold" />
                    Add Vehicle
                </button>
            </div>

            {/* TOTAL SPENT CARD */}
            <div className="bg-primary-500 text-white p-5 rounded-2xl space-y-1">
                <p className="text-sm font-medium">Total Spent</p>
                <p className="text-4xl font-bold">${totalSpent.toFixed(2)}</p>
                <p className="text-xs opacity-90">Transactions: {filteredPayments.length}</p>
            </div>

            {/* FILTER TABS */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 text-xs font-medium rounded-lg transition whitespace-nowrap
              ${activeFilter === filter
                                ? "bg-primary-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
            `}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            {/* TRANSACTIONS LIST */}
            <div className="space-y-3">
                {filteredPayments.map((t) => (
                    <div
                        key={t.id}
                        className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition"
                    >
                        {/* TOP SECTION - Title and Status */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {t.icon ? (
                                        <Image
                                            src={t.icon}
                                            alt={t.title}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    ) : (
                                        t.iconComponent
                                    )}
                                </div>

                                {/* Title and Reg */}
                                <div>
                                    <p className="font-semibold text-sm">{t.title}</p>
                                    {t.reg && (
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                            {t.reg}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Status Badge */}
                            <span className="text-green-600 text-xs font-medium bg-green-100 px-3 py-1 rounded-full">
                                {t.status}
                            </span>
                        </div>

                        {/* BOTTOM SECTION - Date, Payment Method, Amount */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Date of Payment */}
                            <div>
                                <p className="text-xs text-gray-500">Date of Payment</p>
                                <p className="text-sm font-medium flex items-center gap-1.5 mt-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    {t.date}
                                </p>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <p className="text-xs text-gray-500">Payment Method</p>
                                <p className="text-sm font-medium flex items-center gap-1.5 mt-1">
                                    <CreditCard size={14} className="text-gray-400" />
                                    {t.method}
                                </p>
                            </div>
                        </div>

                        {/* Amount - Positioned at bottom right */}
                        <div className="flex justify-end mt-3">
                            <span className="text-primary-500 font-bold text-xl">
                                ${t.amount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
