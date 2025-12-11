// src/constants/vehicle.constants.ts

/**
 * Vehicle Constants
 * Global constants for vehicle-related data
 */

// Fuel types
export const FUEL_TYPES = [
    { id: 'petrol', name: 'Petrol' },
    { id: 'diesel', name: 'Diesel' },
    { id: 'electric', name: 'Electric' },
    { id: 'hybrid', name: 'Hybrid' },
    { id: 'cng', name: 'CNG' },
    { id: 'lpg', name: 'LPG' },
] as const;

// Transmission types
export const TRANSMISSION_TYPES = [
    { id: 'manual', name: 'Manual' },
    { id: 'automatic', name: 'Automatic' },
    { id: 'cvt', name: 'CVT' },
    { id: 'amt', name: 'AMT' },
] as const;

// Drive types
export const DRIVE_TYPES = [
    { id: 'fwd', name: 'FWD (Front Wheel Drive)' },
    { id: 'rwd', name: 'RWD (Rear Wheel Drive)' },
    { id: 'awd', name: 'AWD (All Wheel Drive)' },
    { id: '4wd', name: '4WD (Four Wheel Drive)' },
    { id: 'hybrid-awd', name: 'Hybrid AWD' },
] as const;

// Vehicle colors
export const VEHICLE_COLORS = [
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'silver', name: 'Silver', hex: '#C0C0C0' },
    { id: 'gray', name: 'Gray', hex: '#808080' },
    { id: 'red', name: 'Red', hex: '#FF0000' },
    { id: 'blue', name: 'Blue', hex: '#0000FF' },
    { id: 'green', name: 'Green', hex: '#008000' },
    { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
    { id: 'orange', name: 'Orange', hex: '#FFA500' },
    { id: 'brown', name: 'Brown', hex: '#A52A2A' },
] as const;

// Vehicle types/categories
export const VEHICLE_TYPES = [
    { id: 'sedan', name: 'Sedan' },
    { id: 'suv', name: 'SUV' },
    { id: 'hatchback', name: 'Hatchback' },
    { id: 'coupe', name: 'Coupe' },
    { id: 'convertible', name: 'Convertible' },
    { id: 'wagon', name: 'Wagon' },
    { id: 'van', name: 'Van' },
    { id: 'truck', name: 'Truck' },
    { id: 'motorcycle', name: 'Motorcycle' },
] as const;

// Cubic capacity ranges (for filtering)
export const CC_RANGES = [
    { id: '0-800', name: 'Below 800cc', min: 0, max: 800 },
    { id: '800-1200', name: '800cc - 1200cc', min: 800, max: 1200 },
    { id: '1200-1600', name: '1200cc - 1600cc', min: 1200, max: 1600 },
    { id: '1600-2000', name: '1600cc - 2000cc', min: 1600, max: 2000 },
    { id: '2000+', name: 'Above 2000cc', min: 2000, max: 10000 },
] as const;

// Year ranges (for filtering)
export const getYearRanges = () => {
    const currentYear = new Date().getFullYear();
    return [
        { id: `${currentYear}`, name: `${currentYear}` },
        { id: `${currentYear - 1}`, name: `${currentYear - 1}` },
        { id: `${currentYear - 2}-${currentYear - 3}`, name: `${currentYear - 2} - ${currentYear - 3}` },
        { id: `${currentYear - 4}-${currentYear - 6}`, name: `${currentYear - 4} - ${currentYear - 6}` },
        { id: `older`, name: `Older than ${currentYear - 6}` },
    ];
};

// Type exports
export type FuelType = typeof FUEL_TYPES[number]['id'];
export type TransmissionType = typeof TRANSMISSION_TYPES[number]['id'];
export type DriveType = typeof DRIVE_TYPES[number]['id'];
export type VehicleColor = typeof VEHICLE_COLORS[number]['id'];
export type VehicleType = typeof VEHICLE_TYPES[number]['id'];
