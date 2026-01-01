export const SPARE_PARTS_CATEGORIES = [
    {
        id: 'truck-spare-parts',
        name: 'Truck spare parts',
        icon: 'truck',
        href: '/spare-parts/truck'
    },
    {
        id: 'motorcycle-spare-parts',
        name: 'Motorcycle spare parts',
        icon: 'motorcycle',
        href: '/spare-parts/motorcycle'
    },
    {
        id: 'tires',
        name: 'Tires',
        icon: 'tire',
        href: '/spare-parts/tires'
    },
    {
        id: 'rims',
        name: 'Rims',
        icon: 'rim',
        href: '/spare-parts/rims'
    },
    {
        id: 'tools',
        name: 'Tools',
        icon: 'tools',
        href: '/spare-parts/tools'
    },
    {
        id: 'car-accessories',
        name: 'Car Accessories',
        icon: 'car-accessories',
        href: '/spare-parts/car-accessories'
    },
    {
        id: 'engine-oil',
        name: 'Engine Oil',
        icon: 'engine-oil',
        href: '/spare-parts/engine-oil'
    },
    {
        id: 'filters',
        name: 'Filters',
        icon: 'filters',
        href: '/spare-parts/filters'
    },
    {
        id: 'brakes',
        name: 'Brakes',
        icon: 'brakes',
        href: '/spare-parts/brakes'
    }
] as const;

export type SparePartCategory = typeof SPARE_PARTS_CATEGORIES[number];
