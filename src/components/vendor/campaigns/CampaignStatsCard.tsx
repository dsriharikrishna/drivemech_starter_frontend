"use client";

import React from "react";

interface CampaignStatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string;
}

const CampaignStatsCard: React.FC<CampaignStatsCardProps> = ({
  icon,
  value,
  label,
  bgColor,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center gap-3">
      <div
        className={`${bgColor} rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default React.memo(CampaignStatsCard);
