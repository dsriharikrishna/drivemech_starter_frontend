export default function CardPanel() {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4">

      <input placeholder="Card Number" className="border rounded-lg px-3 py-2" />

      <div className="grid grid-cols-2 gap-3">
        <input placeholder="MM/YY" className="border rounded-lg px-3 py-2" />
        <input placeholder="CVV" className="border rounded-lg px-3 py-2" />
      </div>

      <input placeholder="Name on Card" className="border rounded-lg px-3 py-2" />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" /> Save card for later use
      </label>

      <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
        Proceed to Pay $579
      </button>
    </div>
  );
}
