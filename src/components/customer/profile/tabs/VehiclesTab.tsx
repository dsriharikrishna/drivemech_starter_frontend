import React from "react";
import DefaultVehicleNote from "../vehicles/DefaultVehicleNote";
import VehicleCard, { Vehicle } from "../vehicles/VehicleCard";
import AddVehicleForm from "../vehicles/AddVehicleForm";


export default function VehiclesTab() {

  const [isAdding, setIsAdding] = React.useState(false);

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

  const handleEdit = (id: string) => console.log("Edit", id);
  const handleRemove = (id: string) => console.log("Remove", id);
  const handleSetDefault = (id: string) => console.log("Set default", id);

  const handleAddVehicle = () => {
    console.log("Add Vehicle");
    setIsAdding(true);

  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Vehicles</h2>

        <button onClick={handleAddVehicle} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ➕ Add Vehicle
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {vehicles.map((v) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onSetDefault={handleSetDefault}
          />
        ))}
      </div>

      {/* Default Vehicle Note */}
      <div className="mt-6">
        <DefaultVehicleNote />
      </div>

      {isAdding && (
        <AddVehicleForm />
      )}
    </div>
  );
}
