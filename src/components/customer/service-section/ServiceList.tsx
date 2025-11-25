// components/customer/service-section/ServiceList.tsx
'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { Service } from '@/components/data/services';

interface Props {
  services: Service[];
  selectedServices: string[];
  onToggle: (serviceId: string) => void;
  className?: string;
}

export default function ServiceList({ services, selectedServices, onToggle, className = '' }: Props) {
  return (
    <section className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onClick={() => onToggle(service.id)}
          />
        ))}
      </div>
    </section>
  );
}
