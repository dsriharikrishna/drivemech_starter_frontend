"use client";

import React, { useCallback } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Check, ChevronDown, Pencil, Plus, Wallet } from "lucide-react";
import {
  AirConditioningIcon,
  AutoGlassIcon,
  BatteryIcon,
  ClutchIcon,
  OilLeakIcon,
  RoadworthyIcon,
  SparkPlugIcon,
  SuspensionIcon,
  TimingBeltIcon,
  TransmissionIcon,
  WheelsIcon,
} from "@/components/icons/ServiceIcons";
import { EditIcon } from "@/components/icons/ManagementModuleIcons";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";

const WorkshopServicesBrands = () => {
  const methods = useFormContext();
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "pricingRows",
  });

  // Initialize with default row if empty
  React.useEffect(() => {
    if (fields.length === 0) {
      append({
        id: `row-${Date.now()}-1`,
        make: "Kia",
        model: "All Models",
        serviceType: "Logbook",
        price: "350.00",
      });
      // ... more defaults if needed, but the UI is service-based now
    }
  }, []);

  const services = [
    { id: "logbook", label: "Logbook Service", icon: <RoadworthyIcon size={20} /> },
    { id: "basic", label: "Basic Service", icon: <RoadworthyIcon size={20} /> },
    { id: "breakdown", label: "Breakdown", icon: <RoadworthyIcon size={20} /> },
    { id: "ac", label: "Air Conditioning", icon: <AirConditioningIcon size={20} /> },
    { id: "inspection", label: "Roadworthy Inspection", icon: <RoadworthyIcon size={20} /> },
    { id: "glass", label: "Auto Glass", icon: <AutoGlassIcon size={20} /> },
    { id: "spark", label: "Spark Plug", icon: <SparkPlugIcon size={20} /> },
    { id: "battery", label: "Battery", icon: <BatteryIcon size={20} /> },
    { id: "suspension", label: "Suspension and Steering", icon: <SuspensionIcon size={20} /> },
    { id: "brakes", label: "Brakes", icon: <ClutchIcon size={20} /> },
    { id: "timing", label: "Timing belt/chain", icon: <TimingBeltIcon size={20} /> },
    { id: "clutch", label: "Clutch", icon: <ClutchIcon size={20} /> },
    { id: "transmission", label: "Transmission / Differential", icon: <TransmissionIcon size={20} /> },
    { id: "oil", label: "Oil leak inspection", icon: <OilLeakIcon size={20} /> },
    { id: "tyres", label: "Wheels & Tyres", icon: <WheelsIcon size={20} /> },
    { id: "pre-purchase", label: "Pre-Purchase Inspection", icon: <RoadworthyIcon size={20} /> },
    { id: "tinting", label: "Window tinting", icon: <AutoGlassIcon size={20} /> },
    { id: "radiator", label: "Radiator", icon: <AirConditioningIcon size={20} /> },
  ];

  const brands = [
    {
      id: "hyundai",
      label: "Hyundai",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969028.png",
    },
    {
      id: "honda",
      label: "Honda",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969116.png",
    },
    {
      id: "kia",
      label: "Kia",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969168.png",
    },
    {
      id: "ford",
      label: "Ford",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969074.png",
    },
    {
      id: "fiat",
      label: "Fiat",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969071.png",
    },
    {
      id: "toyota",
      label: "Toyota",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969189.png",
    },
    {
      id: "vw",
      label: "Volkswagen",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969317.png",
    },
    {
      id: "nissan",
      label: "Nissan",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969190.png",
    },
    {
      id: "hyundai2",
      label: "Hyundai",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969028.png",
    },
    {
      id: "honda2",
      label: "Honda",
      icon: "https://cdn-icons-png.flaticon.com/512/5969/5969116.png",
    },
  ];

  const selectedServices = (watch("selectedServices") as string[]) || [];
  const selectedBrands = (watch("selectedBrands") as string[]) || [];

  const toggleService = useCallback(
    (id: string) => {
      const current = [...selectedServices];
      const index = current.indexOf(id);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(id);
      }
      setValue("selectedServices", current, { shouldValidate: true });
    },
    [selectedServices, setValue]
  );

  const toggleBrand = useCallback(
    (id: string) => {
      const current = [...selectedBrands];
      const index = current.indexOf(id);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(id);
      }
      setValue("selectedBrands", current, { shouldValidate: true });
    },
    [selectedBrands, setValue]
  );

  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [isPricingExpanded, setIsPricingExpanded] = React.useState(true);

  // Calculate which brands have prices added for the display
  const brandsWithPrices = brands.filter(b => selectedBrands.includes(b.id));

  const columns = [
    {
      key: "serviceType",
      header: "Service",
      render: (item: any) => (
        <span className="font-medium text-gray-900">{item.serviceType}</span>
      ),
    },
    {
      key: "sedan",
      header: "Sedan",
      render: (item: any) => editingRowId === item.id ? (
        <div className="flex items-center gap-1">
          <span className="text-gray-400">$</span>
          <input
            type="text"
            className="w-20 px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm"
            defaultValue={item.sedan}
          />
        </div>
      ) : (
        <span>$ {item.sedan || "12"}</span>
      ),
    },
    {
      key: "hatchback",
      header: "Hatchback",
      render: (item: any) => editingRowId === item.id ? (
        <div className="flex items-center gap-1">
          <span className="text-gray-400">$</span>
          <input
            type="text"
            className="w-20 px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm"
            defaultValue={item.hatchback}
          />
        </div>
      ) : (
        <span>$ {item.hatchback || "123"}</span>
      ),
    },
    {
      key: "suv",
      header: "SUV",
      render: (item: any) => editingRowId === item.id ? (
        <div className="flex items-center gap-1">
          <span className="text-gray-400">$</span>
          <input
            type="text"
            className="w-20 px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-orange-500 focus:outline-none text-sm"
            defaultValue={item.suv}
          />
        </div>
      ) : (
        <span>$ {item.suv || "1234"}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right" as const,
      render: (item: any) => (
        <button
          type="button"
          onClick={() => setEditingRowId(editingRowId === item.id ? null : item.id)}
          className="hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
        >
          {editingRowId === item.id ? (
            <Check size={18} className="text-green-600" />
          ) : (
            <Pencil size={16} className="text-gray-400 hover:text-gray-900" />
          )}
        </button>
      ),
    },
  ];

  const tableData = services
    .filter(s => selectedServices.includes(s.id))
    .map(s => ({
      id: s.id,
      serviceType: s.label,
      sedan: "12",
      hatchback: "123",
      suv: "1234",
    }));

  return (
    <Accordion
      title="Brands & Services Offered"
      icon={<SparkPlugIcon size={24} />}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      actionButton={
        <button
          type="button"
          className="bg-[#F97316] text-white px-6 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <EditIcon size={16} className="text-white brightness-0 invert" />
          Edit
        </button>
      }
    >
      <div className="space-y-6">
        {/* Services Selection Section */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <RoadworthyIcon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Select services you provide</h4>
              <p className="text-sm text-gray-400">Choose the services your workshop provides</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all bg-white group ${isSelected ? "border-red-400 shadow-sm" : "border-gray-100 hover:border-gray-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {service.icon}
                    <span className={`text-sm font-medium ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                      {service.label}
                    </span>
                  </div>
                  {isSelected ? (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  ) : (
                    <ChevronDown size={14} className="text-gray-400 -rotate-90" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brands Selection Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <SuspensionIcon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Select Brand For Bulk Pricing</h4>
              <p className="text-sm text-gray-400">First, select the brands you service. Then, you can add bulk pricing for them.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {brands.map((brand) => {
              const isSelected = selectedBrands.includes(brand.id);
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => toggleBrand(brand.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all w-20 h-20 ${isSelected ? "border-green-400 bg-green-50/30" : "border-gray-100 bg-white"
                    }`}
                >
                  <div className="relative">
                    <img src={brand.icon} alt={brand.label} className="w-10 h-10 object-contain" />
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Check size={8} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-2">{brand.label}</span>
                </button>
              );
            })}
            <button type="button" className="flex flex-col items-center justify-center p-2 rounded-xl border border-gray-100 bg-gray-50 w-20 h-20">
              <span className="text-xs font-medium text-gray-500">Others</span>
            </button>
          </div>

          {/* Pricing Sub-Section using Accordion */}
          <Accordion
            title="Prices Added for"
            icon={
              <div className="flex items-center gap-1">
                {brandsWithPrices.map(brand => (
                  <img key={brand.id} src={brand.icon} alt={brand.label} className="w-5 h-5 object-contain" />
                ))}
              </div>
            }
            isExpanded={isPricingExpanded}
            onToggle={() => setIsPricingExpanded(!isPricingExpanded)}
            className="!p-0 border border-gray-100 bg-transparent"
            headerClassName="bg-[#F8FAFC]/50 text-gray-500 hover:bg-[#F1F5F9] border-none py-2 rounded-xl"
          >
            <div className="bg-white rounded-lg overflow-hidden border border-gray-100 -mt-2" style={{ height: "calc(100vh - 250px)" }}>
              <Table
                columns={columns}
                data={tableData}
                keyExtractor={(item) => item.id}
                hoverable
                striped={false}
                className="h-full"
                style={{ height: "100%" }}
              />
            </div>
          </Accordion>
        </div>
      </div>
    </Accordion>
  );
};

export default WorkshopServicesBrands;
