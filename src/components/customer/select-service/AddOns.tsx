import { UseFormReturn } from "react-hook-form";
import { AddOnService } from "@/types/customer/services/select-service";
import { Plus, Check } from "lucide-react";
import { SelectServiceFormData } from "@/schemas/customer/selectService.schema";

interface Props {
  form: UseFormReturn<SelectServiceFormData>;
  addOns?: AddOnService[];
  onAddOnToggle?: (addOnId: string, isSelected: boolean) => void;
  maxSelections?: number;
  showPrices?: boolean;
  layout?: "grid" | "list";
}

export default function AddOns({
  form,
  addOns = [],
  onAddOnToggle,
  maxSelections,
  showPrices = true,
  layout = "grid",
}: Props) {
  const selected = form.watch("addOns") || [];

  const handleToggleAddOn = (id: string) => {
    // Check max selections limit
    if (
      maxSelections &&
      selected.length >= maxSelections &&
      !selected.includes(id)
    ) {
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

  const isMaxSelectionsReached = Boolean(
    maxSelections && selected.length >= maxSelections
  );

  const AddOnCard = ({ service }: { service: AddOnService }) => {
    const isSelected = selected.includes(service.id);
    const isDisabled = isMaxSelectionsReached && !isSelected;

    return (
      <button
        key={service.id}
        onClick={() => handleToggleAddOn(service.id)}
        disabled={isDisabled}
        type="button"
        className={`flex items-center justify-between p-2.5 rounded-lg border transition-all bg-white
          ${
            isSelected
              ? "border-orange-500 text-orange-500"
              : isDisabled
                ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50 text-gray-400"
                : "border-orange-300 text-gray-900 hover:border-orange-400 hover:bg-orange-50/50"
          }`}
        aria-disabled={isDisabled}
      >
        <div className="flex items-center gap-2">
          {service.icon && (
            <img
              src={service.icon}
              className="w-4 h-4"
              style={{
                filter: isSelected
                  ? "invert(55%) sepia(89%) saturate(2476%) hue-rotate(0deg) brightness(102%) contrast(101%)"
                  : "none",
              }}
              alt={service.name}
            />
          )}
          <span className="text-xs font-medium">{service.name}</span>
        </div>

        {showPrices && (
          <div className="flex items-center gap-1">
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">${service.price}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-medium">${service.price}</span>
              </>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="p-3 border border-gray-200 rounded-xl bg-white">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">Add-On Services</p>
        {maxSelections && (
          <span className="text-xs text-gray-500">
            {selected.length} / {maxSelections} selected
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-3">
        Enhance your service with these additional options.
      </p>

      {layout === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {addOns.map((service) => (
            <AddOnCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {addOns.map((service) => (
            <AddOnCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {isMaxSelectionsReached && (
        <p className="text-xs text-orange-600 mt-2">
          Maximum {maxSelections} add-ons selected
        </p>
      )}
    </div>
  );
}
