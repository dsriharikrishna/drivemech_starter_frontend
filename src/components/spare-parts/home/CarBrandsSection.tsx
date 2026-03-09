"use client";

import Image from "next/image";

export default function CarBrandsSection() {
  const carBrands = [
    // First Row
    { name: "Tata", logo: "/images/brands/tata.png" },
    { name: "Suzuki", logo: "/images/brands/suzuki.png" },
    { name: "Toyota", logo: "/images/brands/toyota.png" },
    { name: "Mahindra", logo: "/images/brands/mahindra.png" },
    { name: "Hyundai", logo: "/images/brands/hundai.png" },
    { name: "KIA", logo: "/images/brands/kia.png" },
    { name: "Land Rover", logo: "/images/brands/landrover.png" },
    { name: "BMW", logo: "/images/brands/BMW.png" },
    { name: "Mercedes-Benz", logo: "/images/brands/Mercedes‑Benz.png" },
    { name: "Volkswagen", logo: "/images/brands/Volkswagen.png" },
    { name: "Skoda", logo: "/images/brands/skoda.png" },
    // Second Row
    { name: "Maserati", logo: "/images/brands/Maserati.png" },
    { name: "Renault", logo: "/images/brands/Renault.png" },
    { name: "Citroen", logo: "/images/brands/Citroën.png" },
    { name: "Nissan", logo: "/images/brands/Nissan.png" },
    { name: "Mini", logo: "/images/brands/Mini.png" },
    { name: "McLaren", logo: "/images/brands/Mclaren.png" },
    { name: "Aston Martin", logo: "/images/brands/Aston-Martin.png" },
    { name: "BYD", logo: "/images/brands/Byd.png" },
    { name: "Ford", logo: "/images/brands/Ford.png" },
    { name: "Isuzu", logo: "/images/brands/Isuzu.png" },
    { name: "Lotus", logo: "/images/brands/Lotus.png" },
  ];

  return (
    <section className="pt-12 pb-4 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Get top-tier parts for the best-selling car brands.
        </h2>

        {/* Brands Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-6 md:gap-8 items-center justify-items-center">
          {carBrands.map((brand) => (
            <div
              key={brand.name}
              className="group cursor-pointer transition-transform hover:scale-150 duration-300"
              title={brand.name}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={64}
                  height={64}
                  className="object-contain rounded-lg p-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
