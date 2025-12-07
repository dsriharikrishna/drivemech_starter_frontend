"use client";

import React, { useState } from "react";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import DefaultVehicleNote from "@/components/customer/profile/vehicles/DefaultVehicleNote";
import VehicleCard, { Vehicle } from "@/components/customer/profile/vehicles/VehicleCard";
import { useRouter } from "next/navigation";
import DeleteDialogBody from "@/components/modals/DeleteDialogBody";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";

export default function MyVehiclesLayout() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([
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
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleDeleteConfirm() {
    setVehicles((prev) => prev.filter((v) => v.id !== deleteId));
    setDeleteId(null);
  }

  function handleSetDefault(id: string) {
    setVehicles((prev) =>
      prev.map((v) => ({ ...v, isDefault: v.id === id }))
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Typography variant="h4" weight="semibold">My Vehicles</Typography>

        <Button variant="gradient" startIcon="➕" onClick={() => router.push("/customer/profile/my-vehicles/add")}>
          Add New Vehicle
        </Button>
      </div>

      {/* VEHICLES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={(id) => router.push(`/customer/profile/my-vehicles/edit/${id}`)}
            onRemove={(id) => setDeleteId(id)}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      <DefaultVehicleNote />

      {/* DELETE DIALOG */}
      <Dialog isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogBody className="max-h-[35vh] w-xl p-4">
          <DialogHeader title="Delete Vehicle" onClose={() => setDeleteId(null)} />
          <DeleteDialogBody
            title="Delete Vehicle?"
            message="Are you sure you want to remove this vehicle from your account? This action cannot be undone."
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDeleteConfirm}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
}
