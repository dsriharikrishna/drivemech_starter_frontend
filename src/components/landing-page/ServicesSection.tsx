
import { ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Air Conditioning',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/AirConditioning.png'
  },
  {
    title: 'Roadworthy Inspection',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Roadworthyinspection.png'
  },
  {
    title: 'Auto Glass',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/AutoGlass.png'
  },
  {
    title: 'Spark Plug',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/SparkPlug.png'
  },
  {
    title: 'Battery',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Battery.png'
  },
  {
    title: 'Suspension and Steering',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/SuspensionSteering.png'
  },
  {
    title: 'Brakes',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Battery.png' // Using Battery as placeholder for Brakes
  },
  {
    title: 'Timing belt/chain',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Timingbelt.png'
  },
  {
    title: 'Clutch',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Clutch.png'
  },
  {
    title: 'Transmission / Differential',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Transmission.png'
  },
  {
    title: 'Oil leak inspection',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Oilleakinspection.png'
  },
  {
    title: 'Wheels & Tyres',
    description: 'Lorem ipsum dolor sit amet, adipiscing elit consectetur.',
    image: '/images/ourservices/Wheels.png'
  },
];


export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 text-center sm:text-left">
          <div className="relative mb-6 sm:mb-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Our <span className="text-orange-500">Services</span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-20 h-1 bg-orange-500 rounded-full"></div>
          </div>
          <button
            type="button"
            className="flex items-center cursor-pointer gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            View Services
            <ChevronRight className="h-4 w-4 font-bold" />
          </button>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-4 flex flex-col md:flex-row gap-1 items-center justify-center">
                {/* Icon and Title */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Description */}
                <div className='flex-3 flex flex-col gap-2'>
                  <h6 className="text-md font-semibold text-gray-900">{service.title}</h6>
                  <p className="text-gray-600 font-manrope text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
