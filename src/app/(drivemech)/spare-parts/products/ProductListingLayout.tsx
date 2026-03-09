"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { Info } from "phosphor-react";
import ModalDropdown from "@/components/ui/DropDown";
import {
  ENGINE_OIL_PRODUCTS,
  PRODUCT_BRANDS,
  FILTER_OPTIONS,
} from "@/constants/spare-parts-products.constants";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addProductToCart,
  toggleWishlist,
  openVehicleSelector,
} from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import type { CartProduct } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

const ProductListingLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { vehicle } = useAppSelector((state) => state.spareParts);
  const [selectedViscosity, setSelectedViscosity] = useState<string[]>([]);
  const [selectedSpecifications, setSelectedSpecifications] = useState<
    string[]
  >([]);

  // Dropdown states
  const [selectedViscosityOil, setSelectedViscosityOil] =
    useState<DropdownItem | null>({ id: "all", name: "All" });
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<DropdownItem | null>({ id: "all", name: "All" });
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<DropdownItem | null>({ id: "all", name: "All" });
  const [selectedSpecification, setSelectedSpecification] =
    useState<DropdownItem | null>({ id: "all", name: "All" });

  const toggleViscosity = (value: string) => {
    setSelectedViscosity((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSpecification = (value: string) => {
    setSelectedSpecifications((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleAddToCart = (product: (typeof ENGINE_OIL_PRODUCTS)[0]) => {
    const cartProduct: CartProduct = {
      id: product.id,
      partNumber: product.id,
      name: product.name,
      brand: product.brand,
      category: "Engine Oil",
      image: "/placeholder-product.png",
      price: product.price,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header with Dark Background */}
      <div className="py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            {/* Back Button and Title */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="/spare-parts/detail-page"
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-900" />
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Engine oil for your car
              </h1>
            </div>

            {/* Vehicle Selection Banner - Inline on Desktop, Full Width on Mobile */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg py-2 px-3 md:px-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Info
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-700 flex-shrink-0"
                  weight="fill"
                />
                {vehicle ? (
                  <span className="text-xs md:text-sm text-gray-800">
                    Showing parts for{" "}
                    <span className="font-semibold">
                      {vehicle.make} {vehicle.model}
                    </span>
                  </span>
                ) : (
                  <span className="text-xs md:text-sm text-gray-800">
                    Please select your vehicle to check if this part fits.
                  </span>
                )}
              </div>
              <button
                onClick={() => router.push("/spare-parts")}
                className="text-blue-600 text-xs md:text-sm font-semibold hover:underline whitespace-nowrap self-start sm:self-auto"
              >
                {vehicle ? "Change Vehicle" : "Select Vehicle"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Main Content: Filters + Products */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 lg:sticky lg:top-20">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Find the right oil based on the oil parameters
              </h3>

              {/* Viscosity Oil Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Viscosity Oil
                </label>
                <ModalDropdown
                  items={FILTER_OPTIONS.viscosityOil}
                  selectedItem={selectedViscosityOil}
                  onSelect={setSelectedViscosityOil}
                  placeholder="Select Viscosity Oil"
                />
              </div>

              {/* Oil Manufacturers Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oil Manufacturers
                </label>
                <ModalDropdown
                  items={FILTER_OPTIONS.oilManufacturers}
                  selectedItem={selectedManufacturer}
                  onSelect={setSelectedManufacturer}
                  placeholder="Select Manufacturer"
                />
              </div>

              {/* Engine Oil Recommendations Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine Oil Recommendations
                </label>
                <ModalDropdown
                  items={FILTER_OPTIONS.engineOilRecommendations}
                  selectedItem={selectedRecommendation}
                  onSelect={setSelectedRecommendation}
                  placeholder="Select Recommendation"
                />
              </div>

              {/* Engine Oil Specifications Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine Oil Specifications
                </label>
                <ModalDropdown
                  items={FILTER_OPTIONS.engineOilSpecifications}
                  selectedItem={selectedSpecification}
                  onSelect={setSelectedSpecification}
                  placeholder="Select Specification"
                />
              </div>

              {/* Engine Oil Viscosity Checkboxes */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Engine Oil Viscosity
                </h4>
                <div className="space-y-2">
                  {FILTER_OPTIONS.engineOilViscosity.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedViscosity.includes(option.value)}
                        onChange={() => toggleViscosity(option.value)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>
                <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                  View All
                </button>
              </div>

              {/* Engine Oil Specifications Checkboxes */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Engine Oil Specifications
                </h4>
                <div className="space-y-2">
                  {FILTER_OPTIONS.engineOilSpecificationsList.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSpecifications.includes(option.value)}
                        onChange={() => toggleSpecification(option.value)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>
                <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                  View All
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content - Product Grid */}
          <main className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Popular Engine Oil Brands */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Popular Engine Oil Brands
              </h2>
              <div className="flex items-center gap-4 overflow-x-auto pb-2 overflow-visible">
                {PRODUCT_BRANDS.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex-shrink-0 w-20 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors cursor-pointer"
                  >
                    {/* Placeholder for brand logo */}
                    <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ENGINE_OIL_PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Product Image Section */}
                  <div
                    onClick={() => handleProductClick(product.id)}
                    className="relative p-4 cursor-pointer"
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% Off
                    </div>
                    {/* Wishlist Icon */}
                    <button
                      onClick={() => handleToggleWishlist(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    {/* Product Image Placeholder */}
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-32 h-32 bg-gray-300 rounded"></div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 pt-0">
                    {/* Brand and Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        ₹ {product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹ {product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Brand Logos Section */}
            <div className="bg-gray-100 py-4">
              <div className="container mx-auto px-4">
                {/* Description Text */}
                <p className="text-xs md:text-sm text-gray-700 mb-4 text-center md:text-left">
                  Identify the best value (price-performance ratio) timing belt
                  and water pump kits for high-demand, top-selling vehicle
                  models
                </p>

                {/* Brand Logos */}
                <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap mb-4">
                  {PRODUCT_BRANDS.slice(0, 10).map((brand) => (
                    <div
                      key={brand.id}
                      className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
                    >
                      {/* Placeholder for brand logo */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
                    </div>
                  ))}
                </div>

                {/* More Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => router.push("/spare-parts/brands-list")}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors flex items-center gap-2"
                  >
                    More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingLayout;
