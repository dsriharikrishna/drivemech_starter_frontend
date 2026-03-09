"use client";

import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";

interface StockItem {
  id: string;
  itemCode: string;
  description: string;
  group: string;
  supplier: string;
  location: string;
  onHand: string;
  count: string;
}

const StockTakeList = () => {
  // Mock Data
  const items: StockItem[] = Array(5)
    .fill({
      itemCode: "BK01",
      description: "Brake Pads remove and replace",
      group: "",
      supplier: "",
      location: "Hyd",
      onHand: "",
      count: "",
    })
    .map((item, index) => ({ ...item, id: index.toString() }));

  const columns: TableColumn<StockItem>[] = [
    {
      key: "itemCode",
      header: "Item Code",
    },
    {
      key: "description",
      header: "Description",
      width: "30%",
    },
    {
      key: "group",
      header: "Group",
    },
    {
      key: "supplier",
      header: "Supplier",
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "onHand",
      header: "On Hand",
    },
    {
      key: "count",
      header: "Count",
      render: (item) => (
        <input
          type="text"
          className="w-24 px-3 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
      <Table
        data={items}
        columns={columns}
        keyExtractor={(item) => item.id}
        pagination={true}
        pageSize={10}
        totalItems={256}
        selectable={false}
        compact={false}
        striped={false}
        className="h-full"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default StockTakeList;
