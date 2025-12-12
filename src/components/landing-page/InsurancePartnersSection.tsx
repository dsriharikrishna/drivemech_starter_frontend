export default function InsurancePartnersSection() {

  const insurances = [
    {
      type: "Life Insurance",
      description: "Our Life Insurance plans provide peace of mind, ensuring your loved ones are protected even when you're not around.",
      imageUrl: "/images/Insurance/life-insurance.png",
      features: [
        "Quick & Hassle-Free Claim Process",
        "Flexible Premium Payment Options",
        "Tax Benefits as per Applicable Laws"
      ]
    },
    {
      type: "Health Insurance",
      description: "Medical emergencies can happen without warning. Health insurance protects you and your family from unexpected medical expenses.",
      imageUrl: "/images/Insurance/health-insurance.png",
      features: [
        "Cashless Hospitalization",
        "Covers Pre & Post Hospitalization",
        "24/7 Customer Support"
      ]
    },
    {
      type: "Vehicle Insurance",
      description: "Accidents, breakdowns, and unexpected damages can happen anytime. With our comprehensive vehicle insurance plans, you get complete protection for your car or bike.",
      imageUrl: "/images/Insurance/vehicle-insurance.png",
      features: [
        "Cashless claims",
        "24*7 roadside assistance",
        "Zero depreciation"
      ]
    },
    {
      type: "Fleet Insurance",
      description: "Protect your entire vehicle fleet under one comprehensive policy designed to keep your business running smoothly.",
      imageUrl: "/images/Insurance/fleet-insurance.png",
      features: [
        "One Policy for All Vehicles",
        "Lower Premiums",
        "Easy Claims Process"
      ]
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#232947] mb-4">
            We Provide Best <span className="text-[#FF7A1A]">Insurances</span>
          </h1>
          <p className="text-base text-[#545965] max-w-3xl mx-auto leading-relaxed">
            This is a small paragraph of placeholder text that can be used for web content. It serves as a temporary block of text to visualize the layout and design of a webpage before the actual content is available.
          </p>
        </div>

        {/* Insurance Partners Logos */}
        <div className="mb-12 bg-white py-6 ">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img
              src="/images/InsuranceBanner.png"
              alt="insurance partners"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insurances.map((insurance, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex-grow">
                {/* Image */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={insurance.imageUrl}
                    alt={insurance.type}
                    className="w-full h-48 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#232947] mb-3">
                  {insurance.type}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#545965] leading-relaxed mb-4">
                  {insurance.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {insurance.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#545965]">
                      <span className="text-[#FF7A1A] mr-2 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Quote Button */}
              <button className="w-full py-2.5 border-2 border-[#FF7A1A] text-[#FF7A1A] rounded-lg font-semibold hover:bg-[#FF7A1A] hover:text-white transition-all duration-300">
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
