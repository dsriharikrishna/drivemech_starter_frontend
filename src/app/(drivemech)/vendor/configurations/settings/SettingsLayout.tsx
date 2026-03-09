"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MyProfileTab from "./tabs/MyProfileTab";
import AccountSecurityTab from "./tabs/AccountSecurityTab";
import NotificationsTab from "./tabs/NotificationsTab";
import PrivacyTab from "./tabs/PrivacyTab";
import SubscriptionBillingTab from "./tabs/SubscriptionBillingTab";
import Tabs from "@/components/ui/Tabs";

const SettingsLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the tab from the pathname
  const getTabFromPath = () => {
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];

    // If we're at the base settings page, default to my-profile
    if (lastSegment === 'settings') {
      return 'my-profile';
    }

    return lastSegment;
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [pathname]);

  const tabs = [
    { id: "my-profile", label: "My Profile" },
    { id: "account-security", label: "Account & Security" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "subscription-billing", label: "Subscription & Billing" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/vendor/configurations/settings/${tabId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "my-profile":
        return <MyProfileTab />;
      case "account-security":
        return <AccountSecurityTab />;
      case "notifications":
        return <NotificationsTab />;
      case "privacy":
        return <PrivacyTab />;
      case "subscription-billing":
        return <SubscriptionBillingTab />;
      default:
        return <MyProfileTab />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full px-2 py-2 pb-0.5 border-b border-gray-200">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">{renderTabContent()}</div>
    </div>
  );
};

export default SettingsLayout;
