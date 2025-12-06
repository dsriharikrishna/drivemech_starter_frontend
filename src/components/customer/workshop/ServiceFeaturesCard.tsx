
export default function ServiceFeaturesCard() {
  const features = [
    "Periodic Services",
    "Exterior Wash",
    "Interior Cleaning",
    "AC Service",
    "Brakes",
    "Suspension",
  ];

  return (
    <div className="border-none shadow-none p-4">
      <h3 className="font-semibold mb-3 text-[15px]">What we do</h3>

      <div className="grid grid-cols-2 gap-y-2 text-sm">
        {features.map((item) => (
          <div key={item} className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
