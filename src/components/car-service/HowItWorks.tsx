export default function HowItWorks() {
  const features = [
    {
      title: "Book Your Service",
      description:
        "Select your vehicle, service type, and preferred time slot.",
      iconUrl: "/images/BookingNow.png",
    },
    {
      title: "Transparent Service",
      description: "We'll keep you updated throughout the process.",
      iconUrl: "/images/repair-tool.png",
    },
    {
      title: "Quality Assurance",
      description: "We ensure the highest standards of service.",
      iconUrl: "/images/quality.png",
    },
    {
      title: "Payment Made Easy",
      description: "Secure and convenient payment options.",
      iconUrl: "/images/reliability.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 animate-fade-up motion-safe:animate-fade-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              How It <span className="text-red-500">Works</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover how DriveMech makes your car maintenance effortless.
              From booking to completion, enjoy full transparency and quality at
              every step.
            </p>
          </div>

          {/* Right Side - Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 cursor-pointer shadow-sm border border-gray-100 hover:border-red-400 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 ease-out animate-fade-up motion-safe:animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-start justify-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-50 group-hover:bg-red-100 transition-all">
                    <img
                      src={feature.iconUrl}
                      alt={feature.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
