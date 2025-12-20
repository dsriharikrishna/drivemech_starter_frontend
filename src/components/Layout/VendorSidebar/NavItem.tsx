'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown } from 'lucide-react'
import SubMenuItem from './SubMenuItem'

interface SubMenuItemType {
    label: string
    path: string
    icon: React.ElementType
    hasSubmenu?: boolean
    submenu?: SubMenuItemType[]
}

interface NavItemProps {
    label: string
    icon: React.ElementType
    path: string
    hasSubmenu?: boolean
    submenu?: SubMenuItemType[]
    expandedMenus: string[]
    onToggleSubmenu: (path: string) => void
}

const NavItem: React.FC<NavItemProps> = ({
    label,
    icon: Icon,
    path,
    hasSubmenu,
    submenu,
    expandedMenus,
    onToggleSubmenu
}) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = (itemPath: string) => {
        if (itemPath === '/vendor/dashboard') {
            return pathname === '/vendor' || pathname === '/vendor/dashboard' || pathname.startsWith('/vendor/dashboard/')
        }
        return pathname.startsWith(itemPath)
    }

    const active = isActive(path)
    const isExpanded = expandedMenus.includes(path)

    const handleClick = () => {
        if (hasSubmenu) {
            onToggleSubmenu(path)
        } else {
            router.push(path)
        }
    }

    return (
        <li>
            <button
                onClick={handleClick}
                className={`
                    w-full flex items-center justify-between gap-3
                    px-3 py-2.5 rounded-lg
                    text-[13px] font-medium
                    transition-all duration-200
                    ${active && !hasSubmenu
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-white/60'
                    }
                `}
            >
                <div className="flex items-center gap-3">
                    <Icon
                        size={16}
                        className={`flex-shrink-0 ${active && !hasSubmenu ? 'text-white' : 'text-[#475569]'}`}
                        strokeWidth={2}
                    />
                    <span className="leading-none">{label}</span>
                </div>
                {hasSubmenu && (
                    isExpanded ? (
                        <ChevronDown
                            size={14}
                            className="flex-shrink-0 text-gray-600"
                            strokeWidth={2.5}
                        />
                    ) : (
                        <ChevronRight
                            size={14}
                            className="flex-shrink-0 text-gray-600"
                            strokeWidth={2.5}
                        />
                    )
                )}
            </button>

            {/* Submenu */}
            {hasSubmenu && submenu && isExpanded && (
                <ul className="mt-1.5 ml-2 space-y-1">
                    {submenu.map((subItem) => (
                        <SubMenuItem
                            key={subItem.path}
                            {...subItem}
                            expandedMenus={expandedMenus}
                            onToggleSubmenu={onToggleSubmenu}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default NavItem
