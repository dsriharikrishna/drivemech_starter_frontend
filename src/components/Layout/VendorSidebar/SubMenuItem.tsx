'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface SubMenuItemType {
    label: string
    path: string
    icon: React.ElementType
    hasSubmenu?: boolean
    submenu?: SubMenuItemType[]
}

interface SubMenuItemProps extends SubMenuItemType {
    expandedMenus: string[]
    onToggleSubmenu: (path: string) => void
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
    label,
    icon: SubIcon,
    path,
    hasSubmenu,
    submenu,
    expandedMenus,
    onToggleSubmenu
}) => {
    const pathname = usePathname()
    const router = useRouter()

    const isSubActive = pathname.startsWith(path)
    const isSubExpanded = expandedMenus.includes(path)

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
                    w-full flex items-center justify-between gap-2
                    px-3 py-2.5 rounded-lg
                    text-[13px] font-normal
                    transition-all duration-200
                    ${isSubActive
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm'
                        : 'text-[#475569] hover:bg-white/50'
                    }
                `}
            >
                <div className="flex items-center gap-3">
                    <SubIcon
                        size={16}
                        className={`flex-shrink-0 ${isSubActive ? 'text-white' : 'text-[#475569]'}`}
                        strokeWidth={1.5}
                    />
                    <span className="leading-none">{label}</span>
                </div>
                {hasSubmenu && (
                    isSubExpanded ? (
                        <ChevronDown
                            size={12}
                            className={`flex-shrink-0 ${isSubActive ? 'text-white' : 'text-gray-500'}`}
                            strokeWidth={2.5}
                        />
                    ) : (
                        <ChevronRight
                            size={12}
                            className={`flex-shrink-0 ${isSubActive ? 'text-white' : 'text-gray-500'}`}
                            strokeWidth={2.5}
                        />
                    )
                )}
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
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default SubMenuItem
