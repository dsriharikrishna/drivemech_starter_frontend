// components/profile/ProfileLayout.tsx

"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/customer/profile/ProfileSidebar";
import ProfileTab from "@/components/customer/profile/tabs/ProfileTab";
import OrdersTab from "@/components/customer/profile/tabs/OrdersTab";
import VehiclesTab from "@/components/customer/profile/tabs/VehiclesTab";
import PaymentsTab from "@/components/customer/profile/tabs/PaymentsTab";
import AddressTab from "@/components/customer/profile/tabs/AddressTab";
import SettingsTab from "@/components/customer/profile/tabs/SettingsTab";

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "My Orders":
        return <OrdersTab />;
      case "My Vehicles":
        return <VehiclesTab />;
      case "Payments":
        return <PaymentsTab />;
      case "My Addresses":
        return <AddressTab />;
      case "Settings":
        return <SettingsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="flex gap-6 bg-[#f6f7fa] min-h-screen p-6">
      <aside className="max-h-[380px] overflow-y-auto">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      <main className="flex-1">
        {renderTabContent()}
      </main>
    </div>

  );
}
