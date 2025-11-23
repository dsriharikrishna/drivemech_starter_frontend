export default function InsurancePartnersSection() {
  const insurances = [
    {
      type: "Life Insurance",
      description:
        "Secure your family’s future with flexible life insurance plans designed to give you peace of mind.",
      imageUrl: "/images/Insurance/life-insurance.png",
    },
    {
      type: "Health Insurance",
      description:
        "Comprehensive health coverage to safeguard you and your loved ones against unexpected medical costs.",
      imageUrl: "/images/Insurance/health-insurance.png",
    },
    {
      type: "Vehicle Insurance",
      description:
        "Drive worry-free with our vehicle protection plans covering accidents, damage, and theft.",
      imageUrl: "/images/Insurance/vehicle-insurance.png",
    },
    {
      type: "Home Insurance",
      description:
        "Protect your home and belongings from unforeseen circumstances with our trusted home insurance policies.",
      imageUrl: "/images/Insurance/home-insurance.png",
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-up motion-safe:animate-fade-up">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            We Provide <span className="text-orange-500">Best Insurances</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our wide range of insurance products crafted to protect you,
            your family, and your valuable assets — ensuring peace of mind at
            every stage of life.
          </p>
        </div>

        {/* Banner Image */}
        <div className="w-full mb-16 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] animate-fade-up motion-safe:animate-fade-up">
          <img
            src="/images/InsuranceBanner.png"
            alt="Insurance Partners"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Insurance Types Grid */}
        <div className="mb-8 animate-fade-up motion-safe:animate-fade-up">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our <span className="text-orange-500">Insurance Products</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insurances.map((insurance, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 ease-out animate-fade-up motion-safe:animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={insurance.imageUrl}
                    alt={insurance.type}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {insurance.type}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {insurance.description}
                </p>
                <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center group">
                  View More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
