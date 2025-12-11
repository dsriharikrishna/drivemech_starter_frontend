"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getStates, selectStates, selectGarages, selectSearchLoading } from "@/store/slices/location/locationSlice";

export default function LocationGrid() {
    const dispatch = useAppDispatch();
    const states = useAppSelector(selectStates);
    const garages = useAppSelector(selectGarages);
    const loading = useAppSelector(selectSearchLoading);

    // Fetch states on mount
    useEffect(() => {
        if (states.length === 0) {
            dispatch(getStates());
        }
    }, [dispatch, states.length]);

    // Get top states with most garages or use first 8 states
    const displayStates = states.slice(0, 8);

    // Calculate garage count per state (mock data for now)
    const getGarageCount = (stateName: string) => {
        const stateGarages = garages.filter((garage: any) => garage.state === stateName);
        if (stateGarages.length > 0) {
            return stateGarages.length;
        }
        // Mock counts for display purposes
        const mockCounts: { [key: string]: number } = {
            "Maharashtra": 120,
            "Karnataka": 95,
            "Delhi": 88,
            "Tamil Nadu": 76,
            "Uttar Pradesh": 65,
            "Gujarat": 58,
            "West Bengal": 52,
            "Telangana": 45
        };
        return mockCounts[stateName] || Math.floor(Math.random() * 50) + 20;
    };

    return (
        <section className="max-w-7xl mx-auto mb-4">
            <h2 className="text-center text-xl font-semibold text-[#0D1A3D]">
                Where we are
            </h2>

            {loading === 'pending' ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5C00]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {displayStates.map((state) => {
                        const garageCount = getGarageCount(state.name);
                        return (
                            <div
                                key={state.id}
                                className="bg-white p-5 rounded-2xl shadow-sm border border-border flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => {
                                    // TODO: Dispatch search action for this state
                                }}
                            >
                                <Image
                                    src="/icons/building.svg"
                                    width={38}
                                    height={38}
                                    alt={state.name.slice(0, 1)}
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{state.name}</h3>
                                    <p className="text-gray-500 text-sm">{garageCount}+ Verified Garages</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
