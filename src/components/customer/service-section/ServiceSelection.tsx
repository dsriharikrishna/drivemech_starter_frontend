'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react';
import { services } from '@/components/data/services';
import ServiceCard from './ServiceCard';

interface VehicleInfo {
  registration: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  engine: string;
  drive: string;
}

export default function ServiceSelection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const vehicleInfo: VehicleInfo = {
    registration: 'ABC 1234 D',
    make: 'Toyota',
    model: 'Hilux',
    year: 2021,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '2.5 Liters',
    drive: 'Hybrid AWD-i'
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Header with Back Button */}
          <div className="flex items-center gap-3 mb-6">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">What are you looking for?</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Services"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedServices.includes(service.id)}
                onClick={() => toggleService(service.id)}
              />
            ))}
          </div>

          {/* Can't find what you're looking for */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Can't find what you are looking for?
            </h3>
            <textarea
              placeholder="Describe your issue"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px]"
            />
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                selectedServices.length > 0
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={selectedServices.length === 0}
            >
              Next
            </button>
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-6">
            {/* Vehicle Info */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{vehicleInfo.registration}</h2>
                <button className="text-blue-600 text-sm font-medium">Change</button>
              </div>
              
              <div className="relative h-32 bg-gray-100 rounded-xl overflow-hidden mb-3">
                <Image
                  src="/images/vehicles/toyota-hilux.png"
                  alt={`${vehicleInfo.make} ${vehicleInfo.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="font-medium">{vehicleInfo.make} {vehicleInfo.model}</h3>
              <p className="text-sm text-gray-500">
                {vehicleInfo.year} • {vehicleInfo.fuelType} • {vehicleInfo.transmission}
              </p>
              <p className="text-sm text-gray-500">
                {vehicleInfo.engine} • {vehicleInfo.drive}
              </p>
            </div>

            {/* Cart */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Your Cart ({selectedServices.length})</h3>
              </div>
              
              {selectedServices.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Your cart is empty. Please add an service item to get a quote.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return (
                      <div key={serviceId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{service?.name}</span>
                        <button 
                          className="text-red-500 hover:text-red-600 text-sm"
                          onClick={() => toggleService(serviceId)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
