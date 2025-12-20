'use client'

import VendorSidebar from '@/components/Layout/VendorSidebar'
import { usePathname } from 'next/navigation';
import React from 'react'

const VendorRootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Calculate directly from pathname to avoid glitching
    const hideSidebar = React.useMemo(() => {
        return pathname === '/vendor/onboard' || pathname === '/vendor/pricing';
    }, [pathname]);
    return (
        <div className='flex h-screen p-2'>
            {!hideSidebar && <VendorSidebar />}
            <main className='flex-1 flex justify-center items-center'>{children}</main>
        </div>
    )
}

export default VendorRootLayout