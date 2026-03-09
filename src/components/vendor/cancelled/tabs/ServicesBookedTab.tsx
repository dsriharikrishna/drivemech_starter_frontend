import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import CommonTextArea from "@/components/forms/CommonTextArea";
import OrderTotalsSummary from "@/components/vendor/OrderTotalsSummary";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

interface ServicesBookedTabProps {
  services: OrderService[];
  cancellationReason?: string;
}

const ServicesBookedTab: React.FC<ServicesBookedTabProps> = ({
  services,
  cancellationReason,
}) => {
  // Table columns for services
  const serviceColumns: TableColumn<OrderService>[] = [
    {
      key: "sNo",
      header: "S.No",
      width: "60px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.sNo}</span>
      ),
    },
    {
      key: "product",
      header: "Product",
      width: "200px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.product}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      minWidth: "300px",
      render: (service) => (
        <span className="text-sm text-gray-500">{service.description}</span>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      width: "100px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.quantity}</span>
      ),
    },
    {
      key: "unitPrice",
      header: "Unit Price ($)",
      width: "120px",
      render: (service) => (
        <span className="text-sm text-gray-900">
          {service.unitPrice.toFixed(2)}
        </span>
      ),
    },
    {
      key: "tax",
      header: "Tax (10%)",
      width: "100px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.tax.toFixed(2)}</span>
      ),
    },
    {
      key: "total",
      header: "Total",
      width: "100px",
      render: (service) => (
        <span className="text-sm font-medium text-gray-900">
          {service.total.toFixed(2)}
        </span>
      ),
    },
  ];

  // Calculate totals
  const subTotal = services.reduce((sum, service) => sum + service.total, 0);
  const freight = 1.0;
  const salesTax = subTotal * 0.1;
  const total = subTotal + freight + salesTax;

  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
        <Table
          columns={serviceColumns}
          data={services}
          keyExtractor={(service) => service.sNo}
          emptyMessage="No services found"
          striped={false}
          hoverable
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* Totals */}
      <OrderTotalsSummary
        subTotal={subTotal}
        freight={freight}
        salesTax={salesTax}
        total={total}
        className="mt-6"
      />

      {/* Cancellation Reason */}
      <div className="mt-8">
        <CommonTextArea
          name="cancellationReason"
          label=""
          placeholder="Cancellation reason appears here"
          rows={4}
          disabled
        />
      </div>
    </div>
  );
};

export default ServicesBookedTab;
