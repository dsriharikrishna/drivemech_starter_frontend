"use client";

import { useState, useCallback, useMemo } from "react";
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

  const filters = useMemo(
    () => ["all", "services", "spares", "towing", "insurance"],
    []
  );

  const transactions = useMemo(
    () => [
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
        iconComponent: (
          <Truck size={28} weight="duotone" className="text-gray-600" />
        ),
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
        iconComponent: (
          <ShieldCheck size={28} weight="duotone" className="text-gray-600" />
        ),
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
        iconComponent: (
          <Wrench size={28} weight="duotone" className="text-gray-600" />
        ),
        date: "15 Aug 2025, 10:00 AM",
        method: "Card",
        amount: 249.0,
        status: "Completed",
        type: "services",
      },
    ],
    []
  );

  const filteredPayments = useMemo(
    () =>
      activeFilter === "all"
        ? transactions
        : transactions.filter((t) => t.type === activeFilter),
    [activeFilter, transactions]
  );

  const totalSpent = useMemo(
    () => filteredPayments.reduce((sum, t) => sum + t.amount, 0),
    [filteredPayments]
  );

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div className="bg-white p-3 rounded-xl space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Payments</h2>

        <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs">
          <Plus size={16} weight="bold" />
          Add Payment Method
        </button>
      </div>

      {/* TOTAL SPENT CARD */}
      <div className="bg-primary-500 text-white p-4 rounded-2xl space-y-1">
        <p className="text-xs font-medium">Total Spent</p>
        <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
        <p className="text-[11px] opacity-90">
          Transactions: {filteredPayments.length}
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition whitespace-nowrap
              ${
                activeFilter === filter
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
      <div className="space-y-2.5">
        {filteredPayments.map((t) => (
          <div
            key={t.id}
            className="border border-gray-200 rounded-xl p-3 bg-white hover:shadow-sm transition"
          >
            {/* TOP SECTION - Title and Status */}
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                  {t.icon ? (
                    <Image
                      src={t.icon}
                      alt={t.title}
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  ) : (
                    t.iconComponent
                  )}
                </div>

                {/* Title and Reg */}
                <div>
                  <p className="font-semibold text-xs">{t.title}</p>
                  {t.reg && (
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      {t.reg}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <span className="text-green-600 text-[11px] font-medium bg-green-100 px-2 py-0.5 rounded-full">
                {t.status}
              </span>
            </div>

            {/* BOTTOM SECTION - Date, Payment Method, Amount */}
            <div className="grid grid-cols-2 gap-3">
              {/* Date of Payment */}
              <div>
                <p className="text-[11px] text-gray-500">Date of Payment</p>
                <p className="text-xs font-medium flex items-center gap-1 mt-0.5">
                  <Calendar size={12} className="text-gray-400" />
                  {t.date}
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-[11px] text-gray-500">Payment Method</p>
                <p className="text-xs font-medium flex items-center gap-1 mt-0.5">
                  <CreditCard size={12} className="text-gray-400" />
                  {t.method}
                </p>
              </div>
            </div>

            {/* Amount - Positioned at bottom right */}
            <div className="flex justify-end mt-2.5">
              <span className="text-primary-500 font-bold text-lg">
                ${t.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
