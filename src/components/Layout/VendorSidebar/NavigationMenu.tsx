"use client";

import React from "react";
import NavItem from "./NavItem";

interface SubMenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

interface NavItemType {
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

interface NavigationMenuProps {
  navItems: NavItemType[];
  expandedMenus: string[];
  onToggleSubmenu: (path: string) => void;
  onClose?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  navItems,
  expandedMenus,
  onToggleSubmenu,
  onClose,
}) => {
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-4 cursor-pointer">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            {...item}
            expandedMenus={expandedMenus}
            onToggleSubmenu={onToggleSubmenu}
            onClose={onClose}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
