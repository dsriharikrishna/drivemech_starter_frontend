"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { Info } from "phosphor-react";
import ModalDropdown from "@/components/ui/DropDown";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addProductToCart,
  toggleWishlist,
  openVehicleSelector,
  openCartDrawer,
  setFilters,
} from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import type { CartProduct } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import Breadcrumbs from "@/components/spare-parts/Breadcrumbs";
import VehicleSelectorModal from "@/components/spare-parts/VehicleSelectorModal";
import { useToast } from "@/components/ui/ToastProvider";
import {
  ENGINE_OIL_PRODUCTS,
  FILTER_OPTIONS,
} from "@/constants/spare-parts-products.constants";

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

const CategorySubcategoryLayout = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { vehicle, wishlist, filters } = useAppSelector(
    (state) => state.spareParts
  );

  const category = params.category as string;
  const subcategory = params.subcategory as string;

  // Filter states
  const [selectedViscosity, setSelectedViscosity] = useState<string[]>(
    filters.viscosity
  );
  const [selectedSpecifications, setSelectedSpecifications] = useState<
    string[]
  >(filters.specifications);

  // Dropdown states
  const [selectedViscosityOil, setSelectedViscosityOil] =
    useState<DropdownItem | null>({ id: "all", name: "All" });
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<DropdownItem | null>({ id: "all", name: "All" });
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<DropdownItem | null>({ id: "all", name: "All" });
  const [selectedSpecification, setSelectedSpecification] =
    useState<DropdownItem | null>({ id: "all", name: "All" });

  // Format category and subcategory names for display
  const formatName = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const categoryName = formatName(category);
  const subcategoryName = formatName(subcategory);

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Spare Parts", href: "/spare-parts" },
    { name: categoryName, href: `/spare-parts/${category}` },
    { name: subcategoryName, href: `/spare-parts/${category}/${subcategory}` },
  ];

  const toggleViscosity = (value: string) => {
    const newViscosity = selectedViscosity.includes(value)
      ? selectedViscosity.filter((v) => v !== value)
      : [...selectedViscosity, value];

    setSelectedViscosity(newViscosity);
    dispatch(setFilters({ viscosity: newViscosity }));
  };

  const toggleSpecification = (value: string) => {
    const newSpecs = selectedSpecifications.includes(value)
      ? selectedSpecifications.filter((v) => v !== value)
      : [...selectedSpecifications, value];

    setSelectedSpecifications(newSpecs);
    dispatch(setFilters({ specifications: newSpecs }));
  };

  const handleAddToCart = (product: (typeof ENGINE_OIL_PRODUCTS)[0]) => {
    const cartProduct: CartProduct = {
      id: product.id,
      partNumber: product.id,
      name: product.name,
      brand: product.brand,
      category: subcategoryName,
      image: "/placeholder-product.png",
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      quantity: 1,
      inStock: true,
    };

    dispatch(addProductToCart(cartProduct));
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleToggleWishlist = (productId: string, productName: string) => {
    const isInWishlist = wishlist.productIds.includes(productId);
    dispatch(toggleWishlist(productId));

    if (isInWishlist) {
      showToast("Removed from wishlist", "info");
    } else {
      showToast(`${productName} added to wishlist!`, "success");
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/spare-parts/product-detail?id=${productId}`);
  };

  const handleSelectVehicle = () => {
    dispatch(openVehicleSelector());
  };

  return (
    <>
      <VehicleSelectorModal />
      <Breadcrumbs items={breadcrumbs} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="py-3 md:py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              {/* Back Button and Title */}
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={() => router.back()}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {subcategoryName}
                </h1>
              </div>

              {/* Vehicle Selection Banner */}
              <div
                className={`${
                  vehicle
                    ? "bg-green-50 border-green-300"
                    : "bg-yellow-100 border-yellow-300"
                } border rounded-lg py-2 px-3 md:px-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4`}
              >
                <div className="flex items-center gap-2">
                  <Info
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      vehicle ? "text-green-700" : "text-gray-700"
                    } flex-shrink-0`}
                    weight="fill"
                  />
                  {vehicle ? (
                    <span className="text-xs md:text-sm text-green-800 font-medium">
                      Showing parts for{" "}
                      <span className="font-semibold">
                        {vehicle.make} {vehicle.model} ({vehicle.year})
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs md:text-sm text-gray-800">
                      Please select your vehicle to check if this part fits.
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSelectVehicle}
                  className={`${
                    vehicle
                      ? "text-green-600 hover:text-green-700"
                      : "text-blue-600 hover:text-blue-700"
                  } text-xs md:text-sm font-semibold hover:underline whitespace-nowrap self-start sm:self-auto`}
                >
                  {vehicle ? "Change Vehicle" : "Select Vehicle"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-6">
          {/* Main Content: Filters + Products */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-4 lg:sticky lg:top-20">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Find the right parts
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
                    Manufacturers
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
                    Recommendations
                  </label>
                  <ModalDropdown
                    items={FILTER_OPTIONS.engineOilRecommendations}
                    selectedItem={selectedRecommendation}
                    onSelect={setSelectedRecommendation}
                    placeholder="Select Recommendation"
                  />
                </div>

                {/* Specification Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specification
                  </label>
                  <ModalDropdown
                    items={FILTER_OPTIONS.engineOilSpecifications}
                    selectedItem={selectedSpecification}
                    onSelect={setSelectedSpecification}
                    placeholder="Select Specification"
                  />
                </div>

                {/* Viscosity Checkboxes */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Viscosity
                  </h4>
                  <div className="space-y-2">
                    {FILTER_OPTIONS.engineOilViscosity.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedViscosity.includes(option.name)}
                          onChange={() => toggleViscosity(option.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {option.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Specification Checkboxes */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Specification
                  </h4>
                  <div className="space-y-2">
                    {FILTER_OPTIONS.engineOilSpecificationsList.map(
                      (option) => (
                        <label
                          key={option.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSpecifications.includes(
                              option.name
                            )}
                            onChange={() => toggleSpecification(option.name)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {option.name}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Content - Products */}
            <main className="flex-1 min-w-0">
              <div className="mb-4 text-sm text-gray-600">
                Showing {ENGINE_OIL_PRODUCTS.length} products for{" "}
                {subcategoryName}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {ENGINE_OIL_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(product.id, product.name);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlist.productIds.includes(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                      {/* Product Image Placeholder */}
                      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-32 h-32 bg-gray-300 rounded"></div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 pt-0">
                      <h3
                        onClick={() => handleProductClick(product.id)}
                        className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-blue-600"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {product.brand}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-700">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base font-bold text-gray-900">
                          $ {product.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          $ {product.originalPrice}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySubcategoryLayout;
