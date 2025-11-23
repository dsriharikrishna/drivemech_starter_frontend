"use client";
import VehicleSearch from "./VehicleSearch";

interface HeroSectionProps {
  selectedMake: string;
  setSelectedMake: (make: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export default function HeroSection({
  selectedMake,
  setSelectedMake,
  selectedModel,
  setSelectedModel,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative bg-cover bg-hero bg-center bg-no-repeat text-white flex flex-col justify-center items-center p-2"
      style={{
        minHeight: "720px",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center h-full text-center px-4 py-3">
        <h1 className="font-manrope font-extrabold text-[44px] leading-[44px] text-center mb-4">
          Your Vehicle's{' '}
          <span className="text-orange-500">Personal Mechanic</span>,
          <br />
          Anytime, Anywhere
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
          Your one-stop solution for all your vehicle service needs.
        </p>

        {/* Vehicle Search Box */}
        <VehicleSearch
          selectedMake={selectedMake}
          setSelectedMake={setSelectedMake}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
      </div>
    </section>
  );
}
