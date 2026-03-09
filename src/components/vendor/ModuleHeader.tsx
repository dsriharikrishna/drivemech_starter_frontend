import React from "react";
import { Package } from "phosphor-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ModuleHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  icon?: React.ReactNode;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title, breadcrumbs,icon }) => {
  return (
    <div className="bg-[#1e293b] text-white px-6 py-3 rounded-lg flex items-center justify-between">
      {/* Left: Title with Icon */}
      <div className="flex items-center gap-2">
        {icon ? icon : <Package size={20} weight="fill" /> } 
        <h2 className="font-medium text-sm md:text-base">{title}</h2>
      </div>

      {/* Right: Breadcrumbs */}
      <div className="flex items-center text-xs md:text-sm text-gray-300">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2 text-gray-500">▶</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ModuleHeader;
