"use client";

import { Card } from "../ui/Card";


interface ServiceItem {
  title: string;
  description: string;
  button: string;
  image: string;
  size?: "sm" | "md" | "lg";
}

type GridSize = 1 | 2 | 3 | 4;

interface ServiceBelowHeroProps {
  services?: ServiceItem[];
  columns?: {
    mobile: GridSize;
    tablet: GridSize;
    desktop: GridSize;
  };
  variant?: "grid" | "carousel" | "stack";
  className?: string;
}
export default function ServiceBelowHero({ 
  services = defaultServices,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  className = ""
}: ServiceBelowHeroProps) {
  
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  };

  const getGridClass = () => {
    return `grid ${gridClasses[columns.mobile]} ${columns.tablet !== columns.mobile ? `md:grid-cols-${columns.tablet}` : ''} ${columns.desktop !== columns.tablet ? `lg:grid-cols-${columns.desktop}` : ''}`;
  };

  const gapSizes = {
    sm: "gap-1.5",
    md: "gap-2 md:gap-1.5 lg:gap-3",
    lg: "gap-4 md:gap-6 lg:gap-8"
  };

  return (
    <section className={`py-8 md:py-12 lg:py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Grid Layout */}
        <div className={`${getGridClass()} ${gapSizes.md}`}>
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              button={service.button}
              image={service.image}
              size={service.size || "md"}
            />
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
];