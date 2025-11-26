'use client';

import { useState } from "react";
import { Workshop } from "@/types/workshops";
import ModalDropdown from "@/components/ui/DropDown";
import WorkshopMap from "./WorkshopMap";
import WorkshopCardSmall from "./WorkshopCardSmall";

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

export default function WorkShopSidebar({ workshops }: { workshops: Workshop[] }) {
  const [selectedDistance, setSelectedDistance] = useState<DropdownItem | null>(null);
  const [selectedMechanic, setSelectedMechanic] = useState<DropdownItem | null>(null);

  const distanceOptions: DropdownItem[] = [
    { id: "1", name: "1 km" },
    { id: "3", name: "3 km" },
    { id: "5", name: "5 km" },
    { id: "10", name: "10 km" },
  ];

  const mechanicOptions: DropdownItem[] = [
    { id: "engine", name: "Engine" },
    { id: "ac", name: "AC Repair" },
    { id: "wheel", name: "Wheel Alignment" },
    { id: "battery", name: "Battery" },
  ];

  return (
    <aside className="w-full space-y-5 relative z-40">
      {/* Filters */}
      <div className="flex gap-3 relative z-50">
        <ModalDropdown
          items={distanceOptions}
          selectedItem={selectedDistance}
          onSelect={setSelectedDistance}
          placeholder="Distance From You"
          className="min-w-[140px]"
        />

        <ModalDropdown
          items={mechanicOptions}
          selectedItem={selectedMechanic}
          onSelect={setSelectedMechanic}
          placeholder="Mechanic Type"
          className="min-w-[140px]"
        />
      </div>

      <div className="relative">
        <WorkshopMap workshops={workshops} />
      </div>

      {/* Recommended */}
      <h3 className="text-gray-900 font-semibold mt-4">
        Recommended Workshops
      </h3>

      <div className="space-y-4">
        {workshops.map((w) => (
          <WorkshopCardSmall key={w.id} workshop={w} />
        ))}
      </div>

    </aside>
  );
}
