"use client";

import Typography from "@/components/ui/Typography";
import Divider from "@/components/ui/Divider";

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
      <div className="bg-gray-50 px-4 py-3 border-b border-border">
        <Typography weight="semibold">{title}</Typography>
      </div>

      {/* CONTENT (rows) */}
      <div className="w-full">{children}</div>
    </div>
  );
}
