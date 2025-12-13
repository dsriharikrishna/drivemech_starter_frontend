import { UseFormReturn } from "react-hook-form";
import { SelectServiceFormData } from "@/schemas/customer/selectService.schema";

interface Props {
  form: UseFormReturn<SelectServiceFormData>;
  modes?: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
}

export default function ModeOfService({ form, modes = [] }: Props) {
  const mode = form.watch("mode");

  // Default modes if not provided
  const defaultModes = [
    { id: "pickup", label: "Pickup", description: "We'll pick up your vehicle" },
    { id: "walkin", label: "Walk In", description: "Visit our workshop directly" },
  ];

  const serviceModes = modes.length > 0 ? modes : defaultModes;

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white">
      <p className="font-medium mb-3">Mode Of Service</p>

      <div className="flex flex-col md:flex-row item-center flex-wrap gap-6">
        {serviceModes.map((serviceMode) => (
          <label key={serviceMode.id} className="flex-1 flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={serviceMode.id}
              {...form.register("mode")}
              checked={mode === serviceMode.id}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <div>
              <span className="font-medium text-gray-900">{serviceMode.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
