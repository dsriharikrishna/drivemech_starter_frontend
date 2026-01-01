"use client";
import Image from "next/image";
import img1 from "../../../public/images/OwnerMech.png"; // Adjust path as needed

export default function DriveMechSection() {
  const features = [
    {
      title: "Convenience",
      description: "Book and track your service from anywhere.",
      iconUrl: "/images/convenience.png",
    },
    {
      title: "Affordability",
      description: "Competitive pricing and transparent billing.",
      iconUrl: "/images/affordability.png",
    },
    {
      title: "Reliability",
      description: "Trustworthy and experienced technicians.",
      iconUrl: "/images/reliability.png",
    },
    {
      title: "Time-Saving",
      description: "Efficient service without the hassle.",
      iconUrl: "/images/timesaving.png",
    },
  ];

  return (
      <div className="mx-auto bg-gray-50 w-full max-w-7xl rounded-xl overflow-hidden p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Side*/}
          <div className="w-full lg:w-1/2 relative min-h-[220px] flex items-end rounded-xl overflow-hidden animate-fade-left motion-safe:animate-fade-left">
            <Image
              src={img1}
              alt="DriveMech Owner"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="absolute inset-0 z-0"
              quality={90}
              priority
            />
          </div>

          {/* Right Sid */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center animate-fade-up motion-safe:animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary-300 transform hover:scale-105 transition-all duration-300 ease-out flex items-start gap-4 animate-fade-up motion-safe:animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img
                    src={feature.iconUrl}
                    alt={feature.title}
                    className="w-10 h-10 object-contain mt-1"
                  />
                  <div className="flex flex-col items-start justify-start gap-1.5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
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
      </div>
  );
}
