"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import SubMenuItem from "./SubMenuItem";
import { ArrowRightIcon, ArrowUpIcon } from "@/components/icons/DashboardIcons";

interface SubMenuItemType {
  label: string;
  path: string;
  icon: React.ElementType;
  hasSubmenu?: boolean;
  submenu?: SubMenuItemType[];
}

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItemType[];
  expandedMenus: string[];
  onToggleSubmenu: (path: string) => void;
  onClose?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  path,
  hasSubmenu,
  submenu,
  expandedMenus,
  onToggleSubmenu,
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (itemPath: string) => {
    if (itemPath === "/vendor/dashboard") {
      return (
        pathname === "/vendor" ||
        pathname === "/vendor/dashboard" ||
        pathname.startsWith("/vendor/dashboard/")
      );
    }
    return pathname.startsWith(itemPath);
  };

  const active = isActive(path);
  const isExpanded = expandedMenus.includes(path);

  const handleClick = () => {
    if (hasSubmenu) {
      onToggleSubmenu(path);
    } else {
      router.push(path);
      onClose?.();
    }
  };

  return (
    <li className="rounded-lg mb-1 cursor-pointer">
      <button
        onClick={handleClick}
        className={`
                    w-full cursor-pointer flex items-center justify-start gap-3 text-start
                    px-3 py-2.5 rounded-lg
                    text-[14px] font-medium
                    transition-all duration-200
                     ${active && !hasSubmenu
            ? "bg-orange-500 text-white shadow-md"
            : ""
          }
                    ${hasSubmenu && isExpanded ? "text-slate-900" : ""}
                `}
      >
        <div className="flex items-center gap-3 text-start">
          <Icon
            size={18}
            className={`flex-shrink-0 ${active && !hasSubmenu ? "text-white" : "text-slate-600"}`}
            strokeWidth={2}
          />
          <span className="leading-tight">{label}</span>
        </div>
        {hasSubmenu &&
          (isExpanded ? (
            <ArrowUpIcon size={16} className="ml-auto" />
          ) : (
            <ArrowRightIcon size={16} className="ml-auto" />
          ))}
      </button>

      {/* Submenu */}
      {hasSubmenu && submenu && isExpanded && (
        <div className="ml-5 pl-3 border-l-2 border-slate-200 my-1">
          <ul className="space-y-1">
            {submenu.map((subItem) => (
              <SubMenuItem
                key={subItem.path}
                {...subItem}
                expandedMenus={expandedMenus}
                onToggleSubmenu={onToggleSubmenu}
                onClose={onClose}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default NavItem;
