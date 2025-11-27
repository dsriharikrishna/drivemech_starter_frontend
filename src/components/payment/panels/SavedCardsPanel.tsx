import { SavedCard } from "@/types/payment";

interface Props {
  cards: SavedCard[];
  selected: string;
  setSelected: (id: string) => void;
}

export default function SavedCardsPanel({ cards, selected, setSelected }: Props) {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-4">

      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => setSelected(card.id)}
          className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer
            ${selected === card.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          `}
        >
          <input type="radio" checked={selected === card.id} readOnly />

          <div className="flex-1">
            <p className="font-medium">{card.bankName} {card.masked}</p>
            <span className="text-xs text-gray-500">Expires {card.expiry}</span>
          </div>

          <button className="text-gray-400 hover:text-gray-600">🗑</button>
        </div>
      ))}

      {/* CVV + Pay */}
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="CVV"
          className="border rounded-lg px-3 py-2 w-32"
        />

        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
          Pay $579
        </button>
      </div>
    </div>
  );
}
