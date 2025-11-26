"use client";
import CarCard from "./CarCard";
import { VehicleInfo } from "@/store/slicers/carSlicer";

const demoVehicle: VehicleInfo = {
  registration: 'ABC 1234 D',
  make: 'Toyota',
  model: 'Hilux',
  year: 2021,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  engine: '2.5 Liters',
  drive: 'Hybrid AWD-i'
};

export function CarCardDemo() {
  const handleChange = () => {
    console.log('Change vehicle clicked');
    // Add your change vehicle logic here
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Car Card Demo</h1>
        <CarCard 
          vehicle={demoVehicle} 
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default CarCardDemo;
