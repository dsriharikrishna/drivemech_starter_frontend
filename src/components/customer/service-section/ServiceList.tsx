'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ServiceCard from './ServiceCard';
import HeaderServiceCard from './HeaderServiceCard';
import { headerServices, Service } from '../../../data/services';

export default function ServiceList({ services }: { services: Service[] }) {
  const selectedServices = useSelector((state: RootState) => state.service.selectedServices);

  return (
    <section className="w-full mt-4 bg-white p-2 rounded-2xl ">
      
      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 bg-[#F1F5F9] p-3 rounded-2xl">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white p-3 rounded-2xl gap-4 ">
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
