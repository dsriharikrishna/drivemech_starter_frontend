"use client";

import { useFormContext } from "react-hook-form";
import { Search, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Button from "@/components/ui/Button";
import CommonTextInput from "@/components/forms/CommonTextInput";
import {
  getStates,
  getCitiesByState,
  selectStates,
  selectCitiesByState,
  selectStatesLoading
} from "@/store/slices/location/locationSlice";

interface LocationSearchSectionProps {
  onSearch: (data: any) => void;
}

export default function LocationSearchSection({ onSearch }: LocationSearchSectionProps) {
  const form = useFormContext();
  const dispatch = useAppDispatch();
  const states = useAppSelector(selectStates);
  const statesLoading = useAppSelector(selectStatesLoading);
  const [selectedState, setSelectedState] = useState("");

  // Fetch states on mount
  useEffect(() => {
    if (states.length === 0) {
      dispatch(getStates());
    }
  }, [dispatch, states.length]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (selectedState) {
      const stateObj = states.find(s => s.name === selectedState);
      if (stateObj) {
        dispatch(getCitiesByState(stateObj.id));
      }
    }
  }, [selectedState, dispatch, states]);

  const availableCities = useAppSelector((state) => {
    const stateObj = states.find(s => s.name === selectedState);
    return stateObj ? selectCitiesByState(stateObj.id)(state) : [];
  });


  const handleSearch = (data: any) => {
    onSearch(data);
  };

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    // Clear city when state changes
    form.setValue("city", "");
  };

  return (
    <section className="flex flex-col items-center text-center px-4 py-4">

      <h1 className="text-4xl font-bold text-[#0D1A3D] mb-4">
        Find Trusted Garages Near You
      </h1>

      <p className="text-gray-500 max-w-2xl">
        Select your state and city to discover verified garages and services across India.
      </p>

      <form onSubmit={form.handleSubmit(handleSearch)} className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          {/* State input */}
          <div className="flex-1">
            <CommonTextInput
              name="state"
              label=""
              placeholder={statesLoading === "pending" ? "Loading states..." : "Select your state"}
              leftIcon={<MapPin size={20} className="text-gray-400" />}
              className="mb-0"
              rules={{ required: "State is required" }}
              list="states"
              onChange={(e) => handleStateChange(e.target.value)}
              disabled={statesLoading === "pending"}
            />
            <datalist id="states">
              {states.map((state) => (
                <option key={state.id} value={state.name} />
              ))}
            </datalist>
          </div>

          {/* City input */}
          <div className="flex-1">
            <CommonTextInput
              name="city"
              label=""
              placeholder={selectedState ? "Enter your city" : "Select state first"}
              leftIcon={<MapPin size={20} className="text-gray-400" />}
              className="mb-0"
              rules={{ required: "City is required" }}
              disabled={!selectedState}
              list="cities"
            />
            {selectedState && (
              <datalist id="cities">
                {availableCities.map((city) => (
                  <option key={city.id} value={city.name} />
                ))}
              </datalist>
            )}
          </div>

          {/* Search button */}
          <div className="flex items-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="px-8 py-3 bg-[#FF5C00] hover:bg-[#E55200] text-white font-medium rounded-xl shadow-sm"
            >
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Popular States */}
      <div className="mt-8 w-full max-w-2xl">
        <p className="text-sm text-gray-500 mb-3">Popular States:</p>
        <div className="flex flex-wrap gap-2">
          {["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Uttar Pradesh", "Gujarat"].map((state) => (
            <button
              key={state}
              onClick={() => {
                form.setValue("state", state);
                handleStateChange(state);
              }}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {state}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
