interface Props {
  active: string;
  onChange: (value: string) => void;
}

const tabs = [
  { id: "services", label: "Services", icon: "🛠️" },
  { id: "spares", label: "Spares", icon: "📦" },
  { id: "towing", label: "Towing", icon: "🚚" },
  { id: "insurance", label: "Insurance", icon: "🛡️" },
];

export default function OrdersFilterTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition
            ${
              active === tab.id
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
