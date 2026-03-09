"use client";

import React from "react";
import MetricCard from "./MetricCard";
import {
  DollarSign,
  Calendar,
  Wrench,
  Clock,
  ShoppingBag,
  Package,
  AlertCircle,
} from "lucide-react";
import { MetricItem } from "@/store/slices/vendor/dashboard/dashboardSlice";

interface MetricsGridProps {
  metrics: MetricItem[];
}

const iconMap: { [key: string]: React.ElementType } = {
  DollarSign,
  Calendar,
  Wrench,
  Clock,
  ShoppingBag,
  Package,
  AlertCircle,
};

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
      {metrics.map((metric) => {
        const IconComponent = iconMap[metric.iconType] || AlertCircle;
        return (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            trend={metric.trend}
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

export default MetricsGrid;
