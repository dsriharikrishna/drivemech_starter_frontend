"use client";

import React, { useState } from "react";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import DefaultVehicleNote from "@/components/customer/profile/vehicles/DefaultVehicleNote";
import VehicleCard, { Vehicle } from "@/components/customer/profile/vehicles/VehicleCard";
import { useRouter } from "next/navigation";

export default function MyVehiclesLayout() {

  const router = useRouter();

  const vehicles: Vehicle[] = [
    {
      id: "1",
      name: "Toyota Hilux 2021",
      regNo: "ABC-1234",
      insuranceDate: "July 30, 2025",
      lastServiceDate: "30 July 2025",
      image: "/vehicles/hilux.png",
      isDefault: true,
    },
    {
      id: "2",
      name: "Honda CBR 650R 2023",
      regNo: "XYZ-5678",
      insuranceDate: "July 30, 2025",
      lastServiceDate: "30 July 2025",
      image: "/vehicles/cbr650.png",
    },
    {
      id: "3",
      name: "Ford F-150 2020",
      regNo: "DEF-9012",
      insuranceDate: "July 30, 2025",
      lastServiceDate: "30 July 2025",
      image: "/vehicles/fordf150.png",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Typography variant="h4" weight="semibold">
          My Vehicles
        </Typography>

        <Button variant="gradient" startIcon="➕" onClick={() => {router.push("/customer/profile/my-vehicles/add")}}>
          Add New Vehicle
        </Button>
      </div>

      {/* VEHICLES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={(id) => console.log("Edit", id)}
            onRemove={(id) => console.log("Remove", id)}
            onSetDefault={(id) => console.log("SetDefault", id)}
          />
        ))}
      </div>

      <DefaultVehicleNote />
    </div>
  );
}
