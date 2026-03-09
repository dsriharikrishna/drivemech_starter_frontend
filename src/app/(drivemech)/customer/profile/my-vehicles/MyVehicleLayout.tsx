"use client";

import React, { useState, useCallback } from "react";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import DefaultVehicleNote from "@/components/customer/profile/vehicles/DefaultVehicleNote";
import VehicleCard, {
  Vehicle,
} from "@/components/customer/profile/vehicles/VehicleCard";
import { useRouter } from "next/navigation";
import DeleteDialogBody from "@/components/modals/DeleteDialogBody";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import { Plus } from "phosphor-react";

export default function MyVehiclesLayout() {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      name: "Toyota Hilux 2021",
      regNo: "ABC-1234",
      insuranceDate: "July 30, 2025",
      lastServiceDate: "30 July 2025",
      image: "/images/vehicles/Toyota-Car.png",
      isDefault: true,
    },
    {
      id: "2",
      name: "Honda CBR 650R 2023",
      regNo: "XYZ-5678",
      insuranceDate: "July 30, 2025",
      lastServiceDate: "30 July 2025",
      image: "/images/vehicles/Honda-Bike.png",
    },
    {
      id: "3",
      name: "Ford F-150 2020",
      regNo: "DEF-9012",
      insuranceDate: "July 30, 2025",
      lastServiceDate: "30 July 2025",
      image: "/images/vehicles/Ford-Car.png",
    },
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = useCallback(() => {
    setVehicles((prev) => prev.filter((v) => v.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleSetDefault = useCallback((id: string) => {
    setVehicles((prev) => prev.map((v) => ({ ...v, isDefault: v.id === id })));
  }, []);

  const handleAddVehicle = useCallback(() => {
    router.push("/customer/profile/my-vehicles/add");
  }, [router]);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/customer/profile/my-vehicles/edit/${id}`);
    },
    [router]
  );

  const handleRemove = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDeleteId(null);
  }, []);

  return (
    <div className="p-3 bg-white rounded-xl space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Typography variant="h4" weight="semibold">
          My Vehicles
        </Typography>

        <Button
          variant="gradient"
          onClick={handleAddVehicle}
          className="text-xs"
        >
          <Plus size={16} weight="bold" className="mr-1" />
          Add Vehicle
        </Button>
      </div>

      {/* VEHICLES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      <DefaultVehicleNote />

      {/* DELETE DIALOG */}
      <Dialog isOpen={!!deleteId} onClose={handleCloseDialog}>
        <DialogBody className="max-h-[35vh] w-xl p-3">
          <DialogHeader title="Delete Vehicle" onClose={handleCloseDialog} />
          <DeleteDialogBody
            title="Delete Vehicle?"
            message="Are you sure you want to remove this vehicle from your account? This action cannot be undone."
            onCancel={handleCloseDialog}
            onConfirm={handleDeleteConfirm}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
}
