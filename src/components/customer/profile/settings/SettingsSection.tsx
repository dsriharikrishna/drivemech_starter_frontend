"use client";

import Typography from "@/components/ui/Typography";

export default function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-white">
      {/* HEADER */}
      <div className="bg-gray-50 px-3 py-2.5 border-b border-border">
        <Typography weight="semibold" className="text-xs">
          {title}
        </Typography>
      </div>

      {/* CONTENT (rows) */}
      <div className="w-full">{children}</div>
    </div>
  );
}
