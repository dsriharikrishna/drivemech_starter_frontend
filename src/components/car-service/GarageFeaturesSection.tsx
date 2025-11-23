"use client";

export default function GarageFeaturesSection() {
  const features = [
    {
      title: "New Customer Acquisition",
      description: "Expand your reach and get direct booking requests from thousands of users.",
      icon: "/images/Garages/Group.png",
    },
    {
      title: "Efficient Booking Management",
      description: "View, accept, and manage all your bookings from one intuitive dashboard.",
      icon: "/images/Garages/Isolation_Mode.png"
    },
    {
      title: "Employee & Task Assignment",
      description: "Assign jobs to your team members and track their progress effortlessly.",
      icon: "/images/Garages/Dashboard.png"
    },
    {
      title: "Performance Analytics",
      description: "Gain insights into your business performance and customer feedback.",
      icon: "/images/Garages/Tracking.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl flex flex-col gap-2 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 p-2 flex flex-col justify-end items-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Key Features for <span className="text-orange-500">Garages</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools designed to help your garage business thrive and grow
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg- rounded-xl px-4 py-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
            >
              <div className="mb-2 relative">
                <img
                  src={typeof feature.icon === "string" ? feature.icon : feature.icon}
                  alt={feature.title}
                  className="w-full h-32 object-contain"
                />
              </div>
              <div className="flex flex-col gap-0.5 justify-start items-start ">
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
