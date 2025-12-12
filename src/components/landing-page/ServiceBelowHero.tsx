"use client";

import { Card } from "../ui/Card";


interface ServiceItem {
  title: string;
  description: string;
  button: string;
  image: string;
  size?: "sm" | "md" | "lg";
}

interface ServiceBelowHeroProps {
  services?: ServiceItem[];
  className?: string;
}

export default function ServiceBelowHero({
  services = defaultServices,
  className = ""
}: ServiceBelowHeroProps) {

  return (
    <section className={`py-8 md:py-12 lg:py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Flex Layout */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-1.5 lg:gap-3">
          {services.map((service, index) => (
            <div key={index} className="w-full md:flex-1">
              <Card
                title={service.title}
                description={service.description}
                button={service.button}
                image={service.image}
                size={service.size || "md"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default services data
const defaultServices: ServiceItem[] = [
  {
    title: "Spare Parts",
    description: "Dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    button: "Buy Spares",
    image: "/images/spareparts.png",
    size: "md"
  },
  {
    title: "Road Side Assistance",
    description: "Dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    button: "Book Service",
    image: "/images/truck.png",
    size: "md"
  },
  {
    title: "Insurance Claims",
    description: "Dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    button: "Claim Insurance",
    image: "/images/carinsurance.png",
    size: "md"
  },
  {
    title: "Roadworthy Inspections",
    description: "Dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    button: "Book Inspection",
    image: "/images/carinsurance.png",
    size: "md"
  }
];