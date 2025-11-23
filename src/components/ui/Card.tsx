"use client";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  button: string;
  image: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Card({ 
  title, 
  description, 
  button, 
  image, 
  size = "md",
  className = "" 
}: ServiceCardProps) {
  const sizeConfig = {
    sm: {
      container: "p-3 rounded-lg",
      image: "w-12 h-12 sm:w-14 sm:h-14",
      title: "text-base font-semibold",
      description: "text-xs",
      button: "text-xs px-3 py-1.5",
      gap: "gap-2"
    },
    md: {
      container: "p-4 md:p-5 rounded-xl",
      image: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
      title: "text-lg sm:text-xl font-semibold",
      description: "text-xs sm:text-sm",
      button: "text-sm px-4 sm:px-5 py-2",
      gap: "gap-3 sm:gap-4"
    },
    lg: {
      container: "p-6 md:p-8 rounded-2xl",
      image: "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32",
      title: "text-xl sm:text-2xl font-semibold",
      description: "text-sm sm:text-base",
      button: "text-base px-6 py-3",
      gap: "gap-4 md:gap-6"
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex flex-col sm:flex-row items-center bg-white shadow-sm hover:shadow-md transition-shadow ${config.container} ${config.gap} ${className}`}>
      {/* Image Container */}
      <div className={`flex-shrink-0 flex flex-col justify-center items-center ${config.image} mb-3 sm:mb-0 sm:mr-4`}>
        <Image
          src={image}
          alt={title}
          width={size === "sm" ? 56 : size === "md" ? 96 : 128}
          height={size === "sm" ? 56 : size === "md" ? 96 : 128}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className={`text-gray-800 mb-2 ${config.title}`}>
          {title}
        </h3>
        
        <p className={`text-gray-600 leading-relaxed mb-3 md:mb-4 flex-grow ${config.description}`}>
          {description}
        </p>

        <button className={`w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md inline-flex items-center justify-center gap-1 transition-colors duration-200 ${config.button}`}>
          {button}
          <span>→</span>
        </button>
      </div>
    </div>
  );
}