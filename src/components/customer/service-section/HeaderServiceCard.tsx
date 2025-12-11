'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleService } from '@/store/slices/services/serviceSlice';

interface Props {
  id: string;
  icon: React.ReactNode;
  title: string;
  badge?: string;
}

export default function HeaderServiceCard({ id, icon, title, badge }: Props) {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) =>
    state.service.selectedServices.includes(id)
  );

  return (
    <div
      onClick={() => dispatch(toggleService(id))}
      className={`relative flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-all ${
        selected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 bg-white hover:shadow-md'
      }`}
    >
      {badge && (
        <span className="absolute -top-2 right-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}

      <div className="text-3xl">{icon}</div>
      <p className="text-gray-800 font-medium">{title}</p>
    </div>
  );
}
