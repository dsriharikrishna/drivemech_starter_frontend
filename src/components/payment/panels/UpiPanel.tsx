interface Props {
  upiId: string;
  setUpiId: (value: string) => void;
}

export default function UpiPanel({ upiId, setUpiId }: Props) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4">

      <p className="font-medium">Add New UPI ID</p>

      <div className="flex gap-3">
        <input
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
          placeholder="Enter UPI ID"
        />

        <button className="bg-orange-500 text-white px-4 rounded-lg">
          Verify
        </button>
      </div>

      <button className="bg-gray-200 text-gray-500 px-6 py-2 rounded-lg">
        Proceed to Pay $579
      </button>
    </div>
  );
}
