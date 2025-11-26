'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ServiceCard from './ServiceCard';
import HeaderServiceCard from './HeaderServiceCard';
import { headerServices, Service } from '../../../data/services';

export default function ServiceList({ services }: { services: Service[] }) {
  const selectedServices = useSelector((state: RootState) => state.service.selectedServices);

  return (
    <section className="w-full mt-4">
      
      {/* Header Cards */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {headerServices.map((s) => (
          <HeaderServiceCard
            key={s.id}
            id={s.id}
            icon={s.icon}
            title={s.name}
            badge={s.isPopular ? 'Popular' : undefined}
          />
        ))}
      </div>

      {/* Regular Services */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">All Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard 
            key={s.id} 
            service={s} 
          />
        ))}
      </div>
    </section>
  );
}
