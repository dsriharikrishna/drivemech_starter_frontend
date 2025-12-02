import Image from "next/image";

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
      className={`border rounded-2xl p-5 bg-white relative transition 
      ${
        vehicle.isDefault
          ? "border-orange-400 shadow-[0_0_0_2px_#ff7a1a40]"
          : "border-gray-200"
      }`}
    >
      {/* Default badge */}
      {vehicle.isDefault && (
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
          ✓ Default
        </div>
      )}

      {/* Vehicle Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg">{vehicle.name}</h3>
          <p className="text-sm text-gray-500">{vehicle.regNo}</p>
        </div>
      </div>

      {/* Insurance / Last Service */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-sm text-gray-400">Insurance</p>
          <p className="font-semibold">{vehicle.insuranceDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Last Service</p>
          <p className="font-semibold">{vehicle.lastServiceDate}</p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3 mt-6">
        {!vehicle.isDefault && (
          <button
            onClick={() => onSetDefault?.(vehicle.id)}
            className="flex-1 border bg-gray-50 text-gray-700 rounded-lg py-2 text-sm 
            hover:bg-gray-100 transition"
          >
            Set as Default
          </button>
        )}

        <button
          onClick={() => onEdit?.(vehicle.id)}
          className="border rounded-lg py-2 px-4 text-sm flex items-center gap-2 text-gray-700 hover:bg-gray-100"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onRemove?.(vehicle.id)}
          className="border border-red-300 bg-red-50 text-red-600 rounded-lg py-2 px-4 text-sm flex items-center gap-2 hover:bg-red-100"
        >
          🗑 Remove
        </button>
      </div>
    </div>
  );
}
