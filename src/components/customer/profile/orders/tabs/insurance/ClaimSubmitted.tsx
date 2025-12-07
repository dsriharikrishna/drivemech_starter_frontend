import { CheckCircle } from "phosphor-react";

export function ClaimSubmitted({
  claimId,
  claimType,
  amount,
  date,
  onDone,
}: {
  claimId: string;
  claimType: string;
  amount?: number | null;
  date?: string | null;
  onDone?: () => void;
}) {
  return (
    <div className="sm:w-2xl md-w-3xl mx-auto">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-green-400 to-green-300 text-white text-center py-12">
        <div className="mx-auto w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <CheckCircle className="text-white" size={36} />
        </div>
        <h2 className="text-2xl font-semibold">Claim Submitted!</h2>
        <p className="mt-2 text-white/90">We'll process your claim shortly</p>
      </div>

      <div className="mt-6 bg-white border rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Claim ID</p>
            <p className="font-semibold text-xl text-orange-600">{claimId}</p>
            <p className="text-sm text-gray-500">Save this for tracking</p>
          </div>

          <div>
            <button
              onClick={() => {
                if (navigator.clipboard) navigator.clipboard.writeText(claimId);
                (window as any).addToast("success", "message copied successfully")
              }}
              className="px-4 py-2 bg-orange-50 text-orange-600 border rounded-md hover:bg-orange-100"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <div className="text-xs text-gray-500">Claim Type</div>
            <div className="font-medium">{claimType}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Claim Amount</div>
            <div className="font-medium text-orange-600">{amount ? `$${amount.toFixed(2)}` : "$0.00"}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Incident Date</div>
            <div className="font-medium">{date ?? "-"}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Policy ID</div>
            <div className="font-medium">GEICO-PL-2024-0015</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border rounded-xl p-4">
        <p className="font-semibold">Claim Processing Timeline</p>
        <ol className="mt-3 space-y-2 text-sm text-gray-700">
          <li>1. Claim Submitted — Your claim has been received</li>
          <li>2. Document Verification (1-2 days)</li>
          <li>3. Claim Assessment (3-5 days)</li>
          <li>4. Claim Settlement (2-3 days)</li>
        </ol>
        <p className="mt-3 text-sm text-gray-600">Total Time: ~7–10 business days</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (onDone) onDone();
          }}
          className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold"
        >
          Done
        </button>

        <button
          onClick={() => {
            window.alert("Open claim tracking (placeholder)");
          }}
          className="w-full py-3 rounded-xl border"
        >
          View Claim Status
        </button>
      </div>
    </div>
  );
}