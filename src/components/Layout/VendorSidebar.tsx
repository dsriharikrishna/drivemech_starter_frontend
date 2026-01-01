'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import SidebarHeader from './VendorSidebar/SidebarHeader'
import UserProfile from './VendorSidebar/UserProfile'
import NavigationMenu from './VendorSidebar/NavigationMenu'
import { navItems } from './VendorSidebar/navItems'

const VendorSidebar = () => {
    const pathname = usePathname()
    const [expandedMenus, setExpandedMenus] = React.useState<string[]>([])

    const toggleSubmenu = (path: string) => {
        setExpandedMenus(prev =>
            prev.includes(path)
                ? prev.filter(p => p !== path)
                : [...prev, path]
        )
    }

    // Auto-expand menu if a submenu item is active
    React.useEffect(() => {
        navItems.forEach(item => {
            if (item.hasSubmenu && item.submenu) {
                const hasActiveSubmenu = item.submenu.some(sub => pathname.startsWith(sub.path))
                if (hasActiveSubmenu && !expandedMenus.includes(item.path)) {
                    setExpandedMenus(prev => [...prev, item.path])
                }
            }
        })
    }, [pathname])

    return (
        <aside className="w-[280px] bg-[#F8F9FA] flex flex-col p-2 rounded-xl h-full">
            <SidebarHeader />
            <UserProfile
                name="John Wick"
                email="johnwick07@gmail.com"
                avatarUrl="/images/workshop/mechanic1.jpg"
            />
            <NavigationMenu
                navItems={navItems}
                expandedMenus={expandedMenus}
                onToggleSubmenu={toggleSubmenu}
            />
        </aside>
    )
}

export default VendorSidebar