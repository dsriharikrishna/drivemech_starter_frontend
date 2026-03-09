"use client";

import React, { useState } from "react";
import { Customer, CustomerFormValues } from "@/schemas/vendor/customer.schema";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  User,
  Car,
  FileText,
  DollarSign,
  FileSpreadsheet,
  Calendar,
  ClipboardCheck,
  Upload,
  Download,
} from "lucide-react";
import { PackageIcon, ReceiptMinusIcon } from "@/components/icons/InventoryIcons";
import { UserIcon } from "@/components/icons/ManagementModuleIcons";
import Button from "@/components/ui/Button";
import CustomerSupplierSection from "@/components/vendor/management/customers/invoices/CustomerSupplierSection";
import CustomerSupplierInvoicesSection from "@/components/vendor/management/customers/invoices/CustomerSupplierInvoicesSection";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type ExpandedSection = "customers" | "details" | null;

/* ---------------- COMPONENT ---------------- */

const CustomersInvoicesPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] =
    useState<ExpandedSection>("customers");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setExpandedSection("details");
  };

  const handleSaveCustomer = (data: CustomerFormValues) => {
    console.log("Save customer", data);
    setExpandedSection(null);
  };

  const sections = [
    {
      id: "customers" as ExpandedSection,
      icon: UserIcon,
      title: "Supplier",
      renderContent: () => (
        <div>
          <CustomerSupplierSection />
        </div>
      ),
    },
    {
      id: "details" as ExpandedSection,
      icon: ReceiptMinusIcon,
      title: "Supplier Invoices",
      headerAction: (
        <Button
          onClick={(e) => {
            if (e) e.stopPropagation();
            console.log("Add Invoice");
          }}
          variant="primary-blue"
          size="sm"
          startIcon={<Plus size={16} />}
        >
          Add
        </Button>
      ),
      renderContent: () => (
        <div>
          <CustomerSupplierInvoicesSection />
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full bg-white">
      <div className="p-2 flex flex-col gap-2 border border-gray-200 rounded-xl">
        {/* Top bar */}
        <div className="bg-blue-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageIcon size={20} />
            <span className="text-sm font-semibold text-gray-800">Customers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 ml-2 text-sm text-gray-500">
              <Button
                onClick={() => router.push("/vendor/management/customers")}
                className="hover:text-blue-600 transition-colors"
                variant="ghost"
                size="sm"
              >
                Customers
              </Button>
              <span className="text-gray-400">▶</span>
              <span className="text-blue-600 font-medium cursor-pointer">Edit</span>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2 p-2">
          {sections.map((section) => {
            const Icon = section.icon as any;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Section Header */}
                <div
                  className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors ${isExpanded ? "bg-blue-50 border-b border-gray-200" : ""
                    }`}
                >
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <Icon size={18} className="text-gray-900" />
                    <h2 className="text-base font-semibold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    {(section as any).headerAction}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-gray-600" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Section Content */}
                {isExpanded && (
                  <div className="bg-white">{section.renderContent()}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomersInvoicesPage;
