"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setFormData } from "@/store/slicers/towing-services/towingServiceSlicer";

import Typography from "@/components/ui/Typography";

import { towingHeroSchema, type TowingHeroFormData } from "@/schemas/towing-hero.schema";
import TowingServiceForm from "./TowingServiceForm";
import AvailableTowTrucks from "./AvailableTowTrucks";

export default function TowingHeroSection() {
  const dispatch = useDispatch();
  const showAvailableTrucks = useSelector((state: RootState) => state.towingService.showAvailableTrucks);

  const methods = useForm<TowingHeroFormData>({
    resolver: zodResolver(towingHeroSchema),
    mode: "onBlur",
    defaultValues: {
      pickup: "",
      destination: "",
      reg: "",
      make: null,
      model: null,
      vehicleType: null,
    },
  });

  const onSubmit = (data: TowingHeroFormData) => {
    console.log("FORM SUBMITTED:", data);
    // Store form data in Redux (this also sets showAvailableTrucks to true)
    dispatch(setFormData(data));
  };

  return (
    <FormProvider {...methods}>
      <section className="w-full bg-gray-50">
        {/* container width roughly same as screenshot */}
        <div className="w-full mx-auto">

          {/* layout: left bigger (2fr) and right narrow (1fr) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-stretch">

            {/* LEFT: Hero image + overlay + text */}
            <div className="relative rounded-r-xl overflow-hidden h-[520px]">
              <img
                src="/tow-hero.jpg"
                alt="Towing hero"
                className="w-full h-full object-cover bg-hero"
              />

              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/45" />

              {/* hero content: left-aligned and vertically centered */}
              <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-16 text-white">
                <div className="inline-block bg-white text-black text-xs px-3 py-1 rounded-full w-fit mb-4 font-medium shadow-sm">
                  Available 24/7 Nationwide
                </div>

                <Typography variant="h1" weight="bold" className="text-white leading-tight text-3xl lg:text-4xl">
                  Professional Auto <br /> Services <span className="opacity-80">On Demand</span>
                </Typography>

                <Typography variant="body" className="mt-3 text-gray-200 max-w-lg">
                  Fast, reliable towing and roadside assistance when you need it most.
                  Average response time under 20 minutes.
                </Typography>

                {/* stats - match screenshot spacing */}
                <div className="flex gap-10 mt-6 bg-black/30 p-4 rounded-xl w-fit items-center">
                  <div>
                    <p className="text-orange-400 text-xl font-bold">15+</p>
                    <p className="text-xs text-gray-300">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-orange-400 text-xl font-bold">50k+</p>
                    <p className="text-xs text-gray-300">Happy Customers</p>
                  </div>
                  <div>
                    <p className="text-orange-400 text-xl font-bold">100+</p>
                    <p className="text-xs text-gray-300">Cities Covered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: narrow, vertically centered form */}
            {!showAvailableTrucks ? (
              <TowingServiceForm onSubmit={onSubmit} />
            ) : (
              <AvailableTowTrucks />
            )}

          </div>
        </div>
      </section>
    </FormProvider>
  );
}
