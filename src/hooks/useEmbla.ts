"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function useEmbla(options = {}) {
  const autoplay = Autoplay({ delay: 3000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, ...options },
    [autoplay]
  );

  return { emblaRef, emblaApi };
}
