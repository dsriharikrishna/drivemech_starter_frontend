'use client';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { Service } from '@/components/data/services';
import { RootState } from '@/store/store';
import { toggleService } from '@/store/slicers/serviceSlicer';

export default function ServiceCard({ service }: { service: Service }) {
  const dispatch = useDispatch();
  
  const isSelected = useSelector(
    (state: RootState) => state.service.selectedServices.includes(service.id)
  );

  return (
    <div
      onClick={() => dispatch(toggleService(service.id))}
      className={`flex items-center justify-between p-2 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="text-2xl">{service.icon}</div>
        <span className="font-medium text-gray-900">{service.name}</span>
      </div>

      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
}
