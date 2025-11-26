'use client';

import { NestedService } from '@/components/data/services';

interface Props {
  nestedServices: NestedService[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export default function NestedServiceList({ 
  nestedServices, 
  selectedServices, 
  onToggleService 
}: Props) {
  if (nestedServices.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No nested services found</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {nestedServices.map((nestedService) => {
        const isSelected = selectedServices.includes(nestedService.id);
        
        return (
          <div
            key={nestedService.id}
            onClick={() => onToggleService(nestedService.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              isSelected
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {nestedService.name}
                </h4>
                {nestedService.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {nestedService.description}
                  </p>
                )}
                {nestedService.price && (
                  <p className="text-lg font-semibold text-orange-500">
                    ${nestedService.price}
                  </p>
                )}
              </div>
              
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ml-4 ${
                isSelected
                  ? 'border-orange-500 bg-orange-500'
                  : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
