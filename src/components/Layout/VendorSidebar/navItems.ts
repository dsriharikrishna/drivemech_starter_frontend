import {
    LayoutDashboard,
    Settings2,
    Building2,
    Package,
    Wrench,
    FileText,
    Mail,
    SlidersHorizontal,
    Calendar,
    CreditCard,
    Cog,
    Truck,
    ClipboardCheck,
    Users,
    Car,
    UserCircle,
    PackageOpen,
    Box,
    Scale,
    CarFront,
    BarChart3,
    UserCheck,
    TrendingUp,
    Settings as SettingsIcon,
    Puzzle
} from 'lucide-react'

interface SubMenuItem {
    label: string
    path: string
    icon: React.ElementType
    hasSubmenu?: boolean
    submenu?: SubMenuItem[]
}

interface NavItem {
    label: string
    icon: React.ElementType
    path: string
    hasSubmenu?: boolean
    submenu?: SubMenuItem[]
}

export const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/vendor/dashboard',
        hasSubmenu: false
    },
    {
        label: 'Operations',
        icon: Settings2,
        path: '/vendor/operations',
        hasSubmenu: true,
        submenu: [
            { label: 'Booking Diary', path: '/vendor/operations/booking-diary', icon: Calendar },
            { label: 'Transaction Center', path: '/vendor/operations/transaction-center', icon: CreditCard },
            { label: 'Spare Parts', path: '/vendor/operations/spare-parts', icon: Cog },
            { label: 'Towing Services', path: '/vendor/operations/towing-services', icon: Truck },
            { label: 'Inspections', path: '/vendor/operations/inspections', icon: ClipboardCheck }
        ]
    },
    {
        label: 'Management',
        icon: Building2,
        path: '/vendor/management',
        hasSubmenu: true,
        submenu: [
            { label: 'Customers', path: '/vendor/management/customers', icon: Users },
            { label: 'Vehicles', path: '/vendor/management/vehicles', icon: Car },
            { label: 'Employees', path: '/vendor/management/employees', icon: UserCircle }
        ]
    },
    {
        label: 'Inventory',
        icon: Package,
        path: '/vendor/inventory',
        hasSubmenu: true,
        submenu: [
            { label: 'Suppliers', path: '/vendor/inventory/suppliers', icon: PackageOpen },
            { label: 'Inventory', path: '/vendor/inventory/stock', icon: Box },
            { label: 'Stock Take', path: '/vendor/inventory/stock-take', icon: Scale },
            { label: 'Loaner Cars', path: '/vendor/inventory/loaner-cars', icon: CarFront }
        ]
    },
    {
        label: 'Manage Workshop',
        icon: Wrench,
        path: '/vendor/manage-workshop',
        hasSubmenu: false
    },
    {
        label: 'Reports',
        icon: FileText,
        path: '/vendor/reports',
        hasSubmenu: true,
        submenu: [
            { label: 'Reports', path: '/vendor/reports/all', icon: BarChart3 },
            { label: 'Customer Reports', path: '/vendor/reports/customers', icon: UserCheck },
            { label: 'Business Reports', path: '/vendor/reports/business', icon: TrendingUp }
        ]
    },
    {
        label: 'SMS & Email Campaign',
        icon: Mail,
        path: '/vendor/campaigns',
        hasSubmenu: false
    },
    {
        label: 'Configurations',
        icon: SlidersHorizontal,
        path: '/vendor/configurations',
        hasSubmenu: true,
        submenu: [
            {
                label: 'System Configurations',
                path: '/vendor/configurations/system',
                icon: Cog,
                hasSubmenu: true,
                submenu: []
            },
            { label: 'Integrations', path: '/vendor/configurations/integrations', icon: Puzzle },
            { label: 'Settings', path: '/vendor/configurations/settings', icon: SettingsIcon }
        ]
    }
]
