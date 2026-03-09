"use client";

import React from "react";
import StatusCard from "./StatusCard";
import {
  TrendingUp,
  Calendar,
  Users,
  Car,
  FileText,
  UserCheck,
} from "lucide-react";
import { StatusMetricItem } from "@/store/slices/vendor/dashboard/dashboardSlice";

interface StatusGridProps {
  statusMetrics: StatusMetricItem[];
}

const iconMap: { [key: string]: React.ElementType } = {
  TrendingUp,
  Calendar,
  Users,
  Car,
  FileText,
  UserCheck,
};

const StatusGrid: React.FC<StatusGridProps> = ({ statusMetrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statusMetrics.map((metric) => {
        const IconComponent = iconMap[metric.iconType] || TrendingUp;
        return (
          <StatusCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            badge={metric.badge}
            percentage={metric.percentage}
            iconBgColor={metric.iconBgColor}
            icon={
              <IconComponent
                size={20}
                className={metric.iconColor}
                strokeWidth={2}
              />
            }
          />
        );
      })}
    </div>
  );
};

export default StatusGrid;
