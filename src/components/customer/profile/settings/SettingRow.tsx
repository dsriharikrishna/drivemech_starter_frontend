"use client";

import Image from "next/image";
import Typography from "@/components/ui/Typography";
import ToggleSwitch from "@/components/ui/ToogleSwitch";

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
    const isImagePath = icon.startsWith('/');

    return (
        <>
            <div className="grid grid-cols-[1fr_auto] items-center px-4 py-3">
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
                        <Typography weight="semibold">{title}</Typography>
                        {subtitle && (
                            <Typography variant="small" color="muted">
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




