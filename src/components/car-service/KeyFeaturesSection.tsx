export default function KeyFeaturesSection() {
  const features = [
    {
      title: "Hassle-Free Booking",
      description: "Book your service in just a few taps.",
      imageUrl: "/images/KeyFeatures/CarService.png",
    },
    {
      title: "Expert Technicians",
      description: "Certified professionals at your doorstep.",
      imageUrl: "/images/KeyFeatures/Repair.png",
    },
    {
      title: "Transparent Pricing",
      description: "No hidden charges, upfront pricing.",
      imageUrl: "/images/KeyFeatures/Cash.png",
    },
    {
      title: "Genuine Spare Parts",
      description: "Only original parts for your vehicle.",
      imageUrl: "/images/KeyFeatures/Mechanic.png",
    },
    {
      title: "Doorstep Service",
      description: "Convenient service at your home or office.",
      imageUrl: "/images/KeyFeatures/MechanicBoy.png",
    },
    {
      title: "Live Tracking",
      description: "Monitor your service in real-time.",
      imageUrl: "/images/KeyFeatures/Testing.png",
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 animate-fade-up motion-safe:animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Key <span className="text-red-500">Features</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Experience unmatched convenience and transparency with DriveMech.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2 sm:px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl px-4 py-6 shadow-sm border border-gray-100 hover:border-red-400 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col items-center text-center animate-fade-up motion-safe:animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
