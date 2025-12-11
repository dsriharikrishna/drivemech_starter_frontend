"use client";

import { FormProvider, useForm } from "react-hook-form";
import LocationNavbar from "@/components/Layout/LocationNavbar";
import LocationGrid from "@/components/location/LocationGrid";
import LocationSearchSection from "@/components/location/LocationSearchSection";
import { useAppDispatch } from "@/store/store";
import { searchGarages } from "@/store/slices/location/locationSlice";

interface LocationFormData {
  state: string;
  city: string;
  pincode?: string;
}

export default function LocationLayout() {
  const dispatch = useAppDispatch();
  const form = useForm<LocationFormData>();

  const handleSearch = (data: LocationFormData) => {
        // Dispatch search action with state and city
    dispatch(searchGarages({
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      page: 1,
      limit: 10,
      sortBy: 'name'
    }));
  };

  return (
    <div className="min-h-screen">
      <LocationNavbar />
      <FormProvider {...form}>
        <LocationSearchSection onSearch={handleSearch} />
      </FormProvider>
      <LocationGrid />
    </div>
  );
}
