"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDriver, setShowAvailableTrucks } from "@/store/slicers/towing-services/towingServiceSlicer";
import { useRouter } from "next/navigation";
import { Star, X } from "lucide-react";

export default function AvailableTowTrucks() {
    const dispatch = useDispatch();
    const router = useRouter();

    // Get data from Redux
    const drivers = useSelector((state: RootState) => state.towingService.availableDrivers);

    const handleSelectDriver = (driver: typeof drivers[0]) => {
        dispatch(setSelectedDriver(driver));
        router.push('/towing-services/confirm-booking');
    };

    const handleClose = () => {
        dispatch(setShowAvailableTrucks(false));
    };

    return (
        <div className="flex items-center p-4 rounded-2xl border border-border mt-2 bg-white">
            <div className="w-full max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-heading">
                            Available Tow Trucks
                        </h3>
                        <p className="text-xs text-gray-500">Choose a tow truck</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Map Placeholder */}
                <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                    <img
                        src="/map-placeholder.png"
                        alt="Map"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-green-50/80">
                        <p className="text-sm text-gray-600">Map View</p>
                    </div>
                </div>

                {/* Driver List */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {drivers.map((driver) => (
                        <div
                            key={driver.id}
                            onClick={() => handleSelectDriver(driver)}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50/30 cursor-pointer transition-all"
                        >
                            {/* Driver Photo */}
                            <div className="relative">
                                <img
                                    src={driver.photo}
                                    alt={driver.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                {driver.isOnline && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>

                            {/* Driver Info */}
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-gray-heading">
                                    {driver.name}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                                    <span className="font-medium text-gray-700">{driver.rating}</span>
                                    <span>({driver.trips} Trips)</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{driver.vehicleType}</p>
                            </div>

                            {/* Price & Time */}
                            <div className="text-right">
                                <p className="font-bold text-gray-heading">${driver.price}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                                    <span>{driver.arrivalTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Instruction */}
                <p className="text-center text-xs text-gray-500 mt-4">
                    Tap on a driver to confirm booking
                </p>
            </div>
        </div>
    );
}
