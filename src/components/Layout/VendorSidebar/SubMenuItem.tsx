"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";

interface SubMenuItemType {
  label: string;
  path: string;
  icon: React.ElementType;
  hasSubmenu?: boolean;
  submenu?: SubMenuItemType[];
}

interface SubMenuItemProps extends SubMenuItemType {
  expandedMenus: string[];
  onToggleSubmenu: (path: string) => void;
  onClose?: () => void;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  label,
  icon: SubIcon,
  path,
  hasSubmenu,
  submenu,
  expandedMenus,
  onToggleSubmenu,
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isSubActive = pathname.startsWith(path);
  const isSubExpanded = expandedMenus.includes(path);

  const handleClick = () => {
    if (hasSubmenu) {
      onToggleSubmenu(path);
    } else {
      router.push(path);
      onClose?.();
    }
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`
                    w-full cursor-pointer flex items-center justify-start gap-2 text-start
                    px-3 py-2 rounded-md
                    text-[13px] font-medium
                    transition-all duration-200
                    ${isSubActive
            ? "bg-orange-500 text-white shadow-sm"
            : "text-slate-600 hover:bg-white/60 hover:text-orange-600"
          }
                `}
      >
        <div className="flex items-center gap-3 text-start">
          <SubIcon
            size={16}
            className={`flex-shrink-0 ${isSubActive ? "text-white" : "text-slate-500"}`}
            strokeWidth={2}
          />
          <span className="leading-tight">{label}</span>
        </div>
        {hasSubmenu &&
          (isSubExpanded ? (
            <ChevronDown
              size={14}
              className={`flex-shrink-0 ml-auto ${isSubActive ? "text-white" : "text-slate-400"}`}
              strokeWidth={2.5}
            />
          ) : (
            <ChevronRight
              size={14}
              className={`flex-shrink-0 ml-auto ${isSubActive ? "text-white" : "text-slate-400"} transform`}
              strokeWidth={2.5}
            />
          ))}
      </button>

      {/* Nested Submenu (if needed in the future) */}
      {hasSubmenu && submenu && isSubExpanded && (
        <ul className="mt-1.5 ml-2 space-y-1">
          {submenu.map((nestedItem) => (
            <SubMenuItem
              key={nestedItem.path}
              {...nestedItem}
              expandedMenus={expandedMenus}
              onToggleSubmenu={onToggleSubmenu}
              onClose={onClose}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SubMenuItem;
