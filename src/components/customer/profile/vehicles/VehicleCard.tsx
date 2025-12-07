"use client";

import Image from "next/image";
import { PencilSimple, Trash, CheckCircle } from "phosphor-react";

export interface Vehicle {
  id: string;
  name: string;
  regNo: string;
  insuranceDate: string;
  lastServiceDate: string;
  image: string;
  isDefault?: boolean;
}

interface Props {
  vehicle: Vehicle;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  onEdit,
  onRemove,
  onSetDefault,
}: Props) {
  return (
    <div
      className={`relative rounded-2xl bg-white p-2 border transition-all
      ${
        vehicle.isDefault
          ? "border-orange-400 shadow-[0_0_0_2px_rgba(255,122,26,0.25)]"
          : "border-gray-200 hover:shadow-sm"
      }`}
    >

      {/* Default Badge */}
      {vehicle.isDefault && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle size={14} weight="fill" />
          Default
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shadow-sm">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-base font-semibold">{vehicle.name}</span>
          <span className="text-sm text-gray-500">{vehicle.regNo}</span>
        </div>
      </div>

      {/* Info Rows */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-sm text-gray-500">Insurance</p>
          <p className="font-semibold mt-1">{vehicle.insuranceDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Service</p>
          <p className="font-semibold mt-1">{vehicle.lastServiceDate}</p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-3 mt-6">

        {/* Set Default (only if NOT default) */}
        {!vehicle.isDefault && (
          <button
            onClick={() => onSetDefault?.(vehicle.id)}
            className="flex-1 rounded-lg border bg-gray-50 text-gray-700 py-2.5 text-sm 
            hover:bg-gray-100 transition"
          >
            Set as Default
          </button>
        )}

        {/* Edit Button */}
        <button
          onClick={() => onEdit?.(vehicle.id)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          <PencilSimple size={16} />
          Edit
        </button>

        {/* Remove Button */}
        <button
          onClick={() => onRemove?.(vehicle.id)}
          className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-600 hover:bg-red-100 transition"
        >
          <Trash size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}
