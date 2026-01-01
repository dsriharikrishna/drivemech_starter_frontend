// Example: How to use ScrollableTabs in SelectServiceLayout.tsx

import ScrollableTabs, { TabItem } from '@/components/ui/ScrollableTabs';
import { ADDON_SERVICES } from '@/constants/service.constants';
import { useState } from 'react';

// Inside your component:
export default function SelectServiceLayout() {
    const [activeServiceTab, setActiveServiceTab] = useState('ac');

    // Convert ADDON_SERVICES to TabItem format
    const serviceTabs: TabItem[] = ADDON_SERVICES.map(service => ({
        id: service.id,
        label: service.name,
        icon: service.icon,
    }));

    // Handle tab change
    const handleTabChange = (tabId: string) => {
        setActiveServiceTab(tabId);
        console.log('Selected service:', tabId);
        // You can add logic here to filter or highlight the selected service
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            {/* Add ScrollableTabs above your form */}
            <div className="mb-6 bg-white rounded-2xl shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Select Add-On Services</h3>
                <ScrollableTabs
                    tabs={serviceTabs}
                    activeTab={activeServiceTab}
                    onTabChange={handleTabChange}
                    variant="default"
                    showArrows={true}
                    arrowPosition="outside"
                />
            </div>

            {/* Your existing form content */}
            {/* ... rest of your layout ... */}
        </div>
    );
}

/* 
 * USAGE EXAMPLES:
 * 
 * 1. Basic Usage:
 * <ScrollableTabs
 *     tabs={serviceTabs}
 *     activeTab={activeTab}
 *     onTabChange={setActiveTab}
 * />
 * 
 * 2. Compact Variant:
 * <ScrollableTabs
 *     tabs={serviceTabs}
 *     activeTab={activeTab}
 *     onTabChange={setActiveTab}
 *     variant="compact"
 * />
 * 
 * 3. Inside Container (arrows inside):
 * <ScrollableTabs
 *     tabs={serviceTabs}
 *     activeTab={activeTab}
 *     onTabChange={setActiveTab}
 *     arrowPosition="inside"
 * />
 * 
 * 4. Without Arrows:
 * <ScrollableTabs
 *     tabs={serviceTabs}
 *     activeTab={activeTab}
 *     onTabChange={setActiveTab}
 *     showArrows={false}
 * />
 * 
 * 5. With Custom Icons (React Components):
 * const customTabs: TabItem[] = [
 *     {
 *         id: 'service1',
 *         label: 'Service 1',
 *         icon: <YourIconComponent className="w-10 h-10" />
 *     },
 *     // ... more tabs
 * ];
 * 
 * 6. With Disabled Tabs:
 * const tabsWithDisabled: TabItem[] = [
 *     {
 *         id: 'service1',
 *         label: 'Service 1',
 *         icon: '/path/to/icon.svg',
 *         disabled: true
 *     },
 *     // ... more tabs
 * ];
 */
