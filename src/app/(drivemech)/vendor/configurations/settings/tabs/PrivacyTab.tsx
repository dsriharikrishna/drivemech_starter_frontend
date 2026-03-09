"use client";

import React, { useState } from "react";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Button from "@/components/ui/Button";
import { Download, FileText, Trash2 } from "lucide-react";

const PrivacyTab = () => {
  const [dataCollection, setDataCollection] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const handleDownloadData = () => {
    console.log("Download data requested");
    // TODO: Handle data download
  };

  const handleViewPrivacyPolicy = () => {
    console.log("View privacy policy");
    // TODO: Open privacy policy
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
    // TODO: Handle account deletion with confirmation
  };

  return (
    <div className="space-y-6">
      {/* Data & Analytics Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Data & Analytics
        </h3>

        <div className="space-y-4">
          <ToggleSwitch
            checked={dataCollection}
            onChange={setDataCollection}
            label="Data Collection"
            description="Allow collection of usage data for improvement"
            variant="primary"
          />

          <ToggleSwitch
            checked={analytics}
            onChange={setAnalytics}
            label="Analytics"
            description="Help improve the product with anonymous analytics"
            variant="primary"
          />
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Data Management
        </h3>

        <div className="flex flex-col lg:flex-row gap-4">
          <Button
            variant="outline"
            startIcon={<Download size={16} />}
            onClick={handleDownloadData}
            className="flex-1"
            size="md"
          >
            Download My Data
          </Button>

          <Button
            variant="outline"
            startIcon={<FileText size={16} />}
            onClick={handleViewPrivacyPolicy}
            className="flex-1"
            size="md"
          >
            View Privacy Policy
          </Button>

          <Button
            variant="danger"
            startIcon={<Trash2 size={16} />}
            onClick={handleDeleteAccount}
            className="flex-1"
            size="md"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTab;
