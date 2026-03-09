"use client";

import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { makes, models, states } from "@/data/vehicle";
import StateRegoInput from "@/components/landing-page/StateRegoInput";
import SearchableDropdown from "@/components/landing-page/SearchableDropdown";
import Button from "@/components/ui/Button";
import { Link } from "@/components/ui/Typography";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { selectVehicle } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";

const HERO_SLIDES = [
  {
    id: 1,
    title: "TIRES FOR EVERY VEHICLE.",
    subtitle: "High Mileage Tires. Unbeatable Value.",
    description: "Your Car Deserves the Best.",
    buttonText: "See Our Full Range!",
    buttonLink: "/spare-parts/tires",
    image: "/images/spare-parts/tires-hero.jpg",
    gradient: "from-slate-900/80 to-slate-800/60",
  },
  {
    id: 2,
    title: "PREMIUM CAR BATTERIES.",
    subtitle: "60% OFF Flash Sale - Limited Time!",
    description: "Long-lasting Power You Can Trust.",
    buttonText: "Shop Batteries Now",
    buttonLink: "/spare-parts/batteries",
    image: "/images/spare-parts/batteries-hero.jpg",
    gradient: "from-orange-900/80 to-orange-800/60",
  },
  {
    id: 3,
    title: "QUALITY ENGINE PARTS.",
    subtitle: "OEM & Aftermarket Options Available.",
    description: "Keep Your Engine Running Smooth.",
    buttonText: "Browse Engine Parts",
    buttonLink: "/spare-parts/engine",
    image: "/images/spare-parts/engine-hero.jpg",
    gradient: "from-blue-900/80 to-blue-800/60",
  },
];

// Validation schema for spare parts search
const sparePartsSearchSchema = z.object({
  state: z.string().min(1, "State is required"),
  rego: z.string().optional(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
});

type SparePartsSearchFormData = z.infer<typeof sparePartsSearchSchema>;

export const SparePartsHero = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Embla Carousel setup with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const methods = useForm<SparePartsSearchFormData>({
    resolver: zodResolver(sparePartsSearchSchema),
    defaultValues: {
      state: "",
      rego: "",
      make: "",
      model: "",
    },
    mode: "onChange",
  });

  const { setValue, watch } = methods;

  // Watch form values
  const watchedState = watch("state");
  const watchedRego = watch("rego");
  const watchedMake = watch("make");
  const watchedModel = watch("model");

  // Scroll to specific slide
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Get selected index for dots
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const onSubmit = (data: SparePartsSearchFormData) => {
    // Save vehicle to Redux
    dispatch(
      selectVehicle({
        make: data.make,
        model: data.model,
        year: new Date().getFullYear().toString(), // Default to current year
      })
    );

    // Navigate to spare parts search results
    router.push(`/spare-parts/detail-page`);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
            </svg>
            <span className="font-semibold">Flash sale:</span>
            <span>60% off car batteries</span>
            <span className="mx-2">|</span>
            <span>Use code "Batt60"</span>
            <Link
              href="/spare-parts/batteries"
              className="ml-2 underline hover:no-underline font-medium text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Vehicle Search Form - Positioned Above Carousel */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
              Add vehicle information to find matching parts
            </h2>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* State & Rego */}
                  <div className="w-full">
                    <StateRegoInput
                      stateValue={watchedState || ""}
                      regoValue={watchedRego || ""}
                      onStateChange={(value) => setValue("state", value)}
                      onRegoChange={(value) => setValue("rego", value)}
                      states={states}
                      register={methods.register}
                    />
                  </div>

                  {/* Make */}
                  <div className="w-full">
                    <SearchableDropdown
                      label="Make"
                      placeholder="e.g., Toyota, BMW"
                      value={watchedMake || ""}
                      onChange={(value) => setValue("make", value)}
                      options={makes}
                      register={methods.register}
                      fieldName="make"
                      required={true}
                    />
                  </div>

                  {/* Model */}
                  <div className="w-full">
                    <SearchableDropdown
                      label="Model"
                      placeholder="Select Model"
                      value={watchedModel || ""}
                      onChange={(value) => setValue("model", value)}
                      options={models}
                      register={methods.register}
                      fieldName="model"
                      required={true}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="w-full flex items-end">
                    <Button
                      type="submit"
                      variant="gradient"
                      size="md"
                      fullWidth
                      className="bg-emerald-500 hover:bg-emerald-600 h-10"
                    >
                      Find Spares
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {/* Hero Section with Embla Carousel */}
      <div className="relative h-[500px] overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              />

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-orange-400 font-semibold mb-2">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg mb-6">{slide.description}</p>
                    <Link href={slide.buttonLink}>
                      <Button
                        variant="gradient"
                        size="lg"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {slide.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
