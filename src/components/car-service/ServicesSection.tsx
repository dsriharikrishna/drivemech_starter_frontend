
// import { Wrench, Shield, Car, Settings, Droplet, Zap, Battery, Clock, AlertTriangle, Sun, Wind, Thermometer, ChevronRight } from 'lucide-react';

// const services = [
//   {
//     icon: Wrench,
//     title: 'Annual Service',
//     description: 'A complete yearly check-up covering fluids, filters, belts, brakes, and safety systems to keep your car running at its best year-round.',
//     image: '/images/services/CarService.png'
//   },
//   {
//     icon: Sun,
//     title: 'AC Repair & Service',
//     description: 'Full AC diagnostics, gas refilling, and repair to ensure fast cooling, air purity, and comfort during all seasons.',
//     image: '/images/services/CarAcRepair.png'
//   },
//   {
//     icon: Battery,
//     title: 'Battery Service',
//     description: 'Battery health checks, terminal cleaning, jump-starts, and guaranteed replacements to prevent unexpected breakdowns.',
//     image: '/images/services/CarBattery.png'
//   },
//   {
//     icon: Car,
//     title: 'Wheel Care Service',
//     description: 'Precision wheel alignment, balancing, rotation, and inspection for smooth, safe rides and longer tire life.',
//     image: '/images/services/CarWheel.png'
//   },
//   {
//     icon: Droplet,
//     title: 'Denting & Painting',
//     description: 'Expert dent removal and modern paintwork using eco-friendly materials for a flawless finish and restored shine.',
//     image: '/images/services/CarPainting.png'
//   },
//   {
//     icon: Wind,
//     title: 'Windshield /Glass',
//     description: 'Windshield repair or full replacement plus glass treatments for crystal-clear visibility and safety assurance.',
//     image: '/images/services/CarGlass.png'
//   },
//   {
//     icon: Shield,
//     title: 'Vehicle Inspection',
//     description: 'Comprehensive, certified safety and emission inspections for peace of mind and regulatory compliance.',
//     image: '/images/services/CarInspection.png'
//   },
//   {
//     icon: Settings,
//     title: 'Suspension',
//     description: 'Full check and repair of shocks, struts, and suspensions for a smoother, safer drive on every road.',
//     image: '/images/services/CarHubs.png'
//   },
//   {
//     icon: AlertTriangle,
//     title: 'Insurance',
//     description: 'Hassle-free insurance assistance from claim guidance to renewals, keeping you protected in every situation.',
//     image: '/images/services/CarProtection.png'
//   },
//   {
//     icon: Wind,
//     title: 'Windshield /Glass',
//     description: 'Windshield repair or full replacement plus glass treatments for crystal-clear visibility and safety assurance.',
//     image: '/images/services/CarGlass.png'
//   },
//   {
//     icon: Shield,
//     title: 'Vehicle Inspection',
//     description: 'Comprehensive, certified safety and emission inspections for peace of mind and regulatory compliance.',
//     image: '/images/services/CarInspection.png'
//   },
//   {
//     icon: Wind,
//     title: 'Windshield /Glass',
//     description: 'Windshield repair or full replacement plus glass treatments for crystal-clear visibility and safety assurance.',
//     image: '/images/services/CarGlass.png'
//   },
// ];


// export default function ServicesSection() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-12">
//           <div className="relative">
//             <h2 className="text-3xl font-bold">
//               Our <span className="text-orange-500">Services</span>
//             </h2>
//             <div className="absolute -bottom-2 left-0 w-16 h-1 bg-orange-500"></div>
//           </div>
//           <button
//             type="button"
//             className="bg-green-500 text-white  flex flex-row p-2 rounded-[10px] items-center justify-between font-medium  transition-colors"
//           >
//             View all services
//             <ChevronRight className="ml-1 h-4 w-4 font-bold text-bold" />
//           </button>

