"use client";

import Button from "@/components/ui/Button";
import React from "react";

interface AudienceCardProps {
  title: string;
  description: string;
  contactCount: number;
  lastUpdated: string;
}

const AudienceCard: React.FC<AudienceCardProps> = ({
  title,
  description,
  contactCount,
  lastUpdated,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {contactCount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Contacts</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Last Updated</p>
          <p className="text-sm font-medium text-gray-700">{lastUpdated}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          View Contacts
        </Button>
        <Button size="sm" variant="primary" className="flex-1 px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors">
          Use in Campaign
        </Button>
      </div>
    </div>
  );
};

export default AudienceCard;
