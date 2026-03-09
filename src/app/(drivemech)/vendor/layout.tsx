"use client";

import VendorSidebar from "@/components/Layout/VendorSidebar";
import { usePathname } from "next/navigation";
import React from "react";

import LeftDrawer from "@/components/ui/LeftDrawer";
import { List } from "phosphor-react";
import VendorCommonHeader from "@/components/vendor/VendorCommonHeader";

const VendorRootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  // Calculate directly from pathname to avoid glitching
  const hideSidebar = React.useMemo(() => {
    return pathname === "/vendor/onboard" || pathname === "/vendor/pricing";
  }, [pathname]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden p-2">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden flex items-center justify-between p-2 bg-white rounded-xl mb-2 shadow-sm shrink-0">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <List size={24} className="text-gray-700" />
        </button>
        <span className="font-semibold text-gray-700">Menu</span>
      </div>

      {/* Mobile Drawer */}
      <LeftDrawer
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        className="w-50"
      >
        <VendorSidebar onClose={() => setIsMobileSidebarOpen(false)} />
      </LeftDrawer>

      {!hideSidebar && (
        <div className="hidden md:block w-auto h-screen sticky top-0 overflow-y-auto shrink-0">
          <VendorSidebar />
        </div>
      )}
      <main className="flex-1 min-w-0 overflow-y-auto p-2">
        <div className="px-2 flex flex-col gap-4">
          {!hideSidebar && <VendorCommonHeader />}
          {children}
        </div>
      </main>
    </div>
  );
};

export default VendorRootLayout;
