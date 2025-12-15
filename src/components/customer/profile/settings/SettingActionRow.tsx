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
  const isImagePath = icon.startsWith('/');

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        {/* LEFT */}
        <div className="flex items-start gap-4">
          {isImagePath ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src={icon} alt={title} width={24} height={24} className="object-contain" />
            </div>
          ) : (
            <span className="text-xl">{icon}</span>
          )}

          <div>
            <Typography weight="semibold" className={titleClass}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="small" color="muted">
                {subtitle}
              </Typography>
            )}
          </div>
        </div>

        {/* ACTION CTA */}
        <button className={`${actionClass} text-sm hover:underline`}>
          {actionLabel}
        </button>
      </div>

      {showDivider && <div className="border-t border-border" />}
    </>
  );
}
