"use client";

import React, { useState } from "react";
import { Filter, ListFilter } from "lucide-react";

interface DataPoint {
  month: string;
  value: number;
}

import { RevenueDataPoint } from "@/store/slices/vendor/dashboard/dashboardSlice";
import ActionMenu from "../ActionMenu";

interface RevenueTrendsProps {
  data: RevenueDataPoint[];
}

const RevenueTrends: React.FC<RevenueTrendsProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<"monthly" | "yearly">("yearly");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Use passed prop data. Fallback to empty array if undefined to prevent errors.
  const monthlyData = data || [];

  // Ensure we have data before calculating max to avoid -Infinity
  const maxValue =
    monthlyData.length > 0
      ? Math.max(...monthlyData.map((d) => d.value))
      : 1000;

  const chartHeight = 200;
  const chartWidth = 800;

  // Generate path for the area chart
  const generatePath = () => {
    if (monthlyData.length === 0)
      return { linePath: "", areaPath: "", points: [] };

    const points = monthlyData.map((d, i) => {
      const x = (i / (monthlyData.length - 1)) * chartWidth;
      const y = chartHeight - (d.value / maxValue) * chartHeight;
      return { x, y };
    });

    const linePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
      .join(" ");
    const areaPath = `${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

    return { linePath, areaPath, points };
  };

  const { linePath, areaPath, points } = generatePath();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-full max-h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Revenue Trends</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monthly revenue this year
          </p>
        </div>
        <ActionMenu
          items={[
            {
              id: "daily",
              label: "Daily",
              onClick: () => console.log("daily"),
            },
            {
              id: "weekly",
              label: "Weekly",
              onClick: () => console.log("weekly"),
            },
            {
              id: "monthly",
              label: "Monthly",
              onClick: () => console.log("monthly"),
            },
            {
              id: "yearly",
              label: "Yearly",
              onClick: () => console.log("yearly"),
            },
          ]}
          trigger={
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <span className="text-sm font-medium text-gray-700">Yearly</span>
              <ListFilter size={16} className="text-gray-600" />
            </div>
          }
        />
      </div>

      {/* Chart */}
      <div className="mt-6 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>$1200</span>
          <span>$1000</span>
          <span>$800</span>
          <span>$600</span>
          <span>$400</span>
          <span>$200</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 relative" style={{ height: `${chartHeight}px` }}>
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-t border-gray-100"></div>
            ))}
          </div>

          {/* SVG Chart */}
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            {/* Gradient definition */}
            <defs>
              <linearGradient
                id="areaGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FB923C" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FB923C" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path
              d={areaPath}
              fill="url(#areaGradient)"
              className="transition-all duration-300"
            />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#FB923C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />

            {/* Interactive data points */}
            {points.map((point, index) => (
              <g key={index}>
                {/* Invisible larger circle for easier hover */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Visible circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredPoint === index ? "8" : "4"}
                  fill="white"
                  stroke="#FB923C"
                  strokeWidth={hoveredPoint === index ? "3" : "2"}
                  className="transition-all duration-200 pointer-events-none"
                  style={{
                    filter:
                      hoveredPoint === index
                        ? "drop-shadow(0 2px 4px rgba(251, 146, 60, 0.3))"
                        : "none",
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Tooltip */}
          {hoveredPoint !== null && (
            <div
              className="absolute bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg z-10 transition-all duration-200"
              style={{
                left: `${(hoveredPoint / (monthlyData.length - 1)) * 100}%`,
                top: `${((chartHeight - (monthlyData[hoveredPoint].value / maxValue) * chartHeight) / chartHeight) * 100 - 15}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="text-center">
                <div className="font-bold">
                  ${monthlyData[hoveredPoint].value}
                </div>
                <div className="text-xs opacity-90">
                  {monthlyData[hoveredPoint].month}
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
              </div>
            </div>
          )}
        </div>

        {/* X-axis labels */}
        <div className="ml-12 mt-2 flex justify-between text-xs text-gray-500">
          {monthlyData.map((d, index) => (
            <span
              key={d.month}
              className={`transition-colors cursor-pointer ${
                hoveredPoint === index ? "text-orange-600 font-semibold" : ""
              }`}
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueTrends;
