import Divider from "../ui/Divider";

export default function SparePartsSection() {
  const spareParts = [
    // First Row
    { title: "Alloys", image: "/images/spareparts/Alloys.png" },
    { title: "Engine Parts", image: "/images/spareparts/EngineParts.png" },
    { title: "Lighting", image: "/images/spareparts/Lighting.png" },
    { title: "Brakes", image: "/images/spareparts/Brakes.png" },
    { title: "Tyres", image: "/images/spareparts/Tyres.png" },
    { title: "Filters", image: "/images/spareparts/Filters.png" },
    // Second Row
    { title: "Exhaust", image: "/images/spareparts/Exhaust.png" },
    { title: "Electrical Parts", image: "/images/spareparts/ElectricalParts.png" },
    { title: "Sound System", image: "/images/spareparts/SoundSystem.png" },
    { title: "Air Conditioning", image: "/images/spareparts/AirConditioning.png" },
    { title: "Steering", image: "/images/spareparts/Steering.png" },
    { title: "Car Care", image: "/images/spareparts/CarCare.png" },
  ];

  return (
    <section className="py-16 bg-gray-50" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#232947] mb-2">
            Spare <span className="text-[#FF7A1A]">Parts</span>
          </h1>
        </div>

        {/* Grid Layout - 2 rows x 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {spareParts.map((part, index) => (
            <div
              key={index}
              className="bg-white flex flex-col items-center justify-center p-2 rounded-lg border border-transparent hover:scale-105 hover:border-primary-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="w-24 h-32 mb-3 flex items-center justify-center">
                <img
                  src={part.image}
                  alt={part.title}
                  className="w-full h-full object-contain "
                />
              </div>

              <Divider />

              {/* Title */}
              <div className="font-semibold text-[#232947] text-sm text-center mb-2">
                {part.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
