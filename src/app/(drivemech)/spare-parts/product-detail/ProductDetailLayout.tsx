"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addProductToCart,
  toggleWishlist,
  addToCompare,
  removeFromCompare,
  openVehicleSelector,
} from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import type { CartProduct } from "@/store/slices/customer/spare-parts/sparePartsCartSlice";
import Breadcrumbs from "@/components/spare-parts/Breadcrumbs";
import VehicleSelectorModal from "@/components/spare-parts/VehicleSelectorModal";
import { useToast } from "@/components/ui/ToastProvider";
import { ENGINE_OIL_PRODUCTS } from "@/constants/spare-parts-products.constants";

// Import new components
import ProductImageGallery from "@/components/spare-parts/product-detail/ProductImageGallery";
import ProductInfo from "@/components/spare-parts/product-detail/ProductInfo";
import SpecificationsTable from "@/components/spare-parts/product-detail/SpecificationsTable";
import ProductDisclaimer from "@/components/spare-parts/product-detail/ProductDisclaimer";
import ProductTabs from "@/components/spare-parts/product-detail/ProductTabs";

const ProductDetailLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { vehicle, wishlist, compare } = useAppSelector(
    (state) => state.spareParts
  );

  // Get product ID from URL
  const productId = searchParams.get("id") || "top-tec-4600";

  // Find product by ID
  const product = useMemo(() => {
    return (
      ENGINE_OIL_PRODUCTS.find((p) => p.id === productId) ||
      ENGINE_OIL_PRODUCTS[0]
    );
  }, [productId]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("5 Litres");

  // Check if product is in wishlist or compare
  const isInWishlist = wishlist.productIds.includes(product.id);
  const isInCompare = compare.productIds.includes(product.id);

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Engine Parts", href: "/spare-parts/detail-page" },
    { name: "Engine lubrication system", href: "/spare-parts/products" },
    { name: "Engine Oil", href: "/spare-parts/products" },
    {
      name: product.name,
      href: `/spare-parts/product-detail?id=${product.id}`,
    },
  ];

  const sizes = ["1 Litre", "5 Litres", "7 Litres", "10 Litres", "20 Litres"];

  // Mock images - in real app, these would come from product data
  const productImages = [
    "/placeholder-product.png",
    "/placeholder-product.png",
    "/placeholder-product.png",
    "/placeholder-product.png",
  ];

  const specifications = [
    { label: "SAE viscosity grade", value: "10W-40" },
    { label: "ACEA", value: "ACEA A3/B4" },
    { label: "API", value: "API SN" },
    {
      label: "Manufacturer recommendations",
      value:
        "MB 229.3, MB 229.5, VW 501.01, VW 502.00, VW 505.00, Renault RN0700, Renault RN0710, PSA (Peugeot/Citroën) B71 2296",
    },
    { label: "Contents [litres]", value: "5" },
    { label: "Product range", value: "MANNOL Defender" },
    { label: "Item number", value: "MN7507-5" },
    { label: "Container type", value: "Canister" },
    { label: "Our price", value: `$${product.price}` },
    { label: "Manufacturer", value: product.brand },
    { label: "EAN number(s)", value: "4036021162867" },
    {
      label: "Engine code",
      value: "This feature varies depending on the vehicle model",
    },
    { label: "Condition", value: "Brand new" },
  ];

  const reviews = [
    {
      name: "Courtney Henry",
      date: "Jan 28, 2021",
      rating: 5,
      comment:
        "I've used this oil for years and it's always been great. Keeps my engine running smooth.",
    },
    {
      name: "Eleanor Pena",
      date: "Jan 25, 2021",
      rating: 4,
      comment:
        "It's ok, but not as good as I expected. Delivery was fast though.",
    },
    {
      name: "Jane Cooper",
      date: "Jan 20, 2021",
      rating: 5,
      comment:
        "Excellent product! My car runs much better after using this oil.",
    },
  ];

  // Handlers
  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
      partNumber: product.id,
      name: product.name,
      brand: product.brand,
      category: "Engine Oil",
      image: product.image || "/placeholder-product.png",
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      quantity: quantity,
      inStock: true,
    };

    dispatch(addProductToCart(cartProduct));
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product.id));

    if (isInWishlist) {
      showToast("Removed from wishlist", "info");
    } else {
      showToast(`${product.name} added to wishlist!`, "success");
    }
  };

  const handleToggleCompare = () => {
    if (isInCompare) {
      dispatch(removeFromCompare(product.id));
      showToast("Removed from compare", "info");
    } else {
      if (compare.productIds.length >= 4) {
        showToast("You can only compare up to 4 products", "warning");
        return;
      }
      dispatch(addToCompare(product.id));
      showToast(`${product.name} added to compare!`, "success");
    }
  };

  const handleSelectVehicle = () => {
    dispatch(openVehicleSelector());
  };

  return (
    <div className="w-full h-full bg-white p-1">
      <VehicleSelectorModal />
      <Breadcrumbs items={breadcrumbs} />

      <div className="w-full h-full bg-white">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          {/* All sections with flex gap */}
          <div className="flex flex-col gap-6">
            {/* Product Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Image Gallery */}
              <ProductImageGallery
                images={productImages}
                productName={product.name}
              />

              {/* Right Column - Product Info */}
              <ProductInfo
                product={product}
                vehicle={vehicle}
                isInWishlist={isInWishlist}
                isInCompare={isInCompare}
                quantity={quantity}
                selectedSize={selectedSize}
                sizes={sizes}
                onSelectVehicle={handleSelectVehicle}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onToggleCompare={handleToggleCompare}
                onQuantityChange={setQuantity}
                onSizeChange={setSelectedSize}
              />
            </div>

            {/* Description Section */}
            <SpecificationsTable specifications={specifications} />

            {/* Disclaimer */}
            <ProductDisclaimer />

            {/* Tabs Section */}
            <ProductTabs product={product} reviewsList={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLayout;
