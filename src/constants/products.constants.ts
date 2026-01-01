export interface Product {
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
    category: string;
}

export const BEST_SELLING_PRODUCTS: Product[] = [
    {
        id: 'brake-pad-1',
        brand: 'Bosch',
        title: 'Break Pad Set - Front',
        description: 'Nemo enim ipsam qui aut qui voluptatem enim qua dolor sit amet, consectetur adipisci velit...',
        image: '/images/spare-parts/brake-pads.jpg',
        currentPrice: 499.00,
        originalPrice: 799.00,
        discount: 20,
        rating: 4.5,
        reviewCount: 234,
        category: 'brake-parts'
    },
    {
        id: 'air-filter-1',
        brand: 'Mann Filter',
        title: 'Air Filter',
        description: 'Nemo enim ipsam qui aut qui voluptatem enim qua dolor sit amet, consectetur adipisci velit...',
        image: '/images/spare-parts/air-filter.jpg',
        currentPrice: 799.00,
        originalPrice: 999.00,
        discount: 20,
        rating: 4.7,
        reviewCount: 654,
        category: 'filters'
    },
    {
        id: 'battery-1',
        brand: 'Bosch',
        title: 'Car Battery 12V 45Ah',
        description: 'Nemo enim ipsam qui aut qui voluptatem enim qua dolor sit amet, consectetur adipisci velit...',
        image: '/images/spare-parts/car-battery.jpg',
        currentPrice: 999.00,
        originalPrice: 1299.00,
        discount: 20,
        rating: 4.6,
        reviewCount: 189,
        category: 'batteries'
    },
    {
        id: 'brake-pad-2',
        brand: 'Bosch',
        title: 'Break Pad Set - Front',
        description: 'Nemo enim ipsam qui aut qui voluptatem enim qua dolor sit amet, consectetur adipisci velit...',
        image: '/images/spare-parts/brake-pads.jpg',
        currentPrice: 499.00,
        originalPrice: 799.00,
        discount: 20,
        rating: 4.5,
        reviewCount: 234,
        category: 'brake-parts'
    },
    {
        id: 'air-filter-2',
        brand: 'Mann Filter',
        title: 'Air Filter',
        description: 'Nemo enim ipsam qui aut qui voluptatem enim qua dolor sit amet, consectetur adipisci velit...',
        image: '/images/spare-parts/air-filter.jpg',
        currentPrice: 799.00,
        originalPrice: 999.00,
        discount: 20,
        rating: 4.7,
        reviewCount: 654,
        category: 'filters'
    },
    {
        id: 'battery-2',
        brand: 'Bosch',
        title: 'Car Battery 12V 45Ah',
        description: 'Nemo enim ipsam qui aut qui voluptatem enim qua dolor sit amet, consectetur adipisci velit...',
        image: '/images/spare-parts/car-battery.jpg',
        currentPrice: 999.00,
        originalPrice: 1299.00,
        discount: 20,
        rating: 4.6,
        reviewCount: 189,
        category: 'batteries'
    }
];
