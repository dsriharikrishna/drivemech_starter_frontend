import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StatsCard = ({
  title,
  count,
  iconSrc,
  iconAlt,
  onClick,
}: {
  title: string;
  count: number;
  iconSrc: string;
  iconAlt: string;
  onClick: () => void;
}) => (
  <div
    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer"
    onClick={onClick}
  >
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">
        {count < 10 ? `0${count}` : count}
      </h3>
    </div>
    <div className="p-0 rounded-lg bg-gray-100 flex items-center justify-center">
      <Image src={iconSrc} alt={iconAlt} width={48} height={48} />
    </div>
  </div>
);

export default function StatsSection() {
  const router = useRouter();
  const stats = [
    {
      label: "Under Servicing",
      count: 10,
      path: "/vendor/operations/transaction-center/under-servicing",
      iconSrc: "/svgs/transaction-center/under-servicing.svg",
      iconAlt: "Under Servicing",
    },
    {
      label: "Next Day Delivery",
      count: 5,
      path: "/vendor/operations/transaction-center/next-day-delivery",
      iconSrc: "/svgs/transaction-center/next-day-delivery.svg",
      iconAlt: "Next Day Delivery",
    },
    {
      label: "Test Drive",
      count: 7,
      path: "/vendor/operations/transaction-center/test-drive",
      iconSrc: "/svgs/transaction-center/test-drive.svg",
      iconAlt: "Test Drive",
    },
    {
      label: "Ready For Delivery",
      count: 3,
      path: "/vendor/operations/transaction-center/ready-for-delivery",
      iconSrc: "/svgs/transaction-center/ready-for-delivery.svg",
      iconAlt: "Ready For Delivery",
    },
    {
      label: "Gate Pass Issued",
      count: 3,
      path: "/vendor/operations/transaction-center/gate-pass-issued",
      iconSrc: "/svgs/transaction-center/gate-pass.svg",
      iconAlt: "Gate Pass Issued",
    },
    {
      label: "Cancelled",
      count: 1,
      path: "/vendor/operations/transaction-center/cancelled",
      iconSrc: "/svgs/transaction-center/cancelled.svg",
      iconAlt: "Cancelled",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.label}
          count={stat.count}
          iconSrc={stat.iconSrc}
          iconAlt={stat.iconAlt}
          onClick={() => router.push(stat.path)}
        />
      ))}
    </div>
  );
}
