"use client";

import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { Phone } from "phosphor-react";

type CardType = "vehicle" | "service-date" | "workshop";

interface BookingDetailsCardProps {
  type: CardType;

  // Vehicle
  vehicleName?: string;
  vehicleNumber?: string;
  vehicleImage?: string;

  // Service Date
  date?: string;
  time?: string;
  onReschedule?: () => void;

  // Workshop
  workshopName?: string;
  rating?: number;
  reviewCount?: number;
  workshopImage?: string;
  onCall?: () => void;
  onLocation?: () => void;
}

export default function BookingDetailsCard(props: BookingDetailsCardProps) {
  return (
    <div className="
      border border-gray-200 rounded-2xl p-5 bg-white w-full
      transition-all duration-200 
      hover:shadow-md
    ">

      {/* ===================== VEHICLE ===================== */}
      {props.type === "vehicle" && (
        <>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Vehicle</h3>

          <div className="flex items-center gap-4">
            <Image
              src={props.vehicleImage ?? "/images/workshop/car.png"}
              alt="vehicle"
              width={48}
              height={48}
              className="rounded-lg"
            />

            <div className="flex flex-col">
              <p className="text-base font-semibold text-gray-900">{props.vehicleName}</p>
              <p className="text-xs text-gray-500 tracking-wide">{props.vehicleNumber}</p>
            </div>
          </div>
        </>
      )}

      {/* ===================== SERVICE DATE ===================== */}
      {props.type === "service-date" && (
        <>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Service Date & Time</h3>

          <div className="flex items-start gap-4">
            <CalendarIcon className="w-10 h-10 text-gray-700" />

            <div className="flex flex-col">
              <p className="text-base font-semibold text-gray-900">{props.date}</p>
              <p className="text-xs text-gray-600">{props.time}</p>

              {props.onReschedule && (
                <button
                  onClick={props.onReschedule}
                  className="
                    px-3 py-1 mt-3 text-xs font-medium
                    bg-red-100 text-red-600 
                    rounded-md hover:bg-red-200 transition
                  "
                >
                  Reschedule
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* ===================== WORKSHOP ===================== */}
      {props.type === "workshop" && (
        <>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Workshop</h3>

          <div className="flex items-center gap-4">
            <Image
              src={props.workshopImage ?? "/images/workshop/AtoZ.png"}
              alt="workshop"
              width={48}
              height={48}
              className="rounded-lg"
            />

            <div className="flex flex-col">
              <p className="text-base font-semibold text-gray-900">
                {props.workshopName}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                ⭐ {props.rating}{" "}
                <span className="text-[10px] text-gray-500">({props.reviewCount})</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={props.onLocation}
                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition text-sm"
              >
                <img src="/images/workshop/direction-fill.png" alt="" />
              </button>
              <button
                onClick={props.onCall}
                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition text-sm"
              >
                <Phone className="w-5 h-5 text-primary fill-primary" />
              </button>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
