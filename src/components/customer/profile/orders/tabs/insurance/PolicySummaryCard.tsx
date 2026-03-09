"use client";

import CustomCard from "@/components/ui/CustomCard";
import Typography from "@/components/ui/Typography";

export default function PolicySummaryCard({ policy }: any) {
  return (
    <CustomCard className="p-4 rounded-xl border border-gray-200 bg-gray-300">
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="w-2.5 h-2.5 bg-purple-500 rounded-full" />
        <Typography weight="semibold" className="text-xs">
          Current Policy
        </Typography>
      </div>

      <div className="grid grid-cols-2 gap-y-2.5 text-xs">
        <div>
          <Typography color="muted" className="text-xs">
            Type
          </Typography>
          <Typography weight="semibold" className="text-xs">
            {policy.type}
          </Typography>
        </div>

        <div>
          <Typography color="muted" className="text-xs">
            Premium
          </Typography>
          <Typography weight="semibold" className="text-purple-600 text-xs">
            ${policy.premium}/year
          </Typography>
        </div>

        <div>
          <Typography color="muted" className="text-xs">
            Coverage
          </Typography>
          <Typography weight="semibold" className="text-xs">
            ${policy.coverage.toLocaleString()}
          </Typography>
        </div>

        <div>
          <Typography color="muted" className="text-xs">
            Add-ons
          </Typography>
          <Typography weight="semibold" className="text-xs">
            {policy.addons} active
          </Typography>
        </div>
      </div>
    </CustomCard>
  );
}
