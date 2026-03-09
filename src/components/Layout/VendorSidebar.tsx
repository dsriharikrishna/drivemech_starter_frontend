"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SidebarHeader from "./VendorSidebar/SidebarHeader";
import UserProfile from "./VendorSidebar/UserProfile";
import NavigationMenu from "./VendorSidebar/NavigationMenu";
import { navItems } from "./VendorSidebar/navItems";

interface VendorSidebarProps {
  onClose?: () => void;
}

const VendorSidebar: React.FC<VendorSidebarProps> = ({ onClose }) => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);

  const toggleSubmenu = (path: string) => {
    setExpandedMenus((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  // Auto-expand menu if a submenu item is active
  React.useEffect(() => {
    navItems.forEach((item) => {
      if (item.hasSubmenu && item.submenu) {
        const hasActiveSubmenu = item.submenu.some((sub) =>
          pathname.startsWith(sub.path)
        );
        if (hasActiveSubmenu && !expandedMenus.includes(item.path)) {
          setExpandedMenus((prev) => [...prev, item.path]);
        }
      }
    });
  }, [pathname]);

  return (
    <aside className="w-full md:w-[240px] bg-white flex flex-col gap-1 rounded-xl h-full">
      <div className="flex flex-col shadow-sm rounded-l-lg">
        <SidebarHeader />
        <UserProfile
          name="John Wick"
          email="johnwick07@gmail.com"
          avatarUrl=""
        />
      </div>
      <div className="flex flex-col pt-1">
        <NavigationMenu
          navItems={navItems}
          expandedMenus={expandedMenus}
          onToggleSubmenu={toggleSubmenu}
          onClose={onClose}
        />
      </div>
    </aside>
  );
};

export default VendorSidebar;
