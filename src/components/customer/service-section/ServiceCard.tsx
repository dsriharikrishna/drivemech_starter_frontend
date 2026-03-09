"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Service } from "../../../data/services";
import { RootState } from "@/store/store";
import { toggleService } from "@/store/slices/customer/services/serviceSlice";
import { ArrowRightIcon } from "@/components/icons/ManageWorkshopIcons";

interface Props {
  service: Service;
  onToggle?: () => void;
  isSelected?: boolean;
}

export default function ServiceCard({
  service,
  onToggle,
  isSelected: propIsSelected,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Use prop isSelected if provided, otherwise get from Redux
  const isSelected =
    propIsSelected !== undefined
      ? propIsSelected
      : useSelector((state: RootState) =>
          state.service.selectedServices.includes(service.id)
        );

  const handleClick = useCallback(() => {
    if (onToggle) {
      onToggle();
    } else if (service.hasNested) {
      router.push(`/customer/nested-services?service=${service.id}`);
    } else {
      dispatch(toggleService(service.id));
    }
  }, [onToggle, service.hasNested, service.id, router, dispatch]);

  return (
    <div
      onClick={handleClick}
      className={`flex items-center bg-white justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 active:scale-[0.98]"
      }`}
    >
      <div className="flex items-center gap-3">
        <Image src={service.icon} alt={service.name} width={24} height={24} />
        <span className="text-xs md:text-sm font-semibold text-gray-900">
          {service.name}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {isSelected && (
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        )}
        {!onToggle && <ArrowRightIcon className="h-5 w-5 text-gray-800" />}
      </div>
    </div>
  );
}
