import {
  DashboardIcon,
  TransactionCenterIcon,
  ManagementIcon,
  InventoryIcon,
  WorkshopIcon,
  ReportsIcon,
  BusinessReportsIcon,
  CustomerReportsIcon,
  CampaignIcon,
  ConfigIcon,
  EmployeesIcon,
  LoanCarsIcon,
  CarIcon,
  PeopleIcon,
  SparePartsIcon,
  CraneTruckIcon,
  SystemConfigIcon,
  SystemIntegrationIcon,
  SettingIcon,
  BoxIcon,
} from "@/components/icons/DashboardIcons";

// Keep some lucide icons for items that don't have custom icons yet
import { Calendar, ClipboardCheck, Scale } from "lucide-react";

interface SubMenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/vendor/dashboard",
    hasSubmenu: false,
  },
  {
    label: "Operations",
    icon: ConfigIcon,
    path: "/vendor/operations",
    hasSubmenu: true,
    submenu: [
      {
        label: "Booking Diary",
        path: "/vendor/operations/booking-diary",
        icon: Calendar,
      },
      {
        label: "Transaction Center",
        path: "/vendor/operations/transaction-center",
        icon: TransactionCenterIcon,
      },
      {
        label: "Spare Parts",
        path: "/vendor/operations/spare-parts",
        icon: SparePartsIcon,
      },
      {
        label: "Towing Services",
        path: "/vendor/operations/towing-services",
        icon: CraneTruckIcon,
      },
      {
        label: "Inspections",
        path: "/vendor/operations/inspections",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    label: "Management",
    icon: ManagementIcon,
    path: "/vendor/management",
    hasSubmenu: true,
    submenu: [
      {
        label: "Customers",
        path: "/vendor/management/customers",
        icon: PeopleIcon,
      },
      { label: "Vehicles", path: "/vendor/management/vehicles", icon: CarIcon },
      {
        label: "Employees",
        path: "/vendor/management/employees",
        icon: EmployeesIcon,
      },
    ],
  },
  {
    label: "Inventory",
    icon: InventoryIcon,
    path: "/vendor/inventory",
    hasSubmenu: true,
    submenu: [
      {
        label: "Suppliers",
        path: "/vendor/inventory/suppliers",
        icon: BoxIcon,
      },
      {
        label: "Inventory",
        path: "/vendor/inventory/inventory",
        icon: InventoryIcon,
      },
      // {
      //   label: "Stock Take",
      //   path: "/vendor/inventory/stock-take",
      //   icon: Scale,
      // },
      // {
      //   label: "Loaner Cars",
      //   path: "/vendor/inventory/loaner-cars",
      //   icon: LoanCarsIcon,
      // },
    ],
  },
  {
    label: "Manage Workshop",
    icon: WorkshopIcon,
    path: "/vendor/manage-workshop",
    hasSubmenu: false,
  },
  {
    label: "Reports",
    icon: ReportsIcon,
    path: "/vendor/reports/sales",
    hasSubmenu: true,
    submenu: [
      { label: "Reports", path: "/vendor/reports/sales", icon: ReportsIcon },
      {
        label: "Customer Reports",
        path: "/vendor/reports/customers",
        icon: CustomerReportsIcon,
      },
      // {
      //   label: "Business Reports",
      //   path: "/vendor/reports/business",
      //   icon: BusinessReportsIcon,
      // },
    ],
  },
  {
    label: "SMS & Email Campaign",
    icon: CampaignIcon,
    path: "/vendor/campaigns",
    hasSubmenu: false,
  },
  {
    label: "Configurations",
    icon: ConfigIcon,
    path: "/vendor/configurations",
    hasSubmenu: true,
    submenu: [
      {
        label: "System Configurations",
        path: "/vendor/configurations/system",
        icon: SystemConfigIcon,
        hasSubmenu: true,
        submenu: [
          {
            label: "Manage Insurance Provider",
            path: "/vendor/configurations/system/insurance-provider",
            icon: SettingIcon,
          },
          // {
          //   label: "Manage Message Template",
          //   path: "/vendor/configurations/system/message-template",
          //   icon: SettingIcon,
          // },
          {
            label: "Manage Tax Rates/HSN Codes",
            path: "/vendor/configurations/system/tax-rates",
            icon: SettingIcon,
          },
          {
            label: "Manage Terms & Conditions",
            path: "/vendor/configurations/system/terms-conditions",
            icon: SettingIcon,
          },
          {
            label: "Manage Vehicle Category",
            path: "/vendor/configurations/system/vehicle-category",
            icon: SettingIcon,
          },
          {
            label: "Manage Vehicle Checklist",
            path: "/vendor/configurations/system/vehicle-checklist",
            icon: SettingIcon,
          },
          {
            label: "Manage Vendors & Purchases",
            path: "/vendor/configurations/system/vendors-purchases",
            icon: SettingIcon,
          },
          {
            label: "Manage Vehicle Models",
            path: "/vendor/configurations/system/vehicle-models",
            icon: SettingIcon,
          },
          {
            label: "View Logs",
            path: "/vendor/configurations/system/logs",
            icon: SettingIcon,
          },
        ],
      },
      {
        label: "Integrations",
        path: "/vendor/configurations/integrations",
        icon: SystemIntegrationIcon,
      },
      {
        label: "Settings",
        path: "/vendor/configurations/settings",
        icon: SettingIcon,
      },
    ],
  },
];
