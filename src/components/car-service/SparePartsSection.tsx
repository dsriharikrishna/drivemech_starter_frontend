export default function SparePartsSection() {
  const allParts = [
    { title: "Wheels", image: "/images/spareparts/Wheel.png" },
    { title: "Suspension", image: "/images/spareparts/suspension.png" },
    { title: "Clutch", image: "/images/spareparts/clutch.png" },
    { title: "Steering", image: "/images/spareparts/Steering.png" },
    { title: "Batteries", image: "/images/spareparts/Batteries.png" },
    { title: "Alloys", image: "/images/spareparts/Alloys.png" },
    { title: "Brake Parts", image: "/images/spareparts/Brake Pads.png" },
    { title: "AC Parts", image: "/images/spareparts/Ac Parts.png" },
    { title: "Mirrors", image: "/images/spareparts/Mirrors.png" },
    { title: "Lights", image: "/images/spareparts/Lights.png" },
    { title: "Body Parts", image: "/images/spareparts/Body Parts.png" },
    { title: "Speakers", image: "/images/spareparts/Speakers.png" },
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16 animate-fade-up motion-safe:animate-fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Automotive Spare Parts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of high-quality spare parts for all vehicle makes and models.
          </p>
        </div>

        {/* 2x6 Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {allParts.map((part, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-lg hover:border-blue-300 transform hover:scale-105 transition-all duration-300 ease-out cursor-pointer animate-fade-up motion-safe:animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <img
                  src={part.image}
                  alt={part.title}
                  className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="font-semibold text-gray-900 text-sm">
                {part.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