//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:bg-orange-100 transition-shadow duration-300 overflow-hidden">
//                 <div className="p-4 flex flex-col gap-3">
//                   <div className="flex items-center">
//                     <span className="p-2 bg-orange-100 rounded-lg mr-2">
//                       <img src={service.image} alt={service.title} className="w-7 h-7 object-cover rounded" />
//                     </span>
//                     <h6 className="text-xl font-semibold">{service.title}</h6>
//                   </div>
//                   <p className="text-gray-600 font-manrope font-normal text-sm leading-[150%] tracking-normal">
//                     {service.description}
//                   </p>

//                   {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
//                     Book Now
//                   </button> */}
//                 </div>
//               </div>

//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
















import {
  Wrench, Shield, Car, Settings, Droplet, Battery, AlertTriangle, Sun, Wind, ChevronRight
} from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Annual Service',
    description: 'A complete yearly check-up covering fluids, filters, belts, brakes, and safety systems to keep your car running at its best year-round.',
    image: '/images/services/CarService.png'
  },
  {
    icon: Sun,
    title: 'AC Repair & Service',
    description: 'Full AC diagnostics, gas refilling, and repair to ensure fast cooling, air purity, and comfort during all seasons.',
    image: '/images/services/CarAcRepair.png'
  },
  {
    icon: Battery,
    title: 'Battery Service',
    description: 'Battery health checks, terminal cleaning, jump-starts, and guaranteed replacements to prevent unexpected breakdowns.',
    image: '/images/services/CarBattery.png'
  },
  {
    icon: Car,
    title: 'Wheel Care Service',
    description: 'Precision wheel alignment, balancing, rotation, and inspection for smooth, safe rides and longer tire life.',
    image: '/images/services/CarWheel.png'
  },
  {
    icon: Droplet,
    title: 'Denting & Painting',
    description: 'Expert dent removal and modern paintwork using eco-friendly materials for a flawless finish and restored shine.',
    image: '/images/services/CarPainting.png'
  },
  {
    icon: Wind,
    title: 'Windshield /Glass',
    description: 'Windshield repair or full replacement plus glass treatments for crystal-clear visibility and safety assurance.',
    image: '/images/services/CarGlass.png'
  },
  {
    icon: Shield,
    title: 'Vehicle Inspection',
    description: 'Comprehensive, certified safety and emission inspections for peace of mind and regulatory compliance.',
    image: '/images/services/CarInspection.png'
  },
  {
    icon: Settings,
    title: 'Suspension',
    description: 'Full check and repair of shocks, struts, and suspensions for a smoother, safer drive on every road.',
    image: '/images/services/CarHubs.png'
  },
  {
    icon: AlertTriangle,
    title: 'Insurance',
    description: 'Hassle-free insurance assistance from claim guidance to renewals, keeping you protected in every situation.',
    image: '/images/services/CarProtection.png'
  },
  {
    icon: Wind,
    title: 'Windshield /Glass',
    description: 'Windshield repair or full replacement plus glass treatments for crystal-clear visibility and safety assurance.',
    image: '/images/services/CarGlass.png'
  },
  {
    icon: Shield,
    title: 'Vehicle Inspection',
    description: 'Comprehensive, certified safety and emission inspections for peace of mind and regulatory compliance.',
    image: '/images/services/CarInspection.png'
  },
  {
    icon: Settings,
    title: 'Suspension',
    description: 'Full check and repair of shocks, struts, and suspensions for a smoother, safer drive on every road.',
    image: '/images/services/CarHubs.png'
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
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            View all services
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-6 flex flex-col gap-2">
                {/* Icon and Title */}
                <div className="flex items-center">
                  <span className="p-2 bg-orange-100 rounded-lg mr-2">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-7 h-7 object-contain"
                    />
                  </span>
                  <h6 className="text-lg font-semibold text-gray-900">{service.title}</h6>
                </div>

                {/* Description */}
                <p className="text-gray-600 font-manrope text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Optional CTA */}
                {/* <button className="mt-auto bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition-colors self-start">
                  Book Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
