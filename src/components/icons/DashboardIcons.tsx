import React from "react";

interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
}

// Helper component for masking
const BaseIcon: React.FC<IconProps & { src: string; alt: string }> = ({
  size = 20,
  width,
  height,
  className = "",
  src,
  alt,
}) => {
  const w = width || size;
  const h = height || size;
  return (
    <div
      aria-label={alt}
      role="img"
      className={`inline-block bg-current ${className}`}
      style={{
        width: w,
        height: h,
        maskImage: `url('${src.startsWith("/") ? src : `/svgs/dashboard/${src}`}')`,
        WebkitMaskImage: `url('${src.startsWith("/") ? src : `/svgs/dashboard/${src}`}')`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
};

// Main Navigation Icons
export const DashboardIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="category-2.svg" alt="Dashboard" />
);

export const TransactionCenterIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Transcation Center.svg" alt="Transaction Center" />
);

export const ManagementIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Managment.svg" alt="Management" />
);

export const InventoryIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Inventory.svg" alt="Inventory" />
);

export const WorkshopIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Manage_Workshop.svg" alt="Workshop" />
);

export const ReportsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Reports.svg" alt="Reports" />
);

export const BusinessReportsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Business Reports.svg" alt="Business Reports" />
);

export const CustomerReportsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Customer Reports.svg" alt="Customer Reports" />
);

export const CampaignIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="megaphone.svg" alt="Campaign" />
);

export const ConfigIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Configurations.svg" alt="Configurations" />
);

// Additional Icons
export const EmployeesIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Employees.svg" alt="Employees" />
);

export const LoanCarsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="Loan Cars.svg" alt="Loan Cars" />
);

export const CarIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="car.svg" alt="Car" />
);

export const PeopleIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="people.svg" alt="People" />
);

export const ChartIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="chart.svg" alt="Chart" />
);

export const SparePartsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="spare-parts.svg" alt="Spare Parts" />
);

export const CraneTruckIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="crane-truck.svg" alt="Crane Truck" />
);

export const TruckIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="truck.svg" alt="Truck" />
);

export const SystemConfigIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="system-config.svg" alt="System Config" />
);

export const SystemIntegrationIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="system-integration.svg" alt="System Integration" />
);

export const SettingIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="setting-2.svg" alt="Settings" />
);

export const BoxIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="box.svg" alt="Box" />
);

export const BoxTickIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="box-tick.svg" alt="Box Tick" />
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="arrow-right.svg" alt="Arrow Right" />
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="arrow-up.svg" alt="Arrow Up" />
);

export const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="arrow-down.svg" alt="Arrow Down" />
);

export const FuelIcon: React.FC<IconProps> = (props) => (
  <BaseIcon
    {...props}
    src="/svgs/transaction-center/fuel-pump.svg"
    alt="Fuel"
  />
);

export const EmptyMeterIcon: React.FC<IconProps> = (props) => (
  <BaseIcon
    {...props}
    src="/svgs/transaction-center/empty-meter.svg"
    alt="Empty Meter"
  />
);


export const POSIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/card-pos.svg" alt="POS" />
);

export const MarketingIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/megaphone.svg" alt="Marketing" />
);

export const PaypalIcon: React.FC<IconProps> = (props) => (
  <img src="/images/paypal.png" alt="Paypal" {...props} className="object-contain" />
);

export const StripeIcon: React.FC<IconProps> = (props) => (
  <img src="/images/stripe.png" alt="Stripe" {...props} className="object-contain" />
);

export const CalculatorIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/calculator.svg" alt="Calculator" />
);

export const MegaPhoneIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/megaphone.svg" alt="Quickbooks" />
);

export const SquareIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/square-icon.svg" alt="Square" />
);


export const ProfileTwoUserIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/profile-2user.svg" alt="Profile Two User" />
);


export const CustomerReports2Icon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} src="/svgs/Customer_Reports.svg" alt="Customer Reports" />
);

