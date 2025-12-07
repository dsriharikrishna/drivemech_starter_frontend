"use client";

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
    return (
        <>
            <div className="grid grid-cols-[1fr_auto] items-center px-4 py-3">
                {/* LEFT */}
                <div className="flex items-start gap-4">
                    <span className="text-xl">{icon}</span>

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




