import { UseFormReturn } from "react-hook-form";
import { AddOnService } from "@/types/select-service";
import { Plus } from "lucide-react";

interface Props {
  form: UseFormReturn<any>;
  addOns: AddOnService[];
}

export default function AddOns({ form, addOns }: Props) {
  const selected = form.watch("addOns") || [];

  const toggleAddOn = (id: string) => {
    const exists = selected.includes(id);

    if (exists) {
      form.setValue(
        "addOns",
        selected.filter((x: string) => x !== id)
      );
    } else {
      form.setValue("addOns", [...selected, id]);
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white">
      <p className="font-medium mb-3">Add-On Services</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {addOns.map((service) => {
          const isSelected = selected.includes(service.id);

          return (
            <button
              key={service.id}
              onClick={() => toggleAddOn(service.id)}
              className={`flex items-center justify-between p-3 rounded-lg border 
                ${isSelected ? "border-orange-400 bg-orange-50" : "border-gray-300 bg-white"}`}
            >
              <div className="flex items-center gap-2">
                <img src={service.icon} className="w-5 h-5" />
                <span>{service.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Plus className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">${service.price}</span>
              </div>
            </button>
          );
        })}

      </div>

    </div>
  );
}
