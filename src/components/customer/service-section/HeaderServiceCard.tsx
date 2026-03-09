"use client";

import { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleService } from "@/store/slices/customer/services/serviceSlice";
import Image from "next/image";

interface Props {
  id: string;
  icon: string;
  title: string;
  badge?: string;
}

function HeaderServiceCard({ id, icon, title, badge }: Props) {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) =>
    state.service.selectedServices.includes(id)
  );

  const handleClick = useCallback(() => {
    dispatch(toggleService(id));
  }, [dispatch, id]);

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-all duration-200 ${
        selected
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 bg-white hover:shadow-md hover:border-orange-200 active:scale-[0.98]"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 right-3 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-md shadow-sm">
          {badge}
        </span>
      )}

      <Image src={icon} alt={title} width={24} height={24} />
      <p className="text-xs md:text-sm text-gray-900 font-semibold">{title}</p>
    </div>
  );
}

export default memo(HeaderServiceCard);
