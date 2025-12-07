"use client";

import CustomCard from "@/components/ui/CustomCard";
import Typography from "@/components/ui/Typography";

export default function PolicySummaryCard({ policy }:any) {
  return (
    <CustomCard className="p-5 rounded-xl border border-gray-200 bg-gray-300">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 bg-purple-500 rounded-full" />
        <Typography weight="semibold">Current Policy</Typography>
      </div>

      <div className="grid grid-cols-2 gap-y-3 text-sm">
        <div>
          <Typography color="muted">Type</Typography>
          <Typography weight="semibold">{policy.type}</Typography>
        </div>

        <div>
          <Typography color="muted">Premium</Typography>
          <Typography weight="semibold" className="text-purple-600">
            ${policy.premium}/year
          </Typography>
        </div>

        <div>
          <Typography color="muted">Coverage</Typography>
          <Typography weight="semibold">
            ${policy.coverage.toLocaleString()}
          </Typography>
        </div>

        <div>
          <Typography color="muted">Add-ons</Typography>
          <Typography weight="semibold">{policy.addons} active</Typography>
        </div>
      </div>
    </CustomCard>
  );
}
