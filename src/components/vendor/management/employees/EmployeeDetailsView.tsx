"use client";

import React from "react";
import {
  User,
  Phone,
  MapPin,
  IdentificationCard,
  ShieldCheck,
} from "phosphor-react";
import CustomCard from "@/components/ui/CustomCard";

const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-4">
    {icon}
    <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
  </div>
);

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-xs text-gray-500 mb-1">{label}</label>
    <p className="text-sm font-medium text-gray-900">{value}</p>
  </div>
);

const EmployeeDetailsView = () => {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <CustomCard className="p-6">
        <SectionHeader
          icon={<User size={20} weight="fill" />}
          title="Personal Information"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoField label="First Name" value="John" />
          <InfoField label="Last Name" value="Wick" />
          <InfoField label="Joining Date" value="22/07/2025" />
        </div>
      </CustomCard>

      {/* Contact Information */}
      <CustomCard className="p-6">
        <SectionHeader
          icon={<Phone size={20} weight="fill" />}
          title="Contact Information"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Phone Number" value="+91 9876543210" />
          <InfoField label="Email Address" value="johnwick01@gmail.com" />
        </div>
      </CustomCard>

      {/* Address Information */}
      <CustomCard className="p-6">
        <SectionHeader
          icon={<MapPin size={20} weight="fill" />}
          title="Address Information"
        />
        <div className="grid grid-cols-1 gap-6">
          <InfoField
            label=""
            value={`123, Abc Street\nChennai, Tamil Nadu,\n600001, India`}
          />
        </div>
      </CustomCard>

      {/* Identity Proof */}
      <CustomCard className="p-6">
        <SectionHeader
          icon={<IdentificationCard size={20} weight="fill" />}
          title="Identity Proof"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Document Type" value="Aadhaar card" />
          <InfoField label="Document Number" value="1234 5678 9012" />
        </div>
      </CustomCard>

      {/* Role & Permissions */}
      <CustomCard className="p-6">
        <SectionHeader
          icon={<ShieldCheck size={20} weight="fill" />}
          title="Role & Permissions"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Current Designation" value="Technician" />
          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Permissions
            </label>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-600 bg-gray-50">
                vehicle services
              </span>
              <span className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-600 bg-gray-50">
                basic repairs
              </span>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default EmployeeDetailsView;
