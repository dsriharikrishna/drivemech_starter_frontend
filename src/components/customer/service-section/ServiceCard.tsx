'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Service } from '@/components/data/services';
import { RootState } from '@/store/store';
import { toggleService } from '@/store/slicers/serviceSlicer';

interface Props {
  service: Service;
  onToggle?: () => void;
  isSelected?: boolean;
}

export default function ServiceCard({ service, onToggle, isSelected: propIsSelected }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Use prop isSelected if provided, otherwise get from Redux
  const isSelected = propIsSelected !== undefined 
    ? propIsSelected 
    : useSelector((state: RootState) => state.service.selectedServices.includes(service.id));

  const handleClick = () => {
    if (onToggle) {
      // Use custom toggle for nested services
      onToggle();
    } else if (service.hasNested) {
      // Navigate to nested services page
      router.push(`/customer/service/nested-services?service=${service.id}`);
    } else {
      // Toggle service selection
      dispatch(toggleService(service.id));
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{service.icon}</div>
        <span className="font-medium text-gray-900">{service.name}</span>
      </div>

      <div className="flex items-center gap-2">
        {isSelected && (
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        )}
        {!onToggle && <ChevronRight className="h-5 w-5 text-gray-400" />}
      </div>
    </div>
  );
}
