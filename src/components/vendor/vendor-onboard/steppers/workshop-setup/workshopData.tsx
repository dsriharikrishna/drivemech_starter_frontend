import React from "react";
import {
  Wrench,
  Wind,
  Zap,
  Disc,
  Settings,
  ClipboardCheck,
  Car,
  Shield,
  Battery,
  Clock,
  Droplet,
  Sun,
  AlertTriangle,
  Eye,
  Gauge,
  Thermometer,
  Disc3,
} from "lucide-react";

export interface SubService {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  hasSubServices: boolean;
  subServices?: SubService[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const servicesData: Service[] = [
  {
    id: "logbook",
    name: "Logbook Service",
    icon: <ClipboardCheck size={24} />,
    hasSubServices: false,
  },
  {
    id: "air-conditioning",
    name: "Air Conditioning",
    icon: <Wind size={24} />,
    hasSubServices: true,
    subServices: [
      { id: "ac-belt-adjustment", name: "AC Belt Adjustment" },
      { id: "ac-antibacterial-clean", name: "A/C Antibacterial Clean" },
      { id: "ac-compressor-replacement", name: "AC Compressor Replacement" },
      { id: "ac-condenser-replacement", name: "AC Condenser Replacement" },
      {
        id: "ac-low-pressure-hose",
        name: "AC Low Pressure Hose Replacement",
      },
      { id: "ac-pressure-switch", name: "AC Pressure Switch Replacement" },
      { id: "ac-compressor-belt", name: "AC Compressor Belt Replacement" },
      { id: "ac-compressor-hose", name: "AC Compressor Hose Replacement" },
      { id: "ac-compressor-repair", name: "AC Compressor Repair" },
      { id: "ac-console-vent-repair", name: "AC Console Vent Repair" },
      {
        id: "ac-console-vent-replacement",
        name: "AC Console Vent Replacement",
      },
      { id: "ac-control-panel-repair", name: "AC Control Panel Repair" },
      {
        id: "ac-control-panel-replacement",
        name: "AC Control Panel Replacement",
      },
      { id: "ac-evaporator-repair", name: "AC Evaporator Repair" },
      { id: "ac-evaporator-replacement", name: "AC Evaporator Replacement" },
      { id: "ac-heater-fan-repair", name: "AC Heater Fan Repair" },
      { id: "ac-heater-fan-replacement", name: "AC Heater Fan Replacement" },
      {
        id: "ac-heater-fan-resistor-repair",
        name: "AC Heater Fan Resistor Repair",
      },
      {
        id: "ac-heater-fan-resistor-replacement",
        name: "AC Heater Fan Resistor Replacement",
      },
      { id: "ac-o-ring-seals", name: "AC O Ring Seals Replacement" },
      { id: "ac-pipe-repair", name: "AC Pipe Repair" },
      { id: "ac-pipe-replacement", name: "AC Pipe Replacement" },
      { id: "ac-pollen-filter", name: "AC Pollen Filter Replacement" },
      { id: "ac-receiver-drier-repair", name: "AC Receiver Drier Repair" },
      {
        id: "ac-receiver-drier-replacement",
        name: "AC Receiver Drier Replacement",
      },
      { id: "ac-tx-valve-repair", name: "AC Tx Valve Repair" },
      { id: "ac-tx-valve-replacement", name: "AC Tx Valve Replacement" },
      { id: "ac-vent-repair", name: "AC Vent Repair" },
      { id: "ac-vent-replacement", name: "AC Vent Replacement" },
      { id: "ac-replacement", name: "Air Conditioning Replacement" },
      { id: "blower-motor-replacement", name: "Blower Motor Replacement" },
      { id: "cabin-filter-replacement", name: "Cabin Filter Replacement" },
      { id: "evaporator-repair", name: "Evaporator Repair" },
      { id: "evaporator-replacement", name: "Evaporator Replacement" },
      { id: "fan-speed-resistor", name: "Fan Speed Resistor Replacement" },
      { id: "regas-air-conditioning", name: "Re-gas Air-conditioning" },
      { id: "water-filter-replacement", name: "Water Filter Replacement" },
      { id: "ac-dye-test", name: "AC Dye Test" },
      { id: "ac-blendor-motor-repair", name: "AC Blendor Motor Repair" },
      { id: "ac-drain-hose-blocked", name: "A/C Drain Hose Blocked" },
      { id: "ac-compressor-relay", name: "AC Compressor Relay Replacement" },
      {
        id: "ac-high-pressure-hose",
        name: "AC High Pressure Hose Replacement",
      },
      { id: "ac-switch-replacement", name: "AC Switch Replacement" },
    ],
  },
  {
    id: "spark-plug",
    name: "Spark Plug",
    icon: <Zap size={24} />,
    hasSubServices: false,
  },
  {
    id: "brakes",
    name: "Brakes",
    icon: <Disc size={24} />,
    hasSubServices: false,
  },
  {
    id: "transmission",
    name: "Transmission / Differential",
    icon: <Settings size={24} />,
    hasSubServices: false,
  },
  {
    id: "pre-purchase",
    name: "Pre-Purchase Inspection",
    icon: <Eye size={24} />,
    hasSubServices: false,
  },
  {
    id: "basic-service",
    name: "Basic Service",
    icon: <Wrench size={24} />,
    hasSubServices: false,
  },
  {
    id: "roadworthy",
    name: "Roadworthy Inspection",
    icon: <Shield size={24} />,
    hasSubServices: false,
  },
  {
    id: "battery",
    name: "Battery",
    icon: <Battery size={24} />,
    hasSubServices: false,
  },
  {
    id: "timing-belt",
    name: "Timing belt/chain",
    icon: <Clock size={24} />,
    hasSubServices: false,
  },
  {
    id: "oil-leak",
    name: "Oil leak inspection",
    icon: <Droplet size={24} />,
    hasSubServices: false,
  },
  {
    id: "window-tinting",
    name: "Window tinting",
    icon: <Sun size={24} />,
    hasSubServices: false,
  },
  {
    id: "breakdown",
    name: "Breakdown",
    icon: <AlertTriangle size={24} />,
    hasSubServices: false,
  },
  {
    id: "auto-glass",
    name: "Auto Glass",
    icon: <Car size={24} />,
    hasSubServices: false,
  },
  {
    id: "suspension",
    name: "Suspension and Steering",
    icon: <Gauge size={24} />,
    hasSubServices: false,
  },
  {
    id: "clutch",
    name: "Clutch",
    icon: <Disc size={24} />,
    hasSubServices: false,
  },
  {
    id: "wheels-tyres",
    name: "Wheels & Tyres",
    icon: <Disc3 size={24} />,
    hasSubServices: false,
  },
  {
    id: "radiator",
    name: "Radiator",
    icon: <Thermometer size={24} />,
    hasSubServices: false,
  },
];

export const brandsData: Brand[] = [
  { id: "hyundai-1", name: "Hyundai", logo: "/images/brands/hyundai.png" },
  { id: "honda-1", name: "Honda", logo: "/images/brands/honda.png" },
  { id: "kia-1", name: "Kia", logo: "/images/brands/kia.png" },
  { id: "ford-1", name: "Ford", logo: "/images/brands/ford.png" },
  { id: "fiat-1", name: "Fiat", logo: "/images/brands/fiat.png" },
  { id: "hyundai-2", name: "Hyundai", logo: "/images/brands/hyundai.png" },
  { id: "honda-2", name: "Honda", logo: "/images/brands/honda.png" },
  { id: "kia-2", name: "Kia", logo: "/images/brands/kia.png" },
  { id: "ford-2", name: "Ford", logo: "/images/brands/ford.png" },
  { id: "fiat-2", name: "Fiat", logo: "/images/brands/fiat.png" },
  { id: "hyundai-3", name: "Hyundai", logo: "/images/brands/hyundai.png" },
  { id: "honda-3", name: "Honda", logo: "/images/brands/honda.png" },
  { id: "kia-3", name: "Kia", logo: "/images/brands/kia.png" },
  { id: "ford-3", name: "Ford", logo: "/images/brands/ford.png" },
  { id: "fiat-3", name: "Fiat", logo: "/images/brands/fiat.png" },
  { id: "hyundai-4", name: "Hyundai", logo: "/images/brands/hyundai.png" },
  { id: "honda-4", name: "Honda", logo: "/images/brands/honda.png" },
  { id: "kia-4", name: "Kia", logo: "/images/brands/kia.png" },
  { id: "ford-4", name: "Ford", logo: "/images/brands/ford.png" },
  { id: "fiat-4", name: "Fiat", logo: "/images/brands/fiat.png" },
  { id: "kia-5", name: "Kia", logo: "/images/brands/kia.png" },
  { id: "ford-5", name: "Ford", logo: "/images/brands/ford.png" },
  { id: "fiat-5", name: "Fiat", logo: "/images/brands/fiat.png" },
  { id: "hyundai-5", name: "Hyundai", logo: "/images/brands/hyundai.png" },
  { id: "honda-5", name: "Honda", logo: "/images/brands/honda.png" },
  { id: "kia-6", name: "Kia", logo: "/images/brands/kia.png" },
];
