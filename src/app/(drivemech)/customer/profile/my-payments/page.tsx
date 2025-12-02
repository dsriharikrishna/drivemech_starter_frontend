"use client";

import { useState } from "react";

export default function PaymentsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = ["all", "services", "spares", "towing", "insurance"];

  const transactions = [
    {
      id: 1,
      title: "Periodic Maintenance - A to Z Garage",
      reg: "ABC-1234",
      icon: "🚗",
      date: "30 July 2025, 4:35 PM",
      method: "Card",
      amount: 149.0,
      status: "Completed",
      type: "services",
    },
    {
      id: 2,
      title: "Flatbed Tow Service",
      icon: "🚚",
      date: "28 July 2025, 2:45 PM",
      method: "Card",
      amount: 85.0,
      status: "Completed",
      type: "towing",
    },
    {
      id: 3,
      title: "Bosch Brake Pad Set (Qty: 2)",
      icon: "🛠️",
      date: "28 July 2025, 2:45 PM",
      method: "Card",
      amount: 118.0,
      status: "Completed",
      type: "spares",
    },
    {
      id: 4,
      title: "GEICO Comprehensive Plan",
      icon: "🛡️",
      date: "01 Aug 2024, 3:15 PM",
      method: "Card",
      amount: 249.0,
      status: "Completed",
      type: "insurance",
    },
    {
      id: 5,
      title: "Oil Change & Filter - QuickFix",
      icon: "🔧",
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
    <div className="bg-white p-6 rounded-xl shadow space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payments</h2>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ➕ Add Vehicle
        </button>
      </div>

      {/* TOTAL SPENT CARD */}
      <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-md space-y-1">
        <p className="text-lg font-medium">Total Spent</p>
        <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
        <p className="text-sm opacity-90">Transactions: {filteredPayments.length}</p>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-3 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-4 py-2 text-sm rounded-lg border transition
              ${
                activeFilter === filter
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* TRANSACTIONS LIST */}
      <div className="space-y-4">
        {filteredPayments.map((t) => (
          <div
            key={t.id}
            className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            {/* LEFT SECTION */}
            <div className="flex items-start gap-4">
              <div className="text-2xl">{t.icon}</div>

              <div>
                <p className="font-semibold">{t.title}</p>
                {t.reg && <p className="text-xs text-gray-500">{t.reg}</p>}

                <div className="grid grid-cols-2 gap-6 mt-3 text-sm">
                  <div>
                    <p className="text-gray-500">Date of Payment</p>
                    <p className="font-medium">{t.date}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium flex items-center gap-2">💳 {t.method}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col items-end">
              <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full mb-1">
                {t.status}
              </span>
              <span className="text-orange-500 font-semibold text-lg">
                ${t.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
