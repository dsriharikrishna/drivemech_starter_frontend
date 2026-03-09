"use client";

import { CalculatorIcon, CarIcon, MegaPhoneIcon, PaypalIcon, POSIcon, SquareIcon, StripeIcon } from "@/components/icons/DashboardIcons";
import IntegrationCard from "@/components/vendor/campaigns/IntegrationCard";
import { Car, DollarSign, TrendingUp, CreditCard, } from "lucide-react";

const IntegrationsPage = () => {
  const integrations = [
    {
      icon: <CarIcon size={24} className="bg-orange-600 text-white" />,
      title: "Automotives",
      description: "Connect with automotive tools and services",
      iconBgColor: "bg-orange-100",
      items: [
        {
          name: "AutoMate Pro",
          icon: <CarIcon size={16} className="text-gray-600" /> ,
          status: "connected" as const,
        },
        {
          name: "CarVIN Scanner",
          icon: <CarIcon size={16} className="text-gray-600" />,
          status: "available" as const,
        },
        {
          name: "Pass Inventory",
          icon: <CarIcon size={16} className="text-gray-600" />,
          status: "available" as const,
        },
      ],
    },
    {
      icon: <CalculatorIcon size={24} className="bg-orange-600 text-white" />,
      title: "Accounting",
      description: "Manage Finances and Accounting",
      iconBgColor: "bg-orange-100",
      items: [
        {
          name: "QuickBooks",
          icon: <CalculatorIcon size={16} className="text-gray-600" />,
          status: "connected" as const,
        },
        {
          name: "Xero",
          icon: <CalculatorIcon size={16} className="text-gray-600" />,
          status: "available" as const,
        },
        {
          name: "FreshBooks",
          icon: <CalculatorIcon size={16} className="text-gray-600" />,
          status: "available" as const,
        },
      ],
    },
    {
      icon: <MegaPhoneIcon size={24} className="bg-orange-600 text-white" />,
      title: "Marketing",
      description: "Boost your Marketing Efforts",
      iconBgColor: "bg-orange-100",
      items: [
        {
          name: "SMS Gateway",
          icon: <MegaPhoneIcon size={16} className="text-gray-600" />,
          status: "connected" as const,
        },
        {
          name: "Email Marketing",
          icon: <MegaPhoneIcon size={16} className="text-gray-600" />,
          status: "available" as const,
        },
        {
          name: "Google Ads",
          icon: <MegaPhoneIcon size={16} className="text-gray-600" />,
          status: "available" as const,
        },
      ],
    },
    {
      icon: <POSIcon size={24} className="bg-orange-600 text-white" />,
      title: "POS",
      description: "Point of Sale and Payment Systems",
      iconBgColor: "bg-orange-100",
      items: [
        {
          name: "Square",
          icon: <SquareIcon size={16} className="text-gray-600" />,
          status: "connected" as const,
        },
        {
          name: "Stripe",
          icon: <StripeIcon size={16} />,
          status: "available" as const,
        },
        {
          name: "PayPal",
          icon: <PaypalIcon size={16} />,
          status: "available" as const,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full p-0">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h1>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} {...integration} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
