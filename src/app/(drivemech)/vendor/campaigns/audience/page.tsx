"use client";

import React, { useState } from "react";
import CampaignStatsCard from "@/components/vendor/campaigns/CampaignStatsCard";
import AudienceCard from "@/components/vendor/campaigns/AudienceCard";
import CreateAudienceModal from "@/components/vendor/campaigns/CreateAudienceModal";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { AudienceIcon, ContactsIcon, SegmentsIcon } from "@/components/icons/campaignIcons";

interface AudienceStatCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  value: string;
  label: string;
}

const AudienceStatCard: React.FC<AudienceStatCardProps> = ({
  icon,
  iconBgColor,
  value,
  label,
}) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
        <div className={`${iconBgColor} rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const AudiencePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    {
      icon: <AudienceIcon size={48} />,
      iconBgColor: "bg-purple-100",
      value: "48",
      label: "Total Audience",
    },
    {
      icon: <ContactsIcon size={48} />,
      iconBgColor: "bg-green-100",
      value: "4,567",
      label: "Total Contacts",
    },
    {
      icon: <SegmentsIcon size={48} />,
      iconBgColor: "bg-orange-100",
      value: "4",
      label: "Active Segments",
    },
  ];

  const audiences = [
    {
      title: "All Customers",
      description: "All active customers",
      contactCount: 4567,
      lastUpdated: "Sep 10, 2025",
    },
    {
      title: "Service Due This Month",
      description: "Last Service > 6 Months ago",
      contactCount: 234,
      lastUpdated: "Sep 10, 2025",
    },
    {
      title: "VIP Customers",
      description: "Spent $5000 last year",
      contactCount: 4567,
      lastUpdated: "Sep 10, 2025",
    },
    {
      title: "Inactive Customers",
      description: "No visit in last 12 Months",
      contactCount: 234,
      lastUpdated: "Sep 10, 2025",
    },
  ];

  return (
    <div className="w-full h-full p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 mb-1">
              Audience Management
            </h1>
            <p className="text-sm text-gray-600">
              Create and manage your target audiences
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            startIcon={<Plus size={18} className="rounded-full bg-white p-1 text-blue-500 font-semibold" />}
            rounded="lg"
            variant="primary-blue"
          >
            New Audience
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <AudienceStatCard key={index} {...stat} />
          ))}
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audiences.map((audience, index) => (
            <AudienceCard key={index} {...audience} />
          ))}
        </div>

        {/* Create Audience Modal */}
        <CreateAudienceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default AudiencePage;
