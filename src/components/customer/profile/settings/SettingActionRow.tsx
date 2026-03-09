"use client";

import Image from "next/image";
import Typography from "@/components/ui/Typography";

export default function SettingActionRow({
  icon,
  title,
  subtitle,
  actionLabel,
  actionClass = "text-orange-500",
  titleClass = "",
  showDivider = true,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  actionLabel: string;
  actionClass?: string;
  titleClass?: string;
  showDivider?: boolean;
}) {
  const isImagePath = icon.startsWith("/");

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2.5">
        {/* LEFT */}
        <div className="flex items-start gap-3">
          {isImagePath ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src={icon}
                alt={title}
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
          ) : (
            <span className="text-lg">{icon}</span>
          )}

          <div>
            <Typography weight="semibold" className={`text-xs ${titleClass}`}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="small" color="muted" className="text-[11px]">
                {subtitle}
              </Typography>
            )}
          </div>
        </div>

        {/* ACTION CTA */}
        <button className={`${actionClass} text-xs hover:underline`}>
          {actionLabel}
        </button>
      </div>

      {showDivider && <div className="border-t border-border" />}
    </>
  );
}
