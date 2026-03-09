"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";
import { BEST_SELLING_PRODUCTS } from "@/constants/products.constants";
import { useAppDispatch } from "@/store/store";
import {
  addProductToCart,
  toggleWishlist,
} from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import type { CartProduct } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import { useRouter } from "next/navigation";

const BestSellingProducts = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
      "(min-width: 1280px)": { slidesToScroll: 4 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleAddToCart = (productId: string) => {
    const product = BEST_SELLING_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const cartProduct: CartProduct = {
      id: product.id,
      partNumber: product.id,
      name: product.title,
      brand: product.brand,
      category: "Best Selling",
      image: product.image,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      quantity: 1,
      inStock: true,
    };

    dispatch(addProductToCart(cartProduct));
  };

  const handleToggleWishlist = (productId: string) => {
    dispatch(toggleWishlist(productId));
  };

  const handleProductClick = (productId: string) => {
    router.push(`/spare-parts/detail-page?id=${productId}`);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            <span className="text-orange-500">
              Best-selling car spare parts
            </span>{" "}
            at low prices.
          </h2>
        </div>

        {/* Carousel Container with Side Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2.5 rounded-full border border-gray-200 bg-white shadow-sm transition-all ${
              canScrollPrev
                ? "hover:bg-gray-50 cursor-pointer hover:shadow-md"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800 fill-gray-800" />
          </button>

          {/* Embla Carousel Container */}
          <div className="overflow-hidden px-8" ref={emblaRef}>
            <div className="flex gap-6">
              {BEST_SELLING_PRODUCTS.map((product) => (
                <div key={product.id} className="flex-1">
                  <ProductCard
                    {...product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    onProductClick={handleProductClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2.5 rounded-full border border-gray-200 bg-white shadow-sm transition-all ${
              canScrollNext
                ? "hover:bg-gray-50 cursor-pointer hover:shadow-md"
                : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5 text-gray-800 fill-gray-800 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
