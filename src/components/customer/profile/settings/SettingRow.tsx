"use client";

import Image from "next/image";
import Typography from "@/components/ui/Typography";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onChange,
  showDivider = true,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (val: boolean) => void;
  showDivider?: boolean;
}) {
  const isImagePath = icon.startsWith("/");

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-center px-3 py-2.5">
        {/* LEFT */}
        <div className="flex items-start gap-3">
          {isImagePath ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src={icon}
                alt={title}
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          ) : (
            <span className="text-lg">{icon}</span>
          )}

          <div>
            <Typography weight="semibold" className="text-xs">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="small" color="muted" className="text-[11px]">
                {subtitle}
              </Typography>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <ToggleSwitch
          checked={value}
          onChange={(checked) => onChange(checked)}
          size="md"
          variant="primary"
        />
      </div>

      {/* Divider */}
      {showDivider && <div className="border-t border-border" />}
    </>
  );
}
