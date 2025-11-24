import { Service } from "@/components/data/services";
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onClick: () => void;
}

export default function ServiceCard({ service, isSelected, onClick }: ServiceCardProps) {
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-orange-500 bg-orange-50' 
          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{service.icon}</div>
        <span className="font-medium text-gray-900">{service.name}</span>
      </div>
      <div className="flex items-center gap-2">
        {service.isPopular && (
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
