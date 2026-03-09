import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
}

interface ServicesBookedTabProps {
  services: OrderService[];
  allChecked?: boolean;
}

const ServicesBookedTab: React.FC<ServicesBookedTabProps> = ({
  services,
  allChecked = true
}) => {
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
      width: "250px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.product}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      minWidth: "400px",
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
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
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

      {/* QC Warning Banner */}
      {/* {!allChecked && ( */}
      <div className="bg-[#FFF5F5] border border-[#FFE4E4] rounded-lg py-4 px-4 text-center">
        <p className="text-[#FF5252] font-semibold text-sm">
          Please check all services (Pass or Fail) to complete the test drive.
        </p>
      </div>
      {/* )} */}
    </div>
  );
};

export default ServicesBookedTab;
