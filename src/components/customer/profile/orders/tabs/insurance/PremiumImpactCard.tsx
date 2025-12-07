"use client";

import CustomCard from "@/components/ui/CustomCard";
import Typography from "@/components/ui/Typography";

export default function PremiumImpactCard({
  currentPremium,
  newPremium,
  difference,
}:any) {
  return (
    <CustomCard className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
      <Typography weight="semibold">💲 Premium Impact</Typography>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Current Premium:</span>
          <span>${currentPremium}/year</span>
        </div>

        <div className="flex justify-between">
          <span>New Premium:</span>
          <span className="text-purple-700">${newPremium}/year</span>
        </div>

        <div
          className={`flex justify-between font-semibold ${
            difference > 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          <span>Difference:</span>
          <span>{difference > 0 ? "+" : ""}${difference}/year</span>
        </div>
      </div>
    </CustomCard>
  );
}
