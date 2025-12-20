import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface ProductCardProps {
    id: string;
    brand: string;
    title: string;
    description: string;
    image: string;
    currentPrice: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviewCount: number;
    onAddToCart?: (id: string) => void;
    onToggleWishlist?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    brand,
    title,
    description,
    image,
    currentPrice,
    originalPrice,
    discount,
    rating,
    reviewCount,
    onAddToCart,
    onToggleWishlist
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
            {/* Image Section */}
            <div className="relative aspect-square bg-gray-50 p-6">
                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
                        {discount}% OFF
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={() => onToggleWishlist?.(id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full transition-colors z-10"
                    aria-label="Add to wishlist"
                >
                    <Heart className="w-5 h-5 text-gray-600" />
                </button>

                {/* Product Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src={image}
                        alt={title}
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Brand */}
                <p className="text-sm text-gray-600 mb-1">{brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">{rating}</span>
                    <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">
                        ${currentPrice.toFixed(2)}
                    </span>
                    {originalPrice > currentPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => onAddToCart?.(id)}
                    startIcon={<ShoppingCart className="w-4 h-4" />}
                    className="bg-orange-500 hover:bg-orange-600"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
