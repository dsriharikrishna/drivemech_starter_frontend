import { CheckCircle } from "phosphor-react";
import { useCallback } from "react";

export function ClaimSubmitted({
  claimId,
  claimType,
  amount,
  date,
  onDone,
}: {
  claimId: string;
  claimType: string;
  amount?: number | string | null;
  date?: string | null;
  onDone?: () => void;
}) {
  const formattedAmount =
    amount && !isNaN(Number(amount))
      ? `$${Number(amount).toFixed(2)}`
      : "$0.00";

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText(claimId);
    (window as any).addToast("success", "Copied!");
  }, [claimId]);

  return (
    <div className="sm:w-2xl md-w-3xl mx-auto">
      {/* HEADER BANNER */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-green-400 to-green-300 text-white text-center py-10">
        <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <CheckCircle className="text-white" size={32} />
        </div>
        <h2 className="text-xl font-semibold">Claim Submitted!</h2>
        <p className="mt-1.5 text-white/90 text-xs">
          We'll process your claim shortly
        </p>
      </div>

      {/* DETAILS CARD */}
      <div className="mt-4 bg-white border rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Claim ID</p>
            <p className="font-semibold text-lg text-orange-600">{claimId}</p>
            <p className="text-xs text-gray-500">Save this for tracking</p>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-orange-50 text-orange-600 border rounded-md hover:bg-orange-100 text-xs"
          >
            Copy
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-700">
          <div>
            <p className="text-xs text-gray-500">Claim Type</p>
            <p className="font-medium">{claimType}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Claim Amount</p>
            <p className="font-medium text-orange-600">{formattedAmount}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Incident Date</p>
            <p className="font-medium">{date ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Policy ID</p>
            <p className="font-medium">GEICO-PL-2024-0015</p>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mt-4 bg-blue-50 border rounded-xl p-3">
        <p className="font-semibold text-xs">Claim Processing Timeline</p>
        <ol className="mt-2.5 space-y-1.5 text-xs text-gray-700">
          <li> 1. Claim Submitted — Your claim has been received</li>
          <li>2. Document Verification (1–2 days)</li>
          <li>3. Claim Assessment (3–5 days)</li>
          <li>4. Claim Settlement (2–3 days)</li>
        </ol>
        <p className="mt-2.5 text-xs text-gray-600">
          Total Time: ~7–10 business days
        </p>
      </div>

      {/* BUTTONS */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          onClick={onDone}
          className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-xs"
        >
          Done
        </button>

        <button
          onClick={() => alert("Track claim page coming soon")}
          className="w-full py-2.5 rounded-xl border text-xs"
        >
          View Claim Status
        </button>
      </div>
    </div>
  );
}
