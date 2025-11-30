import { UseFormReturn } from "react-hook-form";
import { AddOnService } from "@/types/select-service";
import { Plus } from "lucide-react";

interface Props {
  form: UseFormReturn<any>;
  addOns?: AddOnService[];
  onAddOnToggle?: (addOnId: string, isSelected: boolean) => void;
  maxSelections?: number;
  showPrices?: boolean;
  layout?: 'grid' | 'list';
}

export default function AddOns({ 
  form, 
  addOns = [], 
  onAddOnToggle,
  maxSelections,
  showPrices = true,
  layout = 'grid'
}: Props) {
  const selected = form.watch("addOns") || [];

  const handleToggleAddOn = (id: string) => {
    // Check max selections limit
    if (maxSelections && selected.length >= maxSelections && !selected.includes(id)) {
      return;
    }

    // Update form state
    const exists = selected.includes(id);
    const newSelection = exists
      ? selected.filter((x: string) => x !== id)
      : [...selected, id];
    
    form.setValue("addOns", newSelection);

    // Call custom handler if provided
    if (onAddOnToggle) {
      onAddOnToggle(id, !exists);
    }
  };

  const isMaxSelectionsReached = Boolean(maxSelections && selected.length >= maxSelections);

  const AddOnCard = ({ service }: { service: AddOnService }) => {
    const isSelected = selected.includes(service.id);
    const isDisabled = isMaxSelectionsReached && !isSelected;

    return (
      <button
        key={service.id}
        onClick={() => handleToggleAddOn(service.id)}
        disabled={isDisabled}
        className={`flex items-center justify-between p-3 rounded-lg border transition-all
          ${isSelected 
            ? "border-orange-400 bg-orange-50" 
            : isDisabled
            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
            : "border-gray-300 bg-white hover:border-orange-300 hover:bg-orange-50/50"
          }`}
        aria-disabled={isDisabled}
      >
        <div className="flex items-center gap-2">
          {service.icon && (
            <img src={service.icon} className="w-5 h-5" alt={service.name} />
          )}
          <span className="text-sm font-medium">{service.name}</span>
        </div>

        {showPrices && (
          <div className="flex items-center gap-1">
            <Plus className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">${service.price}</span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">Add-On Services</p>
        {maxSelections && (
          <span className="text-sm text-gray-500">
            {selected.length} / {maxSelections} selected
          </span>
        )}
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {addOns.map((service) => (
            <AddOnCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {addOns.map((service) => (
            <AddOnCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {isMaxSelectionsReached && (
        <p className="text-sm text-orange-600 mt-2">
          Maximum {maxSelections} add-ons selected
        </p>
      )}
    </div>
  );
}
