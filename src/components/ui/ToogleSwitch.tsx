// components/ToggleSwitch.tsx
import { FC } from "react";
import { Controller } from "react-hook-form";

type ToggleSize = "sm" | "md" | "lg";
type ToggleVariant = "primary" | "success" | "danger" | "warning" | "info";

export type ToggleSwitchProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;

  label?: string;
  description?: string;

  size?: ToggleSize;
  color?: string;        // tailwind class like "blue-600"
  variant?: ToggleVariant; // predefined color system

  className?: string;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked = false,
  onChange,
  label,
  description,
  size = "md",
  color,
  variant = "primary",
  className = "",
}) => {
  // -------------------------
  // SIZE MAP
  // -------------------------
  const sizeMap = {
    sm: { track: "w-8 h-4", knob: "w-3 h-3", translate: "translate-x-4" },
    md: { track: "w-10 h-5", knob: "w-4 h-4", translate: "translate-x-5" },
    lg: { track: "w-12 h-6", knob: "w-5 h-5", translate: "translate-x-6" },
  };
  const s = sizeMap[size];

  // -------------------------
  // VARIANT COLORS (STATIC)
  // -------------------------
  const variantMap = {
    primary: "bg-orange-600",
    success: "bg-green-600",
    danger: "bg-red-600",
    warning: "bg-yellow-500",
    info: "bg-teal-600",
  };

  const onColor = color ? `bg-${color}` : variantMap[variant];
  const offColor = "bg-gray-300";

  return (
    <label className={`flex items-center justify-between cursor-pointer ${className}`}>
      {/* Text content */}
      {(label || description) && (
        <div className="ml-3 select-none">
          {label && (
            <p className="text-sm font-medium text-heading">{label}</p>
          )}

          {description && (
            <p className="text-xs text-neutral-secondary mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      {/* Toggle */}
      <div className="pt-[2px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          // className="sr-only peer"
          className="absolute opacity-0 w-0 h-0 peer"

        />

        <div
          className={`
            relative rounded-full transition-colors duration-300
            ${s.track}
            ${checked ? onColor : offColor}
          `}
        >
          <div
            className={`
              absolute bg-white rounded-full shadow transition-transform duration-300
              top-[2px] left-[2px] ${s.knob}
              ${checked ? s.translate : ""}
            `}
          />
        </div>
      </div>


    </label>
  );
};

export type ControlledToggleSwitchProps = {
  name: string;
  label?: string;
  description?: string;
  size?: ToggleSize;
  color?: string;
  variant?: ToggleVariant;
  className?: string;
};

export const ControlledToggleSwitch: FC<ControlledToggleSwitchProps> = ({
  name,
  label,
  description,
  size = "md",
  color,
  variant = "primary",
  className = "",
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <ToggleSwitch
          checked={field.value}
          onChange={field.onChange}
          label={label}
          description={description}
          size={size}
          color={color}
          variant={variant}
          className={className}
        />
      )}
    />
  );
};

export default ToggleSwitch;